import { env } from '@huggingface/transformers'
import { KokoroTTS } from 'kokoro-js'

const MODEL_ID = 'onnx-community/Kokoro-82M-v1.0-ONNX'

export class TtsService {
  private tts: KokoroTTS | null = null
  private loading: Promise<KokoroTTS> | null = null

  constructor(private modelDir: string) {}

  async getModel(): Promise<KokoroTTS> {
    if (this.tts) return this.tts
    if (this.loading) return this.loading

    env.cacheDir = this.modelDir

    this.loading = KokoroTTS.from_pretrained(MODEL_ID, {
      dtype: 'q8',
      device: 'cpu',
    }).then((model) => {
      this.tts = model
      this.loading = null
      console.error('purecontext-tts: Model loaded')
      return model
    })

    return this.loading
  }

  async generate(
    text: string,
    voice: string,
    speed: number,
  ): Promise<{ save: (path: string) => Promise<void> }> {
    const model = await this.getModel()
    return model.generate(text, { voice: voice as any, speed })
  }

  async getVoices(): Promise<Record<string, any>> {
    const model = await this.getModel()
    return model.voices
  }
}
