
import React from 'react';
import { cn } from '@/lib/utils';
import Avatar from './Avatar';

export interface MessageProps {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  avatar?: string;
  status?: 'sent' | 'delivered' | 'read';
  isNew?: boolean;
}

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const Message: React.FC<MessageProps> = ({
  content,
  sender,
  timestamp,
  avatar,
  status = 'sent',
  isNew = false,
}) => {
  return (
    <div
      className={cn(
        'flex gap-2 items-end mb-4 animate-fade-in opacity-0',
        sender === 'user' ? 'justify-end' : 'justify-start'
      )}
      style={{ animationDelay: isNew ? '0ms' : '0ms' }}
    >
      {sender === 'bot' && (
        <Avatar 
          src={avatar} 
          fallback="B" 
          size="sm" 
          className="mb-1" 
        />
      )}
      
      <div className={cn(sender === 'user' ? 'user-message' : 'bot-message')}>
        <p className="text-sm whitespace-pre-wrap break-words">{content}</p>
        <div 
          className={cn(
            "flex items-center justify-end gap-1 mt-1 text-[10px]",
            sender === 'user' ? 'text-muted-foreground' : 'text-muted-foreground'
          )}
        >
          <span>{formatTime(timestamp)}</span>
          {sender === 'user' && (
            <span>
              {status === 'sent' && '✓'}
              {status === 'delivered' && '✓✓'}
              {status === 'read' && (
                <span className="text-blue-500">✓✓</span>
              )}
            </span>
          )}
        </div>
      </div>
      
      {sender === 'user' && (
        <Avatar 
          src={avatar}
          fallback="U" 
          size="sm" 
          className="mb-1" 
        />
      )}
    </div>
  );
};

export default Message;
