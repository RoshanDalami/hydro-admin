"use client"
import PageHeader from '@/components/reusable/PageHeader'
import TeamMemberView from './components/TeamMemberView'
function TeamMembersIndex() {
    return (
        <div>
            <PageHeader title="Team Members" description="Welcome back! Here&apos;s an team members page of your platform." />
            <div>
                <TeamMemberView />
            </div>
        </div>
    )
}

export default TeamMembersIndex