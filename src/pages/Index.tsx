
import React, { useState, useEffect } from 'react';
import { ChatContainer, MessageProps } from '@/components/Chat';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code } from 'lucide-react';

const demoMessages: MessageProps[] = [
  {
    id: '1',
    content: 'Hi there! How can I help you today?',
    sender: 'bot',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    avatar: 'https://ui-avatars.com/api/?name=AI+Assistant&background=0D8ABC&color=fff',
  },
  {
    id: '2',
    content: 'I\'m looking for information about your chat component.',
    sender: 'user',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    avatar: 'https://ui-avatars.com/api/?name=User&background=8c8c8c&color=fff',
    status: 'read',
  },
  {
    id: '3',
    content: 'Of course! Our Chat component is designed to be easily integrated into any Next.js application. It features smooth animations, typing indicators, read receipts, and a responsive design.',
    sender: 'bot',
    timestamp: new Date(Date.now() - 1000 * 60 * 29),
    avatar: 'https://ui-avatars.com/api/?name=AI+Assistant&background=0D8ABC&color=fff',
  },
];

const Index = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<MessageProps[]>(demoMessages);

  // Handle new message from user
  const handleSendMessage = (message: string) => {
    // Start typing effect
    setIsTyping(true);
    
    // Simulate a response after a delay
    setTimeout(() => {
      setIsTyping(false);
      
      // Add bot response
      const newMessage: MessageProps = {
        id: `bot-${Date.now()}`,
        content: getAutoResponse(message),
        sender: 'bot',
        timestamp: new Date(),
        avatar: 'https://ui-avatars.com/api/?name=AI+Assistant&background=0D8ABC&color=fff',
        isNew: true,
      };
      
      setMessages(prev => [...prev, newMessage]);
    }, 1500);
  };

  // Simple auto-response function
  const getAutoResponse = (message: string): string => {
    const lowercaseMsg = message.toLowerCase();
    
    if (lowercaseMsg.includes('hello') || lowercaseMsg.includes('hi')) {
      return 'Hello! How can I assist you with the chat component today?';
    }
    
    if (lowercaseMsg.includes('feature') || lowercaseMsg.includes('can it do')) {
      return 'This chat component includes features like typing indicators, read receipts, message status updates, smooth animations, and responsive design. It\'s also customizable and easy to integrate!';
    }
    
    if (lowercaseMsg.includes('integrate') || lowercaseMsg.includes('next.js') || lowercaseMsg.includes('use')) {
      return 'To integrate this component into your Next.js app, simply import the ChatContainer component and customize it with your props. Check the Integration tab for code examples!';
    }
    
    return "Thank you for your message! This is a demo of the chat component. You can customize responses and behaviors when you integrate it into your own application.";
  };

  const integrationCode = `// Install via npm
npm install chat-component

// Import in your Next.js component
import { ChatContainer } from 'chat-component';

// Use in your component
export default function MyChat() {
  const handleSendMessage = (message) => {
    // Handle sending message to your backend
    console.log('Sending message:', message);
  };

  return (
    <ChatContainer
      initialMessages={[]}
      userAvatar="/user-avatar.png"
      botAvatar="/bot-avatar.png"
      onSendMessage={handleSendMessage}
      isTyping={false}
      height="600px"
    />
  );
}`;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-3">Chat Component</h1>
          <p className="text-lg text-muted-foreground">
            A beautiful, responsive chat component for Next.js applications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Chat Demo */}
          <div className="lg:col-span-7">
            <Card className="overflow-hidden border shadow-sm">
              <CardHeader className="p-4 bg-muted/20">
                <CardTitle className="text-xl">Live Demo</CardTitle>
                <CardDescription>
                  Try sending a message to see the component in action
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ChatContainer
                  initialMessages={messages}
                  userAvatar="https://ui-avatars.com/api/?name=User&background=8c8c8c&color=fff"
                  botAvatar="https://ui-avatars.com/api/?name=AI+Assistant&background=0D8ABC&color=fff"
                  onSendMessage={handleSendMessage}
                  isTyping={isTyping}
                  height="500px"
                  placeholder="Send a message to try it out..."
                  headerComponent={
                    <div className="p-3 flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="font-medium">Chat Assistant</span>
                    </div>
                  }
                />
              </CardContent>
              <CardFooter className="p-4 bg-muted/10 text-sm text-muted-foreground">
                Features: typing indicators, read receipts, message status
              </CardFooter>
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
                    <CardTitle>Key Features</CardTitle>
                    <CardDescription>
                      What makes this chat component special
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-medium">Beautiful Animations</h3>
                      <p className="text-sm text-muted-foreground">
                        Smooth entrance animations and transitions for messages
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">Read Receipts</h3>
                      <p className="text-sm text-muted-foreground">
                        Visual indicators for sent, delivered, and read messages
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">Typing Indicators</h3>
                      <p className="text-sm text-muted-foreground">
                        Shows when the other person is typing a message
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">Responsive Design</h3>
                      <p className="text-sm text-muted-foreground">
                        Works beautifully on all screen sizes
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">Easy Integration</h3>
                      <p className="text-sm text-muted-foreground">
                        Simple to integrate into any Next.js application
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
