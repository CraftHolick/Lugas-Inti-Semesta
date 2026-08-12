'use client';
import { useTranslation } from '@/lib/i18n';
import Image from 'next/image';

const CLIENTS = [
  { name: 'PT Jhonlin Baratama', logo: '/logos/3.png' },
  { name: 'PT Harfa Taruna Mandiri', initials: 'HTM' },
  { name: 'PT Golden Kirin Group', initials: 'GKG' },
  { name: 'PT Transcoal Minergy', logo: '/logos/1.png' },
  { name: 'PT Graha Equity Investment', initials: 'GEI' },
  { name: 'PT Mega Multi Energi', logo: '/logos/2.png' },
  { name: 'GPE', logo: '/logos/4.png' },
  { name: 'BAS', logo: '/logos/5.png' },
  { name: 'MRC Sabe Group', logo: '/logos/murung-raya-coal.png' },
  { name: 'PT Satui Bina Usaha', logo: '/logos/satui-bina-usaha.png' },
];

export default function ClientLogos() {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-bg-light overflow-hidden border-t border-border-light">
      <div className="container-custom text-center mb-10">
        <h2 className="text-xl md:text-2xl font-heading font-semibold text-muted">
          {t('client_logos.heading')}
        </h2>
      </div>

      <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_100px,_black_calc(100%-100px),transparent_100%)] py-4">
        <div className="animate-marquee-infinite">
          {/* 4 duplicated sets for seamless infinite looping */}
          {[...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, idx) => (
            <div key={idx} className="mx-6 sm:mx-8 flex flex-col items-center justify-center transition-all duration-300 opacity-75 hover:opacity-100 cursor-pointer group/card shrink-0">
              <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center mb-3 p-2">
                {'logo' in client && client.logo ? (
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-2xl md:text-3xl font-heading font-black text-navy-800 group-hover/card:text-accent transition-colors">
                    {client.initials}
                  </span>
                )}
              </div>
              <span className="text-xs text-muted font-semibold tracking-wide uppercase">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
