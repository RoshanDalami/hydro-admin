'use client'

import React from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Images, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

import { useGetProjectById } from '@/api/hooks/project.hook'
import AnimationWrapper from '@/components/reusable/AnimationWrapper'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { imageurlgenerator } from '@/utils/imgareurlgenerator'

const PLACEHOLDER_IMAGE = 'https://placehold.co/1200x800?text=No+Project+Image'

function ProjectDetailView() {
    const { projectId } = useParams() as { projectId: string }
    const router = useRouter()
    const { data: project, isLoading } = useGetProjectById(projectId)

    const constraintsRef = React.useRef<HTMLDivElement>(null)
    const [currentIndex, setCurrentIndex] = React.useState(0)

    const images =
        project?.projectImages && project.projectImages.length > 0
            ? project.projectImages.map((img) => imageurlgenerator(img.imageUrl))
            : [PLACEHOLDER_IMAGE]

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
    }

    const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
        const threshold = 50
        if (info.offset.x > threshold) goToPrevious()
        else if (info.offset.x < -threshold) goToNext()
    }

    if (isLoading) {
        return (
            <AnimationWrapper>
                <div className="container max-w-7xl mx-auto px-4 py-8">
                    <div className="space-y-8">
                        <div className="h-12 w-64 bg-muted animate-pulse rounded-lg" />
                        <div className="h-[500px] bg-muted animate-pulse rounded-xl" />
                        <div className="space-y-6">
                            <div className="h-10 w-3/4 bg-muted animate-pulse rounded-lg" />
                            <div className="space-y-3">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-4 bg-muted animate-pulse rounded-md" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </AnimationWrapper>
        )
    }

    if (!project) {
        return (
            <AnimationWrapper>
                <div className="container max-w-7xl mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
                    <h2 className="text-3xl font-bold text-muted-foreground mb-4">Project not found</h2>
                    <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist or has been removed.</p>
                    <Button onClick={() => router.back()}>Go Back</Button>
                </div>
            </AnimationWrapper>
        )
    }

    return (
        <AnimationWrapper>
            <div className="container max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.back()}
                            className="rounded-full"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <h1 className="text-3xl font-bold tracking-tight">Project Details</h1>
                    </div>
                </div>

                {/* Image Gallery - Full Width */}
                <Card className="overflow-hidden border mb-8">
                    <div className="relative bg-muted/30" ref={constraintsRef}>
                        <div className="relative w-full h-[500px] overflow-hidden">
                            <AnimatePresence initial={false} mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    className="absolute inset-0"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Image
                                        src={images[currentIndex]}
                                        alt={`${project.title} - Image ${currentIndex + 1}`}
                                        fill
                                        className="object-contain"
                                        priority={currentIndex === 0}
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Overlay Badge */}
                            {images.length > 1 && (
                                <Badge className="absolute bottom-4 left-4 pointer-events-none flex items-center gap-1.5 bg-background/90 backdrop-blur-sm">
                                    <Images className="h-3.5 w-3.5" />
                                    {images.length} Images
                                </Badge>
                            )}

                            {/* Navigation Arrows */}
                            {images.length > 1 && (
                                <>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 backdrop-blur-sm pointer-events-auto z-10"
                                        onClick={goToPrevious}
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 backdrop-blur-sm pointer-events-auto z-10"
                                        onClick={goToNext}
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </Button>
                                </>
                            )}

                            {/* Drag Support */}
                            <motion.div
                                className="absolute inset-0 cursor-grab active:cursor-grabbing pointer-events-none"
                                drag="x"
                                dragConstraints={constraintsRef}
                                dragElastic={0.2}
                                onDragEnd={handleDragEnd}
                            />
                        </div>

                        {/* Dots Indicator */}
                        {images.length > 1 && (
                            <div className="flex justify-center gap-2 py-4">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`h-2 rounded-full transition-all ${index === currentIndex
                                            ? 'w-8 bg-primary'
                                            : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                                            }`}
                                        aria-label={`Go to image ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </Card>

                {/* Project Details */}
                <Card className="overflow-hidden border">
                    <div className="p-8 lg:p-12">
                        <div className="mb-8">
                            <h2 className="text-4xl font-bold mb-3">{project.title}</h2>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <time dateTime={project.createdAt}>
                                    {new Date(project.createdAt).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </time>
                            </div>
                        </div>

                        <Separator className="mb-8" />

                        {/* Content with Full-Width Tables and Images */}
                        <div
                            className="prose prose-lg dark:prose-invert max-w-none
                                [&_p]:leading-relaxed [&_p]:mb-4
                                [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4
                                [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-3
                                [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2
                                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
                                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
                                [&_li]:my-1
                                [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2
                                [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:my-6 [&_blockquote]:text-muted-foreground
                                [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-6
                                [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm
                                [&_hr]:my-8 [&_hr]:border-border"
                            dangerouslySetInnerHTML={{ __html: project.content }}
                        />
                    </div>
                </Card>
            </div>
        </AnimationWrapper>
    )
}

export default ProjectDetailView