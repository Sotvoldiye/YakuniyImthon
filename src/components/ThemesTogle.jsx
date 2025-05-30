import { IoIosArrowDown } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAppStore } from "../lib/zustand";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import accImg from '../assets/Oval.svg'
export default function ThemesTogle() {
  const { themes } = useAppStore();
  const [theme, setTehme] = useState(
    localStorage.getItem("theme") || "default"
  );

  function handleTheme(type, mode) {
    const html = document.documentElement;
    let isDark;
    if (html.dataset.theme.startsWith("dark-")) {
      isDark = true;
    } else {
      isDark = false;
    }

    if (mode === "theme") {
      if (isDark) {
        html.dataset.theme = `dark-${type}`;
        setTehme(`dark-${type}`);
      } else {
        html.dataset.theme = type;
        setTehme(type);
      }
    } else if (mode === "dark") {
      if (type.startsWith("dark-")) {
        html.dataset.theme = type.replace("dark-", "");
        setTehme(type.replace("dark-", ""));
      } else {
        html.dataset.theme = `dark-${type}`;
        setTehme(`dark-${type}`);
      }
    }
  }

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, []);

  return (
    <div className="flex gap-5 md:flex-col md:items-start">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            <span className="md:hidden"> Change Theme</span>
            <IoIosArrowDown className="p-0 m-0 text-[rgba(124,93,250,1)] font-bold w-[12px]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 z-1000 ml-4">
          <DropdownMenuLabel>Themes</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex flex-col w-[100%]">
            {themes.map((el, index) => {
              return (
                <Button
                  key={index}
                  onClick={() => handleTheme(el, "theme")}
                  className="justify-start"
                  variant="ghost"
                >
                  {el}
                </Button>
              );
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        size={"icon"}
        onClick={() => {
          handleTheme(theme, "dark");
        }}
      >
        {theme ? <Sun /> : <Moon />}
      </Button>
      <div  className="m-0 p-0 border-t-2  w-[100%]">
      <img src={accImg} alt="rasm" />

      </div>
    </div>
  );
}
