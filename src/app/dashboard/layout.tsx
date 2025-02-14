import DashboardLayout from '@/components/layouts/DashboardLayout';
import '../globals.css';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardLayout>{children}</DashboardLayout>
    </>
  );
}
