import React from 'react'
import PageHeader from '@/components/reusable/PageHeader'
import ProjectView from './components/ProjectView'
function ProjectViewInex() {
    return (
        <div>
            <PageHeader
                title="Projects"
                description="Welcome back! Here's an projects of your platform."
            />
            <ProjectView />
        </div>
    )
}

export default ProjectViewInex