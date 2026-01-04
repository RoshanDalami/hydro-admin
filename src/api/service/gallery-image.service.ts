import { mainApiWrapper } from "../apiHelper";
import { apiUrls } from "../apiUrl";
import { TGalleryImageCreateResponse, TGalleryImageGetResponse, TGalleryImageUpdateResponse } from "@/types/gallery-image.type";

export const GetGalleryImages = async () => {
    const response: TGalleryImageGetResponse = await mainApiWrapper(
        apiUrls.gallery.image.get.method,
        apiUrls.gallery.image.get.url
    );
    return response?.data;
};

export const CreateGalleryImage = async (payload: FormData) => {
    const response: TGalleryImageCreateResponse = await mainApiWrapper(
        apiUrls.gallery.image.create.method,
        apiUrls.gallery.image.create.url,
        payload
    );
    return response;
};

export const UpdateGalleryImage = async (payload: FormData) => {
    const response: TGalleryImageUpdateResponse = await mainApiWrapper(
        apiUrls.gallery.image.update.method,
        apiUrls.gallery.image.update.url,
        payload
    );
    return response;
}
export const DeleteGalleryImage = async (id: number) => {
    const response: TGalleryImageUpdateResponse = await mainApiWrapper(
        apiUrls.gallery.image.deleteImageById.method,
        apiUrls.gallery.image.deleteImageById.url + `/${id}`
    );
    return response;
}