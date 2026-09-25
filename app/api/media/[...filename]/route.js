import { get } from '@vercel/blob';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const pathParts = params?.filename;
  if (!pathParts || pathParts.length === 0) {
    return new Response('Not found', { status: 404 });
  }

  const filename = Array.isArray(pathParts) ? pathParts.join('/') : pathParts;

  // Build the private blob URL for the current store
  const storeId = process.env.BLOB_STORE_ID || 'store_xao5q3CCmgXGUOal';
  const cleanStoreId = storeId.replace(/^store_/, '').toLowerCase();
  const blobUrl = `https://${cleanStoreId}.private.blob.vercel-storage.com/${filename}`;

  const BLOB_TOKEN =
    process.env.BLOB_READ_WRITE_TOKEN ||
    'vercel_blob_rw_xao5q3CCmgXGUOal_uaNFJ9pFEsTYukCh8NkxksKtcibaqh';

  try {
    const result = await get(blobUrl, {
      access: 'private',
      token: BLOB_TOKEN,
    });

    const headers = new Headers();
    if (result.headers) {
      for (const [key, val] of result.headers.entries()) {
        const lower = key.toLowerCase();
        if (['content-type', 'content-length', 'accept-ranges', 'etag', 'last-modified'].includes(lower)) {
          headers.set(key, val);
        }
      }
    }
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    return new Response(result.stream, {
      status: result.statusCode || 200,
      headers,
    });
  } catch (error) {
    console.error('Error streaming private blob:', error);
    return new Response('Media not found', { status: 404 });
  }
}
