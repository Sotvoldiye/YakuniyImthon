import logoImage from "../assets/logo.svg";
import { useAppStore } from "../lib/zustand";
import Form from "./Form";
import ThemesTogle from "./ThemesTogle";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";


export default function Sidebar() {
  const {sheetOpen, setSheetOpen, editedData} = useAppStore()
  return (
    <>
     <div className="bg-[#373b53] flex items-center justify-between md:flex-col md:h-full md:fixed md:left-0 md:top-0 md:bottom-0 md:z-[999]">
      <img className="w-[72px]" src={logoImage} />
    <div className="mr-5 md:mr-0 md:mb-5">
    <ThemesTogle/>
    </div>
    </div>
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent side="left" className="ml-[72px] min-w-[calc(80%-72px)] min-h[calc(100%-56px)] overflow-y-scroll">
            <SheetHeader className="sticky top-0 w-full bg-white border-b">
              <SheetTitle>Are you absolutely sure?</SheetTitle>
            </SheetHeader>
            <Form setSheetOpen={setSheetOpen} info={editedData}/>
          </SheetContent>
        </Sheet>
    </>
   
  );
}
