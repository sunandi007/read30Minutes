import React from "react";
import SideNav from "../ui/pages/sidenav";
import { DarkThemeToggle } from 'flowbite-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full font-cera-pro min-h-screen">
      <div className="h-auto flex-none w-44 dark:text-white fixed left-0 top-0 bottom-0 z-50">
        <SideNav />
      </div>
      <div className="ml-44 flex-grow flex flex-col min-h-screen overflow-y-auto dark:bg-gray-800">
        {children}
      </div>
      <div className="fixed right-0 top-0 mt-4 mr-4 z-50">
        <DarkThemeToggle />
      </div>
    </div>
  );
}