import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export function ChatInput() {
  return (
    <div className="flex items-center gap-3 px-6 py-4 border-t bg-white">
      <Input
        placeholder="Type your message..."
        className="flex-1 focus-visible:ring-primary"
      />
      <Button size="icon" className="h-8 w-8 rounded-full shrink-0">
        <Send className="h-4 w-4" />
        <span className="sr-only">Send message</span>
      </Button>
    </div>
  );
}
