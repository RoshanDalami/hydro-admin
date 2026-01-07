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

export const UpdateProject = async (id: number, payload: FormData) => {
    const response = await mainApiWrapper(
        apiUrls.project.update.method,
        apiUrls.project.update.url + `/${id}`,
        payload
    )
    return response
}

export const DeleteProject = async (id: number) => {
    const response = await mainApiWrapper(
        apiUrls.project.deleteById.method,
        apiUrls.project.deleteById.url + `/${id}`,
    )
    return response
}

export const DeleteProjectImageById = async (id: number) => {
    const resposne: TProjectCreateResponse = await mainApiWrapper(
        apiUrls.project.deleteImageById.method,
        apiUrls.project.deleteImageById.url + `/${id}`,
    )
    return resposne
}