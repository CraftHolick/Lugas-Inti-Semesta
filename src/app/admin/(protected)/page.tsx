export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Selamat datang di panel admin LUISE.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Placeholder cards until we implement data fetching */}
        <div className="bg-white rounded-xl border border-border-light p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Artikel</h3>
          <div className="text-2xl font-bold text-gray-900 mt-2">0</div>
        </div>
        
        <div className="bg-white rounded-xl border border-border-light p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Proyek</h3>
          <div className="text-2xl font-bold text-gray-900 mt-2">0</div>
        </div>
      </div>
    </div>
  );
}
