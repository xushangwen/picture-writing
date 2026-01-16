import { NextRequest, NextResponse } from 'next/server';
import { generateImage } from '@/lib/gemini';
import { ImageType } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type } = body as { type: ImageType };

    if (!type || !['person', 'object', 'event', 'scenery'].includes(type)) {
      return NextResponse.json(
        { error: '无效的图片类型' },
        { status: 400 }
      );
    }

    const imageUrl = await generateImage(type);

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('生成图片失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '生成图片失败' },
      { status: 500 }
    );
  }
}
