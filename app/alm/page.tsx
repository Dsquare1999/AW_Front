"use client";

import AuthNavBar from "@/components/auth/auth-navbar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import UploadBond from "@/components/alm/uploads/UploadBond";
import UploadBondPage from "@/components/alm/uploads/UploadBondPage";
import styles from "@/components/styles/alm.module.css";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { useRetrieveBilanQuery } from "@/redux/features/retrieveApiSlice";
import BondPortofolioPage from "@/components/alm/bonds/pages/BondPortofolioPage";
import { CashflowData } from "@/data/bonds/CashflowsData";
import { BondProp } from "../types/BondType";
import DisplayBondPortofolio from "@/components/alm/bonds/pages/DisplayBondPortofolio";
import BilanPage from "@/components/alm/bonds/pages/BilanPage";
import Sidebar from "@/components/common/Sidebar";
import ChatContainer from "@/components/chat/chat-container";

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
      console.log("My bonds");
    } else {
      console.log("No Bond found !");
    }
  }, [myBilan]);


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
        <Sidebar  />
        <div className="flex flex-col">
          <ResizablePanelGroup
            direction="vertical"
            className="min-h-[90vh] w-full rounded-lg border p-2"
          >
            <ResizablePanel defaultSize={75}>
              <BondPortofolioPage bonds={bonds} />
            </ResizablePanel>
            <ResizableHandle withHandle className="my-4" />
            <ResizablePanel defaultSize={25}>
              <DisplayBondPortofolio bonds={bonds} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <section className="">
        <ResizablePanelGroup
            direction="vertical"
            className="min-h-[90vh] w-full rounded-lg border p-2"
          >
            <ResizablePanel defaultSize={50}>
              <BilanPage />
            </ResizablePanel>
            <ResizableHandle withHandle className="my-4" />
            <ResizablePanel defaultSize={25}>
              <ChatContainer />
            </ResizablePanel>
          </ResizablePanelGroup>
        </section>
      </main>
    </div>
  );
};

export default ALMPage;
