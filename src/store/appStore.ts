import { create } from 'zustand';
import { ImageType, EvaluationResult, PracticeRecord } from '@/types';

interface AppStore {
  // 状态
  currentImage: string | null;
  currentImageType: ImageType;
  isGeneratingImage: boolean;
  content: string;
  evaluation: EvaluationResult | null;
  isEvaluating: boolean;
  history: PracticeRecord[];

  // 操作
  setCurrentImage: (image: string | null) => void;
  setCurrentImageType: (type: ImageType) => void;
  setIsGeneratingImage: (loading: boolean) => void;
  setContent: (content: string) => void;
  setEvaluation: (evaluation: EvaluationResult | null) => void;
  setIsEvaluating: (loading: boolean) => void;
  addToHistory: (record: PracticeRecord) => void;
  reset: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  // 初始状态
  currentImage: null,
  currentImageType: 'person',
  isGeneratingImage: false,
  content: '',
  evaluation: null,
  isEvaluating: false,
  history: [],

  // 操作方法
  setCurrentImage: (image) => set({ currentImage: image }),
  setCurrentImageType: (type) => set({ currentImageType: type, evaluation: null }),
  setIsGeneratingImage: (loading) => set({ isGeneratingImage: loading }),
  setContent: (content) => set({ content }),
  setEvaluation: (evaluation) => set({ evaluation }),
  setIsEvaluating: (loading) => set({ isEvaluating: loading }),
  addToHistory: (record) =>
    set((state) => ({ history: [record, ...state.history] })),
  reset: () =>
    set({
      currentImage: null,
      content: '',
      evaluation: null,
    }),
}));
