
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

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups: { date: string; messages: MessageProps[] }[] = [];
    let currentDate = '';
    
    messages.forEach(message => {
      const messageDate = new Date(message.timestamp).toLocaleDateString();
      
      if (messageDate !== currentDate) {
        currentDate = messageDate;
        groups.push({
          date: messageDate,
          messages: [message]
        });
      } else {
        groups[groups.length - 1].messages.push(message);
      }
    });
    
    return groups;
  };

  const messageGroups = groupMessagesByDate();

  return (
    <div 
      className={cn(
        'flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent',
        className
      )}
    >
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
          <p>No messages yet</p>
        </div>
      ) : (
        <>
          {messageGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-1">
              <div className="flex justify-center mb-3 mt-3">
                <div className="bg-muted/50 text-muted-foreground text-xs px-2 py-1 rounded-md">
                  {new Date(group.date).toLocaleDateString(undefined, { 
                    month: 'short', 
                    day: 'numeric',
                    year: new Date().getFullYear() !== new Date(group.date).getFullYear() ? 'numeric' : undefined
                  })}
                </div>
              </div>
              
              {group.messages.map((message) => (
                <Message key={message.id} {...message} />
              ))}
            </div>
          ))}
        </>
      )}
      
      {isTyping && (
        <div className="flex items-start mt-1">
          <TypingIndicator />
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
