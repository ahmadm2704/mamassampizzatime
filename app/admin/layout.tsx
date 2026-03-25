import { AdminSidebar } from '@/components/admin-sidebar';
import { AdminAuthGuard } from '@/components/admin-auth-guard';

export const metadata = {
  title: 'Admin Dashboard - Mama Sam Pizza',
  description: 'Admin portal for managing Mama Sam Pizza operations',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGuard>
      <div className="flex h-screen bg-background">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </AdminAuthGuard>
  );
}
