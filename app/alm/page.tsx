"use client";

import AuthNavBar from "@/components/auth/auth-navbar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import styles from "@/components/styles/alm.module.css";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { useRetrieveBilanQuery, useRetrieveSpreadOperationsQuery, useRetrieveSwapOperationsQuery } from "@/redux/features/retrieveApiSlice";
import BondPortofolioPage from "@/components/alm/bonds/pages/BondPortofolioPage";
import { BondProp } from "../types/BondType";
import DisplayBondPortofolio from "@/components/alm/bonds/pages/DisplayBondPortofolio";
import BilanPage from "@/components/alm/bonds/pages/BilanPage";
import Sidebar from "@/components/common/Sidebar";
import ChatContainer from "@/components/alm/chat/chat-container";
import SpreadPage from "@/components/alm/spreads/pages/SpreadPage";
import SwapPage from "@/components/alm/swaps/pages/SwapPage";
import { SpreadType } from "../types/SpreadType";
import { SwapType } from "../types/SwapType";

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

  // ALM States
  const [bonds, setBonds] = useState<BondProp[]>([]);
  const {
    data: myBilan,
    isLoading: isBondLoading,
    isFetching: isBondFetching,
  } = useRetrieveBilanQuery();

  const [spreads, setSpreads] = useState<SpreadType[]>([]);
  const {
    data: mySpreads,
    isLoading: isSpreadLoading,
    isFetching: isSpreadFetching,
  } = useRetrieveSpreadOperationsQuery();

  const [swaps, setSwaps] = useState<SwapType[]>([]);
  const {
    data: mySwaps,
    isLoading: isSwapLoading,
    isFetching: isSwapFetching,
  } = useRetrieveSwapOperationsQuery();
  

  useEffect(() => {
    if (
      myBilan &&
      myBilan.length > 0 &&
      myBilan[0].bondPortofolios &&
      myBilan[0].bondPortofolios.length > 0 &&
      myBilan[0].bondPortofolios[0].bonds
    ) {
      const myBonds = myBilan[0].bondPortofolios[0].bonds;
      setBonds(myBonds);
      console.log("My bonds", myBonds);
    } else {
      console.log("No Bond found !");
    }

    if (mySpreads && mySpreads.length > 0) {
      console.log("My spreads", mySpreads);
      setSpreads(mySpreads);
    } else {
      console.log("No Spread found !");
    }

    if (mySwaps && mySwaps.length > 0) {
      console.log("My swaps", mySwaps);
      setSwaps(mySwaps);
    } else {
      console.log("No Swap found !");
    }
  }, [myBilan, mySpreads, mySwaps]);


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
      <main className="h-[100vh] overflow-hidden flex space-x-2 justify-items-center border pt-5">
        <Sidebar />
        <section className="flex flex-col">
          <ResizablePanelGroup
            direction="vertical"
            className="min-h-[90vh] w-full rounded-lg border p-2"
          >
            <ResizablePanel defaultSize={48}>
              <BondPortofolioPage bonds={bonds} />
            </ResizablePanel>
            <ResizableHandle withHandle className="my-4" />
            <ResizablePanel defaultSize={48}>
              <DisplayBondPortofolio bonds={bonds} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </section>
        <section className="">
          <ResizablePanelGroup
            direction="vertical"
            className="min-h-[90vh] w-full rounded-lg border p-2"
          >
            <ResizablePanel defaultSize={48}>
              <SpreadPage spreads={spreads} />
            </ResizablePanel>
            <ResizableHandle withHandle className="my-4" />
            <ResizablePanel defaultSize={48}>
              <SwapPage bonds={bonds} swaps={swaps} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </section>
        <section className="">
          <ResizablePanelGroup
            direction="vertical"
            className="min-h-[90vh] w-full rounded-lg border p-2"
          >
            <ResizablePanel defaultSize={48}>
              <BilanPage />
            </ResizablePanel>
            <ResizableHandle withHandle className="my-4" />
            <ResizablePanel defaultSize={48}>
              <ChatContainer collapsedSidebar={true} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </section>
      </main>
    </div>
  );
};

export default ALMPage;
