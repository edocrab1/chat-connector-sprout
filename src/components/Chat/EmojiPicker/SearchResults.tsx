
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SearchResultsProps {
  emojis: string[];
  onEmojiSelect: (emoji: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  emojis,
  onEmojiSelect,
}) => {
  return (
    <ScrollArea className="h-[320px]">
      <div className="p-3 grid grid-cols-8 gap-1">
        {emojis.length > 0 ? (
          emojis.map((emoji, index) => (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-xl"
              onClick={() => onEmojiSelect(emoji)}
            >
              {emoji}
            </Button>
          ))
        ) : (
          <div className="col-span-8 py-8 text-center text-muted-foreground">
            No emojis found
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default SearchResults;
