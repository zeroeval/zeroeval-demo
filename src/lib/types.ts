export type Message = {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
  completion_id?: string;
}; 