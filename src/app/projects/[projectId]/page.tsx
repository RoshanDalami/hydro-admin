'use client'

import React from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Edit, Trash2, Images, Calendar } from 'lucide-react'

import { useGetProjectById } from '@/api/hooks/project.hook'
import AnimationWrapper from '@/components/reusable/AnimationWrapper'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { imageurlgenerator } from '@/utils/imgareurlgenerator'
import { Separator } from '@/components/ui/separator'

const PLACEHOLDER_IMAGE =
    'https://placehold.co/600x400?text=No+Project+Image'

function ProjectDetailView() {
    const { projectId }: { projectId: string } = useParams()
    console.log(projectId, "projectid")
    const router = useRouter()
    const { data: project, isLoading } = useGetProjectById(projectId)

    const constraintsRef = React.useRef(null)

    if (isLoading) {
        return (
            <AnimationWrapper>
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                        <div className="h-8 w-48 rounded-md bg-muted animate-pulse" />
                    </div>
                    <div className="h-[400px] w-full rounded-2xl bg-muted animate-pulse" />
                    <div className="space-y-4">
                        <div className="h-8 w-3/4 rounded-md bg-muted animate-pulse" />
                        <div className="h-4 w-1/4 rounded-md bg-muted animate-pulse" />
                        <div className="space-y-2 pt-4">
                            <div className="h-4 w-full rounded-md bg-muted animate-pulse" />
                            <div className="h-4 w-full rounded-md bg-muted animate-pulse" />
                            <div className="h-4 w-2/3 rounded-md bg-muted animate-pulse" />
                        </div>
                    </div>
                </div>
            </AnimationWrapper>
        )
    }

    if (!project) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
                <h2 className="text-2xl font-bold text-muted-foreground">Project not found</h2>
                <Button variant="outline" onClick={() => router.back()}>
                    Go Back
                </Button>
            </div>
        )
    }

    const images =
        project?.projectImages?.length && project.projectImages.length > 0
            ? project.projectImages.map((img) =>
                imageurlgenerator(img.imageUrl)
            )
            : [PLACEHOLDER_IMAGE]



    return (
        <AnimationWrapper>
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.back()}
                        className="rounded-full hover:bg-muted"
                    >
                        <ArrowLeft size={20} />
                    </Button>
                    <h1 className="text-2xl font-bold tracking-tight">Project Details</h1>
                </div>
                <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                        <Edit size={16} className="mr-2" />
                        Edit
                    </Button>
                    <Button size="sm" variant="destructive">
                        <Trash2 size={16} className="mr-2" />
                        Delete
                    </Button>
                </div>
            </div>

            <Card className="overflow-hidden border-none shadow-none bg-transparent">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Left Column: Images */}
                    <div className="space-y-4">
                        <div
                            className="relative overflow-hidden rounded-2xl border bg-card shadow-sm"
                            ref={constraintsRef}
                        >
                            <motion.div
                                className="flex cursor-grab active:cursor-grabbing"
                                drag="x"

                            >
                                {images.map((src, index) => (
                                    <div key={index} className="min-w-full flex-shrink-0 relative aspect-video bg-muted">
                                        <Image
                                            src={src}
                                            alt={`${project.title} - Image ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </motion.div>

                            {images.length > 1 && (
                                <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-sm pointer-events-none">
                                    <Images size={14} />
                                    <span>{images.length} Images</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-3xl font-bold text-foreground mb-2">{project.title}</h2>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar size={16} />
                                <span>Created on {new Date(project.createdAt).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</span>
                            </div>
                        </div>

                        <Separator />

                        <div className="prose prose-neutral dark:prose-invert max-w-none">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: project.content,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </Card>
        </AnimationWrapper>
    )
}

export default ProjectDetailView