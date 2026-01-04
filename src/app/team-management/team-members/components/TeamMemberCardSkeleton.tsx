import { Skeleton } from "@/components/ui/skeleton";

function TeamMemberCardSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-col">
            {/* Image Skeleton */}
            <Skeleton className="w-full h-56 rounded-lg" />

            {/* Info */}
            <div className="mt-4 flex-1 space-y-2">
                {/* Name */}
                <Skeleton className="h-5 w-3/4" />

                {/* Position · Role */}
                <Skeleton className="h-4 w-2/3" />

                {/* Category */}
                <Skeleton className="h-4 w-32 rounded-full" />

                {/* Contact */}
                <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-40" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
            </div>

            {/* Status */}
            <div className="mt-3">
                <Skeleton className="h-5 w-20 rounded-full" />
            </div>

            {/* Actions */}
            <div className="mt-4 flex justify-end gap-2">
                <Skeleton className="h-8 w-20 rounded-md" />
                <Skeleton className="h-8 w-20 rounded-md" />
            </div>
        </div>
    );
}

export default TeamMemberCardSkeleton;