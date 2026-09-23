"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useCreateLogo, useUpdateLogo } from "@/api/hooks/logo.hook";
import { TLogo } from "@/types/logo.type";
import { imageurlgenerator } from "@/utils/imgareurlgenerator";
import NepaliTransliterationInput from "@/components/reusable/NepaliTransliterationInput";
type Props = {
  isEdit: boolean;
  data?: TLogo;
  onClose: () => void;
  onSuccess: () => void;
};

type FormValues = {
  name: string;
  nameNp: string;
  slogan: string;
  sloganNp: string;
  image: FileList;
};

function AddEditLogo({ isEdit, data, onClose, onSuccess }: Props) {
  const { control, register, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: { name: "", nameNp: "", slogan: "", sloganNp: "" },
  });
  const [preview, setPreview] = useState<string | null>(null);

  const { mutate: createLogo } = useCreateLogo();
  const { mutate: updateLogo } = useUpdateLogo();

  // Set edit defaults
  useEffect(() => {
    if (isEdit && data) {
      setValue("name", data.name);
      setValue("nameNp", data.nameNp ?? "");
      setValue("slogan", data.slogan);
      setValue("sloganNp", data.sloganNp ?? "");
      setPreview(imageurlgenerator(data.url)); // existing image
    }
  }, [isEdit, data, setValue]);

  const onSubmit = (formData: FormValues) => {
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("nameNp", formData.nameNp);
    payload.append("slogan", formData.slogan);
    payload.append("sloganNp", formData.sloganNp);

    if (formData.image?.[0]) {
      payload.append("image", formData.image[0]);
    }

    if (isEdit && data?.id) {
      updateLogo({ id: String(data.id), data: payload }, { onSuccess });
    } else {
      createLogo(payload, { onSuccess });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        {isEdit ? "Edit Logo" : "Add Logo"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Company Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Company Name (English)</label>
          <input
            type="text"
            className="input-style"
            {...register("name", { required: true })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Company Name (Nepali)</label>
          <Controller
            control={control}
            name="nameNp"
            render={({ field }) => (
              <NepaliTransliterationInput
                {...field}
                value={field.value ?? ""}
                placeholder="Company name Romanized Nepali ma type garnuhos..."
              />
            )}
          />
        </div>

        {/* Slogan */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Slogan (English)</label>
          <input type="text" className="input-style" {...register("slogan")} />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Slogan (Nepali)</label>
          <Controller
            control={control}
            name="sloganNp"
            render={({ field }) => (
              <NepaliTransliterationInput
                {...field}
                value={field.value ?? ""}
                placeholder="Slogan Romanized Nepali ma type garnuhos..."
              />
            )}
          />
        </div>

        {/* Logo Upload */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Logo</label>
          <input
            type="file"
            accept="image/*"
            className="input-style"
            {...register("image")}
            onChange={handleImageChange}
          />

          {preview && (
            <div className="w-32 h-32 rounded-md border overflow-hidden">
              <img
                src={preview}
                alt="Logo Preview"
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit">{isEdit ? "Update" : "Submit"}</Button>
        </div>
      </form>
    </div>
  );
}

export default AddEditLogo;
