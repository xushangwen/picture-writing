'use client';

import { motion } from 'framer-motion';
import { Star, ThumbsUp, Lightbulb, Sparkles, RotateCcw, Quote, CheckCircle2, ArrowRightCircle } from 'lucide-react';
import { EvaluationResult } from '@/types';
import { cn } from '@/lib/utils';

interface ScorePanelProps {
  evaluation: EvaluationResult;
  userContent: string;
  onReset: () => void;
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1.5 bg-card/50 px-3 py-1.5 rounded-full border border-border/50">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: i * 0.1, type: 'spring' }}
        >
          <Star
            className={cn(
              "w-5 h-5",
              i <= count ? "fill-amber-400 text-amber-400" : "text-muted-foreground/20 dark:text-muted-foreground/30"
            )}
          />
        </motion.div>
      ))}
    </div>
  );
}

const dimensionConfig = [
  { key: 'content', label: '内容完整', max: 30, color: 'bg-blue-500' },
  { key: 'fluency', label: '语句通顺', max: 25, color: 'bg-emerald-500' },
  { key: 'imagination', label: '想象合理', max: 20, color: 'bg-violet-500' },
  { key: 'vocabulary', label: '用词准确', max: 15, color: 'bg-pink-500' },
  { key: 'punctuation', label: '标点正确', max: 10, color: 'bg-amber-500' },
] as const;

function DimensionItem({
  label,
  score,
  maxScore,
  colorClass,
  delay,
}: {
  label: string;
  score: number;
  maxScore: number;
  colorClass: string;
  delay: number;
}) {
  const percentage = (score / maxScore) * 100;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs font-medium">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-foreground font-din">
          {score} <span className="text-muted-foreground/50 text-[10px]">/{maxScore}</span>
        </span>
      </div>
      <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          className={cn("h-full rounded-full", colorClass)}
        />
      </div>
    </div>
  );
}

export function ScorePanel({ evaluation, userContent, onReset }: ScorePanelProps) {
  const { score, stars, dimensions, highlights, suggestions, sampleText } = evaluation;

  const getScoreLevel = (s: number) => {
    if (s >= 85) return { label: '太棒了！', color: 'text-emerald-500', bg: 'bg-emerald-500/10' };
    if (s >= 70) return { label: '写得不错', color: 'text-blue-500', bg: 'bg-blue-500/10' };
    if (s >= 55) return { label: '继续加油', color: 'text-amber-500', bg: 'bg-amber-500/10' };
    return { label: '要努力哦', color: 'text-rose-500', bg: 'bg-rose-500/10' };
  };

  const level = getScoreLevel(score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-6"
    >
      {/* 核心分数卡片 */}
      <div className="bg-card rounded-3xl shadow-soft-lg border border-border/50 p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className="relative z-10 flex flex-col items-center">
           <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={cn("mb-4 px-4 py-1.5 rounded-full text-sm font-semibold", level.bg, level.color)}
          >
            {level.label}
          </motion.div>

          <div className="flex items-baseline justify-center gap-1 mb-6">
            <span className="font-din text-7xl font-bold tracking-tighter text-foreground">
              {score}
            </span>
            <span className="text-lg text-muted-foreground font-medium">分</span>
          </div>

          <Stars count={stars} />
        </div>
        
        {/* 背景装饰 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/5 blur-3xl rounded-full -z-0" />
      </div>

      {/* 详情 Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* 维度评分 */}
        <div className="bg-card rounded-2xl p-5 border border-border/50 shadow-sm space-y-4">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            得分详情
          </h4>
          <div className="space-y-4">
            {dimensionConfig.map((dim, index) => (
              <DimensionItem
                key={dim.key}
                label={dim.label}
                score={dimensions[dim.key]}
                maxScore={dim.max}
                colorClass={dim.color}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* 评价反馈 */}
        <div className="space-y-4">
           {/* 亮点 */}
           <div className="bg-emerald-100/50 dark:bg-emerald-500/10 rounded-2xl p-5 border border-emerald-200 dark:border-emerald-500/10">
              <h4 className="text-sm font-semibold text-emerald-800 dark:text-emerald-400 flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4" />
                亮点
              </h4>
              <ul className="space-y-2">
                {highlights.map((item, index) => (
                  <li key={index} className="text-sm text-emerald-900 dark:text-emerald-300 leading-relaxed pl-2 border-l-2 border-emerald-500/30">
                    {item}
                  </li>
                ))}
              </ul>
           </div>

           {/* 建议 */}
           <div className="bg-blue-100/50 dark:bg-blue-500/10 rounded-2xl p-5 border border-blue-200 dark:border-blue-500/10">
              <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-400 flex items-center gap-2 mb-3">
                <ArrowRightCircle className="w-4 h-4" />
                建议
              </h4>
              <ul className="space-y-2">
                {suggestions.map((item, index) => (
                  <li key={index} className="text-sm text-blue-900 dark:text-blue-300 leading-relaxed pl-2 border-l-2 border-blue-500/30">
                    {item}
                  </li>
                ))}
              </ul>
           </div>
        </div>
      </div>

      {/* 范文参考 */}
      <div className="bg-card rounded-3xl border border-border/50 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-muted/30 border-b border-border/50 flex items-center justify-between">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <Quote className="w-4 h-4 text-primary" />
            AI 范文
          </h4>
        </div>
        <div className="p-6">
          <p className="text-sm leading-7 text-foreground/80 whitespace-pre-wrap">
            {sampleText}
          </p>
        </div>
      </div>

      <motion.button
        onClick={onReset}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "w-full py-4 rounded-2xl font-semibold text-base",
          "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
          "flex items-center justify-center gap-2 transition-colors"
        )}
      >
        <RotateCcw className="w-4 h-4" />
        再练一次
      </motion.button>
    </motion.div>
  );
}
