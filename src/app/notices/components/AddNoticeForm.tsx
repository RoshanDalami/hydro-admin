'use client'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useCreateNotice, useUpdateNotice } from '@/api/hooks/notice.hook'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import FormModalHeader from '@/components/reusable/FormModalHeader'
import { TNotice } from '@/types/notice.type'
type NoticeFormValues = {
    title: string
    content: string
    publishDate: string
    time: string
    medias: FileList
}

function AddNoticeForm({
    onClose,
    onSuccess,
    isEdit,
    editId,
    editData,
    refetch
}: {
    onClose: () => void
    onSuccess: () => void,
    isEdit: boolean,
    editId: number | null,
    editData: TNotice | null,
    refetch:() => {}
}) {
    const { mutateAsync: createNotice, isPending } = useCreateNotice()
    const { mutateAsync: updateNotice, isPending: updatePending } = useUpdateNotice()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<NoticeFormValues>()

    useEffect(() => {
        if (editData) {
            reset({
                title: editData.title,
                content: editData.content,
                publishDate: editData.publishDate,
                time: editData.time,
            })
        }
    }, [editData])
    const onSubmit = async (data: NoticeFormValues) => {
        try {
            const formData = new FormData()

            formData.append('title', data.title)
            formData.append('content', data.content)
            formData.append('publishDate', data.publishDate)
            formData.append('time', data.time)

            if (data.medias && data.medias.length > 0) {
                Array.from(data.medias).forEach((file) => {
                    formData.append('medias', file)
                })
            }
            if (isEdit) {
                formData.append('id', editId?.toString() || '')
            }

            await isEdit ? updateNotice(formData) : createNotice(formData)

            reset()
            onSuccess()
            onClose()
        } catch (error) {
            console.error('Failed to create notice', error)
        }
    }

    return (
        <div className="p-6 w-[50vw]">
            <FormModalHeader
                title={isEdit ? "Edit Notice" : "Add Notice"}
            />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 p-6"
            >
                <div className="space-y-4">
                    <div className="space-y-1">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter notice title"
                            {...register('title', { required: 'Title is required' })}
                        />
                        {errors.title && (
                            <p className="text-sm text-destructive">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            placeholder="Write notice content..."
                            rows={4}
                            {...register('content', { required: 'Content is required' })}
                        />
                        {errors.content && (
                            <p className="text-sm text-destructive">
                                {errors.content.message}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="publishDate">Publish Date</Label>
                            <Input
                                id="publishDate"
                                type="date"
                                {...register('publishDate', { required: true })}
                            />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="time">Time</Label>
                            <Input
                                id="time"
                                type="time"
                                {...register('time', { required: true })}
                            />
                        </div>
                    </div>

                    {!isEdit && <div className="space-y-1">
                        <Label htmlFor="medias">Medias</Label>
                        <Input
                            id="medias"
                            type="file"
                            multiple
                            accept="image/*,application/pdf"
                            {...register('medias')}
                        />
                        <p className="text-xs text-muted-foreground">
                            Supports images and PDF files
                        </p>
                    </div>}
                </div>

                <div className="flex justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        disabled={isPending || updatePending}
                    >
                        {isPending || updatePending ? 'Submitting...' : 'Submit'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddNoticeForm