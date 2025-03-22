
import React, { useState } from 'react';
import { Smile } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import EmojiSearch from './EmojiSearch';
import FrequentEmojis from './FrequentEmojis';
import SearchResults from './SearchResults';
import EmojiCategory from './EmojiCategory';
import { emojiCategories, frequentEmojis } from './data';

export interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  triggerClassName?: string;
  contentClassName?: string;
  disabled?: boolean;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({
  onEmojiSelect,
  triggerClassName,
  contentClassName,
  disabled = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredEmojis = searchQuery
    ? emojiCategories.flatMap(category => 
        category.emojis.filter(emoji => 
          emoji.includes(searchQuery) || 
          (category.name && category.name.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      )
    : [];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon"
          disabled={disabled}
          className={cn(
            "p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors",
            triggerClassName
          )}
        >
          <Smile className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        align="end" 
        alignOffset={-40}
        sideOffset={16}
        className={cn(
          "w-[320px] p-0 shadow-lg rounded-lg border-muted bg-popover/95 backdrop-blur-sm",
          contentClassName
        )}
      >
        <div className="border-b border-border/50">
          <EmojiSearch 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />
          
          {!searchQuery && (
            <FrequentEmojis 
              emojis={frequentEmojis} 
              onEmojiSelect={onEmojiSelect} 
            />
          )}
        </div>

        {searchQuery ? (
          <SearchResults 
            emojis={filteredEmojis} 
            onEmojiSelect={onEmojiSelect} 
          />
        ) : (
          <Tabs defaultValue="recent">
            <TabsList className="flex justify-start px-3 py-2 bg-transparent border-b border-border/50 h-auto">
              {emojiCategories.slice(0, 6).map((category) => (
                <TabsTrigger 
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground p-2 h-8 w-8"
                >
                  {category.icon || category.id.charAt(0).toUpperCase()}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {emojiCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="m-0">
                <EmojiCategory 
                  category={category} 
                  onEmojiSelect={onEmojiSelect} 
                />
              </TabsContent>
            ))}
          </Tabs>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
