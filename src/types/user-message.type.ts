export type TUserMessage = {
    id: number;
    name: string;
    email: string;
    contact: string;
    subject: string;
    message: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export type TUserMessageResponse = {
    data: TUserMessage[];
    status: number;
    message: string;
    success: boolean;
}
export type TUserMessageByIdResponse = {
    data: TUserMessage;
    status: number;
    message: string;
    success: boolean;
}