import { Input } from '@heroui/input'

type InputFieldProps = {
  label: string
  id: string
  type: string
  placeholder: string
  error?: string
}

export function InputField({
  label,
  id,
  type,
  placeholder,
  error,
}: InputFieldProps) {
  return (
    <Input
      errorMessage={error}
      id={id}
      isInvalid={!!error}
      label={label}
      name={id}
      placeholder={placeholder}
      type={type}
    />
  )
}
