import { NextResponse } from 'next/server';
import { put, get } from '@vercel/blob';
import fs from 'fs/promises';
import path from 'path';
import { defaultCmsData } from '@/context/CmsContext';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const BLOB_TOKEN =
  process.env.BLOB_READ_WRITE_TOKEN ||
  'vercel_blob_rw_xao5q3CCmgXGUOal_uaNFJ9pFEsTYukCh8NkxksKtcibaqh';

const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'CDN-Cache-Control': 'no-store',
  'Vercel-CDN-Cache-Control': 'no-store',
};

const dataDir = path.join(process.cwd(), 'data');
const dataFilePath = path.join(dataDir, 'content.json');

export async function GET() {
  // If Blob token is available, read from Vercel Blob
  if (BLOB_TOKEN) {
    try {
      const storeId = process.env.BLOB_STORE_ID || 'store_xao5q3CCmgXGUOal';
      const cleanStoreId = storeId.replace(/^store_/, '').toLowerCase();
      const blobUrl = `https://${cleanStoreId}.private.blob.vercel-storage.com/data/content.json`;

      const result = await get(blobUrl, {
        access: 'private',
        token: BLOB_TOKEN,
        useCache: false,
      });

      if (result && result.statusCode === 200) {
        const text = await new Response(result.stream).text();
        const data = JSON.parse(text);
        if (data && typeof data === 'object') {
          return NextResponse.json({ ...defaultCmsData, ...data }, { headers: NO_CACHE_HEADERS });
        }
      }
    } catch (err) {
      console.warn('Vercel blob read fallback:', err);
    }
  }

  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf8');
    const data = JSON.parse(fileContent);
    return NextResponse.json({ ...defaultCmsData, ...data }, { headers: NO_CACHE_HEADERS });
  } catch {
    return NextResponse.json(defaultCmsData, { headers: NO_CACHE_HEADERS });
  }
}

export async function POST(request) {
  try {
    const updatedData = await request.json();

    // 1. If Vercel Blob is configured, save content.json to Vercel Blob with allowOverwrite
    if (BLOB_TOKEN) {
      try {
        await put('data/content.json', JSON.stringify(updatedData, null, 2), {
          access: 'private',
          token: BLOB_TOKEN,
          addRandomSuffix: false,
          allowOverwrite: true,
        });
      } catch (blobErr) {
        console.error('Blob content save error:', blobErr);
        throw blobErr;
      }
    }

    // 2. Try writing local file (works in local development)
    try {
      await fs.mkdir(dataDir, { recursive: true });
      await fs.writeFile(dataFilePath, JSON.stringify(updatedData, null, 2), 'utf8');
    } catch {
      // Read-only filesystem on Vercel is expected and safely caught
    }

    return NextResponse.json({ success: true, data: updatedData });
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json({ error: error.message || 'Failed to update content' }, { status: 500 });
  }
}

