import { Plus_Jakarta_Sans, Playfair_Display, Poppins, Outfit } from 'next/font/google';
import Navbar from '@/components/Navbar';
import BookingModal from '@/components/BookingModal';
import '@/styles/common.css';
import '@/styles/index.css';
import '@/styles/treatments.css';
import '@/styles/style.css';
import '@/styles/styles.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-heading',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://drashwintmd.com'),
  title: {
    default: "Dr. Ashwin's TMD Clinic | TMJ & TMD Care, Kozhikode",
    template: "%s | Dr. Ashwin's TMD Clinic, Kozhikode",
  },
  description:
    'Expert care for TMJ/TMD disorders using advanced diagnostics and non-invasive treatments to restore comfort and jaw function. Led by Dr. Ashwin in Kozhikode (Calicut), Kerala.',
  keywords: [
    'TMD clinic Kozhikode',
    'TMJ specialist Calicut',
    'Dr. Ashwin TMD',
    'jaw clicking pain relief Kerala',
    'teeth grinding bruxism treatment',
    'locked jaw Kozhikode',
    'neuromuscular dentistry Kerala',
  ],
  authors: [{ name: 'Dr. Ashwin Ramakrishnan' }],
  openGraph: {
    title: "Dr. Ashwin's TMD Clinic | Specialized TMJ & TMD Care",
    description:
      'Eat properly. Sleep deeply. Wake up feeling like yourself. Advanced diagnostics and gentle non-invasive TMJ care in Kozhikode.',
    url: 'https://drashwintmd.com',
    siteName: "Dr. Ashwin's TMD Clinic",
    images: [
      {
        url: '/assets/images/logo.png',
        width: 800,
        height: 600,
        alt: "Dr. Ashwin's TMD Clinic Logo",
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: '/assets/images/logo.png',
    apple: '/assets/images/logo.png',
  },
};

import fs from 'fs';
import path from 'path';
import { get } from '@vercel/blob';
import { CmsProvider, defaultCmsData } from '@/context/CmsContext';

async function getInitialContent() {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const storeId = process.env.BLOB_STORE_ID || 'store_xao5q3CCmgXGUOal';
      const cleanStoreId = storeId.replace(/^store_/, '').toLowerCase();
      const blobUrl = `https://${cleanStoreId}.private.blob.vercel-storage.com/data/content.json`;

      const result = await get(blobUrl, {
        access: 'private',
        token: process.env.BLOB_READ_WRITE_TOKEN,
        useCache: false,
      });

      if (result && result.statusCode === 200) {
        const text = await new Response(result.stream).text();
        const data = JSON.parse(text);
        if (data && typeof data === 'object') {
          return { ...defaultCmsData, ...data };
        }
      }
    } catch {}
  }

  try {
    const dataFilePath = path.join(process.cwd(), 'data', 'content.json');
    if (fs.existsSync(dataFilePath)) {
      const raw = fs.readFileSync(dataFilePath, 'utf8');
      return { ...defaultCmsData, ...JSON.parse(raw) };
    }
  } catch {}
  return defaultCmsData;
}

export default async function RootLayout({ children }) {
  const initialContent = await getInitialContent();

  return (
    <html lang="en" className={`${plusJakarta.variable} ${playfair.variable} ${poppins.variable} ${outfit.variable}`}>
      <body className="antialiased">
        <CmsProvider initialContent={initialContent}>
          <Navbar />
          {children}
          <BookingModal />
        </CmsProvider>
      </body>
    </html>
  );
}
