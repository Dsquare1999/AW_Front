"use client";

import AuthNavBar from "@/components/auth/auth-navbar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuShortcut,
} from "@/components/ui/context-menu";
import { Reorder } from "framer-motion";

import styles from "@/components/styles/alm.module.css";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import {
  useRetrieveBilanQuery,
  useRetrieveSpreadOperationsQuery,
  useRetrieveSwapOperationsQuery,
} from "@/redux/features/retrieveApiSlice";
import BondPortofolioPage from "@/components/alm/bonds/pages/BondPortofolioPage";
import { BondProp, BondPortofolioPageProps } from "../types/BondType";
import DisplayBondPortofolio from "@/components/alm/bonds/pages/DisplayBondPortofolio";
import BilanPage from "@/components/alm/bonds/pages/BilanPage";
import Sidebar from "@/components/common/Sidebar";
import ChatContainer from "@/components/alm/chat/chat-container";
import SpreadPage from "@/components/alm/spreads/pages/SpreadPage";
import SwapPage from "@/components/alm/swaps/pages/SwapPage";
import { SpreadType } from "../types/SpreadType";
import { SwapType } from "../types/SwapType";
import AlmFooter from "@/components/alm/AlmFooter";
import { BilanProps } from "../types/BilanType";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";

const ALMComponent = ({ item }: { item: string }) => {
  // ALM States
  const [activeBilan, setActiveBilan] = useState<BilanProps | undefined>(undefined);
  const [activePortofolio, setActivePortofolio] = useState<BondPortofolioPageProps | undefined>(undefined);
  const {
    data: bilans,
    isLoading: isBondLoading,
    isFetching: isBondFetching,
  } = useRetrieveBilanQuery();

  const {
    data: spreads,
    isLoading: isSpreadLoading,
    isFetching: isSpreadFetching,
  } = useRetrieveSpreadOperationsQuery();

  const {
    data: swaps,
    isLoading: isSwapLoading,
    isFetching: isSwapFetching,
  } = useRetrieveSwapOperationsQuery();

  useEffect(() => {
    bilans
      ? setActiveBilan(bilans.find((bilan) => bilan.is_active))
      : setActiveBilan(undefined);
    activeBilan
      ? setActivePortofolio(
          activeBilan.bondPortofolios.find((portofolio) => portofolio.is_active)
        )
      : setActivePortofolio(undefined);
  }, [activeBilan, bilans]);

  return (
    <>
      {item === "0" && (
        <section className="flex flex-col">
          <BondPortofolioPage
            bonds={activePortofolio ? activePortofolio.bonds : []}
          />
        </section>
      )}
      {item === "1" && (
        <section className="flex flex-col">
          <DisplayBondPortofolio
            portofolios={activeBilan ? activeBilan.bondPortofolios : []}
            bonds={activePortofolio ? activePortofolio.bonds : []}
          />
        </section>
      )}

      {item === "2" && (
        <section className="">
          <SpreadPage spreads={spreads} />
        </section>
      )}
      {item === "3" && (
        <section className="">
          <SwapPage
            bonds={activePortofolio ? activePortofolio.bonds : []}
            swaps={swaps}
          />
        </section>
      )}
      {item === "4" && (
        <section className="">
          <BilanPage />
        </section>
      )}
      {item === "5" && (
        <section className="">
          <ChatContainer collapsedSidebar={true} />
        </section>
      )}
    </>
  );
};

const ALMPage = () => {
  // Authentication redirection
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const [items, setItems] = useState<string[]>(["0", "1", "2", "3", "4", "5"]);
  const [isDragEnabled, setIsDragEnabled] = useState(true);

  const handleDragStartWindows = () => {};

  const handleDragEndWindow = (result: DropResult) => {
    if (!result.destination) return;
    const draggedItems = Array.from(items);
    const [reorderedItem] = draggedItems.splice(result.source.index, 1);
    draggedItems.splice(result.destination.index, 0, reorderedItem);
    setItems(draggedItems);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "m" && event.ctrlKey) {
        // Raccourci Ctrl+D
        setIsDragEnabled(!isDragEnabled);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDragEnabled]);

  return (
    <div
      className="flex flex-col w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          styles.authNavbarContainer,
          `${isHovered ? "hovered" : ""}`
        )}
      >
        <AuthNavBar />
      </div>

      <ContextMenu>
        <ContextMenuTrigger>
          <main className="h-[100dvh] overflow-hidden flex justify-items-center border">
            {/* <Sidebar /> */}
            {isDragEnabled ? (
              <DragDropContext
                onDragStart={handleDragStartWindows}
                onDragEnd={handleDragEndWindow}
              >
                <Droppable droppableId="droppable">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="flex gap-0 flex-wrap h-full w-full"
                    >
                      {items.map((item, itemIndex) => (
                        <Draggable key={item} draggableId={item} index={itemIndex}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <ALMComponent item={item} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <div className="flex flex-wrap justify-items-center">
                {items.map((item) => (
                  <div key={item}>
                    <ALMComponent item={item} />
                  </div>
                ))}
              </div>
            )}
          </main>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset>
            Back
            <ContextMenuShortcut>Ctrl + b</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem
            inset
            onClick={() => setIsDragEnabled(!isDragEnabled)}
          >
            {isDragEnabled ? "Disable Drag-and-Drop" : "Enable Drag-and-Drop"}
            <ContextMenuShortcut>Ctrl + m</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <AlmFooter />
    </div>
  );
};

export default ALMPage;
