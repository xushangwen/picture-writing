'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, ImageIcon, Loader2, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  onRefresh: () => void;
}

export function ImageDisplay({ imageUrl, isLoading, onRefresh }: ImageDisplayProps) {
  return (
    <div className="relative w-full aspect-[16/10] bg-muted/30 rounded-3xl overflow-hidden border border-border/50 group">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-card/50 backdrop-blur-sm z-20"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
              <Loader2 className="w-10 h-10 text-primary animate-spin relative z-10" />
            </div>
            <p className="mt-4 text-sm font-medium text-muted-foreground animate-pulse">AI 正在绘图...</p>
          </motion.div>
        ) : imageUrl ? (
          <motion.div
            key="image"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full h-full"
          >
            <Image
              src={imageUrl}
              alt="看图写话图片"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              unoptimized
              priority
            />
            {/* 渐变遮罩，保证文字可读性 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <motion.button
              onClick={onRefresh}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "absolute bottom-4 right-4 flex items-center gap-2",
                "px-4 py-2 bg-black/60 backdrop-blur-md rounded-full",
                "border border-white/10 shadow-lg",
                "text-sm font-medium text-white",
                "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
              )}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              换一张
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4 ring-8 ring-muted/30">
              <ImageIcon className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">准备好了吗？</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-6">
              点击下方按钮，AI 将为你生成一张独特的图片，开启你的创作之旅
            </p>
            <motion.button
              onClick={onRefresh}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "flex items-center gap-2.5 px-6 py-3",
                "bg-primary text-primary-foreground",
                "text-sm font-semibold rounded-full",
                "shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
              )}
            >
              <Sparkles className="w-4 h-4" />
              生成图片
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
