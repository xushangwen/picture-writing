'use client';

import { motion } from 'framer-motion';
import { Send, Loader2, PenLine } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WritingAreaProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  disabled?: boolean;
  maxLength?: number;
}

export function WritingArea({
  value,
  onChange,
  onSubmit,
  isSubmitting,
  disabled,
  maxLength = 200,
}: WritingAreaProps) {
  const charCount = value.length;
  const canSubmit = charCount >= 5 && !isSubmitting && !disabled;
  const progress = Math.min((charCount / maxLength) * 100, 100);

  return (
    <div className="w-full relative">
      <div className="bg-card rounded-3xl shadow-soft-lg border border-border/50 overflow-hidden transition-shadow hover:shadow-xl">
        <div className="p-6 pb-2">
          <div className="flex items-center gap-2 mb-4 text-muted-foreground">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <PenLine className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-medium">看图写话</span>
          </div>
          
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled || isSubmitting}
            maxLength={maxLength}
            placeholder={disabled ? "请先生成一张图片..." : "在这里写下你看到的故事...\n\n提示：\n1. 图片里有谁？\n2. 他们在做什么？\n3. 他们的心情怎么样？"}
            className={cn(
              "w-full min-h-[240px] p-0 text-lg leading-relaxed resize-none",
              "bg-transparent border-none outline-none",
              "placeholder:text-muted-foreground/40",
              "disabled:cursor-not-allowed"
            )}
          />
        </div>

        {/* 底部工具栏 */}
        <div className="px-6 py-4 bg-muted/30 border-t border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* 环形进度指示 */}
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
               <div className="w-16 h-1.5 bg-muted-foreground/10 rounded-full overflow-hidden">
                 <motion.div 
                   className={cn("h-full rounded-full", charCount >= maxLength ? "bg-red-500" : "bg-primary")}
                   initial={{ width: 0 }}
                   animate={{ width: `${progress}%` }}
                 />
               </div>
               <span className="font-din">{charCount}/{maxLength}</span>
            </div>
          </div>

          <motion.button
            onClick={onSubmit}
            disabled={!canSubmit}
            whileHover={{ scale: canSubmit ? 1.02 : 1 }}
            whileTap={{ scale: canSubmit ? 0.98 : 1 }}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all",
              canSubmit
                ? "bg-primary text-white shadow-lg shadow-primary/25 hover:shadow-primary/40"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                正在评分...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                提交评分
              </>
            )}
          </motion.button>
        </div>
      </div>
      
      {/* 装饰性光晕 */}
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 via-violet-500/5 to-amber-500/5 blur-3xl -z-10 opacity-50 pointer-events-none" />
    </div>
  );
}
