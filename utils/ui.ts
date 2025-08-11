import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * クラス名を結合する
 * @param inputs クラス名
 * @returns 結合したクラス名
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
