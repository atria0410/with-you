import Image from 'next/image'
import { tv } from 'tailwind-variants'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

const authButtonVariants = tv({
  base: 'relative flex w-full transform cursor-pointer items-center justify-center gap-3 rounded-full border border-gray-200 px-6 py-3 font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]',
  variants: {
    variant: {
      google: 'bg-white text-gray-700',
      github: 'bg-[#24292F] text-white'
    }
  }
})

export function GoogleAuthButton({ type, onClick }: Props) {
  return (
    <button type={type} onClick={onClick} className={authButtonVariants({ variant: 'google' })}>
      <Image
        src="/icons/google.svg"
        alt="Google"
        width={24}
        height={24}
        className="absolute left-6"
      />
      Google でサインイン
    </button>
  )
}

export function GithubAuthButton({ type, onClick }: Props) {
  return (
    <button type={type} onClick={onClick} className={authButtonVariants({ variant: 'github' })}>
      <Image
        src="/icons/github.svg"
        alt="GitHub"
        width={24}
        height={24}
        className="absolute left-6"
      />
      GitHub でサインイン
    </button>
  )
}
