import { homedir } from 'node:os'
import { join } from 'node:path'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { startHttpServer } from './http-server.js'
import { createServer } from './server.js'
import { TtsService } from './tts.js'

const MODEL_DIR = process.env.PURECONTEXT_TTS_MODEL_DIR ?? join(homedir(), '.cairn', 'models')
const HTTP_PORT = parseInt(process.env.PURECONTEXT_TTS_HTTP_PORT ?? '8880', 10)

async function main() {
  const ttsService = new TtsService(MODEL_DIR)
  const server = createServer(ttsService)
  const transport = new StdioServerTransport()

  process.on('SIGINT', () => process.exit(0))
  process.on('SIGTERM', () => process.exit(0))

  startHttpServer(ttsService, HTTP_PORT)
  await server.connect(transport)
  console.error(`purecontext-tts: Server started (model cache: ${MODEL_DIR})`)
}

main().catch((error) => {
  console.error('purecontext-tts: Fatal error:', error)
  process.exit(1)
})
