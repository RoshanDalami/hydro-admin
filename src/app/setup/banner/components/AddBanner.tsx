"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import { useCreateBanner, useUpdateBanner } from "@/api/hooks/banner.hook";
import { Button } from "@/components/ui/button";
import LoadingButtonCircle from "@/components/reusable/LoadingButtonCircle";
import FormModalHeader from "@/components/reusable/FormModalHeader";
import Image from "next/image";
import { TBanner } from "@/types/banner.type";
import { imageurlgenerator } from "@/utils/imgareurlgenerator";

function AddBanner({
  setOpen,
  refetch,
  editData,
}: {
  setOpen: (open: boolean) => void;
  refetch: () => void;
  editData?: TBanner | null;
}) {
  const isEditMode = !!editData;
  const [isActive, setIsActive] = useState(editData?.isActive ?? true);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    editData?.imageUrl ? imageurlgenerator(editData.imageUrl) : null
  );

  const { mutateAsync: createBanner, isPending: isCreating } =
    useCreateBanner();
  const { mutateAsync: updateBanner, isPending: isUpdating } =
    useUpdateBanner();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEditMode && !image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();

    if (image) {
      formData.append("image", image);
    }

    if (isEditMode) {
      formData.append("id", String(editData?.id));
      await updateBanner(formData);
    } else {
      await createBanner(formData);
    }

    refetch();
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 w-[50vw]">
      <FormModalHeader title={isEditMode ? "Edit Banner" : "Add Banner"} />

      <div className="flex flex-col gap-2">
        <label className="font-medium">Banner Image</label>
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-400 transition-colors">
          {imagePreview ? (
            <div className="relative w-full h-full">
              <Image
                src={imagePreview}
                alt="Banner preview"
                className="object-cover w-full h-full rounded-md"
                width={500}
                height={300}
              />
            </div>
          ) : (
            <span className="text-gray-500">Click to select banner image</span>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        {imagePreview && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setImage(null);
              setImagePreview(null);
            }}
            className="w-fit mt-2"
          >
            <X size={16} className="mr-1" />
            Remove Image
          </Button>
        )}
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button
          className="border-red-600 hover:text-red-600 text-red-600"
          type="button"
          variant="outline"
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isCreating || isUpdating}>
          {isCreating || isUpdating ? (
            <LoadingButtonCircle />
          ) : isEditMode ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>
      </div>
    </form>
  );
}

export default AddBanner;
