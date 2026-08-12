'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import AdminSidebar from '@/components/admin/layout/AdminSidebar';
import AdminHeader from '@/components/admin/layout/AdminHeader';

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const supabase = createClient();
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser();

        if (!currentUser) {
          router.replace('/admin/login');
          return;
        }

        // Perform deep role validation via database query
        const { data: userRole, error } = await supabase.rpc('get_user_role').single();

        if (error || !userRole || (userRole !== 'admin' && userRole !== 'editor')) {
          router.replace('/admin/login?error=UnauthorizedAccess');
          return;
        }

        setUser(currentUser);
        setRole(userRole);
      } catch (err) {
        router.replace('/admin/login');
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500 text-sm">Memuat...</div>
      </div>
    );
  }

  if (!user || !role) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar userRole={role} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader user={user} userRole={role} />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
