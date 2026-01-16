import { NextRequest, NextResponse } from 'next/server';
import { evaluateWriting } from '@/lib/gemini';
import { ImageType } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageType, content } = body as {
      imageType: ImageType;
      content: string;
    };

    if (!imageType || !['person', 'object', 'event', 'scenery'].includes(imageType)) {
      return NextResponse.json(
        { error: '无效的图片类型' },
        { status: 400 }
      );
    }

    if (!content || content.trim().length < 5) {
      return NextResponse.json(
        { error: '内容太短了，至少写5个字哦' },
        { status: 400 }
      );
    }

    const evaluation = await evaluateWriting(imageType, content);

    return NextResponse.json(evaluation);
  } catch (error) {
    console.error('评分失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '评分失败' },
      { status: 500 }
    );
  }
}
