/**
 * OpenAI API を呼び出して回答を取得する
 * @param text メッセージ
 * @returns 回答
 */
export async function fetchOpenai(text: string): Promise<string> {
  const response = await fetch(`/api/openai?text=${text}`, {
    method: 'GET'
  })
  const data = await response.json()
  return data.answer
}
