
import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, Mic, Image } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = 'Message',
  className,
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  }, [message]);

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "relative flex items-end gap-2 p-3 border-t bg-background/90 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          disabled={disabled}
        >
          <Paperclip className="w-5 h-5" />
        </button>
        
        <button
          type="button"
          className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          disabled={disabled}
        >
          <Image className="w-5 h-5" />
        </button>
      </div>
      
      <div className="relative flex-1 overflow-hidden">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className={cn(
            "w-full py-2 px-3 resize-none bg-muted/50 rounded-2xl focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all",
            "min-h-[40px] max-h-[150px] text-sm"
          )}
        />
      </div>
      
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          disabled={disabled}
        >
          <Smile className="w-5 h-5" />
        </button>
        
        {!message.trim() ? (
          <button
            type="button"
            className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            disabled={disabled}
          >
            <Mic className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className={cn(
              "p-2 rounded-full transition-all",
              message.trim() && !disabled 
                ? "bg-blue-500 text-white" 
                : "bg-muted text-muted-foreground"
            )}
          >
            <Send className="w-5 h-5" />
          </button>
        )}
      </div>
    </form>
  );
};

export default MessageInput;
