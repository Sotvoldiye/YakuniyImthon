import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export default function CardSkeleton({ length = 7 }) {
  return (
    <div className="flex flex-col gap-4 px-4 sm:px-6 md:px-8 lg:px-12 base_container">
      {Array(length).fill(0).map((_, index) => (
        <Card key={index} className="w-full">
          <CardHeader>
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
              <CardTitle className="min-w-[72px]">
                <Skeleton className="w-[72px] h-4 rounded-md bg-slate-300" />
              </CardTitle>

              <CardDescription className="min-w-[109px]">
                <Skeleton className="w-[109px] h-5 rounded-md bg-slate-300" />
              </CardDescription>

              <span className="min-w-[104px]">
                <Skeleton className="w-[104px] h-6 rounded-md bg-slate-300" />
              </span>

              <span className="min-w-[63px]">
                <Skeleton className="w-[63px] h-6 rounded-md bg-slate-300" />
              </span>

              <div className="min-w-[104px]">
                <Skeleton className="w-[104px] h-9 rounded-md bg-slate-300" />
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
