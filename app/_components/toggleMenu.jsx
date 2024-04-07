import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../../@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../@/components/ui/dropdown-menu";
import { LaptopIcon, MoonIcon, SunIcon } from "lucide-react";

export function ModeToggle() {
  const { setTheme } = useTheme();

  const menuItemClass = "block w-full pt-[9px] pb-2 px-3 rounded-md text-start leading-tight cursor-pointer select-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 focus:bg-blue-gray-50 focus:bg-opacity-80 active:bg-blue-gray-50 active:bg-opacity-80 hover:text-blue-gray-900 focus:text-blue-gray-900 active:text-blue-gray-900 outline-none dark:text-stone-400 hover:!text-slate-100 hover:!bg-theme-color";

  return (
    <DropdownMenu className="bg-stone-100 dark:bg-main-color border-0 shadow-lg dark:shadow-none">
      <DropdownMenuTrigger className="align-middle select-none flex justify-center items-center w-10 max-w-[40px] h-10 max-h-[40px] text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20 rounded-full" asChild>
        <Button className="rounded-full" variant="text">
          <div className="flex items-center">
            <Sun className="block rotate-0 transition-all outline-none text-orange-300 dark:hidden dark:rotate-90" />
            <Moon className="hidden rotate-90 transition-all outline-none dark:block dark:rotate-0 dark:saturate-100 text-blue-300/70" />
          </div>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className={"min-w-[180px] p-3 border-blue-gray-50 rounded-md shadow-blue-gray-500/10 font-sans text-sm font-normal text-blue-gray-500 overflow-auto focus:outline-none z-[999] bg-stone-100 dark:bg-main-color border-0 shadow-lg dark:shadow-none"} align="end">
        <DropdownMenuItem className={menuItemClass} onClick={() => setTheme("dark")}>
          <MoonIcon className="" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem className={menuItemClass} onClick={() => setTheme("light")}>
          <SunIcon className="" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem className={menuItemClass} onClick={() => setTheme("system")}>
          <LaptopIcon className="" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
      
    </DropdownMenu>
  );
}
