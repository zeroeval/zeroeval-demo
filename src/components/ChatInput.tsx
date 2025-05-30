"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";
import { Message } from "@/lib/types";

interface ChatInputProps {
  onSendMessage: (message: Message) => void;
  setIsLoading: (loading: boolean) => void;
  messages: Message[];
}

export function ChatInput({
  onSendMessage,
  setIsLoading,
  messages,
}: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim() || isSubmitting) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Add user message to chat
    onSendMessage(userMessage);

    // Clear input and set loading states
    setInputValue("");
    setIsSubmitting(true);
    setIsLoading(true);

    try {
      // Convert messages to the format expected by the API
      const apiMessages = messages
        .filter((msg) => msg.id !== "welcome") // Exclude welcome message
        .map((msg) => ({
          role: msg.isUser ? "user" : ("assistant" as const),
          content: msg.content,
        }));

      // Add the current user message
      apiMessages.push({
        role: "user" as const,
        content: userMessage.content,
      });

      // Call our API endpoint
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      // Add agent response to chat
      onSendMessage({
        id: Date.now().toString(),
        content: data.response,
        isUser: false,
        timestamp: data.timestamp,
        completion_id: data.completion_id,
      });
    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message
      onSendMessage({
        id: Date.now().toString(),
        content: "Sorry, I couldn't process your request. Please try again.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 px-6 py-4 border-t bg-white"
    >
      <Input
        placeholder="Type your message..."
        className="flex-1 focus-visible:ring-primary"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={isSubmitting}
      />
      <Button
        type="submit"
        size="icon"
        className="h-8 w-8 rounded-full shrink-0"
        disabled={isSubmitting}
      >
        <Send className="h-4 w-4" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
}
