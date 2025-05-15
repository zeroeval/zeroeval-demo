import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatInput } from "@/components/ChatInput";
import { ChatMessage } from "@/components/ChatMessage";

const SAMPLE_MESSAGES = [
  {
    id: 1,
    content: "Hello! How can I help you today?",
    isUser: false,
    timestamp: "10:00 AM",
  },
  {
    id: 2,
    content: "I'm having an issue with my recent order. It hasn't arrived yet.",
    isUser: true,
    timestamp: "10:01 AM",
  },
  {
    id: 3,
    content:
      "I'm sorry to hear that. Could you please provide your order number so I can look into this for you?",
    isUser: false,
    timestamp: "10:02 AM",
  },
  {
    id: 4,
    content: "Sure, it's ORD-12345-6789",
    isUser: true,
    timestamp: "10:03 AM",
  },
  {
    id: 5,
    content:
      "Thank you. I can see your order was shipped on Monday and should arrive tomorrow. Would you like me to send you the tracking details?",
    isUser: false,
    timestamp: "10:05 AM",
  },
];

export function ChatContainer() {
  return (
    <Card className="w-full max-w-md h-[600px] flex flex-col overflow-hidden shadow-lg border-none rounded-xl bg-red-100 py-0">
      <ChatHeader />
      <ScrollArea className="flex-1 overflow-auto bg-slate-50">
        <div className="p-6 space-y-4">
          {SAMPLE_MESSAGES.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
        </div>
      </ScrollArea>
      <ChatInput />
    </Card>
  );
}
