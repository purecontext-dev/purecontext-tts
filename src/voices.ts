export interface VoiceInfo {
  id: string
  name: string
  language: string
  gender: 'Female' | 'Male'
  grade: string
  traits?: string
}

export const VOICES: VoiceInfo[] = [
  { id: 'af_heart', name: 'Heart', language: 'en-us', gender: 'Female', grade: 'A', traits: '❤️' },
  { id: 'af_alloy', name: 'Alloy', language: 'en-us', gender: 'Female', grade: 'C' },
  { id: 'af_aoede', name: 'Aoede', language: 'en-us', gender: 'Female', grade: 'C+' },
  { id: 'af_bella', name: 'Bella', language: 'en-us', gender: 'Female', grade: 'A-', traits: '🔥' },
  { id: 'af_jessica', name: 'Jessica', language: 'en-us', gender: 'Female', grade: 'D' },
  { id: 'af_kore', name: 'Kore', language: 'en-us', gender: 'Female', grade: 'C+' },
  {
    id: 'af_nicole',
    name: 'Nicole',
    language: 'en-us',
    gender: 'Female',
    grade: 'B-',
    traits: '🎧',
  },
  { id: 'af_nova', name: 'Nova', language: 'en-us', gender: 'Female', grade: 'C' },
  { id: 'af_river', name: 'River', language: 'en-us', gender: 'Female', grade: 'D' },
  { id: 'af_sarah', name: 'Sarah', language: 'en-us', gender: 'Female', grade: 'C+' },
  { id: 'af_sky', name: 'Sky', language: 'en-us', gender: 'Female', grade: 'C-' },
  { id: 'am_adam', name: 'Adam', language: 'en-us', gender: 'Male', grade: 'F+' },
  { id: 'am_echo', name: 'Echo', language: 'en-us', gender: 'Male', grade: 'D' },
  { id: 'am_eric', name: 'Eric', language: 'en-us', gender: 'Male', grade: 'D' },
  { id: 'am_fenrir', name: 'Fenrir', language: 'en-us', gender: 'Male', grade: 'C+' },
  { id: 'am_liam', name: 'Liam', language: 'en-us', gender: 'Male', grade: 'D' },
  { id: 'am_michael', name: 'Michael', language: 'en-us', gender: 'Male', grade: 'C+' },
  { id: 'am_onyx', name: 'Onyx', language: 'en-us', gender: 'Male', grade: 'D' },
  { id: 'am_puck', name: 'Puck', language: 'en-us', gender: 'Male', grade: 'C+' },
  { id: 'am_santa', name: 'Santa', language: 'en-us', gender: 'Male', grade: 'D-' },
  { id: 'bf_alice', name: 'Alice', language: 'en-gb', gender: 'Female', grade: 'D' },
  { id: 'bf_emma', name: 'Emma', language: 'en-gb', gender: 'Female', grade: 'B-' },
  { id: 'bf_isabella', name: 'Isabella', language: 'en-gb', gender: 'Female', grade: 'C' },
  { id: 'bf_lily', name: 'Lily', language: 'en-gb', gender: 'Female', grade: 'D' },
  { id: 'bm_daniel', name: 'Daniel', language: 'en-gb', gender: 'Male', grade: 'D' },
  { id: 'bm_fable', name: 'Fable', language: 'en-gb', gender: 'Male', grade: 'C' },
  { id: 'bm_george', name: 'George', language: 'en-gb', gender: 'Male', grade: 'C' },
  { id: 'bm_lewis', name: 'Lewis', language: 'en-gb', gender: 'Male', grade: 'D+' },
  { id: 'ef_dora', name: 'Dora', language: 'es', gender: 'Female', grade: '-' },
  { id: 'em_alex', name: 'Alex', language: 'es', gender: 'Male', grade: '-' },
  { id: 'em_santa', name: 'Santa', language: 'es', gender: 'Male', grade: '-' },
  { id: 'ff_siwis', name: 'Siwis', language: 'fr', gender: 'Female', grade: 'B-' },
  { id: 'hf_alpha', name: 'Alpha', language: 'hi', gender: 'Female', grade: 'C' },
  { id: 'hf_beta', name: 'Beta', language: 'hi', gender: 'Female', grade: 'C' },
  { id: 'hm_omega', name: 'Omega', language: 'hi', gender: 'Male', grade: 'C' },
  { id: 'hm_psi', name: 'Psi', language: 'hi', gender: 'Male', grade: 'C' },
  { id: 'if_sara', name: 'Sara', language: 'it', gender: 'Female', grade: 'C' },
  { id: 'im_nicola', name: 'Nicola', language: 'it', gender: 'Male', grade: 'C' },
  { id: 'jf_alpha', name: 'Alpha', language: 'ja', gender: 'Female', grade: 'C+' },
  { id: 'jf_gongitsune', name: 'Gongitsune', language: 'ja', gender: 'Female', grade: 'C' },
  { id: 'jf_nezumi', name: 'Nezumi', language: 'ja', gender: 'Female', grade: 'C-' },
  { id: 'jf_tebukuro', name: 'Tebukuro', language: 'ja', gender: 'Female', grade: 'C' },
  { id: 'jm_kumo', name: 'Kumo', language: 'ja', gender: 'Male', grade: 'C-' },
  { id: 'pf_dora', name: 'Dora', language: 'pt-br', gender: 'Female', grade: '-' },
  { id: 'pm_alex', name: 'Alex', language: 'pt-br', gender: 'Male', grade: '-' },
  { id: 'pm_santa', name: 'Santa', language: 'pt-br', gender: 'Male', grade: '-' },
  { id: 'zf_xiaobei', name: 'Xiaobei', language: 'zh', gender: 'Female', grade: 'D' },
  { id: 'zf_xiaoni', name: 'Xiaoni', language: 'zh', gender: 'Female', grade: 'D' },
  { id: 'zf_xiaoxiao', name: 'Xiaoxiao', language: 'zh', gender: 'Female', grade: 'D' },
  { id: 'zf_xiaoyi', name: 'Xiaoyi', language: 'zh', gender: 'Female', grade: 'D' },
  { id: 'zm_yunjian', name: 'Yunjian', language: 'zh', gender: 'Male', grade: 'D' },
  { id: 'zm_yunxi', name: 'Yunxi', language: 'zh', gender: 'Male', grade: 'D' },
  { id: 'zm_yunxia', name: 'Yunxia', language: 'zh', gender: 'Male', grade: 'D' },
  { id: 'zm_yunyang', name: 'Yunyang', language: 'zh', gender: 'Male', grade: 'D' },
]

export function formatVoiceList(
  voices: VoiceInfo[],
  language?: string,
  gender?: string,
): string {
  let filtered = voices
  if (language) filtered = filtered.filter((v) => v.language === language)
  if (gender) filtered = filtered.filter((v) => v.gender.toLowerCase() === gender.toLowerCase())

  const lines = ['| ID | Name | Language | Gender | Grade |', '|---|---|---|---|---|']
  for (const v of filtered) {
    lines.push(`| ${v.id} | ${v.name} | ${v.language} | ${v.gender} | ${v.grade} |`)
  }
  return lines.join('\n')
}
