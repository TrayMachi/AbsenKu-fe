import React from "react";
import { DataProvider } from "@/components/context/context";
import NavBar from "./elements/NavBar";
import DataCount from "./sections/DataCount";
import { DashboardTabs } from "./sections/DashboardTabs";

export const DashboardPageModule = () => {
  return (
    <DataProvider>
      <main>
        <NavBar />
        <div className="flex justify-center mt-[15vh]">
          <DataCount />
        </div>
        <DashboardTabs />
      </main>
    </DataProvider>
  );
};
