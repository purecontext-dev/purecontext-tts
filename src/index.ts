import { homedir } from 'node:os'
import { join } from 'node:path'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { createServer } from './server.js'
import { TtsService } from './tts.js'

const MODEL_DIR = process.env.PURECONTEXT_TTS_MODEL_DIR ?? join(homedir(), '.cairn', 'models')

async function main() {
  const ttsService = new TtsService(MODEL_DIR)
  const server = createServer(ttsService)
  const transport = new StdioServerTransport()

  process.on('SIGINT', () => process.exit(0))
  process.on('SIGTERM', () => process.exit(0))

  await server.connect(transport)
  console.error(`purecontext-tts: Server started (model cache: ${MODEL_DIR})`)
}

main().catch((error) => {
  console.error('purecontext-tts: Fatal error:', error)
  process.exit(1)
})
