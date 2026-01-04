"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import {
  useCreateActivities,
  useUpdateActivities,
} from "@/api/hooks/activities.hook";
import { Button } from "@/components/ui/button";
import LoadingButtonCircle from "@/components/reusable/LoadingButtonCircle";
import Image from "next/image";
import dynamic from "next/dynamic";
import { TActivities } from "@/types/activities.type";

const CKEditor = dynamic(() => import("@/components/reusable/CKEditor"), {
  ssr: false,
});

function AddActivities({
  setOpen,
  refetch,
  editData,
}: {
  setOpen: (open: boolean) => void;
  refetch: () => void;
  editData?: TActivities | null;
}) {
  const isEditMode = !!editData;
  const [title, setTitle] = useState(editData?.title || "");
  const [content, setContent] = useState(editData?.content || "");
  const [startDate, setStartDate] = useState(editData?.startDate || "");
  const [endDate, setEndDate] = useState(editData?.endDate || "");
  const [isActive, setIsActive] = useState(editData?.isActive ?? true);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const { mutateAsync: createActivities, isPending: isCreating } =
    useCreateActivities();

  // For update, you would implement useUpdateActivities similarly
  const { mutateAsync: updateActivities, isPending: isUpdating } =
    useUpdateActivities();

  React.useEffect(() => {
    if (isEditMode && editData) {
      setTitle(editData.title);
      setContent(editData.content);
      setStartDate(editData.startDate);
      setEndDate(editData.endDate);
      setIsActive(editData.isActive);
    }
  }, [editData, isEditMode]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);
      // Generate previews
      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("isActive", String(isActive));
    images.forEach((img) => formData.append("images", img));
    if (isEditMode) {
      formData.append("id", String(editData?.id));
      await updateActivities(formData);
    } else {
      await createActivities(formData);
    }
    refetch();
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <label className="font-medium">Title</label>
        <input
          className="input-style"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium">Content</label>
        <CKEditor value={content} onChange={setContent} />
      </div>
      <div className="flex gap-2">
        <div className="flex flex-col gap-2 w-1/2">
          <label className="font-medium">Start Date</label>
          <input
            type="date"
            className="input-style"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <label className="font-medium">End Date</label>
          <input
            type="date"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          id="isActive"
        />
        <label htmlFor="isActive">Active</label>
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium">Images</label>
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-400 transition-colors">
          <span className="text-gray-500">Click to select images</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        {imagePreviews.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {imagePreviews.map((src, idx) => (
              <div
                key={idx}
                className="relative w-20 h-20 border rounded overflow-hidden group"
              >
                <Image
                  src={src}
                  alt={`preview-${idx}`}
                  className="object-cover w-full h-full"
                  width={80}
                  height={80}
                />
                <button
                  type="button"
                  onClick={() => {
                    setImages((prev) => prev.filter((_, i) => i !== idx));
                    setImagePreviews((prev) =>
                      prev.filter((_, i) => i !== idx)
                    );
                  }}
                  className="absolute top-1 right-1 bg-white/80 rounded-full p-0.5 hover:bg-red-500 hover:text-white transition-colors z-10 cursor-pointer opacity-0 group-hover:opacity-100"
                  aria-label="Remove image"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-end gap-2">
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
export default AddActivities;
