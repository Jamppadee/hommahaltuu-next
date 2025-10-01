import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'HommaHaltuu – Pienyrittäjien ja asiakkaiden markkinapaikka',
  description: 'Turvallinen escrow-maksu. Löydä ja tilaa osaajat suoraan.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fi">
      <body>
        <Header />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
