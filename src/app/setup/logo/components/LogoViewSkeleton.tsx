import { Skeleton } from "@/components/ui/skeleton";
function LogoViewSkeleton() {
  return (
    <div>
      <Skeleton className="w-75 h-75 rounded-full" />
      <div className="flex flex-col gap-4 mt-4">
        <Skeleton className="w-[40vw] h-5" />
        <Skeleton className="w-[40vw] h-5" />
      </div>
    </div>
  );
}

export default LogoViewSkeleton;
