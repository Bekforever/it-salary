import { Button } from '@heroui/button'
import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button className="w-full" disabled={pending} type="submit">
      {pending ? 'Авторизация...' : 'Войти'}
    </Button>
  )
}
