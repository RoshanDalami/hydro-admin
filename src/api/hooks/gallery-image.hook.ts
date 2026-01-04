import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateGalleryImage, DeleteGalleryImage, GetGalleryImages } from "../service/gallery-image.service";
import { toast } from "sonner";
export const GALLERY_IMAGE_QUERY_KEY = {
    GET_ALL: 'all-gallery-images'
}

export const useGetAllGalleryImages = () => {
    return useQuery({
        queryKey: [GALLERY_IMAGE_QUERY_KEY.GET_ALL],
        queryFn: () => GetGalleryImages()
    })
}

export const useCreateGalleryImage = () => {
    return useMutation({
        mutationFn: (payload: FormData) => CreateGalleryImage(payload),
        onSuccess: (data) => {
            toast.success(data?.message);
        },
        onError: (error) => {
            toast.error(error?.message);
        }
    })
}

export const useDeleteGalleryImage = () => {
    return useMutation({
        mutationFn: (id: number) => DeleteGalleryImage(id),
        onSuccess: (data) => {
            toast.success(data?.message);
        },
        onError: (error) => {
            toast.error(error?.message);
        }
    })
}
