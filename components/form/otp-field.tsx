'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/utils/ui'

interface OtpFieldProps {
  name?: string
  value?: string
  length?: number
  onChange?: (otp: string) => void
}

export default function OtpField({ name, value = '', length = 6, onChange }: OtpFieldProps) {
  const [otp, setOtp] = useState<string[]>(() => {
    if (value) {
      return value.split('')
    }
    return new Array(length).fill('')
  })
  const inputRefs = useRef<(HTMLInputElement | null)[]>(new Array(length).fill(null))

  // 最初の入力フィールドにフォーカス
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  // OTP値の変更を通知
  useEffect(() => {
    const otpValue = otp.join('')
    onChange?.(otpValue)
  }, [otp, onChange])

  // 数字かどうかの判定
  const isNumeric = (value: string): boolean => /^\d$/.test(value)

  // フォーカスを移動
  const focusInput = useCallback(
    (index: number) => {
      if (index >= 0 && index < length) {
        inputRefs.current[index]?.focus()
      }
    },
    [length]
  )

  // OTP値を更新
  const updateOtp = useCallback((index: number, value: string) => {
    setOtp((prev) => prev.map((digit, i) => (i === index ? value : digit)))
  }, [])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const { value } = e.target

      if (value && !isNumeric(value)) return

      updateOtp(index, value)

      // 値が入力されたら次のフィールドに移動
      if (value && index < length - 1) {
        focusInput(index + 1)
      }
    },
    [updateOtp, focusInput, length]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      const { key } = e

      if (key === 'Backspace') {
        // 現在のフィールドが空で、前のフィールドがある場合は前に移動
        if (!otp[index] && index > 0) {
          focusInput(index - 1)
        }
        // 現在のフィールドに値がある場合はクリア
        else if (otp[index]) {
          updateOtp(index, '')
        }
      } else if (key === 'ArrowLeft' && index > 0) {
        focusInput(index - 1)
      } else if (key === 'ArrowRight' && index < length - 1) {
        focusInput(index + 1)
      }
    },
    [otp, focusInput, updateOtp, length]
  )

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
  }, [])

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault()
      const pastedText = e.clipboardData.getData('text').slice(0, length)
      const pastedDigits = pastedText.split('').filter(isNumeric)

      if (pastedDigits.length === 0) return

      // ペーストされた数字で配列を更新
      const newOtp = new Array(length).fill('')
      pastedDigits.forEach((digit, i) => {
        if (i < length) newOtp[i] = digit
      })

      setOtp(newOtp)

      // 最後に入力された位置または最後のフィールドにフォーカス
      const focusIndex = Math.min(pastedDigits.length, length - 1)
      focusInput(focusIndex)
    },
    [length, focusInput]
  )

  return (
    <div className="flex justify-center space-x-1.5">
      <input type="hidden" name={name} value={otp.join('')} />
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el
          }}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          className={cn(
            'h-10 w-10 rounded-lg border-2 text-center text-xl font-semibold transition-colors duration-200 focus:outline-none',
            digit ? 'border-blue-500 bg-blue-50' : 'border-gray-300',
            'hover:border-gray-400 focus:border-blue-500'
          )}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={handleFocus}
          onPaste={handlePaste}
        />
      ))}
    </div>
  )
}
