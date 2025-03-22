
import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { MessageProps } from './Message';
import { v4 as uuidv4 } from 'uuid';

export interface ChatContainerProps {
  initialMessages?: MessageProps[];
  userAvatar?: string;
  botAvatar?: string;
  onSendMessage?: (message: string) => void;
  onReceiveMessage?: (message: MessageProps) => void;
  isTyping?: boolean;
  typingUser?: string;
  typingAvatar?: string;
  height?: string;
  className?: string;
  headerComponent?: React.ReactNode;
  footerComponent?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  currentUser?: {
    id: string;
    username: string;
    avatar?: string;
  };
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  initialMessages = [],
  userAvatar,
  botAvatar,
  onSendMessage,
  onReceiveMessage,
  isTyping = false,
  typingUser = "User",
  typingAvatar,
  height = '500px',
  className,
  headerComponent,
  footerComponent,
  placeholder,
  disabled = false,
  currentUser = { id: 'user', username: 'You' },
}) => {
  const [messages, setMessages] = useState<MessageProps[]>(initialMessages);

  // Handle sending a new message
  const handleSendMessage = useCallback((content: string) => {
    if (!content.trim()) return;
    
    const newMessage: MessageProps = {
      id: uuidv4(),
      content,
      sender: currentUser.id,
      username: currentUser.username,
      timestamp: new Date(),
      avatar: currentUser.avatar || userAvatar,
      status: 'sent',
      isNew: true,
    };
    
    setMessages((prev) => [...prev, newMessage]);
    
    // Call the external handler if provided
    if (onSendMessage) {
      onSendMessage(content);
    }
  }, [onSendMessage, userAvatar, currentUser]);

  // Update message status (for demo purposes)
  useEffect(() => {
    const lastUserMessage = [...messages].reverse().find(m => m.sender === currentUser.id && m.status === 'sent');
    
    if (lastUserMessage) {
      const deliveredTimeoutId = setTimeout(() => {
        setMessages(prev => 
          prev.map(m => 
            m.id === lastUserMessage.id ? { ...m, status: 'delivered' } : m
          )
        );
        
        const readTimeoutId = setTimeout(() => {
          setMessages(prev => 
            prev.map(m => 
              m.id === lastUserMessage.id ? { ...m, status: 'read' } : m
            )
          );
        }, 1000);
        
        return () => clearTimeout(readTimeoutId);
      }, 500);
      
      return () => clearTimeout(deliveredTimeoutId);
    }
  }, [messages, currentUser.id]);

  return (
    <div 
      className={cn(
        'flex flex-col overflow-hidden rounded-lg shadow-sm border bg-card',
        className
      )}
      style={{ height }}
    >
      {headerComponent && (
        <div className="border-b bg-card">
          {headerComponent}
        </div>
      )}
      
      <MessageList 
        messages={messages} 
        isTyping={isTyping} 
      />
      
      <MessageInput 
        onSendMessage={handleSendMessage}
        disabled={disabled}
        placeholder={placeholder}
      />
      
      {footerComponent && (
        <div className="border-t bg-muted/20">
          {footerComponent}
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
