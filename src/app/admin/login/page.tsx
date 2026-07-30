import Image from 'next/image';
import LoginForm from './LoginForm';

export default async function LoginPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams;
  const redirectedFrom = typeof searchParams.redirectedFrom === 'string' ? searchParams.redirectedFrom : '/admin';
  const error = typeof searchParams.error === 'string' ? searchParams.error : undefined;

  return (
    <main className="min-h-screen bg-bg-light flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-border-light overflow-hidden">
        <div className="p-8 sm:p-10">
          <div className="flex justify-center mb-8">
            <Image
              src="/luise-logo.png"
              alt="LUISE Logo"
              width={150}
              height={50}
              className="h-12 w-auto object-contain"
            />
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-heading font-bold text-navy-950 mb-2">CMS Login</h1>
            <p className="text-text-muted text-sm">Masuk ke panel admin PT Lugas Inti Semesta</p>
          </div>

          <LoginForm redirectedFrom={redirectedFrom} error={error} />
        </div>
        
        <div className="bg-gray-50 px-8 py-5 border-t border-border-light text-center">
          <p className="text-xs text-text-muted">
            Internal CMS Platform &copy; {new Date().getFullYear()} LUISE.
          </p>
        </div>
      </div>
    </main>
  );
}
