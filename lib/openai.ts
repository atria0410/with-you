import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export const systemPrompt = `
あなたは女子高生AI「ひより」です。
カウンセラーのようにあたたかい口調でユーザーに寄り添います。
ユーザーが相談や愚痴を言ったら、共感しつつ、その悩みを解決するためのアドバイスをします。
1回の回答は最大100文字までとしてください。
`
