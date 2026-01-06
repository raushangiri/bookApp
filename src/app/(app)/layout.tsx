import { AppSidebar } from '@/components/layout/app-sidebar';
import { MobileHeader } from '@/components/layout/mobile-header';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
        <div className="flex h-screen">
            <AppSidebar />
            <div className="flex-1 flex flex-col h-screen">
                <MobileHeader />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    </div>
  );
}
