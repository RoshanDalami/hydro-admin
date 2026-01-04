'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Edit, Trash2, Images } from 'lucide-react'
import { useRouter } from 'next/navigation'
import AnimationWrapper from '@/components/reusable/AnimationWrapper'
import AddButton from '@/components/reusable/AddButton'
import { useGetAllProjects } from '@/api/hooks/project.hook'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { imageurlgenerator } from '@/utils/imgareurlgenerator'
import AddProject from './AddProject'
import DialogModal from '@/components/reusable/DialogModal'
const PLACEHOLDER_IMAGE =
    'https://placehold.co/600x400?text=No+Project+Image'

function ProjectView() {
    const { data: projects, isLoading, refetch } = useGetAllProjects()
    const [openModal, setOpenModal] = useState(false)
    const router = useRouter()
    const onSuccess = () => {
        setOpenModal(false)
        refetch()
    }
    const handleViewDetail = (id: number) => {
        router.push(`/projects/${id}`)
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
                <AddButton title="Add Project" onClick={() => setOpenModal(true)} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects?.map((project) => {
                    const images =
                        project?.projectImages?.length as number > 0
                            ? project?.projectImages?.map((img) =>
                                imageurlgenerator(img.imageUrl)
                            )
                            : [PLACEHOLDER_IMAGE]

                    return (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition pt-0">
                                {/* Image Slider */}
                                <div className="relative">
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
                                        className="prose prose-sm max-w-none text-muted-foreground line-clamp-3"
                                        dangerouslySetInnerHTML={{
                                            __html: project.content,
                                        }}
                                    />

                                    {/* Actions */}
                                    <div className="flex justify-end gap-2 pt-2">
                                        <Button size="sm" variant="outline">
                                            <Edit size={16} />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )
                })}
            </div>
            <DialogModal open={openModal} setOpen={() => setOpenModal(false)}>
                <AddProject onClose={() => setOpenModal(false)} onSuccess={onSuccess} />
            </DialogModal>
        </AnimationWrapper>
    )
}

export default ProjectView