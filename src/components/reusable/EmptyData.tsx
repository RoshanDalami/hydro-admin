import React from 'react'
import { LucideIcon } from 'lucide-react'
import { Button } from '../ui/button'

function EmptyData({ title, Icon, onClick, buttonText }: { title: string, Icon: LucideIcon, onClick: () => void, buttonText?: string }) {
    return (
        <div className='flex min-h-[400px] w-full flex-col items-center justify-center gap-5 rounded-2xl border border-dashed bg-white/50 p-8 text-center animate-in fade-in-50 zoom-in-95 dark:bg-zinc-950/50'>
            <div className='group flex h-20 w-20 items-center justify-center rounded-full bg-primary/5 ring-8 ring-primary/5 transition-all duration-300 hover:scale-105 hover:bg-primary/10 hover:ring-primary/10'>
                <Icon
                    className='h-10 w-10 text-primary/80 transition-transform duration-300 group-hover:scale-110'
                    strokeWidth={1.5}
                />
            </div>
            <div className='max-w-xs space-y-1'>
                <h3 className='text-lg font-semibold tracking-tight text-foreground'>
                    {title}
                </h3>
                <p className='text-sm text-muted-foreground'>
                    It seems there are no records available at the moment.
                </p>
            </div>
            <div>
                <Button className='bg-blue-600 hover:bg-blue-700' onClick={onClick}>
                    {buttonText || 'Add New'}
                </Button>
            </div>
        </div>
    )
}

export default EmptyData