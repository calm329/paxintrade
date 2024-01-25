import App from '@/provider/provider';

import '@/styles/globals.css';

import { Metadata, Viewport } from 'next';

import { siteConfig } from '@/config/site';
import { fontDMSans, fontRoboto, fontSans, fontSatoshi } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { MetadataUpdater } from '@/lib/dynamicMetadata';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  manifest: '/manifest-dark.webmanifest',
  icons: {
    icon: '/favicon-dark.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <App>
      <html lang='en' suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'min-h-screen bg-background font-satoshi antialiased',
            fontSans.variable,
            fontSatoshi.variable,
            fontDMSans.variable,
            fontRoboto.variable
          )}
        >
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem={true}
          >
            {children}
            <MetadataUpdater />
          </ThemeProvider>
          <TailwindIndicator />
        </body>
      </html>
    </App>
  );
}
