import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(request: NextRequest) {
  // const { pathname } = request.nextUrl
  // const router = useRouter()

  // // Исключаем запросы на статику, API и страницы логина
  // if (
  //   pathname.startsWith('/_next') || // Next.js статика
  //   pathname.startsWith('/api') || // API-запросы
  //   /\.(.*)$/.test(pathname) // Статические ресурсы (CSS, JS, изображения)
  // ) {
  //   return NextResponse.next()
  // }

  // // Получение токена из cookies
  // const token = request.cookies.get(TOKEN)?.value

  // // Если токена нет, перенаправляем на страницу логина
  // if (!token) {
  //   return router.push('http://localhost:3000/sign_in')
  // }

  // console.log(request.url);
  // // Проверяем подлинность токена
  // const isValid = await checkUser(token)

  // if (!isValid) {
  //   return NextResponse.redirect(new URL('/sign_in', request.url))
  // }

  // Если всё в порядке, продолжаем обработку запроса
  return NextResponse.next()
}
