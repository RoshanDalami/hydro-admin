'use client';

import React, { useEffect, useState } from 'react';
import AnimationWrapper from '@/components/reusable/AnimationWrapper';
import FormModalHeader from '@/components/reusable/FormModalHeader';
import { Button } from '@/components/ui/button';

import { useGetTeamCategories } from '@/api/hooks/team-category.hook';
import { useGetRoles } from '@/api/hooks/roles.hook';
import { useGetPositions } from '@/api/hooks/position.hook';
import { useCreateTeamMember, useUpdateTeamMember } from '@/api/hooks/team-member.hook';
import LoadingButtonCircle from '@/components/reusable/LoadingButtonCircle';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';
import { TTeamMember } from '@/types/team-members.type';
import { imageurlgenerator } from '@/utils/imgareurlgenerator';
type Props = {
    isEdit: boolean;
    editData?: TTeamMember;
    onClose?: () => void;
    onSuccess?: () => void;
};

type FormValues = {
    memberName: string;
    email: string;
    contact: string;
    teamCategory: { label: string; value: number } | null;
    role: { label: string; value: number } | null;
    position: { label: string; value: number } | null;
    image: FileList;
};

function AddEditTeamMembers({
    isEdit,
    editData,
    onClose,
    onSuccess,
}: Props) {
    const { data: teamCategories } = useGetTeamCategories();
    const { data: roles } = useGetRoles();
    const { data: positions } = useGetPositions();

    const { mutateAsync: createTeamMember, isPending: createLoading } = useCreateTeamMember();
    const { mutateAsync: updateTeamMember, isPending: updateLoading } = useUpdateTeamMember();
    const isPending = createLoading || updateLoading;
    const {
        register,
        handleSubmit,
        control,
        setValue,
    } = useForm<FormValues>();

    const [preview, setPreview] = useState<string | null>(null);

    /* ------------------ Options ------------------ */
    const teamCategoryOptions =
        teamCategories?.map((c) => ({ value: c.id, label: c.title })) || [];

    const roleOptions =
        roles?.map((r) => ({ value: r.id, label: r.title })) || [];

    const positionOptions =
        positions?.map((p) => ({ value: p.id, label: p.title })) || [];

    /* ------------------ Edit Defaults ------------------ */
    useEffect(() => {
        if (isEdit && editData) {
            setValue('memberName', editData.memberName);
            setValue('email', editData.email);
            setValue('contact', editData.contact);

            setValue('teamCategory', {
                value: editData.teamCategoryId,
                label: editData.teamCategory,
            });

            setValue('role', {
                value: editData.roleId,
                label: editData.role,
            });

            setValue('position', {
                value: editData.positionId,
                label: editData.position,
            });

            if (editData.imageUrl) {
                setPreview(
                    imageurlgenerator(editData.imageUrl)
                );
            }
        }
    }, [isEdit, editData, setValue]);

    /* ------------------ Submit ------------------ */
    const onSubmit = async (data: FormValues) => {
        const formData = new FormData();

        formData.append('memberName', data.memberName);
        formData.append('email', data.email);
        formData.append('contact', data.contact);
        formData.append('teamCategoryId', String(data.teamCategory?.value));
        formData.append('roleId', String(data.role?.value));
        formData.append('positionId', String(data.position?.value));
        if (isEdit && editData?.id) {
            formData.append('id', String(editData.id));
        }

        if (data.image?.[0]) {
            formData.append('image', data.image[0]);
        }

        if (isEdit && editData?.id) {
            await updateTeamMember(formData);
        } else {
            await createTeamMember(formData);
        }

        onSuccess?.();
        onClose?.();
    };

    /* ------------------ Image Preview ------------------ */
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <AnimationWrapper>
            <div className="p-6 space-y-4 w-[50vw]">
                <FormModalHeader
                    title={isEdit ? 'Edit Team Member' : 'Add Team Member'}
                />

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    {/* Member Name */}
                    <div className='flex flex-col gap-2'>
                        <label className="form-label">Member Name</label>
                        <input
                            {...register('memberName', { required: true })}
                            placeholder='Enter member name'
                            className="input-style"
                        />
                    </div>

                    {/* Email */}
                    <div className='flex flex-col gap-2'>
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            className="input-style"
                            placeholder='Enter email'
                        />
                    </div>

                    {/* Contact */}
                    <div className='flex flex-col gap-2'>
                        <label className="form-label">Contact</label>
                        <input
                            {...register('contact')}
                            className="input-style"
                            placeholder='Enter contact'
                        />
                    </div>

                    {/* Team Category */}
                    <div className='flex flex-col gap-2'>
                        <label className="form-label">Team Category</label>
                        <Controller
                            control={control}
                            name="teamCategory"
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={teamCategoryOptions}
                                    placeholder="Select category"
                                />
                            )}
                        />
                    </div>

                    {/* Role */}
                    <div className='flex flex-col gap-2'>
                        <label className="form-label">Role</label>
                        <Controller
                            control={control}
                            name="role"
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={roleOptions}
                                    placeholder="Select role"
                                />
                            )}
                        />
                    </div>

                    {/* Position */}
                    <div className='flex flex-col gap-2'>
                        <label className="form-label">Position</label>
                        <Controller
                            control={control}
                            name="position"
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={positionOptions}
                                    placeholder="Select position"
                                />
                            )}
                        />
                    </div>

                    {/* Image */}
                    {/* Image Upload Section */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-medium text-gray-700">Profile Image</label>

                        <div className="flex flex-col gap-4">
                            {preview ? (
                                <div className="relative w-40 h-40 rounded-xl overflow-hidden border-2 border-gray-200 group shadow-sm bg-gray-50">
                                    <Image
                                        src={preview}
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setPreview(null);
                                                setValue('image', null as any);
                                            }}
                                            className="bg-white/90 p-2 rounded-full hover:bg-white text-red-500 transition-transform transform hover:scale-110 shadow-lg"
                                            title="Remove image"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <label
                                    htmlFor="image-upload"
                                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-50 hover:border-blue-500/50 transition-all cursor-pointer group bg-white"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                                        <div className="bg-blue-50 p-3 rounded-full mb-3 group-hover:bg-blue-100 transition-colors">
                                            <Upload className="w-6 h-6 text-blue-500" />
                                        </div>
                                        <p className="mb-1 text-sm text-gray-700 font-medium">
                                            <span className="font-semibold text-blue-500">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">SVG, PNG, JPG or WEBP</p>
                                    </div>
                                    <input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        {...(() => {
                                            const { onChange, ...rest } = register('image');
                                            return {
                                                ...rest,
                                                onChange: (e: any) => {
                                                    onChange(e);
                                                    handleImageChange(e);
                                                }
                                            }
                                        })()}
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="md:col-span-2 flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            className='cancel-btn'
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button disabled={isPending} type="submit">
                            {isPending ? <LoadingButtonCircle /> : isEdit ? 'Update' : 'Submit'}
                        </Button>
                    </div>
                </form>
            </div>
        </AnimationWrapper>
    );
}

export default AddEditTeamMembers;