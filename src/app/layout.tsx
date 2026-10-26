import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { UniBot } from '@/components/UniBot';

export const metadata: Metadata = {
  metadataBase: new URL('https://unigear.vn'),
  title: {
    default: 'UniGear – Thiết bị công nghệ sinh viên',
    template: '%s · UniGear',
  },
  description:
    'Nền tảng thương mại điện tử công nghệ dành riêng cho sinh viên Việt Nam: laptop, tablet, tai nghe, phụ kiện chính hãng, giảm thêm 5% thẻ sinh viên, trả góp 0% và giao tận KTX.',
  authors: [{ name: 'UniGear Vietnam' }],
  creator: 'UniGear',
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://unigear.vn',
    siteName: 'UniGear',
    title: 'UniGear – Thiết bị công nghệ & Thu cũ đổi mới sinh viên',
    description:
      'Nền tảng công nghệ sinh viên: laptop đồ án, tablet ghi chú, tai nghe ANC, phụ kiện chính hãng. Giảm thêm 5% thẻ SV, trả góp 0% và giao tận KTX.',
    images: [
      {
        url: '/logo.svg',
        width: 1200,
        height: 630,
        alt: 'UniGear - Nền tảng công nghệ sinh viên',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UniGear – Thiết bị công nghệ sinh viên',
    description: 'Kho 120+ laptop, tablet, tai nghe cho sinh viên. Giảm thêm 5% thẻ SV, trả góp 0%.',
    images: ['/logo.svg'],
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0c0e14',
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'UniGear',
  legalName: 'CÔNG TY CỔ PHẦN CÔNG NGHỆ SINH VIÊN UNIGEAR',
  url: 'https://unigear.vn',
  logo: 'https://unigear.vn/logo.svg',
  description: 'Nền tảng thương mại điện tử thiết bị công nghệ & thu cũ đổi mới dành riêng cho sinh viên Việt Nam',
  foundingDate: '2024',
  taxID: '0110293847',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+84-1800-6868',
    contactType: 'customer service',
    areaServed: 'VN',
    availableLanguage: 'Vietnamese',
  },
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'Tòa nhà Innovation, KTX Khu B ĐHQG TP.HCM, Đường Tạ Quang Bửu, Phường Đông Hòa',
      addressLocality: 'TP. Dĩ An',
      addressRegion: 'Bình Dương',
      addressCountry: 'VN',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'Nhà H6, Trường Đại học Bách Khoa Hà Nội, Số 1 Đại Cồ Việt, Phường Bách Khoa',
      addressLocality: 'Quận Hai Bà Trưng',
      addressRegion: 'Hà Nội',
      addressCountry: 'VN',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-[#6F5CFF] selection:text-white min-h-screen flex flex-col justify-between">
        {/* Accessible skip link for keyboard navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--pri)] focus:text-white focus:font-bold focus:rounded-full focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white"
        >
          Bỏ qua tới nội dung chính
        </a>
        <Providers>
          <Navbar />
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          <Footer />
          <UniBot />
        </Providers>
      </body>
    </html>
  );
}
