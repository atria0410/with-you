interface Props {
  type?: string
  name?: string
  value?: string
  defaultValue?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  label?: string
}

export default function TextField({
  type,
  name,
  value,
  defaultValue,
  onChange,
  placeholder,
  label
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
        className="w-full rounded-md border border-gray-300 bg-white p-2"
      />
    </div>
  )
}
