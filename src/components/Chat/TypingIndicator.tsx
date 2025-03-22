
import React from 'react';
import { cn } from '@/lib/utils';
import Avatar from './Avatar';

interface TypingIndicatorProps {
  className?: string;
  username?: string;
  avatar?: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ 
  className,
  username = "User",
  avatar
}) => {
  return (
    <div className={cn('flex items-start gap-2', className)}>
      <Avatar 
        src={avatar} 
        fallback={username.charAt(0)} 
        size="sm" 
      />
      
      <div className="bg-muted py-2 px-3 rounded-2xl flex items-center">
        <div className="text-xs text-muted-foreground mr-1">{username} is typing</div>
        <div className="flex space-x-1">
          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-typing-dot-1"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-typing-dot-2"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-typing-dot-3"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
