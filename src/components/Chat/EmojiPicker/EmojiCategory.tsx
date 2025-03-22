
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export interface EmojiCategoryData {
  id: string;
  name?: string;
  icon?: React.ReactNode;
  emojis: string[];
}

interface EmojiCategoryProps {
  category: EmojiCategoryData;
  onEmojiSelect: (emoji: string) => void;
}

const EmojiCategory: React.FC<EmojiCategoryProps> = ({
  category,
  onEmojiSelect,
}) => {
  return (
    <>
      {category.name && (
        <div className="px-3 py-2 text-xs text-muted-foreground flex justify-between items-center">
          <span>{category.name}</span>
        </div>
      )}
      <ScrollArea className="h-[260px]">
        <div className="p-3 grid grid-cols-8 gap-1">
          {category.emojis.map((emoji, index) => (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-xl p-0"
              onClick={() => onEmojiSelect(emoji)}
            >
              {emoji}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </>
  );
};

export default EmojiCategory;
