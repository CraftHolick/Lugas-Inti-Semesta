'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  FileText
} from 'lucide-react';

interface AdminSidebarProps {
  userRole: string;
}

export default function AdminSidebar({ userRole }: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin/articles', label: 'Artikel Blog', icon: FileText, roles: ['admin', 'editor'] },
  ];

  const visibleNavItems = navItems.filter(item => item.roles.includes(userRole));

  return (
    <aside className="w-64 bg-navy-950 border-r border-navy-900 text-gray-300 hidden md:flex flex-col">
      <div className="h-24 flex items-center justify-start px-6 border-b border-navy-900 shrink-0">
        <Link href="/admin/articles" className="flex items-center justify-start w-full">
          <Image 
            src="/luise-logo.png" 
            alt="LUISE Logo" 
            width={220} 
            height={80} 
            className="h-16 w-auto object-contain origin-left scale-110"
          />
        </Link>
      </div>
      
      <div className="flex-1 py-6 overflow-y-auto">
        <nav className="space-y-1 px-3">
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium text-sm",
                  isActive 
                    ? "bg-accent/10 text-accent" 
                    : "hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className={cn("w-5 h-5 shrink-0", isActive ? "text-accent" : "text-gray-400")} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-navy-900 text-xs text-gray-500">
        <p>Logged in as <span className="font-semibold capitalize text-gray-400">{userRole}</span></p>
      </div>
    </aside>
  );
}
