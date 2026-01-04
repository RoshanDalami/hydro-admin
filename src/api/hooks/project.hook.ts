import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreateProject, GetProjects, GetProjectById } from '@/api/service/project.service'


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

export const useGetProjectById = (id: string) => {
    return useQuery({
        queryKey: [PROJECT_QUERY_KEY.PROJECT_BY_ID, id],
        queryFn: () => GetProjectById(parseInt(id)),
    })
} 