import {
    Card,
    CardContent,
  } from "@/components/ui/card";
  import { Skeleton } from "@/components/ui/skeleton";
  import { Button } from "@/components/ui/button";
  
  export default function CardSkeletons() {
    return (
      <div className="p-6 space-y-6 base_container  mt-2">
        {/* Top status and actions */}
        <Card>
          <CardContent className="flex justify-between items-center py-2">
            <div className="flex items-center gap-2">
              <Skeleton className="w-[60px] h-6 rounded" />
              <Skeleton className="w-[50px] h-6 rounded-full" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="w-[50px] h-8 rounded" />
              <Skeleton className="w-[60px] h-8 rounded" />
            </div>
          </CardContent>
        </Card>
  
        {/* Invoice details */}
        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Invoice head */}
            <div className="flex justify-between flex-wrap gap-6">
              <div className="space-y-2">
                <Skeleton className="w-[100px] h-5" />
                <Skeleton className="w-[130px] h-4" />
              </div>
              <div className="text-right space-y-1">
                <Skeleton className="w-[150px] h-4" />
                <Skeleton className="w-[110px] h-4" />
                <Skeleton className="w-[130px] h-4" />
                <Skeleton className="w-[90px] h-4" />
              </div>
            </div>
  
            {/* Info columns */}
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-1">
                <Skeleton className="w-[80px] h-4" />
                <Skeleton className="w-[100px] h-5" />
                <Skeleton className="w-[60px] h-4" />
              </div>
              <div className="space-y-1">
                <Skeleton className="w-[120px] h-4" />
                <Skeleton className="w-[90px] h-4" />
                <Skeleton className="w-[100px] h-4" />
                <Skeleton className="w-[70px] h-4" />
              </div>
              <div className="space-y-1">
                <Skeleton className="w-[150px] h-4" />
                <Skeleton className="w-[100px] h-4" />
              </div>
            </div>
  
            {/* Items table */}
            <div className="mt-6 border rounded-md overflow-hidden">
              <div className="grid grid-cols-4 items-center p-4 ">
                <Skeleton className="h-4 w-full col-span-1" />
                <Skeleton className="h-4 w-full col-span-1" />
                <Skeleton className="h-4 w-full col-span-1" />
                <Skeleton className="h-4 w-full col-span-1" />
              </div>
              <div className="grid grid-cols-4 items-center p-4">
                <Skeleton className="h-4 w-full col-span-1" />
                <Skeleton className="h-4 w-full col-span-1" />
                <Skeleton className="h-4 w-full col-span-1" />
                <Skeleton className="h-4 w-full col-span-1" />
              </div>
              <div className="bg-gray-800 p-4  text-white font-bold flex justify-between items-center">
                <Skeleton className="h-4 w-[100px] mr-auto" />
                <Skeleton className="h-6 w-[100px] ml-auto" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  