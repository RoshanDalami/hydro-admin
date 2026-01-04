import { mainApiWrapper } from "../apiHelper";
import { apiUrls } from "../apiUrl";
import { TCreateGalleryCategoryPayload, TUpdateGalleryCategoryPayload, TDeleteGalleryCategoryResponse, TGalleriesResponse, TCreateGalleryCategoryResponse, TUpdateGalleryCategoryResponse, TGalleryByIdResponse } from '@/types/gallery-category.type'

export const CreateGalleryCategory = async (payload: TCreateGalleryCategoryPayload[]) => {
    const response: TCreateGalleryCategoryResponse = await mainApiWrapper(
        apiUrls.gallery.category.create.method,
        apiUrls.gallery.category.create.url,
        payload
    )
    return response
}

export const UpdateGalleryCategory = async (payload: TUpdateGalleryCategoryPayload) => {
    const response: TUpdateGalleryCategoryResponse = await mainApiWrapper(
        apiUrls.gallery.category.update.method,
        apiUrls.gallery.category.update.url,
        payload
    )
    return response
}

export const DeleteGalleryCategory = async (id: number) => {
    const response: TDeleteGalleryCategoryResponse = await mainApiWrapper(
        apiUrls.gallery.category.deleteById.method,
        apiUrls.gallery.category.deleteById.url + `/${id}`,
    )
    return response
}

export const GetGalleryCategory = async () => {
    const response: TGalleriesResponse = await mainApiWrapper(
        apiUrls.gallery.category.get.method,
        apiUrls.gallery.category.get.url,
    )
    return response?.data
}

export const GetGalleryCategoryById = async (id: number) => {
    const response: TGalleryByIdResponse = await mainApiWrapper(
        apiUrls.gallery.category.getById.method,
        apiUrls.gallery.category.getById.url + `/${id}`,
    )
    return response?.data
}
