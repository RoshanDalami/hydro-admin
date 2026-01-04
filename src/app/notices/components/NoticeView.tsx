'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Image as ImageIcon, CalendarDays, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import AddButton from '@/components/reusable/AddButton'
import AnimationWrapper from '@/components/reusable/AnimationWrapper'
import { useGetNotices } from '@/api/hooks/notice.hook'
import { imageurlgenerator } from '@/utils/imgareurlgenerator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import AddNoticeForm from './AddNoticeForm'
import DialogModal from '@/components/reusable/DialogModal'
function NoticeView() {
    const { data, isLoading, refetch } = useGetNotices()
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const handleAddNotice = () => {
        setOpen(true)
    }

    const handleAddSuccess = () => {
        setOpen(false)
    }

    if (isLoading) {
        return (
            <div className="max-w-5xl mx-auto px-4 space-y-6">
                {[...Array(3)].map((_, i) => (
                    <Card key={i} className="rounded-2xl shadow-sm border-border/50 overflow-hidden">
                        <CardHeader className="space-y-3 pb-4">
                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-1.5 flex-1">
                                    <Skeleton className="h-6 w-3/4" />
                                    <div className="flex items-center gap-3 mt-2">
                                        <Skeleton className="h-5 w-16" />
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-4 w-20" />
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }

    return (
        <AnimationWrapper>
            <AddButton title='Add Notice' onClick={handleAddNotice} />
            <div className="max-w-5xl mx-auto px-4 space-y-6">
                {data?.map((notice: any, index: number) => (
                    <motion.div
                        key={notice.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                        <Card className="rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border-border/50 overflow-hidden group">
                            <CardHeader className="space-y-3 pb-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="space-y-1.5 flex-1">
                                        <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors cursor-pointer" onClick={() => router.push(`/notices/${notice.id}`)}>
                                            {notice.title}
                                        </CardTitle>
                                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                            <Badge variant={notice.isActive ? 'default' : 'secondary'} className="rounded-md">
                                                {notice.isActive ? 'Active' : 'Inactive'}
                                            </Badge>
                                            <span className="flex items-center gap-1.5">
                                                <CalendarDays size={14} />
                                                {notice.publishDate}
                                            </span>
                                            <span className="w-1 h-1 rounded-full bg-border" />
                                            <span className="flex items-center gap-1.5">
                                                <Clock size={14} />
                                                {notice.time}
                                            </span>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => router.push(`/notices/${notice.id}`)}>
                                        <FileText className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-5">
                                <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                                    {notice.content}
                                </p>

                                {notice.noticeMedias?.length > 0 && (
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                        {notice.noticeMedias.map((media: any) => (
                                            <div
                                                key={media.id}
                                                className="group/media relative rounded-xl border bg-muted/30 overflow-hidden hover:border-primary/50 transition-colors"
                                            >
                                                {media.mediaType === 'image' ? (
                                                    <div className="aspect-square relative cursor-pointer" onClick={() => window.open(imageurlgenerator(media.mediaUrl), '_blank')}>
                                                        <img
                                                            src={imageurlgenerator(media.mediaUrl)}
                                                            alt="notice media"
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover/media:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-black/0 group-hover/media:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover/media:opacity-100">
                                                            <ImageIcon className="text-white drop-shadow-md" />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <a
                                                        href={imageurlgenerator(media.mediaUrl)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="aspect-square flex flex-col items-center justify-center gap-2 p-3 text-center hover:bg-muted/50 transition-colors"
                                                    >
                                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover/media:bg-blue-600 group-hover/media:text-white transition-colors">
                                                            <FileText size={20} />
                                                        </div>
                                                        <span className="text-xs font-medium truncate w-full px-1">
                                                            PDF Doc
                                                        </span>
                                                    </a>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
            <DialogModal open={open} setOpen={setOpen}>
                <AddNoticeForm onSuccess={handleAddSuccess} onClose={() => setOpen(false)} />
            </DialogModal>
        </AnimationWrapper>
    )
}

export default NoticeView