import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreateProject, GetProjects, GetProjectById, UpdateProject, DeleteProject, DeleteProjectImageById } from '@/api/service/project.service'


export const PROJECT_QUERY_KEY = {
    ALL_PROJECTS: 'all-projects',
    PROJECT_BY_ID: 'project-by-id'
}

export const useGetAllProjects = () => {
    return useQuery({
        queryKey: [PROJECT_QUERY_KEY.ALL_PROJECTS],
        queryFn: GetProjects,
    })
}

export const useCreateProject = () => {
    return useMutation({
        mutationFn: CreateProject,
        onSuccess: (data) => {
            toast.success(data?.message)
        },
        onError: (error) => {
            toast.error(error?.message)
        }
    })
}

export const useGetProjectById = (id: string | number) => {
    return useQuery({
        queryKey: [PROJECT_QUERY_KEY.PROJECT_BY_ID, id],
        queryFn: () => GetProjectById(typeof id === 'string' ? parseInt(id) : id),
    })
}

export const useUpdateProject = () => {
    return useMutation({
        mutationFn: ({ id, payload }: { id: number, payload: FormData }) => UpdateProject(id, payload),
        onSuccess: (data) => {
            toast.success(data?.message)
        },
        onError: (error) => {
            toast.error(error?.message)
        }
    })
}

export const useDeleteProject = () => {
    return useMutation({
        mutationFn: ({ id }: { id: number }) => DeleteProject(id),
        onSuccess: (data) => {
            toast.success(data?.message)
        },
        onError: (error) => {
            toast.error(error?.message)
        }
    })
}

export const useDeleteProjectImage = () => {
    return useMutation({
        mutationFn: ({ id }: { id: number }) => DeleteProjectImageById(id),
        onSuccess: (data) => {
            toast.success(data?.message)
        },
        onError: (error) => {
            toast.error(error?.message)
        }
    })
}