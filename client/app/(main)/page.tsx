import { subtitle, title } from '@/components/primitives'

const MainPage = () => {
  return (
    <section className='flex flex-col items-center justify-center gap-24 py-8 md:py-10'>
      <div className='inline-block max-w-xl text-center justify-center'>
        <span className={title()}>
          Анализируйте зарплатные данные
          <br />
          <span className={title({ color: 'violet' })}>IT-специалистов&nbsp;</span>
          по всей стране, сравнивайте свою оплату и находите точки для роста в карьере
        </span>
      </div>
      <section className='py-10 sm:py-16 lg:py-24'>
        <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
          <div className='grid items-center grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-24 gap-y-12'>
            <div className='relative lg:mb-12'>
              <img
                className='absolute -right-0 -bottom-8 xl:-bottom-12 xl:-right-4'
                src='https://cdn.rareblocks.xyz/collection/celebration/images/content/3/dots-pattern.svg'
                alt=''
              />
              <div className='pl-12 pr-6'>
                <img
                  className='relative rounded-md'
                  src='https://cdn.rareblocks.xyz/collection/celebration/images/content/3/girl-working-on-laptop.jpg'
                  alt=''
                />
              </div>
              <div className='absolute left-0 pr-12 bottom-8 xl:bottom-20'>
                <div className='max-w-xs bg-blue-600 rounded-lg sm:max-w-md xl:max-w-md'>
                  <div className='px-3 py-4 sm:px-5 sm:py-8'>
                    <div className='flex items-start'>
                      <p className='text-3xl sm:text-4xl'>👋</p>
                      <blockquote className='ml-5'>
                        <p className='text-sm font-medium text-white sm:text-lg'>
                          “Заполняй анкету и узнай зарплаты IT-специалистов во всему Узбекистану”
                        </p>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='2xl:pl-16'>
              <h2 className='text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl lg:leading-tight'>
                Зарплаты в IT
              </h2>
              <p className='text-xl leading-relaxed mt-9'>
                Здесь мы собираем и анализируем данные по зарплатам в IT в Узбекистане. Мы решили,
                что на рынке не хватает актуальной и публичной статистики по зарплатам в IT сфере в
                компаниях находящихся в Узбекистане, и нужно это исправить.
              </p>
              <p className='mt-6 text-xl leading-relaxed'>
                Хочешь узнать, сколько попросить в следующий раз на собеседовании — посмотри в
                собранной статистике.
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default MainPage
