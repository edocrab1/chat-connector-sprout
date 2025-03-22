
import React from 'react';
import { cn } from '@/lib/utils';
import Avatar from './Avatar';
import { Check, CheckCheck } from 'lucide-react';

export interface MessageProps {
  id: string;
  content: string;
  sender: 'user' | 'bot' | string;
  timestamp: Date;
  avatar?: string;
  username?: string;
  status?: 'sent' | 'delivered' | 'read';
  isNew?: boolean;
  replyTo?: {
    id: string;
    content: string;
    username: string;
  };
  reactions?: {
    emoji: string;
    count: number;
  }[];
}

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const Message: React.FC<MessageProps> = ({
  content,
  sender,
  timestamp,
  avatar,
  username = sender,
  status = 'sent',
  isNew = false,
  replyTo,
  reactions = [],
}) => {
  const isCurrentUser = sender === 'user';
  const avatarColor = username ? username.charCodeAt(0) % 360 : 0;
  
  return (
    <div
      className={cn(
        'flex gap-2 group mb-1 animate-fade-in opacity-0 relative',
        isCurrentUser ? 'justify-end' : 'justify-start'
      )}
      style={{ animationDelay: isNew ? '0ms' : '0ms' }}
    >
      {!isCurrentUser && (
        <div className="flex flex-col items-center mt-auto">
          <Avatar 
            src={avatar} 
            fallback={username?.charAt(0).toUpperCase()} 
            size="sm" 
            className="mb-1" 
            color={`hsl(${avatarColor}, 70%, 50%)`}
          />
        </div>
      )}
      
      <div className="flex flex-col max-w-[75%]">
        {/* Username for non-current user */}
        {!isCurrentUser && (
          <span className="text-xs font-medium text-blue-500 mb-0.5 ml-1">
            {username}
          </span>
        )}
        
        {/* Reply message if exists */}
        {replyTo && (
          <div className={cn(
            "border-l-2 border-blue-400 pl-2 mb-1 text-xs text-muted-foreground bg-muted/30 p-1 rounded",
            isCurrentUser ? "mr-1" : "ml-1"
          )}>
            <div className="font-medium text-blue-500">{replyTo.username}</div>
            <div className="truncate">{replyTo.content}</div>
          </div>
        )}
        
        <div className={cn(
          "rounded-2xl px-3 py-2 shadow-sm relative",
          isCurrentUser 
            ? "bg-blue-500 text-white rounded-tr-sm" 
            : "bg-muted rounded-tl-sm"
        )}>
          <p className="text-sm whitespace-pre-wrap break-words">{content}</p>
          
          <div 
            className={cn(
              "flex items-center justify-end gap-1 ml-2 text-[10px]",
              isCurrentUser ? "text-blue-100" : "text-muted-foreground"
            )}
          >
            <span>{formatTime(timestamp)}</span>
            {isCurrentUser && (
              <span className="flex items-center">
                {status === 'sent' && <Check className="w-3 h-3" />}
                {status === 'delivered' && <CheckCheck className="w-3 h-3" />}
                {status === 'read' && (
                  <CheckCheck className="w-3 h-3 text-blue-300" />
                )}
              </span>
            )}
          </div>
        </div>
        
        {/* Reactions */}
        {reactions.length > 0 && (
          <div className={cn(
            "flex gap-1 mt-1", 
            isCurrentUser ? "justify-end mr-1" : "justify-start ml-1"
          )}>
            {reactions.map((reaction, index) => (
              <div key={index} className="bg-muted rounded-full px-1.5 py-0.5 text-xs flex items-center gap-1">
                <span>{reaction.emoji}</span>
                {reaction.count > 1 && <span className="text-muted-foreground">{reaction.count}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {isCurrentUser && (
        <Avatar 
          src={avatar}
          fallback="U" 
          size="sm" 
          className="mt-auto mb-1" 
        />
      )}
    </div>
  );
};

export default Message;
