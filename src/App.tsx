
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Check if running as Chrome extension
    if (typeof chrome !== 'undefined' && chrome.storage) {
      console.log('Running as Chrome extension');
      setInitialized(true);
    } else {
      console.log('Running as web application');
      setInitialized(true);
    }
  }, []);

  if (!initialized) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Index />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
