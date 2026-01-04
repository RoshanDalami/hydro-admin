
import React from 'react'
import NoticeView from './components/NoticeView'
import PageHeader from '@/components/reusable/PageHeader'
function NoticePageIndex() {
    return (
        <div className="space-y-6">
            <PageHeader title="Notices" description="Welcome back! Here's an notices of your platform." />
            <NoticeView />
        </div>
    )
}

export default NoticePageIndex