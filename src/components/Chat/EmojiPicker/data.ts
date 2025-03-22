
import React from 'react';
import { Clock, Heart } from 'lucide-react';
import { EmojiCategoryData } from './EmojiCategory';

// Common emoji categories and emojis
export const emojiCategories: EmojiCategoryData[] = [
  {
    id: 'recent',
    icon: React.createElement(Clock, { className: "h-4 w-4" }),
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
export const frequentEmojis = ['❤️', '👍', '👎', '😂', '😢', '😠', '🎉', '🔥', '👏'];
