import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminSidebar from '@/components/admin/layout/AdminSidebar'
import AdminHeader from '@/components/admin/layout/AdminHeader'

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  // Perform deep role validation via database query using authenticated client
  // The RPC get_user_role() is defined in the RLS migration
  const { data: role, error } = await supabase.rpc('get_user_role').single()

  if (error || !role || (role !== 'admin' && role !== 'editor')) {
    // User exists but has no valid role or failed to fetch role
    // This serves as an absolute guard
    redirect('/admin/login?error=UnauthorizedAccess')
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
  )
}
