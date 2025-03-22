import React, { useState, useEffect } from 'react';
import { ChatContainer, MessageProps } from '@/components/Chat';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Menu, Search } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';

// Generate some dummy users for the group chat
const users = [
  {
    id: 'user-1',
    username: 'Alex',
    avatar: 'https://ui-avatars.com/api/?name=Alex&background=5865F2&color=fff',
  },
  {
    id: 'user-2',
    username: 'Maria',
    avatar: 'https://ui-avatars.com/api/?name=Maria&background=ED4245&color=fff',
  },
  {
    id: 'user-3',
    username: 'PoocoinWhale',
    avatar: 'https://ui-avatars.com/api/?name=PW&background=FEE75C&color=000',
  },
  {
    id: 'user-4',
    username: 'Jase',
    avatar: 'https://ui-avatars.com/api/?name=Jase&background=57F287&color=fff',
  },
  {
    id: 'user-5',
    username: 'LT24756',
    avatar: 'https://ui-avatars.com/api/?name=LT&background=EB459E&color=fff',
  },
  {
    id: 'user-6',
    username: 'ABH',
    avatar: 'https://ui-avatars.com/api/?name=ABH&background=F57C00&color=fff',
  },
  {
    id: 'user-7',
    username: 'You',
    avatar: 'https://ui-avatars.com/api/?name=You&background=8c8c8c&color=fff',
  },
];

// Create Telegram-style group chat messages as default messages
const defaultMessages: MessageProps[] = [
  {
    id: '1',
    content: "That's was the screenshot I was sharing on X last night",
    sender: 'user-1',
    username: 'Alex',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    avatar: users[0].avatar,
    status: 'read',
  },
  {
    id: '2',
    content: "Nice I've never touched mine lmao",
    sender: 'user-3',
    username: 'PoocoinWhale',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    avatar: users[2].avatar,
  },
  {
    id: '3',
    content: "I've bought loads more, so cheap and if KAS goes off, it'll do well",
    sender: 'user-4',
    username: 'Jase',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    avatar: users[3].avatar,
    reactions: [
      { emoji: '👍', count: 2 }
    ]
  },
  {
    id: '4',
    content: "I have enough 😂",
    sender: 'user-6',
    username: 'ABH',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    avatar: users[5].avatar,
    replyTo: {
      id: '3',
      content: "I've bought loads more, so cheap and if KAS goes off, it'll do well",
      username: 'Jase'
    }
  },
  {
    id: '5',
    content: "You can never have enough! 😄",
    sender: 'user-1',
    username: 'Alex',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1),
    avatar: users[0].avatar,
    reactions: [
      { emoji: '🔥', count: 1 }
    ]
  },
  {
    id: '6',
    content: "Hard to follow Cradle AMA. Is the game ready? Seems like the most important thing for them to do is release the game",
    sender: 'user-5',
    username: 'LT24756',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    avatar: users[4].avatar,
  },
  {
    id: '7',
    content: "No, release streamble",
    sender: 'user-2',
    username: 'Maria',
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    avatar: users[1].avatar,
    replyTo: {
      id: '6',
      content: "Hard to follow Cradle AMA. Is the game ready?",
      username: 'LT24756'
    }
  },
];

const Index = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(users[1]);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const currentUser = users[6]; // "You"

  // Load messages from Chrome storage (if available)
  useEffect(() => {
    const loadMessages = async () => {
      // Check if running as Chrome extension
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.get('messages', (data) => {
          if (data.messages && data.messages.length > 0) {
            // Convert date strings back to Date objects
            const parsedMessages = data.messages.map((msg: any) => ({
              ...msg,
              timestamp: new Date(msg.timestamp),
              replyTo: msg.replyTo ? {
                ...msg.replyTo,
                timestamp: msg.replyTo.timestamp ? new Date(msg.replyTo.timestamp) : undefined
              } : undefined
            }));
            setMessages(parsedMessages);
          } else {
            // Use default messages if no stored messages
            setMessages(defaultMessages);
          }
        });
      } else {
        // When not running as extension, use default messages
        setMessages(defaultMessages);
      }
    };

    loadMessages();
  }, []);

  // Save messages to Chrome storage when they change
  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage && messages.length > 0) {
      chrome.storage.local.set({ messages });
    }
  }, [messages]);

  // Handle new message from user
  const handleSendMessage = (message: string) => {
    const newMessage: MessageProps = {
      id: uuidv4(),
      content: message,
      sender: currentUser.id,
      username: currentUser.username,
      timestamp: new Date(),
      avatar: currentUser.avatar,
      status: 'sent',
      isNew: true,
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate typing response after a delay
    setTimeout(() => {
      const respondingUser = users[Math.floor(Math.random() * (users.length - 1))];
      setTypingUser(respondingUser);
      setIsTyping(true);
      
      // Simulate a response after a delay
      setTimeout(() => {
        setIsTyping(false);
        
        // Add response
        const responseMessage: MessageProps = {
          id: uuidv4(),
          content: getAutoResponse(message, respondingUser.username),
          sender: respondingUser.id,
          username: respondingUser.username,
          timestamp: new Date(),
          avatar: respondingUser.avatar,
          isNew: true,
        };
        
        setMessages(prev => [...prev, responseMessage]);
      }, 2000 + Math.random() * 2000);
    }, 1000);
  };

  // Simple auto-response function
  const getAutoResponse = (message: string, username: string): string => {
    const lowercaseMsg = message.toLowerCase();
    const responses = [
      `Yeah, I agree with what you're saying about ${lowercaseMsg.split(' ').slice(-3).join(' ')}`,
      `Not sure I follow. Can you explain more?`,
      `I'm with ${username} on this one!`,
      `Interesting point. Have you considered the alternative?`,
      `Let's discuss this more later`,
      `👍 Good point`,
      `That's exactly what I was thinking`,
      `I have a different perspective on that`,
      `Thanks for sharing that!`,
      `Let me think about that for a bit...`,
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const clearMessages = () => {
    if (confirm('Are you sure you want to clear all messages?')) {
      setMessages([]);
      toast({
        title: "Chat cleared",
        description: "All messages have been removed",
      });
    }
  };

  return (
    <div className="container mx-auto p-2">
      <Card className="overflow-hidden border shadow-sm">
        <CardHeader className="p-3 bg-blue-500/90 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Menu className="w-5 h-5" />
              <div>
                <CardTitle className="text-lg font-medium">Crypto Talk</CardTitle>
                <CardDescription className="text-blue-100 text-xs">
                  42 members, 12 online
                </CardDescription>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:bg-blue-600/50"
                onClick={clearMessages}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
              </Button>
              <Search className="w-5 h-5" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ChatContainer
            initialMessages={messages}
            currentUser={currentUser}
            onSendMessage={handleSendMessage}
            isTyping={isTyping}
            typingUser={typingUser.username}
            typingAvatar={typingUser.avatar}
            height="500px"
            placeholder="Message"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
