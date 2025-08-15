/**
 * チャットログ
 */
type ChatLog = {
  id: number
  email: string
  sender: MessageSender
  message: string
  createdAt: Date
  updatedAt: Date
}
