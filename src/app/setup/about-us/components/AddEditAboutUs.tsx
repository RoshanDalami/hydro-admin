"use client";
import { useState } from "react";
import React from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { useCreateAboutUs, useUpdateAboutUs } from "@/api/hooks/about-us.hook";
import {
  TAboutUsPayload,
  TAboutUsUpdatePayload,
  TAboutUs,
} from "@/types/about-us.type";
import LoadingButtonCircle from "@/components/reusable/LoadingButtonCircle";
const CKEditor = dynamic(() => import("@/components/reusable/CKEditor"), {
  ssr: false,
});
import AboutUsEditSkeleton from "./AboutUsEditSkeleton";

function AddEditAboutUs({
  setOpen,
  refetch,
  editData,
  isEditMode = false
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
  editData?: TAboutUs | null;
  isEditMode?: boolean;
}) {

  const [content, setContent] = useState(editData?.content || "");

  const handleCancel = () => {
    setOpen(false);
  };

  const { mutateAsync: createAboutUs, isPending: isCreating } =
    useCreateAboutUs();
  const { mutateAsync: updateAboutUs, isPending: isUpdating } =
    useUpdateAboutUs();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditMode && editData) {
      const payload: TAboutUsUpdatePayload = {
        id: editData.id,
        content,
      };
      await updateAboutUs(payload);
    } else {
      const payload: TAboutUsPayload = {
        content,
      };
      await createAboutUs(payload);
    }
    refetch();
    setOpen(false);
  };

  const isPending = isCreating || isUpdating;

  return (
    <div className="p-5 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {isEditMode ? "Edit About Us" : "Add About Us"}
        </h2>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            {/* <label htmlFor="content" className='text-xl font-bold'>Content</label> */}
            <CKEditor onChange={(data) => setContent(data)} value={content} />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            className="btn text-red-600 border-red-600 hover:text-red-600 hover:border-red-700"
            variant={"outline"}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            disabled={!content || isPending}
            type="submit"
            className="btn bg-blue-600 hover:bg-blue-700"
          >
            {isPending ? <LoadingButtonCircle /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddEditAboutUs;
