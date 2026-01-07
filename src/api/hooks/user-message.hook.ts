import { useQuery } from "@tanstack/react-query";
import { GetUserMessages, GetUserMessagesById } from '@/api/service/user-message.service'

export const USER_MESSAGE_QUERY_KEY = {
    GET_USER_MESSAGES: 'get-user-messages',
    GET_USER_MESSAGES_BY_ID: 'get-user-messages-by-id'
}
export const useUserMessages = () => {
    return useQuery({
        queryKey: [USER_MESSAGE_QUERY_KEY.GET_USER_MESSAGES],
        queryFn: () => GetUserMessages()
    })
}

export const useUserMessagesById = (id: number) => {
    return useQuery({
        queryKey: [USER_MESSAGE_QUERY_KEY.GET_USER_MESSAGES_BY_ID, id],
        queryFn: () => GetUserMessagesById(id)
    })
}