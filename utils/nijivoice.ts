/**
 * Nijivoice API を呼び出して音声を取得する
 * @param script メッセージ
 * @param speed 音声の速度
 * @returns 音声
 */
export async function fetchNijivoice(script: string, speed: number = 1.1): Promise<Blob> {
  const formData = new FormData()
  formData.append('script', script)
  formData.append('speed', speed.toString())

  const response = await fetch('/api/nijivoice', {
    method: 'POST',
    body: formData
  })

  return await response.blob()
}
