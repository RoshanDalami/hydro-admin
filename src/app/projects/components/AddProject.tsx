'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { useForm, Controller } from 'react-hook-form'
import { useCreateProject } from '@/api/hooks/project.hook'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import FormModalHeader from '@/components/reusable/FormModalHeader'

const CKEditor = dynamic(() => import('@/components/reusable/CKEditor'), { ssr: false })

type ProjectFormValues = {
    title: string
    content: string
    images: FileList
}

function AddProject({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
    const { mutateAsync: createProject, isPending } = useCreateProject()

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<ProjectFormValues>()

    const onSubmit = async (data: ProjectFormValues) => {
        try {
            const formData = new FormData()
            formData.append('title', data.title)
            formData.append('content', data.content)

            if (data.images && data.images.length > 0) {
                Array.from(data.images).forEach((file) => {
                    formData.append('images', file)
                })
            }

            await createProject(formData)

            reset()
            onSuccess()
            onClose()
        } catch (error) {
            console.error('Failed to create project', error)
        }
    }

    return (
        <div className="p-6 w-[50vw]">
            <FormModalHeader title="Add Project" />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
                <div className="space-y-4">
                    <div className="space-y-1">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter project title"
                            {...register('title', { required: 'Title is required' })}
                        />
                        {errors.title && (
                            <p className="text-sm text-destructive">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <Controller
                            name="content"
                            control={control}
                            rules={{ required: 'Content is required' }}
                            render={({ field: { onChange, value } }) => (
                                <CKEditor
                                    label="Content"
                                    value={value}
                                    onChange={onChange}
                                    error={errors.content?.message}
                                />
                            )}
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="images">Images</Label>
                        <Input
                            id="images"
                            type="file"
                            multiple
                            accept="image/*"
                            {...register('images')}
                        />
                        <p className="text-xs text-muted-foreground">
                            Upload project images
                        </p>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? 'Submitting...' : 'Submit'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddProject