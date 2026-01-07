import { mainApiWrapper } from "../apiHelper";
import { apiUrls } from "../apiUrl";
import { TUserMessageResponse, TUserMessageByIdResponse } from '@/types/user-message.type'


export const GetUserMessages = async () => {
    const response: TUserMessageResponse = await mainApiWrapper(
        apiUrls.userMessage.get.method,
        apiUrls.userMessage.get.url,
    )
    return response?.data
}
export const GetUserMessagesById = async (id: number) => {
    const response: TUserMessageByIdResponse = await mainApiWrapper(
        apiUrls.userMessage.getMessageById.method,
        apiUrls.userMessage.getMessageById.url + `/${id}`,
    )
    return response?.data
}
