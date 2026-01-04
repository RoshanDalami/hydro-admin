'use client';
import { useState } from 'react';
import { TTeamMember } from '@/types/team-members.type'
import AnimationWrapper from '@/components/reusable/AnimationWrapper';
import { useGetTeamMembers, useDeleteTeamMember } from '@/api/hooks/team-member.hook';
import TeamMemberCardSkeleton from './TeamMemberCardSkeleton';
import TeamMemberCard from './TeamMemberCard';
import AddButton from '@/components/reusable/AddButton';
import DialogModal from '@/components/reusable/DialogModal';
import AddEditTeamMembers from './AddEditTeamMembers';
import AlertDeleteDialogModal from '@/components/reusable/AlertDeleteDialogModal';
import EmptyData from '@/components/reusable/EmptyData';
import { User2 } from 'lucide-react'
function TeamMemberView() {
    const { data, isLoading, refetch } = useGetTeamMembers();
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState<TTeamMember | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const { mutateAsync: deleteTeamMember, isPending: deleteLoading } = useDeleteTeamMember();
    const handleOpenModal = () => {
        setOpen(true);
        setIsEdit(false);
    };

    const handleEdit = (member: TTeamMember) => {
        setOpen(true);
        setIsEdit(true);
        setEditData(member);
    };

    const onClose = () => {
        setOpen(false);
        setIsEdit(false);
        setEditData(null);
    };
    const onSuccess = () => {
        onClose();
        refetch();
    }
    const onDelete = (id: number) => {
        setDeleteId(id)
        setDeleteOpen(true)
    }
    const onConfirm = async () => {
        await deleteTeamMember(deleteId as number)
        refetch()
    }

    if (isLoading) {
        return (
            <AnimationWrapper>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <TeamMemberCardSkeleton key={index} />
                        ))}
                    </div>
                </div>
            </AnimationWrapper>
        )
    }

    return (
        <AnimationWrapper>
            <div className="flex justify-end">
                <AddButton title="Add Member" onClick={handleOpenModal} />
            </div>
            <div className="p-6 space-y-6">
                {data?.length === 0 ? <EmptyData Icon={User2} title="No Members Found" onClick={handleOpenModal} /> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data?.map((member: TTeamMember, index: number) => {
                        return <TeamMemberCard key={index} member={member} onEdit={() => handleEdit(member)} onDelete={onDelete} />
                    })}
                </div>}
            </div>
            <DialogModal open={open} setOpen={setOpen}>
                <AddEditTeamMembers isEdit={isEdit} editData={editData as TTeamMember} onSuccess={onSuccess} onClose={onClose} />
            </DialogModal>
            <AlertDeleteDialogModal open={deleteOpen} onOpenChange={setDeleteOpen} disableState={deleteLoading} onConfirm={onConfirm} />
        </AnimationWrapper>
    );
}

export default TeamMemberView;