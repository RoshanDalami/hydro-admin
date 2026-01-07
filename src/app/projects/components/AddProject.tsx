'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useForm, Controller } from 'react-hook-form'
import { useCreateProject, useGetProjectById, useUpdateProject, useDeleteProjectImage } from '@/api/hooks/project.hook'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import FormModalHeader from '@/components/reusable/FormModalHeader'
import AlertDeleteDialogModal from '@/components/reusable/AlertDeleteDialogModal'
import { Trash2, X } from 'lucide-react'
import { imageurlgenerator } from '@/utils/imgareurlgenerator'
import { TProjectImages } from '@/types/project.type'

const CKEditor = dynamic(() => import('@/components/reusable/CKEditor'), { ssr: false })

type ProjectFormValues = {
    title: string
    content: string
    images: FileList
}

function AddProject({ onClose, onSuccess, editId, isEdit }: { onClose: () => void, onSuccess: () => void, editId?: number, isEdit?: boolean }) {
    const { mutateAsync: createProject, isPending } = useCreateProject()
    const { mutateAsync: updateProject, isPending: updatePending } = useUpdateProject()
    const { data: projectData, isLoading } = useGetProjectById(editId || 0)
    const [existingImages, setExistingImages] = useState<TProjectImages[]>([])
    const [imagesToDelete, setImagesToDelete] = useState<number[]>([])
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [imageToDelete, setImageToDelete] = useState<number | null>(null)

    const { mutateAsync: deleteProjectImage, isPending: deleteImagePending } = useDeleteProjectImage()

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<ProjectFormValues>()

    useEffect(() => {
        if (projectData) {
            reset({
                title: projectData.title,
                content: projectData.content,
            })
            // Set existing images if available
            if (projectData.projectImages && projectData.projectImages.length > 0) {
                setExistingImages(projectData.projectImages)
            }
        }
    }, [projectData])

    const handleDeleteImage = (imageId: number) => {
        setImageToDelete(imageId)
        setOpenDeleteModal(true)
    }

    const handleDeleteConfirm = async () => {
        if (imageToDelete) {
            try {
                await deleteProjectImage({ id: imageToDelete })
                // Add to delete list
                setImagesToDelete(prev => [...prev, imageToDelete])
                // Remove from display
                setExistingImages(prev => prev.filter(img => img.id !== imageToDelete))
                setOpenDeleteModal(false)
                setImageToDelete(null)
            } catch (error) {
                console.error('Failed to delete image', error)
            }
        }
    }

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

            // Add images to delete if in edit mode
            if (imagesToDelete.length > 0) {
                formData.append('imagesToDelete', JSON.stringify(imagesToDelete))
            }

            if (editId) {
                await updateProject({ id: editId, payload: formData })
            } else {
                await createProject(formData)
            }

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

                        {/* Display existing images when in edit mode */}
                        {isEdit && existingImages.length > 0 && (
                            <div className="mb-4">
                                <p className="text-sm text-muted-foreground mb-2">
                                    Existing Images
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {existingImages.map((image) => (
                                        <div
                                            key={image.id}
                                            className="relative group rounded-lg overflow-hidden border border-border"
                                        >
                                            <img
                                                src={imageurlgenerator(image.imageUrl)}
                                                alt="Project image"
                                                className="w-full h-32 object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteImage(image.id)}
                                                className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/90"
                                                title="Delete image"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

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
                    <Button type="button" variant="outline" className='cancel-btn' onClick={onClose}>Cancel</Button>
                    <Button type="submit" disabled={isPending || updatePending}>
                        {isPending || updatePending ? 'Submitting...' : 'Submit'}
                    </Button>
                </div>
            </form>
            <AlertDeleteDialogModal
                open={openDeleteModal}
                onOpenChange={setOpenDeleteModal}
                onConfirm={handleDeleteConfirm}
                disableState={deleteImagePending}
            />
        </div>
    )
}

export default AddProject