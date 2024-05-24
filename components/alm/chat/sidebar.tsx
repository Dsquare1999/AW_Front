"use client";

import Link from "next/link";
import { MoreHorizontal, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Message } from "@/data/chats";
import clsx from "clsx";
import { RoomType } from "@/app/types/ChatType";
import { UserType } from "@/app/types/UserType";
import { useRetrieveRoomsQuery } from "@/redux/features/retrieveApiSlice";

interface SidebarProps {
  isCollapsed: boolean;
  rooms : RoomType[]
  me : UserType
  chooseRoom: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, room: RoomType) => void;
  isMobile: boolean;
}

export function Sidebar({rooms, isCollapsed, me, isMobile, chooseRoom }: SidebarProps) {

  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
    >
        <div className={clsx("flex  p-2 items-center", isCollapsed?'flex-col':'justify-between')}>
          <div className="flex gap-2 items-center text-md">
            <p className="font-medium">Chats</p>
            <span className="text-zinc-300">({rooms.length})</span>
          </div>

          <div className={clsx('flex', isCollapsed?'flex-row':'')}>
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9"
              )}
            >
              <MoreHorizontal size={20} />
            </Link>

            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9"
              )}
            >
              <SquarePen size={20} />
            </Link>
          </div>
        </div>
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">

        {rooms.map((room) => 
          isCollapsed ? (
          <TooltipProvider key={room.id}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <div
                    onClick={(e) => chooseRoom(e, room)}
                    className={cn(
                      buttonVariants({ variant: room.variant, size: "icon" }),
                      "h-11 w-11 md:h-16 md:w-16",
                      room.variant === "secondary" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage
                        src={room.avatar}
                        alt={room.avatar}
                        width={6}
                        height={6}
                        className="w-9 h-9 rounded-full"
                      />
                    </Avatar>{" "}
                    <span className="sr-only">{room.name}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {room.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
        ) : (
          <div
            key={room.id}
            className={cn(
              buttonVariants({ variant: room.variant, size: "icon" }),
              "h-11 w-11 md:h-16 md:w-16",
              room.variant === "secondary" &&
                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
            )}
          >
            <Avatar className="flex justify-center items-center">
              <AvatarImage
                src={room.avatar}
                alt={room.name}
                width={6}
                height={6}
                className="w-9 h-9 rounded-full "
              />
            </Avatar>
            <div className="flex flex-col max-w-28">
              <span className="text-xs">{room.name}</span>
              <span className="text-zinc-300 text-[10px] truncate ">
                {room.messages[room.messages.length - 1].user.id === me.id ? "You " : room.messages[room.messages.length - 1].user.first_name }
                : {room.messages[room.messages.length - 1].content}
              </span>
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}
