import { homedir } from 'node:os'
import { join } from 'node:path'
import { startHttpServer } from './http-server.js'
import { TtsService } from './tts.js'

const MODEL_DIR = process.env.PURECONTEXT_TTS_MODEL_DIR ?? join(homedir(), '.cairn', 'models')
const HTTP_PORT = parseInt(process.env.PURECONTEXT_TTS_HTTP_PORT ?? '8880', 10)

const ttsService = new TtsService(MODEL_DIR)

process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

startHttpServer(ttsService, HTTP_PORT)
