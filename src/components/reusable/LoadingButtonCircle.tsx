import React from 'react'
import { LoaderCircle } from 'lucide-react'

function LoadingButtonCircle({ size }: { size?: number }) {
    return (
        <span className='flex items-center justify-center'>
            <LoaderCircle className='animate-spin' size={size || 20} />
        </span>
    )
}

export default LoadingButtonCircle