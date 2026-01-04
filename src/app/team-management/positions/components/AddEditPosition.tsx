import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormModalHeader from "@/components/reusable/FormModalHeader";
import {
  useCreatePosition,
  useUpdatePosition,
} from "@/api/hooks/position.hook";
import LoadingButtonCircle from "@/components/reusable/LoadingButtonCircle";
import { X } from "lucide-react";
import { TPosition } from "@/types/position.type";

type Props = {
  isEdit: boolean;
  editData?: TPosition;
  onClose?: () => void;
  onSuccess?: () => void;
};

type FormValues = {
  positions: {
    title: string;
  }[];
};

function AddEditPosition({ isEdit, editData, onClose, onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      positions: [{ title: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "positions",
    control,
  });

  const { mutateAsync: createPosition, isPending: createPending } =
    useCreatePosition();
  const { mutateAsync: updatePosition, isPending: updatePending } =
    useUpdatePosition();

  const isPending = createPending || updatePending;

  /* ------------------ Populate edit data ------------------ */
  useEffect(() => {
    if (isEdit && editData) {
      reset({
        positions: [{ title: editData.title }],
      });
    }
  }, [isEdit, editData, reset]);

  /* ------------------ Submit handler ------------------ */
  const onSubmit = async (data: FormValues) => {
    try {
      if (isEdit && editData) {
        await updatePosition({
          id: editData.id,
          title: data.positions[0].title,
        });
      } else {
        await createPosition(data.positions);
      }

      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-[50vw] min-w-[30vw] p-5">
      <FormModalHeader title={isEdit ? "Edit Position" : "Add Position"} />

      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-start">
              <div className="flex-1 flex flex-col gap-2">
                <label>Title</label>
                <input
                  type="text"
                  className="input-style"
                  placeholder="e.g: Software Engineer"
                  {...register(`positions.${index}.title`, {
                    required: "Title is required",
                  })}
                />
                {errors.positions?.[index]?.title && (
                  <span className="text-red-500 text-sm">
                    {errors.positions[index]?.title?.message}
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
              + Add position
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

export default AddEditPosition;
