'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import LoginForm from './LoginForm';

function LoginPageContent() {
  const searchParams = useSearchParams();
  const redirectedFrom = searchParams.get('redirectedFrom') || '/admin/articles';
  const error = searchParams.get('error') || undefined;

  return (
    <main className="min-h-screen bg-bg-light flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-navy-900 rounded-2xl shadow-2xl border border-navy-800 overflow-hidden">
        <div className="p-8 sm:p-10">
          <div className="flex justify-center mb-8">
            <Image
              src="/luise-logo.png"
              alt="LUISE Logo"
              width={260}
              height={90}
              className="h-24 w-auto object-contain"
            />
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-heading font-bold text-white mb-2">CMS Login</h1>
            <p className="text-white/70 text-sm">Masuk ke panel admin PT Lugas Inti Semesta</p>
          </div>

          <LoginForm redirectedFrom={redirectedFrom} error={error} />
        </div>
        
        <div className="bg-navy-950 px-8 py-5 border-t border-navy-800 text-center">
          <p className="text-xs text-white/50">
            Internal CMS Platform &copy; {new Date().getFullYear()} LUISE.
          </p>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-bg-light flex flex-col justify-center items-center p-4">
          <div className="w-full max-w-md bg-navy-900 rounded-2xl shadow-2xl border border-navy-800 overflow-hidden">
            <div className="p-8 sm:p-10 flex justify-center">
              <Image
                src="/luise-logo.png"
                alt="LUISE Logo"
                width={260}
                height={90}
                className="h-24 w-auto object-contain"
              />
            </div>
          </div>
        </main>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}
