
import React, { useState } from 'react';
import { Search, Clock, Heart, ThumbsUp, ThumbsDown, Smile, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Common emoji categories and emojis
const emojiCategories = [
  {
    id: 'recent',
    icon: <Clock className="h-4 w-4" />,
    emojis: ['👍', '😊', '❤️', '😢', '😎', '😂', '😍', '🤡', '👑']
  },
  {
    id: 'people',
    name: 'Emoji & People',
    emojis: [
      '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', 
      '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', 
      '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', 
      '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', 
      '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', 
      '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', 
      '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯',
      '😦', '😧', '😮', '😲', '😴', '🤤', '😪', '😵', '🤐', '🥴'
    ]
  },
  {
    id: 'nature',
    name: 'Animals & Nature',
    emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵']
  },
  {
    id: 'food',
    name: 'Food & Drink',
    emojis: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝']
  },
  {
    id: 'activities',
    name: 'Activities',
    emojis: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑']
  },
  {
    id: 'travel',
    name: 'Travel & Places',
    emojis: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🚚', '🚛', '🚜', '🛴', '🚲']
  },
  {
    id: 'objects',
    name: 'Objects',
    emojis: ['⌚', '📱', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️', '🗜️', '💽', '💾', '💿', '📀', '📼']
  },
  {
    id: 'symbols',
    name: 'Symbols',
    emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗']
  }
];

// Frequently used emojis for the quick access bar
const frequentEmojis = ['❤️', '👍', '👎', '😂', '😢', '😠', '🎉', '🔥', '👏'];

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  triggerClassName?: string;
  contentClassName?: string;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({
  onEmojiSelect,
  triggerClassName,
  contentClassName,
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
          <div className="flex items-center px-3 py-2 gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search emoji"
              className="flex-1 bg-transparent border-none outline-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={() => setSearchQuery('')}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          
          {!searchQuery && (
            <div className="flex items-center gap-1 px-2 py-2 overflow-x-auto scrollbar-hide">
              {frequentEmojis.map((emoji, index) => (
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
          )}
        </div>

        {searchQuery ? (
          <ScrollArea className="h-[320px]">
            <div className="p-3 grid grid-cols-8 gap-1">
              {filteredEmojis.length > 0 ? (
                filteredEmojis.map((emoji, index) => (
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
              </TabsContent>
            ))}
          </Tabs>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
