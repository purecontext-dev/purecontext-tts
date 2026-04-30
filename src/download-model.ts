import { homedir } from 'node:os'
import { join } from 'node:path'
import { TtsService } from './tts.js'

const MODEL_DIR = process.env.PURECONTEXT_TTS_MODEL_DIR ?? join(homedir(), '.cairn', 'models')

async function main() {
  console.log(`Downloading Kokoro-82M model to ${MODEL_DIR}...`)
  const tts = new TtsService(MODEL_DIR)
  await tts.getModel()
  console.log('Model downloaded and ready.')
}

main().catch((error) => {
  console.error('Download failed:', error)
  process.exit(1)
})
