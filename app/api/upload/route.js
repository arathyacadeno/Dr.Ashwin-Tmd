import { NextResponse } from 'next/server';
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

    // Keep clean filename while preserving spaces or replacing invalid characters
    const fileName = file.name.replace(/[<>:"/\\|?*]/g, '_');
    const uploadDir = path.join(process.cwd(), 'public', 'assets', 'images');
    
    await fs.mkdir(uploadDir, { recursive: true });
    const targetPath = path.join(uploadDir, fileName);
    await fs.writeFile(targetPath, buffer);

    return NextResponse.json({
      success: true,
      fileName,
      url: `/assets/images/${fileName}`,
    });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
