'use client';

import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, Menu, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface AdminHeaderProps {
  user: User;
  userRole: string;
}

export default function AdminHeader({ user, userRole }: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <header className="h-16 bg-white border-b border-border-light flex items-center justify-between px-4 sm:px-6 shrink-0 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-gray-500 hover:text-gray-900 transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <div className="font-medium text-gray-900 truncate max-w-[200px] sm:max-w-xs">
          CMS Dashboard
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Link 
          href="/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-accent hover:underline hidden sm:flex items-center gap-1 font-medium"
        >
          Lihat Website <ExternalLink className="w-3.5 h-3.5" />
        </Link>
        
        <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
        
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">
              {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
            </p>
            <p className="text-xs text-gray-500 capitalize">{userRole}</p>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout}
            className="text-gray-600 hover:text-red-600 hover:bg-red-50 hover:border-red-100"
          >
            <LogOut className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Keluar</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
