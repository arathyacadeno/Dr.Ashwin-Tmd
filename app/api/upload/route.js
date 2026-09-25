import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Clean filename
    const cleanName = file.name.replace(/[<>:"/\\|?*]/g, '_');

    // 1. If Vercel Blob is configured (in production or local .env.local), save to Vercel Blob
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        await put(cleanName, buffer, {
          access: 'private',
          token: process.env.BLOB_READ_WRITE_TOKEN,
          addRandomSuffix: false,
        });

        const mediaUrl = `/api/media/${encodeURIComponent(cleanName)}`;
        return NextResponse.json({
          success: true,
          fileName: mediaUrl,
          url: mediaUrl,
        });
      } catch (blobErr) {
        console.error('Vercel Blob put error:', blobErr);
        // Fall through to local fallback if blob failed
      }
    }

    // 2. Local fallback for development when blob token is absent
    try {
      const uploadDir = path.join(process.cwd(), 'public', 'assets', 'images');
      await fs.mkdir(uploadDir, { recursive: true });
      const targetPath = path.join(uploadDir, cleanName);
      await fs.writeFile(targetPath, buffer);

      return NextResponse.json({
        success: true,
        fileName: cleanName,
        url: `/assets/images/${cleanName}`,
      });
    } catch (fsErr) {
      console.error('Local FS write error:', fsErr);
      return NextResponse.json({ error: 'Failed to write file' }, { status: 500 });
    }
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: error.message || 'Failed to upload file' }, { status: 500 });
  }
}
