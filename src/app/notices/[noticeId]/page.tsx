'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FileText, Image as ImageIcon, CalendarDays, Clock, ArrowLeft } from 'lucide-react'
import PageHeader from '@/components/reusable/PageHeader'
import AnimationWrapper from '@/components/reusable/AnimationWrapper'
import { useGetNoticeById } from '@/api/hooks/notice.hook'
import { imageurlgenerator } from '@/utils/imgareurlgenerator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

function NoticeById() {
    const params = useParams()
    const router = useRouter()
    const noticeId = Number(params.noticeId)

    const { data: notice, isLoading, isError } = useGetNoticeById(noticeId)

    if (isLoading) {
        return (
            <div className="flex justify-center py-20 text-muted-foreground animate-pulse">
                Loading notice details...
            </div>
        )
    }

    if (isError || !notice) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <p className="text-muted-foreground">Notice not found</p>
                <Button variant="outline" onClick={() => router.back()}>
                    Go Back
                </Button>
            </div>
        )
    }

    return (
        <AnimationWrapper>
            <PageHeader title="Notice Details" description="View and manage notice details" />
            <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
                <Button
                    variant="ghost"
                    className="gap-2 pl-0 hover:pl-2 transition-all"
                    onClick={() => router.back()}
                >
                    <ArrowLeft size={16} />
                    Back to Notices
                </Button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Card className="rounded-2xl shadow-sm border-border/50 overflow-hidden">
                        <CardHeader className="space-y-6 pb-6 border-b bg-muted/10">
                            <div className="space-y-4">
                                <div className="flex items-start justify-between gap-4">
                                    <CardTitle className="text-2xl md:text-3xl font-bold leading-tight">
                                        {notice.title}
                                    </CardTitle>
                                    <Badge variant={notice.isActive ? 'default' : 'secondary'} className="rounded-md px-3 py-1 text-sm">
                                        {notice.isActive ? 'Active' : 'Inactive'}
                                    </Badge>
                                </div>

                                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full">
                                        <CalendarDays size={16} />
                                        {notice.publishDate}
                                    </span>
                                    <span className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full">
                                        <Clock size={16} />
                                        {notice.time}
                                    </span>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-8 pt-8">
                            <div className="prose prose-stone max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                {notice.content}
                            </div>

                            {notice.noticeMedias?.length > 0 && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold flex items-center gap-2">
                                        <ImageIcon className="text-primary" size={20} />
                                        Attached Media
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {notice.noticeMedias.map((media: any) => (
                                            <div
                                                key={media.id}
                                                className="group relative rounded-xl border bg-muted/30 overflow-hidden hover:border-primary/50 transition-colors"
                                            >
                                                {media.mediaType === 'image' ? (
                                                    <div className="aspect-square relative cursor-pointer" onClick={() => window.open(imageurlgenerator(media.mediaUrl), '_blank')}>
                                                        <img
                                                            src={imageurlgenerator(media.mediaUrl)}
                                                            alt="notice media"
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                            <Button variant="secondary" size="sm" className="pointer-events-none">
                                                                View Image
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <a
                                                        href={imageurlgenerator(media.mediaUrl)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="aspect-square flex flex-col items-center justify-center gap-3 p-4 text-center hover:bg-muted/50 transition-colors"
                                                    >
                                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                            <FileText size={24} />
                                                        </div>
                                                        <span className="text-sm font-medium w-full px-2 line-clamp-2">
                                                            View PDF Document
                                                        </span>
                                                    </a>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </AnimationWrapper>
    )
}

export default NoticeById