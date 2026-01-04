"use client";
import { useState } from "react";
import { TGalleryImage } from "@/types/gallery-image.type";
import AnimationWrapper from "@/components/reusable/AnimationWrapper";
import { useGetAllGalleryImages } from "@/api/hooks/gallery-image.hook";
import { imageurlgenerator } from "@/utils/imgareurlgenerator";
import Image from "next/image";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import AddButton from "@/components/reusable/AddButton";
import DialogModal from "@/components/reusable/DialogModal";
import AddEditGallaryForm from "./AddEditGallaryForm";
import EmptyData from "@/components/reusable/EmptyData";
import { ImagePlay } from "lucide-react";
function GalleryView() {
    const { data, isLoading, refetch } = useGetAllGalleryImages();
    const [open, setOpen] = useState(false);

    const onClose = () => {
        setOpen(false);
    };

    const onSuccess = () => {
        refetch();
        setOpen(false);
    };

    return (
        <AnimationWrapper>
            <div className="p-6 space-y-6">
                <AddButton title="Add Gallery Image" onClick={() => setOpen(true)} />
                {/* Skeleton */}
                {isLoading && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <GallerySkeleton key={i} />
                        ))}
                    </div>
                )}

                {/* Gallery */}
                {!isLoading && (
                    data?.length === 0 ? <EmptyData Icon={ImagePlay} title="No Images Found" onClick={() => setOpen(true)} buttonText="Add Image" /> :
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {data?.map((item) => (
                                <GalleryImageCard key={item.id} item={item} />
                            ))}
                        </div>
                )}
            </div>
            <DialogModal open={open} setOpen={setOpen}>
                <AddEditGallaryForm open={open} onClose={onClose} onSuccess={onSuccess} />
            </DialogModal>
        </AnimationWrapper>
    );
}

export default GalleryView;

/* ---------------- Skeleton ---------------- */

function GallerySkeleton() {
    return (
        <div className="rounded-2xl overflow-hidden border shadow-sm bg-white">
            <Skeleton className="w-full aspect-square" />
            <div className="p-2">
                <Skeleton className="h-4 w-3/4" />
            </div>
        </div>
    );
}

function GalleryImageCard({ item }: { item: TGalleryImage }) {
    const [isLoading, setIsLoading] = useState(true);
    const imageUrl = imageurlgenerator(item.imageUrl);

    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.03 }}
            className="group relative rounded-2xl overflow-hidden border shadow-sm bg-white"
        >
            {/* Image */}
            <div className="relative w-full aspect-square bg-gray-100">
                {isLoading && <Skeleton className="absolute inset-0 w-full h-full rounded-none" />}
                <Image
                    src={imageUrl}
                    alt={item.imageCategory}
                    fill
                    className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={() => setIsLoading(false)}
                />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition" />

            {/* Category */}
            <div className="absolute bottom-0 w-full p-3 text-white opacity-100 transition">
                <p className="text-sm font-medium truncate">
                    {item.imageCategory}
                </p>
            </div>
        </motion.div>
    );
}