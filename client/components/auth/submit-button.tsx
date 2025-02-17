import { Button } from "@heroui/button";
import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Авторизация...' : 'Войти'}
    </Button>
  );
}