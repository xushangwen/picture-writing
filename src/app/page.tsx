'use client';

import { Navbar } from '@/components/Navbar';
import { useAppStore } from '@/store/appStore';
import { TypeSelector } from '@/components/TypeSelector';
import { ImageDisplay } from '@/components/ImageDisplay';
import { WritingArea } from '@/components/WritingArea';
import { ScorePanel } from '@/components/ScorePanel';
import { ImageType, EvaluationResult } from '@/types';
import { cn } from '@/lib/utils';
import { useCallback } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const {
    currentImage,
    currentImageType,
    isGeneratingImage,
    content,
    evaluation,
    isEvaluating,
    setCurrentImage,
    setCurrentImageType,
    setIsGeneratingImage,
    setContent,
    setEvaluation,
    setIsEvaluating,
    reset,
  } = useAppStore();

  const handleGenerateImage = useCallback(async () => {
    setIsGeneratingImage(true);
    setEvaluation(null);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: currentImageType }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '生成图片失败');
      }

      const data = await response.json();
      setCurrentImage(data.imageUrl);
    } catch (error) {
      console.error('生成图片失败:', error);
      alert(error instanceof Error ? error.message : '生成图片失败，请重试');
    } finally {
      setIsGeneratingImage(false);
    }
  }, [currentImageType, setCurrentImage, setIsGeneratingImage, setEvaluation]);

  const handleSubmit = useCallback(async () => {
    if (!currentImage || content.length < 5) return;

    setIsEvaluating(true);

    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageType: currentImageType,
          content,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '评分失败');
      }

      const data: EvaluationResult = await response.json();
      setEvaluation(data);
    } catch (error) {
      console.error('评分失败:', error);
      alert(error instanceof Error ? error.message : '评分失败，请重试');
    } finally {
      setIsEvaluating(false);
    }
  }, [currentImage, currentImageType, content, setEvaluation, setIsEvaluating]);

  const handleReset = useCallback(() => {
    reset();
    setContent('');
  }, [reset, setContent]);

  const handleTypeChange = useCallback(
    (type: ImageType) => {
      setCurrentImageType(type);
      setCurrentImage(null);
      setContent('');
      setEvaluation(null);
    },
    [setCurrentImageType, setCurrentImage, setContent, setEvaluation]
  );

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      <Navbar />

      <main className="container-custom py-8">
        <div className={cn(
          "grid gap-8 lg:gap-12",
          "grid-cols-1 lg:grid-cols-[42%_1fr] xl:grid-cols-[40%_1fr]",
          "items-start"
        )}>
          {/* 左侧：类型选择 & 图片展示 */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-24">
            <div className="space-y-2">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider pl-1">第一步：选择主题</h2>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <TypeSelector
                  value={currentImageType}
                  onChange={handleTypeChange}
                  disabled={isGeneratingImage || isEvaluating}
                />
              </motion.div>
            </div>

            <div className="space-y-2">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider pl-1">第二步：观察图片</h2>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <ImageDisplay
                  imageUrl={currentImage}
                  isLoading={isGeneratingImage}
                  onRefresh={handleGenerateImage}
                />
              </motion.div>
            </div>
          </div>

          {/* 右侧：写作 & 评分 */}
          <div className="flex flex-col gap-6 w-full max-w-3xl">
            <div className="space-y-2">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider pl-1">第三步：发挥想象</h2>
              {evaluation ? (
                <ScorePanel
                  evaluation={evaluation}
                  userContent={content}
                  onReset={handleReset}
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <WritingArea
                    value={content}
                    onChange={setContent}
                    onSubmit={handleSubmit}
                    isSubmitting={isEvaluating}
                    disabled={!currentImage}
                  />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
