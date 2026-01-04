import { mainApiWrapper } from "../apiHelper";
import { apiUrls } from "../apiUrl";
import { TProjectCreateResponse, TProjectGetByIdResponse, TProjectGetResponse } from '@/types/project.type'

export const CreateProject = async (payload: FormData) => {
    const response: TProjectCreateResponse = await mainApiWrapper(
        apiUrls.project.create.method,
        apiUrls.project.create.url,
        payload
    )
    return response
}
export const GetProjects = async () => {
    const response: TProjectGetResponse = await mainApiWrapper(
        apiUrls.project.get.method,
        apiUrls.project.get.url
    )
    return response?.data
}

export const GetProjectById = async (id: number) => {
    const response: TProjectGetByIdResponse = await mainApiWrapper(
        apiUrls.project.getById.method,
        apiUrls.project.getById.url + `/${id}`,
    )
    return response?.data
}