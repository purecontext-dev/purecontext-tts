import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod/v4'
import { playAudio } from './audio.js'
import type { TtsService } from './tts.js'
import { VOICES, formatVoiceList } from './voices.js'

const VALID_VOICE_IDS = VOICES.map((v) => v.id)

export function createServer(ttsService: TtsService): McpServer {
  const defaultVoice = process.env.PURECONTEXT_TTS_DEFAULT_VOICE ?? 'af_heart'

  const server = new McpServer({
    name: 'purecontext-tts',
    version: '0.1.0',
  })

  server.registerTool(
    'speak',
    {
      description:
        'Speak text aloud using local TTS. First call may take 30-60s to download the model.',
      inputSchema: {
        text: z.string().describe('Text to speak'),
        voice: z
          .string()
          .optional()
          .describe(`Voice ID (default: ${defaultVoice}). Use list_voices to see options.`),
        speed: z.number().min(0.1).max(5).optional().describe('Speed multiplier (default: 1.0)'),
      },
    },
    async ({ text, voice, speed }) => {
      const selectedVoice = voice ?? defaultVoice
      const selectedSpeed = speed ?? 1.0

      if (!VALID_VOICE_IDS.includes(selectedVoice)) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `Voice "${selectedVoice}" not found. Use list_voices to see available options.`,
            },
          ],
        }
      }

      const wavPath = join(tmpdir(), `purecontext-tts-${Date.now()}.wav`)

      try {
        const audio = await ttsService.generate(text, selectedVoice, selectedSpeed)
        await audio.save(wavPath)
        await playAudio(wavPath)

        return {
          content: [
            {
              type: 'text' as const,
              text: `Spoke ${text.length} characters using voice "${selectedVoice}" at ${selectedSpeed}x speed.`,
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `TTS error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        }
      }
    },
  )

  server.registerTool(
    'list_voices',
    {
      description: 'List available TTS voices with quality grades.',
      inputSchema: {
        language: z
          .string()
          .optional()
          .describe('Filter by language code (e.g., en-us, en-gb, ja, zh)'),
        gender: z.string().optional().describe('Filter by gender (Female or Male)'),
      },
    },
    async ({ language, gender }) => {
      return {
        content: [
          {
            type: 'text' as const,
            text: formatVoiceList(VOICES, language, gender),
          },
        ],
      }
    },
  )

  server.registerTool(
    'audition',
    {
      description: 'Speak the same text in multiple voices for comparison.',
      inputSchema: {
        text: z.string().describe('Text to speak in each voice'),
        voices: z.array(z.string()).min(1).max(10).describe('Voice IDs to audition'),
        speed: z.number().min(0.1).max(5).optional().describe('Speed multiplier (default: 1.0)'),
      },
    },
    async ({ text, voices: voiceIds, speed }) => {
      const selectedSpeed = speed ?? 1.0
      const results: string[] = []

      for (const voiceId of voiceIds) {
        if (!VALID_VOICE_IDS.includes(voiceId)) {
          results.push(`${voiceId}: skipped (not found)`)
          continue
        }

        const wavPath = join(tmpdir(), `purecontext-tts-audition-${Date.now()}.wav`)

        try {
          const audio = await ttsService.generate(text, voiceId, selectedSpeed)
          await audio.save(wavPath)
          await playAudio(wavPath)
          results.push(`${voiceId}: played`)
        } catch (error) {
          results.push(
            `${voiceId}: error — ${error instanceof Error ? error.message : String(error)}`,
          )
        }
      }

      return {
        content: [
          {
            type: 'text' as const,
            text: `Auditioned ${voiceIds.length} voice(s):\n${results.join('\n')}`,
          },
        ],
      }
    },
  )

  return server
}
