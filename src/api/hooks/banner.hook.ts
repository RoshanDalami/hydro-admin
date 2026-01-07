import { useMutation, useQuery } from '@tanstack/react-query'
import { CreateBanner, GetBannerById, UpdateBannerById, DeleteBanner, GetBanner } from '@/api/service/banner.service'
import { toast } from 'sonner'

export const BANNER_QUERY_KEY = {
    ALL_BANNERS: 'all-banners',
    BANNER_BY_ID: 'banner-by-id'
}

export const useGetAllBanners = () => {
    return useQuery({
        queryKey: [BANNER_QUERY_KEY.ALL_BANNERS],
        queryFn: GetBanner,
    })
}

export const useCreateBanner = () => {
    return useMutation({
        mutationFn: CreateBanner,
        onSuccess: (data) => {
            toast.success(data?.message)
        },
        onError: (error) => {
            toast.error(error?.message)
        }
    })
}

export const useGetBannerById = (id: string) => {
    return useQuery({
        queryKey: [BANNER_QUERY_KEY.BANNER_BY_ID, id],
        queryFn: () => GetBannerById(parseInt(id)),
    })
}

export const useUpdateBanner = () => {
    return useMutation({
        mutationFn: UpdateBannerById,
        onSuccess: (data) => {
            toast.success(data?.message)
        },
        onError: (error) => {
            toast.error(error?.message)
        }
    })
}

export const useDeleteBanner = () => {
    return useMutation({
        mutationFn: DeleteBanner,
        onSuccess: (data) => {
            toast.success(data?.message)
        },
        onError: (error) => {
            toast.error(error?.message)
        }
    })
}