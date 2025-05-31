import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import { useEffect, useState } from "react";
import { ArrowBigDown, PlusCircle } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { queryGenerator } from "../lib/utils";
import { useAppStore } from "../lib/zustand";
import { IoIosArrowDown } from "react-icons/io";
import  style from "./header/header.module.css"

function Header() {
  const { setSheetOpen} = useAppStore()
  const { setFilter } = useAppStore();
  const {invoices} = useAppStore()
  const [items, setItems] = useState({
    draft: false,
    paid: false,
    pending: false,
  });
  function handleChange(key) {
    setItems((prev) => {
      return { ...prev, [key]: !prev[key] };
    });
  }

  useEffect(() => {
    const query = queryGenerator(items);
    setFilter(query);
  }, [JSON.stringify(items)]);

  return (
    <header>
      <div className={`base_container flex items-center justify-between py-[75px] ${style.header}`}>
        <div>
          <h1 className={`font-[700] text-[32px] ${style.title}`}>Invoices</h1>
          <div className={`font-[400] text-[12px] text-[rgba(136,142,176,1)] ${style.invoiceHeader}`}>There are {invoices.length} total invoices</div>
          <p className={`font-[400] text-[12px] text-[rgba(136,142,176,1)] ${style.invoices}`}>{invoices.length} invoices</p>

        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-auto mr-[40px] flex justify-center items-center gap-[16px] text-[12px] font-bold focus:outline-0">
              <p> Filter </p>{" "}
              <IoIosArrowDown className="p-0 m-0 text-[rgba(124,93,250,1)] font-bold w-[12px]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Statuses</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col gap-3 px-2">
              {Object.entries(items).map(([key, value]) => (
                <label
                  key={key}
                  className={`${buttonVariants({
                    variant: "ghost",
                  })} justify-start capitalize flex items-center gap-2 cursor-pointer p-0`}
                  htmlFor={key}
                >
                  <Checkbox
                    id={key}
                    checked={value}
                    onCheckedChange={() => handleChange(key)}
                    className="flex items-center justify-center"
                  />
                  {key}
                </label>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
            <Button onClick={setSheetOpen}>
            <PlusCircle />
            New Invoice
            </Button>
       
      </div>
    </header>
  );
}

export default Header;
