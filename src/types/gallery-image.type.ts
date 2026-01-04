export type TGalleryImage = {
    id: number;
    imageCategoryId: number;
    imageUrl: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    imageCategory: string;
}

export type TGalleryImageGetResponse = {
    status: number;
    data: TGalleryImage[];
    message: string;
    success: boolean;
}

export type TGalleryImageCreatePayload = {
    imageCategoryId: number;
    images: File[];
}

export type TGalleryImageCreateResponse = {
    status: number;
    data: null;
    message: string;
    success: boolean;
}

export type TGalleryImageUpdateResponse = {
    status: number;
    data: null;
    message: string;
    success: boolean;
}
