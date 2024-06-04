import { Message, UserData } from "@/data/chats";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React, { useEffect } from "react";
import { MessageType, RoomType } from "@/app/types/ChatType";
import { UserType } from "@/app/types/UserType";
import { DefaultALMUser } from "@/app/types/ChatType";
import useWebSocket, { ReadyState } from "react-use-websocket";

interface ChatProps {
  selectedRoom: RoomType;
  isMobile: boolean;
  me: UserType;
}

export function Chat({ selectedRoom, isMobile, me }: ChatProps) {
  const [realTimeMessages, setRealTimeMessages] = React.useState<MessageType[]>(
    selectedRoom?.messages ?? []
  );

  const isPrompted = selectedRoom?.participants?.some((participant) => participant.is_staff) || false;

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    "ws://localhost:8000/ws/" + selectedRoom.id + "/",
    {
      share: false,
      shouldReconnect: () => true,
    }
  );

  useEffect(() => {
    console.log("Connection state changed", readyState);
    console.log("Users : ", selectedRoom.participants);
    console.log("Is Prompted : ", isPrompted);
    setRealTimeMessages(selectedRoom?.messages ?? []);
  }, [readyState, selectedRoom, isPrompted]);

  useEffect(() => {
    if (
      lastJsonMessage &&
      typeof lastJsonMessage === "object" &&
      "user" in lastJsonMessage &&
      "room" in lastJsonMessage &&
      "message" in lastJsonMessage &&
      "read_by" in lastJsonMessage
    ) {
      const message: MessageType = {
        user: lastJsonMessage.user as UserType,
        room: lastJsonMessage.room as string,
        content: lastJsonMessage.message as string,
        read_by: [lastJsonMessage.user]  as number[],
      };

      setRealTimeMessages((realTimeMessages) => [...realTimeMessages, message]);
    }
  }, [lastJsonMessage]);

  const sendMessage = (newMessage: MessageType, user: UserType) => {
    sendJsonMessage({
      event: "chat_message",
      data: newMessage,
    });
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar selectedRoom={selectedRoom} />

      <ChatList
        messages={realTimeMessages}
        selectedRoom={selectedRoom}
        sendMessage={sendMessage}
        isMobile={isMobile}
        me={me}
        isPrompted = {isPrompted}
      />
    </div>
  );
}
