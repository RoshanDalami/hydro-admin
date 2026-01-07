import { mainApiWrapper } from "../apiHelper";
import { apiUrls } from "../apiUrl";

export const CreateBanner = async (payload: FormData) => {
    const response = await mainApiWrapper(
        apiUrls.banner.create.method,
        apiUrls.banner.create.url,
        payload
    )
    return response
}

export const GetBanner = async () => {
    const response = await mainApiWrapper(
        apiUrls.banner.get.method,
        apiUrls.banner.get.url,
    )
    return response?.data
}

export const GetBannerById = async (id: number) => {
    const response = await mainApiWrapper(
        apiUrls.banner.getById.method,
        apiUrls.banner.getById.url + `/${id}`,
    )
    return response?.data
}

export const UpdateBannerById = async (payload: FormData) => {
    const response = await mainApiWrapper(
        apiUrls.banner.update.method,
        apiUrls.banner.update.url,
        payload
    )
    return response?.data
}

export const DeleteBanner = async (id: number) => {
    const response = await mainApiWrapper(
        apiUrls.banner.deleteById.method,
        apiUrls.banner.deleteById.url + `/${id}`,
    )
    return response
}