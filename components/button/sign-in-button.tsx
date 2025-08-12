import { BeatLoader } from 'react-spinners'
import { tv } from 'tailwind-variants'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  isPending?: boolean
}

const signInButtonVariants = tv({
  base: 'h-[42px] w-full cursor-pointer rounded-md bg-blue-500 p-2 text-white',
  variants: {
    isPending: {
      true: 'opacity-50'
    }
  }
})

export default function SignInButton({ type, onClick, isPending }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isPending}
      className={signInButtonVariants({ isPending })}
    >
      {isPending ? <BeatLoader color="#fff" size={8} /> : 'サインイン'}
    </button>
  )
}
