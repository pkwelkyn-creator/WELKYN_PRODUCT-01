import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WELKYN — Cloud Cost Optimization',
  description: 'Identify cloud waste, optimize costs, and maximize efficiency across AWS, Azure, GCP, and Cloudflare.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
