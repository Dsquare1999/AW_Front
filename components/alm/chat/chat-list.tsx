import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import { Avatar, AvatarImage } from "../../ui/avatar";
import ChatBottombar from "./chat-bottombar";
import { AnimatePresence, motion } from "framer-motion";
import { MessageType, RoomType } from "@/app/types/ChatType";
import { UserType } from "@/app/types/UserType";
import { ScrollArea } from "@/components/ui/scroll-area";
import InlineMath  from 'katex';


interface ChatListProps {
  messages?: MessageType[];
  selectedRoom: RoomType;
  sendMessage: (newMessage: MessageType, me: UserType) => void;
  me: UserType;
  isMobile?: boolean;
  isPrompted?: boolean;
}

export function ChatList({
  messages,
  selectedRoom,
  sendMessage,
  me,
  isMobile,
  isPrompted
}: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  
  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <ScrollArea
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden max-h-[30vh] flex flex-col"
      >
        <AnimatePresence>
          {messages?.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                message.user.email !== me.email ? "items-start" : "items-end"
              )}
            >
              <div className="flex gap-3 items-center">
                {message.user.email !== me.email && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={'/User1.png'}
                      alt={message.user.first_name}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
                <span className=" bg-accent p-3 rounded-md max-w-xs text-xs">
                  {message.content}
                </span>
                {message.user.email === me.email && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={'/User1.png'}
                      alt={message.user.first_name}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </ScrollArea>
      <ChatBottombar sendMessage={sendMessage} selectedRoom={selectedRoom} me={me} isMobile={isMobile} isPrompted={isPrompted}/>
    </div>
  );
}
