
import React from 'react';
import { Button } from '@/components/ui/button';

interface FrequentEmojisProps {
  emojis: string[];
  onEmojiSelect: (emoji: string) => void;
}

const FrequentEmojis: React.FC<FrequentEmojisProps> = ({
  emojis,
  onEmojiSelect,
}) => {
  return (
    <div className="flex items-center gap-1 px-2 py-2 overflow-x-auto scrollbar-hide">
      {emojis.map((emoji, index) => (
        <Button
          key={index}
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-base"
          onClick={() => onEmojiSelect(emoji)}
        >
          {emoji}
        </Button>
      ))}
    </div>
  );
};

export default FrequentEmojis;
