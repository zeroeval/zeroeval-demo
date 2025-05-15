"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatInput } from "@/components/ChatInput";
import { ChatMessage } from "@/components/ChatMessage";
import { Message } from "@/lib/types";
import { useRef, useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

// Initial welcome message
const initialMessages: Message[] = [
  {
    id: "welcome",
    content: "Hello! How can I help you today?",
    isUser: false,
    timestamp: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
];

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Add a new message to the chat
  const handleNewMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <Card className="w-full max-w-md h-[600px] flex flex-col overflow-hidden shadow-lg border-none rounded-xl bg-red-100 py-0">
      <ChatHeader />
      <ScrollArea className="flex-1 overflow-auto bg-slate-50">
        <div className="p-6 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isLoading && (
            <div className="flex items-center justify-start gap-2 text-muted-foreground animate-pulse">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Customer support is typing...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <ChatInput onSendMessage={handleNewMessage} setIsLoading={setIsLoading} />
    </Card>
  );
}
