import { Input } from "@heroui/input"

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
      id={id}
      name={id}
      type={type}
      label={label}
      placeholder={placeholder}
      errorMessage={error}
      isInvalid={!!error}
    />
  )
}
