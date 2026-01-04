import React from "react";

export default function AboutUsSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Title Skeleton */}
            <div className="h-8 w-3/4 bg-muted rounded-md"></div>

            {/* Subtitle / Mission Skeleton */}
            <div className="h-6 w-5/6 bg-muted rounded-md"></div>
            <div className="h-6 w-2/3 bg-muted rounded-md"></div>

            {/* Paragraph Skeleton */}
            <div className="space-y-2">
                <div className="h-4 w-full bg-muted rounded-md"></div>
                <div className="h-4 w-11/12 bg-muted rounded-md"></div>
                <div className="h-4 w-10/12 bg-muted rounded-md"></div>
                <div className="h-4 w-8/12 bg-muted rounded-md"></div>
            </div>

            {/* Location Skeleton */}
            <div className="h-4 w-7/12 bg-muted rounded-md"></div>
        </div>
    );
}