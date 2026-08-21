import { ClientProviders } from "@/components/layout/ClientProviders";
import { MAINTENANCE_MODE } from "@/config/maintenance";
import { MaintenancePage } from "@/components/MaintenancePage";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (MAINTENANCE_MODE) {
    return <MaintenancePage />;
  }

  return <ClientProviders>{children}</ClientProviders>;
}
