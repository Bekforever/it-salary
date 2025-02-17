import Navbar from '@/components/client/navbar';
import '@/styles/globals.css';
import { Link } from '@heroui/link';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container flex-grow px-6 pt-16 mx-auto max-w-7xl">
        {children}
      </main>
      <footer className="flex items-center justify-center w-full py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://github.com/bekforever"
          title="github bekforever"
        >
          <span className="text-default-600">Developed by</span>
          <p className="text-primary">Bekforever</p>
        </Link>
      </footer>
    </div>
  );
}
