import { LanguageProvider } from '../context/LanguageContext';

export const metadata = {
  title: 'Dashboard - Agricast',
  description: 'Agriculture Intelligence Dashboard',
};

export default function DashboardLayout({ children }) {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
        {children}
      </div>
    </LanguageProvider>
  );
}