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
import NepaliTransliterationTextarea from "@/components/reusable/NepaliTransliterationTextarea";
const plainTextToHtml = (value: string) =>
  value
    .split("\n")
    .map((line) => {
      const escaped = line
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
      return `<p>${escaped || "<br>"}</p>`;
    })
    .join("");

function AddEditAboutUs({
  setOpen,
  refetch,
  editData,
  isEditMode = false,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
  editData?: TAboutUs | null;
  isEditMode?: boolean;
}) {
  const [content, setContent] = useState(editData?.content || "");
  const [contentNp, setContentNp] = useState(editData?.contentNp || "");
  const [nepaliDraft, setNepaliDraft] = useState("");

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
        contentNp,
      };
      await updateAboutUs(payload);
    } else {
      const payload: TAboutUsPayload = {
        content,
        contentNp,
      };
      await createAboutUs(payload);
    }
    refetch();
    setOpen(false);
  };

  const isPending = isCreating || isUpdating;

  return (
    <div className="p-5 flex flex-col gap-6 w-[50vw]">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {isEditMode ? "Edit About Us" : "Add About Us"}
        </h2>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">About Us (English)</label>
            <CKEditor
              onChange={(data) => setContent(data)}
              value={content}
              placeholder="Type the English About Us content..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">About Us (Nepali)</label>
            <CKEditor
              onChange={(data) => setContentNp(data)}
              value={contentNp}
              placeholder="Type or format the Nepali About Us content..."
            />
            <div className="mt-2 flex flex-col gap-2 rounded-md border border-dashed p-3">
              <p className="text-sm font-medium">
                Romanized Nepali typing helper
              </p>
              <p className="text-sm text-muted-foreground">
                Type Romanized Nepali here and choose a suggestion. The
                converted text appears in the CKEditor above. Example: namaste{" "}
                {"\u2192"} {"\u0928\u092e\u0938\u094d\u0924\u0947"}
              </p>
              <NepaliTransliterationTextarea
                value={nepaliDraft}
                onChange={(value) => {
                  setNepaliDraft(value);
                  setContentNp(plainTextToHtml(value));
                }}
                rows={4}
                disabled={isPending}
              />
            </div>
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
            disabled={!content || !contentNp || isPending}
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
