
import React, { useState, useEffect } from 'react';
import { ChatContainer, MessageProps } from '@/components/Chat';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Search, Menu } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

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

// Create Telegram-style group chat messages
const telegramStyleMessages: MessageProps[] = [
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
  const [messages, setMessages] = useState<MessageProps[]>(telegramStyleMessages);
  const currentUser = users[6]; // "You"

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

  const integrationCode = `// Install via npm
npm install chat-component

// Import in your Next.js component
import { ChatContainer } from 'chat-component';

// Use in your component
export default function GroupChat() {
  const currentUser = {
    id: 'user-123',
    username: 'CurrentUser',
    avatar: '/user-avatar.png'
  };

  const handleSendMessage = (message) => {
    // Send message to your backend
    api.sendMessage(currentUser.id, message);
  };

  return (
    <ChatContainer
      initialMessages={messages}
      currentUser={currentUser}
      onSendMessage={handleSendMessage}
      isTyping={isTyping}
      typingUser="Maria"
      typingAvatar="/maria-avatar.png"
      height="600px"
      placeholder="Message"
      headerComponent={<GroupChatHeader name="Crypto Talk" members={42} />}
    />
  );
}`;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-3">Telegram-style Group Chat</h1>
          <p className="text-lg text-muted-foreground">
            A beautiful, responsive chat component for Next.js applications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Chat Demo */}
          <div className="lg:col-span-7">
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
                  <Search className="w-5 h-5" />
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

          {/* Features & Integration */}
          <div className="lg:col-span-5">
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="integration">Integration</TabsTrigger>
              </TabsList>
              
              <TabsContent value="features">
                <Card>
                  <CardHeader>
                    <CardTitle>Telegram-Style Features</CardTitle>
                    <CardDescription>
                      What makes this chat component special
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-medium">Group Chat Support</h3>
                      <p className="text-sm text-muted-foreground">
                        Multiple users with distinct identities and avatars
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">Message Replies</h3>
                      <p className="text-sm text-muted-foreground">
                        Reply to specific messages in the conversation
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">Reactions</h3>
                      <p className="text-sm text-muted-foreground">
                        React to messages with emojis
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">Typing Indicators</h3>
                      <p className="text-sm text-muted-foreground">
                        Shows when other users are typing
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">Date Separators</h3>
                      <p className="text-sm text-muted-foreground">
                        Messages are grouped by date
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="integration">
                <Card>
                  <CardHeader>
                    <CardTitle>Integration Code</CardTitle>
                    <CardDescription>
                      How to use this component in your Next.js app
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative bg-muted rounded-md p-4 overflow-x-auto">
                      <pre className="text-sm font-mono whitespace-pre text-left">
                        {integrationCode}
                      </pre>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="absolute top-2 right-2"
                        onClick={() => {
                          navigator.clipboard.writeText(integrationCode);
                        }}
                      >
                        <Code className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">
                      View Documentation
                    </Button>
                    <Button>
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
