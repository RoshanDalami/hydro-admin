export type TAboutUs = {
    id: number;
    content: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export type TAboutUsPayload = {
    content: string;
}

export type TAboutUsUpdatePayload = {
    id: number;
    content: string;
}

export type TAboutUsCreateResponse = {
    status: number;
    data: null;
    message: string;
    success: boolean;
}

export type TAboutUsGetResponse = {
    status: number;
    data: TAboutUs[];
    message: string;
    success: boolean;
}

export type TAboutUsByIdResponse = {
    status: number;
    data: TAboutUs;
    message: string;
    success: boolean;
}
export type TAboutUsDeleteResponse = {
    status: number;
    data: null;
    message: string;
    success: boolean;
}