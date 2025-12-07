import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Activity } from 'lucide-react';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Diabetes Prediction - KNN Demo',
  description: 'ML KNN Simulation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen bg-background antialiased flex flex-col")}>
        <header className="border-b bg-white dark:bg-slate-950/50 sticky top-0 z-10 backdrop-blur-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-slate-100 hover:opacity-80 transition-opacity">
                    <Activity className="w-6 h-6 text-blue-600" />
                    <span>MediPred<span className="text-blue-600">KNN</span></span>
                </Link>
            </div>
        </header>
        <main className="flex-1 w-full flex flex-col">
            {children}
        </main>
      </body>
    </html>
  );
}
