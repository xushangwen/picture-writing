'use client';

import { motion } from 'framer-motion';
import { User, Flower2, CalendarHeart, Mountain } from 'lucide-react';
import { ImageType, IMAGE_TYPE_LABELS } from '@/types';
import { cn } from '@/lib/utils';

interface TypeSelectorProps {
  value: ImageType;
  onChange: (type: ImageType) => void;
  disabled?: boolean;
}

const typeConfig: Record<ImageType, { icon: React.ReactNode; color: string }> = {
  person: {
    icon: <User className="w-4 h-4" />,
    color: 'text-pink-500',
  },
  object: {
    icon: <Flower2 className="w-4 h-4" />,
    color: 'text-emerald-500',
  },
  event: {
    icon: <CalendarHeart className="w-4 h-4" />,
    color: 'text-amber-500',
  },
  scenery: {
    icon: <Mountain className="w-4 h-4" />,
    color: 'text-sky-500',
  },
};

const types: ImageType[] = ['person', 'object', 'event', 'scenery'];

export function TypeSelector({ value, onChange, disabled }: TypeSelectorProps) {
  return (
    <div className="bg-muted/30 p-1.5 rounded-2xl border border-border/50 flex flex-wrap sm:flex-nowrap gap-1 relative">
      {types.map((type) => {
        const config = typeConfig[type];
        const isActive = value === type;

        return (
          <button
            key={type}
            onClick={() => onChange(type)}
            disabled={disabled}
            className={cn(
              "relative flex-1 min-w-[80px] flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors z-10",
              isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground/80",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeType"
                className="absolute inset-0 bg-background shadow-sm rounded-xl border border-border/50"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className={cn("relative z-10 flex items-center gap-2", isActive && config.color)}>
              {config.icon}
              {IMAGE_TYPE_LABELS[type]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
