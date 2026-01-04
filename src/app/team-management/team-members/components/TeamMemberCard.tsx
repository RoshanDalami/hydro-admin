import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Edit, Trash2, Mail, Phone } from 'lucide-react'
import { TTeamMember } from '@/types/team-members.type'
import { imageurlgenerator } from '@/utils/imgareurlgenerator'
import { Button } from '@/components/ui/button'

function TeamMemberCard({ member, onEdit, onDelete }: { member: TTeamMember, onEdit?: () => void, onDelete?: (id: number) => void }) {
    const imageUrl = imageurlgenerator(member.imageUrl);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm border p-4 flex flex-col"
        >
            {/* Image */}
            <div className="relative w-full h-56 rounded-lg overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={member.memberName}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Info */}
            <div className="mt-4 flex-1 space-y-1">
                <h3 className="text-lg font-semibold">
                    {member.memberName}
                </h3>

                <p className="text-sm text-muted-foreground">
                    {member.position} · {member.role}
                </p>

                <span className="inline-block text-xs px-2 py-1 rounded bg-gray-100 mt-1">
                    {member.teamCategory}
                </span>

                {/* Contact */}
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Mail size={14} />
                        <span>{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone size={14} />
                        <span>{member.contact}</span>
                    </div>
                </div>
            </div>

            {/* Status */}
            <div className="mt-3">
                <span
                    className={`text-xs px-2 py-1 rounded ${member.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                        }`}
                >
                    {member.isActive ? 'Active' : 'Inactive'}
                </span>
            </div>

            {/* Actions */}
            <div className="mt-4 flex justify-end gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center "
                    onClick={onEdit}
                >
                    <Edit size={16} />
                    Edit
                </Button>

                <Button
                    variant="destructive"
                    size="sm"
                    className="flex items-center"
                    onClick={() => onDelete?.(member.id)}
                >
                    <Trash2 size={16} />
                    Delete
                </Button>
            </div>
        </motion.div>
    )
}

export default TeamMemberCard