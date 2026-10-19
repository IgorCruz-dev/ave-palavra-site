import type { Metadata, Viewport } from 'next';
import { CONTEUDO, ESCOLA, SEO } from '@/content/site';
import { JsonLd } from '@/components/JsonLd';

const BASE = 'https://avepalavraecia.com.br';

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: SEO.title,
  description: SEO.description,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: BASE,
    siteName: ESCOLA.nome,
    title: SEO.title,
    description: SEO.description,
    images: SEO.og_image_url
      ? [{ url: SEO.og_image_url, width: 1200, height: 630, alt: ESCOLA.nome }]
      : undefined,
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.title,
    description: SEO.description,
    images: SEO.og_image_url ? [SEO.og_image_url] : undefined,
  },
  icons: { icon: CONTEUDO.brand?.symbol_url ?? '/img/ave.webp' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#070f2e',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <JsonLd baseUrl={BASE} />
      </body>
    </html>
  );
}
