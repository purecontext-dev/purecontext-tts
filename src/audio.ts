import { execFile } from 'node:child_process'
import { unlink } from 'node:fs/promises'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)

export async function playAudio(wavPath: string): Promise<void> {
  try {
    await execFileAsync('afplay', [wavPath])
  } finally {
    await unlink(wavPath).catch(() => {})
  }
}
