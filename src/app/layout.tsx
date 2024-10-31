import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { ConvexAuthNextjsServerProvider } from '@convex-dev/auth/nextjs/server';
import { ConvexClientProvider } from '../providers/convex-client-provider';
import { ModalProvider } from '@/providers/modal-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Simple CMS',
  description: 'Simple CMS built by Kyaw Thu.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body className={GeistSans.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConvexClientProvider>
              <ModalProvider />
              {children}
              <Toaster />
            </ConvexClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
