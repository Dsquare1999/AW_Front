"use client";
import Cookies from "js-cookie";
import { userData } from "@/data/chats";
import React, { useCallback, useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { Sidebar } from "./sidebar";
import { Chat } from "./chat";

import {
  useRetrieveRoomsQuery,
  useRetrieveMeQuery,
} from "@/redux/features/retrieveApiSlice";
import { RoomType, UserType, DefaultALMUser } from "@/app/types/ChatType";

interface ChatLayoutProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function ChatLayout({
  defaultLayout = [320, 480],
  defaultCollapsed = false,
  navCollapsedSize,
}: ChatLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [triggerQuery, setTriggerQuery] = useState<boolean>(true);
  const [me, setMe] = React.useState<UserType>(DefaultALMUser);
  const [selectedRoom, setSelectedRoom] = React.useState<RoomType | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const { data: rooms } = useRetrieveRoomsQuery(undefined, {
    pollingInterval: 5000,
    refetchOnMountOrArgChange: false,
    skip: !triggerQuery,
  });

  const { data: myData } = useRetrieveMeQuery();

  const chooseRoom = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    room: RoomType
  ) => {
    setSelectedRoom(room);
    setTriggerQuery(true);
  };

  useEffect(() => {
    if (myData) {
      setMe(myData);
    }
  }, [myData]);

  console.log("rooms", rooms);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <>
      {rooms === undefined ? (
        <div className="flex justify-center items-center text-[10px]">
          No discussion started yet
        </div>
      ) : (
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            Cookies.set(`react-resizable-panels:layout`, JSON.stringify(sizes));
          }}
          className="h-full items-stretch"
        >
          <ResizablePanel
            defaultSize={defaultLayout[0]}
            collapsedSize={navCollapsedSize}
            collapsible={true}
            minSize={isMobile ? 0 : 24}
            maxSize={isMobile ? 8 : 30}
            onCollapse={() => {
              setIsCollapsed(true);
              Cookies.set(
                `react-resizable-panels:collapsed`,
                JSON.stringify(true)
              );
            }}
            // onExpand={() => {
            //   setIsCollapsed(false);
            //   Cookies.set(`react-resizable-panels:collapsed`, JSON.stringify(false));
            // }}
            className={cn(
              isCollapsed &&
                "min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out"
            )}
          >
            <Sidebar
              // isCollapsed={isCollapsed || isMobile}
              isCollapsed={isCollapsed}
              rooms={rooms.map((room: RoomType) => ({
                id: room.id,
                name: room.name,
                messages: room.messages ?? [],
                participants: room.participants,
                avatar: "/User1.png",
                variant: selectedRoom
                  ? selectedRoom.id === room.id
                    ? "secondary"
                    : "ghost"
                  : "ghost",
              }))}
              chooseRoom={chooseRoom}
              me={me}
              isMobile={isMobile}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
            {selectedRoom ? (
              <Chat selectedRoom={selectedRoom} isMobile={isMobile} me={me} />
            ) : (
              <div className="flex justify-center items-center">
                <p className="text-[10px] flex justify-center items-center">
                  Select a room to start chatting
                </p>
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </>
  );
}
