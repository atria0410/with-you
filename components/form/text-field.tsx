import { tv } from 'tailwind-variants'
import ErrorMessage from '@/components/form/error-message'

interface Props {
  type?: string
  name?: string
  value?: string
  defaultValue?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string
  errorMessage?: string
  hideError?: boolean
  disabled?: boolean
}

const textFieldVariants = tv({
  base: 'w-full rounded-md border border-gray-300 bg-white p-2',
  variants: {
    error: {
      true: 'border-red-500'
    },
    disabled: {
      true: 'bg-gray-100'
    }
  }
})

export default function TextField({
  type,
  name,
  value,
  defaultValue,
  onChange,
  label,
  placeholder,
  errorMessage,
  hideError,
  disabled
}: Props) {
  return (
    <div>
      {label && <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        className={textFieldVariants({
          error: !!errorMessage,
          disabled
        })}
        disabled={disabled}
      />
      <ErrorMessage errorMessage={errorMessage} hideError={hideError} />
    </div>
  )
}
