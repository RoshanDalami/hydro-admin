import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateGalleryCategory, DeleteGalleryCategory, GetGalleryCategory, GetGalleryCategoryById, UpdateGalleryCategory } from "../service/gallery-category.service";
import { toast } from "sonner";

export const GALLERY_CATEGORY_QUERY_KEY = {
    GET: "gallery-category",
    GET_BY_ID: "gallery-category-by-id",
}

export const useCreateGalleryCategory = () => {
    return useMutation({
        mutationFn: CreateGalleryCategory,
        onSuccess: (data) => {
            toast.success(data.message)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}

export const useUpdateGalleryCategory = () => {
    return useMutation({
        mutationFn: UpdateGalleryCategory,
        onSuccess: (data) => {
            toast.success(data.message)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}

export const useDeleteGalleryCategory = () => {
    return useMutation({
        mutationFn: DeleteGalleryCategory,
        onSuccess: (data) => {
            toast.success(data.message)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}

export const useGetGalleryCategory = () => {
    return useQuery({
        queryKey: [GALLERY_CATEGORY_QUERY_KEY.GET],
        queryFn: GetGalleryCategory,
    })
}

export const useGetGalleryCategoryById = (id: number) => {
    return useQuery({
        queryKey: [GALLERY_CATEGORY_QUERY_KEY.GET_BY_ID, id],
        queryFn: () => GetGalleryCategoryById(id),
    })
}
