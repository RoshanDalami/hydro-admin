import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormModalHeader from "@/components/reusable/FormModalHeader";
import {
  useCreateTeamCategory,
  useUpdateTeamCategory,
} from "@/api/hooks/team-category.hook";
import LoadingButtonCircle from "@/components/reusable/LoadingButtonCircle";
import { X } from "lucide-react";
import { TTeamCategory } from "@/types/team-category.type";

type Props = {
  isEdit: boolean;
  editData?: TTeamCategory;
  onClose?: () => void;
  onSuccess?: () => void;
};

type FormValues = {
  teamCategory: {
    title: string;
  }[];
};

function AddEditTeamCategory({ isEdit, editData, onClose, onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      teamCategory: [{ title: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "teamCategory",
    control,
  });

  const { mutateAsync: createTeamCategory, isPending: createPending } =
    useCreateTeamCategory();
  const { mutateAsync: updateTeamCategory, isPending: updatePending } =
    useUpdateTeamCategory();

  const isPending = createPending || updatePending;

  /* ------------------ Populate edit data ------------------ */
  useEffect(() => {
    if (isEdit && editData) {
      reset({
        teamCategory: [{ title: editData.title }],
      });
    }
  }, [isEdit, editData, reset]);

  /* ------------------ Submit handler ------------------ */
  const onSubmit = async (data: FormValues) => {
    try {
      if (isEdit && editData) {
        await updateTeamCategory({
          id: editData.id,
          title: data.teamCategory[0].title,
        });
      } else {
        await createTeamCategory(data.teamCategory);
      }

      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-[50vw] min-w-[30vw] p-5">
      <FormModalHeader
        title={isEdit ? "Edit Team Category" : "Add Team Category"}
      />

      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-start">
              <div className="flex-1 flex flex-col gap-2">
                <label>Title</label>
                <input
                  type="text"
                  className="input-style"
                  placeholder="e.g: Board of Directors"
                  {...register(`teamCategory.${index}.title`, {
                    required: "Title is required",
                  })}
                />
                {errors.teamCategory?.[index]?.title && (
                  <span className="text-red-500 text-sm">
                    {errors.teamCategory[index]?.title?.message}
                  </span>
                )}
              </div>

              {!isEdit && fields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  className="mt-8"
                  onClick={() => remove(index)}
                >
                  <X size={18} />
                </Button>
              )}
            </div>
          ))}

          {!isEdit && (
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ title: "" })}
              className="w-fit"
            >
              + Add Category
            </Button>
          )}
        </div>

        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            variant="outline"
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={isPending}>
            {isPending ? <LoadingButtonCircle size={20} /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddEditTeamCategory;
