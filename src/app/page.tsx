import { ChatContainer } from "@/components/ChatContainer";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-md">
        <ChatContainer />
      </div>
    </div>
  );
}
