import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });
const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-grotesk', display: 'swap' });

export const metadata = {
  title: 'Mishba Zuber Barkati — Senior UI Developer',
  description: 'Senior UI Developer with 8+ years of experience building fast, accessible, SEO-optimized web experiences with React, Next.js, and Angular.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} ${grotesk.variable} dark`}>
      <body className="antialiased bg-[#07070b] text-neutral-100 selection:bg-violet-500/40 selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
