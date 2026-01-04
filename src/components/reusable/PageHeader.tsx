import React from 'react'

function PageHeader({ title, description }: { title: string; description: string }) {
    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
                {title}
            </h1>
            <p className="text-muted-foreground mt-1">
                {description}
            </p>
        </div>
    )
}

export default PageHeader