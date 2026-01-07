'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Edit, Trash2, Images, ImageIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import AnimationWrapper from '@/components/reusable/AnimationWrapper'
import AddButton from '@/components/reusable/AddButton'
import { useGetAllProjects, useDeleteProject } from '@/api/hooks/project.hook'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { imageurlgenerator } from '@/utils/imgareurlgenerator'
import AddProject from './AddProject'
import DialogModal from '@/components/reusable/DialogModal'
import AlertDeleteDialogModal from '@/components/reusable/AlertDeleteDialogModal';
import EmptyData from '@/components/reusable/EmptyData';
import { FolderCheckIcon } from 'lucide-react'


function ProjectView() {
    const { data: projects, isLoading, refetch } = useGetAllProjects()
    const { mutateAsync: deleteProject, isPending: deletePending } = useDeleteProject()
    const [openModal, setOpenModal] = useState(false)
    const router = useRouter()
    const [deleteId, setDeleteId] = useState<number | null>(null)
    const [editId, setEditId] = useState<number | null>(null)
    const [isEdit, setIsEdit] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const onSuccess = () => {
        setOpenModal(false)
        refetch()
    }
    const handleViewDetail = (id: number) => {
        router.push(`/projects/${id}`)
    }
    const handleDelete = (id: number) => {
        setDeleteId(id)
        setOpenDeleteModal(true)
    }

    const handleDeleteConfirm = async () => {
        if (deleteId) {
            await deleteProject({ id: deleteId })
            setOpenDeleteModal(false)
            refetch()
        }
    }
    const handleOpen = () => {
        setOpenModal(true)
    }
    const handleEdit = (id: number) => {
        setEditId(id)
        setOpenModal(true)
        setIsEdit(true)
    }

    const handleOnclose = () => {
        setOpenModal(false)
        setIsEdit(false)
        setEditId(null)
    }

    if (isLoading) {
        return (
            <AnimationWrapper>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-[380px] rounded-2xl bg-muted animate-pulse"
                        />
                    ))}
                </div>
            </AnimationWrapper>
        )
    }

    return (
        <AnimationWrapper>
            <div className="mb-6">
                <AddButton title="Add Project" onClick={handleOpen} />
            </div>

            {projects?.length as number === 0 ? <EmptyData title="No projects found" onClick={handleOpen} Icon={FolderCheckIcon} buttonText='Add Project' /> : <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects?.map((project) => {
                    const hasImages = project?.projectImages?.length as number > 0
                    const images = hasImages
                        ? project?.projectImages?.map((img) =>
                            imageurlgenerator(img.imageUrl)
                        )
                        : []

                    return (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition pt-0">
                                {/* Image Slider or Icon Placeholder */}
                                <div className="relative">
                                    {hasImages ? (
                                        <motion.div
                                            className="flex gap-4 cursor-grab overflow-hidden"
                                        >
                                            {images?.map((src, index) => (
                                                <Image
                                                    key={index}
                                                    src={src}
                                                    alt={project.title}
                                                    width={600}
                                                    height={400}
                                                    className="min-w-full h-[220px] object-cover"
                                                />
                                            ))}
                                        </motion.div>
                                    ) : (
                                        <div className="min-w-full h-[220px] bg-muted flex items-center justify-center">
                                            <ImageIcon size={64} className="text-muted-foreground/30" />
                                        </div>
                                    )}

                                    {images?.length as number > 1 && (
                                        <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                            <Images size={14} />
                                            {images?.length as number}
                                        </div>
                                    )}
                                </div>

                                <CardHeader className="pb-2">
                                    <h3 className="text-lg font-semibold cursor-pointer" onClick={() => handleViewDetail(project.id)}>
                                        {project.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                        Created on{' '}
                                        {new Date(project.createdAt).toDateString()}
                                    </p>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    {/* HTML Content */}
                                    <div
                                        className="prose prose-sm max-w-none text-muted-foreground line-clamp-3 cms-content"
                                        dangerouslySetInnerHTML={{
                                            __html: project.content,
                                        }}
                                    />

                                    {/* Actions */}
                                    <div className="flex justify-end gap-2 pt-2">
                                        <Button size="sm" variant="outline" onClick={() => handleEdit(project.id)}>
                                            <Edit size={16} />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleDelete(project.id)}
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )
                })}
            </div>}
            <DialogModal open={openModal} setOpen={() => setOpenModal(false)}>
                <AddProject onClose={handleOnclose} onSuccess={onSuccess} editId={editId as number} isEdit={isEdit} />
            </DialogModal>
            <AlertDeleteDialogModal open={openDeleteModal} onOpenChange={() => setOpenDeleteModal(false)} onConfirm={handleDeleteConfirm} disableState={deletePending} />
        </AnimationWrapper>
    )
}

export default ProjectView