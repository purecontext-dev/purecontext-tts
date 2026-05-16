import { execFile } from 'node:child_process'
import { readFile, unlink } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { promisify } from 'node:util'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { TtsService } from './tts.js'
import { VOICES } from './voices.js'

const execFileAsync = promisify(execFile)

const DEFAULT_VOICE = 'af_heart'
const VALID_VOICE_IDS = VOICES.map((v) => v.id)

export function startHttpServer(ttsService: TtsService, port: number) {
  const app = new Hono()

  app.use('*', cors())

  app.post('/v1/audio/speech', async (c) => {
    const body = await c.req.json<{ input?: string; voice?: string; speed?: number }>()
    const { input, voice = DEFAULT_VOICE, speed = 1.0 } = body

    if (!input) {
      return c.json({ error: { message: 'input is required' } }, 400)
    }

    const selectedVoice = VALID_VOICE_IDS.includes(voice) ? voice : DEFAULT_VOICE
    const wavPath = join(tmpdir(), `purecontext-tts-http-${Date.now()}.wav`)

    try {
      const audio = await ttsService.generate(input, selectedVoice, speed)
      await audio.save(wavPath)

      // Convert IEEE Float WAV to PCM 16-bit for Cast device compatibility
      const pcmPath = `${wavPath}.pcm16.wav`
      await execFileAsync('ffmpeg', ['-y', '-i', wavPath, '-acodec', 'pcm_s16le', '-ar', '24000', pcmPath])
      await unlink(wavPath).catch(() => {})

      const wavData = await readFile(pcmPath)
      await unlink(pcmPath).catch(() => {})

      return new Response(wavData, {
        headers: {
          'Content-Type': 'audio/wav',
          'Content-Length': wavData.length.toString(),
        },
      })
    } catch (error) {
      await unlink(wavPath).catch(() => {})
      return c.json(
        { error: { message: error instanceof Error ? error.message : String(error) } },
        500,
      )
    }
  })

  app.get('/v1/models', (c) => {
    return c.json({
      object: 'list',
      data: [{ id: 'kokoro-82m', object: 'model', owned_by: 'purecontext' }],
    })
  })

  app.get('/v1/audio/voices', (c) => {
    return c.json({
      voices: VOICES.map((v) => ({
        voice_id: v.id,
        name: v.name,
        language: v.language,
        gender: v.gender,
      })),
    })
  })

  serve({ fetch: app.fetch, port }, () => {
    console.error(`purecontext-tts: HTTP server listening on http://localhost:${port}`)
  })
}
