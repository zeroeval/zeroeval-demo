import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ChatHeader() {
  return (
    <div className="px-6 py-4 bg-white border-b">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 border-2 border-primary/10">
          <AvatarImage src="/agent-avatar.svg" alt="Customer Support Agent" />
          <AvatarFallback>CS</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="font-semibold text-sm">Customer Support Agent</h3>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <p className="text-muted-foreground text-xs font-medium">Online</p>
          </div>
        </div>
      </div>
    </div>
  );
}
