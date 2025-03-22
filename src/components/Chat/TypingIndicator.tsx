
import React from 'react';
import { cn } from '@/lib/utils';

interface TypingIndicatorProps {
  className?: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ className }) => {
  return (
    <div className={cn('flex items-center p-2 space-x-1', className)}>
      <div className="text-xs text-muted-foreground mr-2">Typing</div>
      <div className="flex space-x-1">
        <div className="w-2 h-2 rounded-full bg-muted-foreground animate-typing-dot-1"></div>
        <div className="w-2 h-2 rounded-full bg-muted-foreground animate-typing-dot-2"></div>
        <div className="w-2 h-2 rounded-full bg-muted-foreground animate-typing-dot-3"></div>
      </div>
    </div>
  );
};

export default TypingIndicator;
