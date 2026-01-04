'use client';

import React, { useState, useRef } from 'react';
import Select from 'react-select';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { X, Upload, Image as ImageIcon } from 'lucide-react';

import { useGetGalleryCategory } from '@/api/hooks/gallery-category.hook';
import { useCreateGalleryImage } from '@/api/hooks/gallery-image.hook';
import { TGalleryImageCreatePayload } from '@/types/gallery-image.type';
import { Button } from '@/components/ui/button';

type Props = {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
};

function AddEditGallaryForm({ open, onClose, onSuccess }: Props) {
    const { data: galleryCategories } = useGetGalleryCategory();
    const { mutateAsync: createGalleryImage } = useCreateGalleryImage();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        control,
        setValue,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<TGalleryImageCreatePayload>();

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    if (!open) return null;

    /* ---------------- Submit ---------------- */
    const onSubmit = async (data: TGalleryImageCreatePayload) => {
        const formData = new FormData();

        formData.append(
            'imageCategoryId',
            String(data.imageCategoryId)
        );

        selectedFiles.forEach((file) => {
            formData.append('images', file);
        });

        await createGalleryImage(formData);

        handleClose();
        onSuccess();
    };

    const handleClose = () => {
        reset();
        setSelectedFiles([]);
        setPreviews([]);
        onClose();
    };

    /* ---------------- Image Handling ---------------- */
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);

            // Create previews for new files
            const newPreviews = newFiles.map(file => URL.createObjectURL(file));

            // Update states by appending new files
            setSelectedFiles(prev => {
                const updated = [...prev, ...newFiles];
                setValue('images', updated);
                return updated;
            });

            setPreviews(prev => [...prev, ...newPreviews]);
        }

        // Reset input value to allow selecting same file again if needed
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeImage = (indexToRemove: number) => {
        setSelectedFiles(prev => {
            const updated = prev.filter((_, index) => index !== indexToRemove);
            setValue('images', updated);
            return updated;
        });

        setPreviews(prev => {
            // Revoke the URL to avoid memory leak
            URL.revokeObjectURL(prev[indexToRemove]);
            return prev.filter((_, index) => index !== indexToRemove);
        });
    };

    return (
        <div className="max-w-4xl bg-white rounded-xl shadow-lg p-6 space-y-4 w-[50vw]">
            <h2 className="text-xl font-semibold">Add Gallery Images</h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
            >
                {/* Category */}
                <div>
                    <label className="form-label">Gallery Category</label>
                    <Controller
                        control={control}
                        name="imageCategoryId"
                        rules={{ required: true }}
                        render={({ field: { onChange, value, ref } }) => {
                            const options = galleryCategories?.map((item) => ({
                                value: item.id,
                                label: item.title,
                            }));

                            return (
                                <Select
                                    ref={ref}
                                    options={options}
                                    value={options?.find((c) => c.value === value)}
                                    onChange={(val) => onChange(val?.value)}
                                    placeholder="Select category"
                                />
                            );
                        }}
                    />
                </div>

                {/* Images Upload */}
                <div>
                    <label className="form-label mb-2 block">Images</label>

                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:bg-gray-50 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2 text-gray-500"
                    >
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        <div className="bg-blue-50 p-3 rounded-full">
                            <Upload className="w-6 h-6 text-blue-500" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-700">Click to upload images</p>
                            <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF</p>
                        </div>
                    </div>

                    {/* Preview Grid */}
                    {previews.length > 0 && (
                        <div className="grid grid-cols-3 gap-3 mt-4">
                            {previews.map((src, index) => (
                                <div
                                    key={index}
                                    className="relative group w-full aspect-square rounded-lg overflow-hidden border bg-gray-100"
                                >
                                    <Image
                                        src={src}
                                        alt={`Preview ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeImage(index);
                                            }}
                                            className="bg-white/90 p-1.5 rounded-full text-red-500 hover:bg-white hover:text-red-600 transition-colors shadow-sm"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                        className='cancel-btn'
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={selectedFiles.length === 0}>
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default AddEditGallaryForm;