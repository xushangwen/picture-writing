// 图片类型
export type ImageType = 'person' | 'object' | 'event' | 'scenery';

// 图片类型中文映射
export const IMAGE_TYPE_LABELS: Record<ImageType, string> = {
  person: '写人',
  object: '写物',
  event: '写事',
  scenery: '写景',
};

// 评分维度
export interface ScoreDimensions {
  content: number;      // 内容完整 30%
  fluency: number;      // 语句通顺 25%
  imagination: number;  // 想象合理 20%
  vocabulary: number;   // 用词准确 15%
  punctuation: number;  // 标点正确 10%
}

// 评分结果
export interface EvaluationResult {
  score: number;           // 总分 0-100
  stars: number;           // 星级 1-5
  dimensions: ScoreDimensions;
  highlights: string[];    // 亮点
  suggestions: string[];   // 建议
  sampleText: string;      // 范文参考
}

// 练习记录
export interface PracticeRecord {
  id: string;
  imageUrl: string;
  imageType: ImageType;
  content: string;
  evaluation: EvaluationResult;
  createdAt: Date;
}

// 应用状态
export interface AppState {
  currentImage: string | null;
  currentImageType: ImageType;
  isGeneratingImage: boolean;
  content: string;
  evaluation: EvaluationResult | null;
  isEvaluating: boolean;
  history: PracticeRecord[];
}
