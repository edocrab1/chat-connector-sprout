
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Message, { MessageProps } from './Message';
import TypingIndicator from './TypingIndicator';

interface MessageListProps {
  messages: MessageProps[];
  isTyping?: boolean;
  className?: string;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  isTyping = false,
  className,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change or when typing
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div 
      className={cn(
        'flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent',
        className
      )}
    >
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
          <p>No messages yet</p>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <Message key={message.id} {...message} />
          ))}
        </>
      )}
      
      {isTyping && (
        <div className="flex items-start">
          <TypingIndicator />
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
