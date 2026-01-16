import { GoogleGenerativeAI, GenerationConfig } from '@google/generative-ai';
import { ImageType, EvaluationResult, IMAGE_TYPE_LABELS } from '@/types';
import { getRandomPrompt, EVALUATION_SYSTEM_PROMPT, getEvaluationUserPrompt } from './prompts';

// 初始化 Gemini 客户端
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY 环境变量未设置');
  }
  return new GoogleGenerativeAI(apiKey);
}

// 生成图片
export async function generateImage(type: ImageType): Promise<string> {
  const genAI = getGeminiClient();
  const model = genAI.getGenerativeModel({
    model: 'gemini-3-pro-image-preview',
    generationConfig: {
      responseModalities: ['Text', 'Image'],
    } as GenerationConfig,
  });

  const basePrompt = getRandomPrompt(type);
  // 添加儿童画风格要求
  const prompt = `${basePrompt}.

Style requirements:
- Children's drawing style / simple cartoon illustration
- Clean lines, minimal details, simple shapes
- Bright but not overwhelming colors
- Flat design with basic shading
- Focus on main subject, remove complex background elements
- Like a children's book illustration or simple coloring book page

Technical requirements:
- Aspect ratio: 16:9 (widescreen)
- NO text, NO letters, NO words, NO numbers in the image
- Pure visual illustration only
- Keep composition simple and uncluttered
- Use 3-5 main elements maximum`;

  const response = await model.generateContent(prompt);
  const result = response.response;

  // 从响应中提取图片
  for (const part of result.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      // 返回 base64 图片数据
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }

  throw new Error('未能生成图片');
}

// AI 评分
export async function evaluateWriting(
  imageType: ImageType,
  content: string
): Promise<EvaluationResult> {
  const genAI = getGeminiClient();
  const model = genAI.getGenerativeModel({
    model: 'gemini-3-pro-preview',
    generationConfig: {
      responseMimeType: 'application/json',
    },
  });

  const typeLabel = IMAGE_TYPE_LABELS[imageType];
  const userPrompt = getEvaluationUserPrompt(typeLabel, content);

  const response = await model.generateContent([
    { text: EVALUATION_SYSTEM_PROMPT },
    { text: userPrompt },
  ]);

  const text = response.response.text();

  try {
    const result = JSON.parse(text) as EvaluationResult;
    return result;
  } catch {
    throw new Error('评分结果解析失败');
  }
}
