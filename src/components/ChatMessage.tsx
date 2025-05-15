"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";

type ChatMessageProps = {
  content: string;
  isUser: boolean;
  timestamp: string;
};

export function ChatMessage({ content, isUser, timestamp }: ChatMessageProps) {
  const [rating, setRating] = useState<"up" | "down" | null>(null);

  return (
    <div
      className={cn(
        "flex w-full gap-3 mb-6 group",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar className="h-9 w-9 flex-shrink-0">
        <AvatarImage src={isUser ? "/user-avatar.svg" : "/agent-avatar.svg"} />
        <AvatarFallback>{isUser ? "U" : "A"}</AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "flex flex-col max-w-[75%]",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "rounded-lg px-4 py-2.5",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-white text-foreground"
          )}
        >
          <p className="text-sm">{content}</p>
        </div>
        <div
          className={cn(
            "flex items-center mt-1.5 relative w-full",
            !isUser && "justify-between"
          )}
        >
          <span className="text-xs text-muted-foreground">{timestamp}</span>

          {!isUser && (
            <div className="flex items-center gap-1">
              <button
                className={cn(
                  "flex items-center justify-center h-5 w-5 rounded-full transition-colors",
                  rating === "up"
                    ? "text-green-600 bg-green-50"
                    : "text-gray-400 hover:text-green-600 hover:bg-green-50"
                )}
                onClick={() =>
                  setRating((prev) => (prev === "up" ? null : "up"))
                }
              >
                <ThumbsUp
                  className="h-3 w-3"
                  fill={rating === "up" ? "currentColor" : "none"}
                />
              </button>
              <button
                className={cn(
                  "flex items-center justify-center h-5 w-5 rounded-full transition-colors",
                  rating === "down"
                    ? "text-red-600 bg-red-50"
                    : "text-gray-400 hover:text-red-600 hover:bg-red-50"
                )}
                onClick={() =>
                  setRating((prev) => (prev === "down" ? null : "down"))
                }
              >
                <ThumbsDown
                  className="h-3 w-3"
                  fill={rating === "down" ? "currentColor" : "none"}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
