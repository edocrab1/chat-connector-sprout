
import React from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmojiSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const EmojiSearch: React.FC<EmojiSearchProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
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
  );
};

export default EmojiSearch;
