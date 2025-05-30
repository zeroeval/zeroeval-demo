"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Message } from "@/lib/types";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";

type ChatMessageProps = {
  message: Message;
};

export function ChatMessage({ message }: ChatMessageProps) {
  const [rating, setRating] = useState<"up" | "down" | null>(null);
  const { content, isUser, timestamp, completion_id } = message;

  const submitFeedback = async (isPositive: boolean) => {
    if (!completion_id) {
      console.error("No completion_id available for this message");
      return;
    }

    try {
      const response = await fetch(
        `https://api.zeroeval.com/workspaces/${process.env.NEXT_PUBLIC_ZEROEVAL_WORKSPACE_ID}/tests/signals`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ZEROEVAL_API_KEY}`,
          },
          body: JSON.stringify({
            completion_id: completion_id,
            name: "Acceptance",
            value: isPositive ? "true" : "false",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to submit feedback: ${response.status}`);
      }

      console.log(
        `Feedback submitted: ${isPositive ? "positive" : "negative"}`
      );
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const handleThumbsUp = () => {
    const newRating = rating === "up" ? null : "up";
    setRating(newRating);

    if (newRating === "up") {
      submitFeedback(true);
    }
  };

  const handleThumbsDown = () => {
    const newRating = rating === "down" ? null : "down";
    setRating(newRating);

    if (newRating === "down") {
      submitFeedback(false);
    }
  };

  return (
    <div
      className={cn(
        "flex w-full gap-3 mb-6 group",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar className="h-9 w-9 flex-shrink-0">
        {isUser ? (
          <>
            <AvatarImage src="/user-avatar.svg" />
            <AvatarFallback>U</AvatarFallback>
          </>
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-primary/5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
              style={{ shapeRendering: "crispEdges" }}
            >
              {Array.from({ length: 9 }).map((_, i) => {
                // Each cell is 8×8 in a 3×3 grid within a 24×24 viewBox.
                const row = Math.floor(i / 3);
                const col = i % 3;
                const x = col * 8;
                const y = row * 8;

                // Cells 1, 2, 4, 6, 8, 9 are black; the rest are white.
                const cellNumber = i + 1;
                const blackSquares = [1, 2, 4, 6, 8, 9];
                const fillColor = blackSquares.includes(cellNumber)
                  ? "currentColor"
                  : "transparent";

                return (
                  <rect
                    key={i}
                    x={x}
                    y={y}
                    width={8}
                    height={8}
                    fill={fillColor}
                  />
                );
              })}
            </svg>
          </div>
        )}
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

          {!isUser && message.id !== "welcome" && (
            <div className="flex items-center gap-1">
              <button
                className={cn(
                  "flex items-center justify-center h-5 w-5 rounded-full transition-colors cursor-pointer",
                  rating === "up"
                    ? "text-green-600 bg-green-50"
                    : "text-gray-400 hover:text-green-600 hover:bg-green-50"
                )}
                onClick={handleThumbsUp}
              >
                <ThumbsUp
                  className="h-3 w-3"
                  fill={rating === "up" ? "currentColor" : "none"}
                />
              </button>
              <button
                className={cn(
                  "flex items-center justify-center h-5 w-5 rounded-full transition-colors cursor-pointer",
                  rating === "down"
                    ? "text-red-600 bg-red-50"
                    : "text-gray-400 hover:text-red-600 hover:bg-red-50"
                )}
                onClick={handleThumbsDown}
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
