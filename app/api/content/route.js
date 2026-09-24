import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

import { defaultCmsData } from '@/context/CmsContext';

const dataDir = path.join(process.cwd(), 'data');
const dataFilePath = path.join(dataDir, 'content.json');

export async function GET() {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf8');
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(defaultCmsData);
  }
}

export async function POST(request) {
  try {
    const updatedData = await request.json();
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(dataFilePath, JSON.stringify(updatedData, null, 2), 'utf8');
    return NextResponse.json({ success: true, data: updatedData });
  } catch (error) {
    console.error('Error writing content.json:', error);
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}
