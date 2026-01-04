"use client";
import { useState } from "react";
import { useGetAboutUs, useDeleteAboutUsById } from "@/api/hooks/about-us.hook";
import AboutUsSkeleton from "./AboutUsSkeleton";
import EmptyData from "@/components/reusable/EmptyData";
import { FolderPlusIcon, Pencil, Trash2 } from "lucide-react";
import DialogModal from "@/components/reusable/DialogModal";
import AddEditAboutUs from "./AddEditAboutUs";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AnimationWrapper from "@/components/reusable/AnimationWrapper";
import { TAboutUs } from "@/types/about-us.type";
function AboutUsView() {
  const { data, isLoading, isError, refetch } = useGetAboutUs();
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<TAboutUs | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { mutateAsync: deleteAboutUs, isPending: isDeleting } =
    useDeleteAboutUsById();

  const handleOpenModal = () => {
    setEditData(null);
    setOpen(true);
  };

  const handleEdit = () => {
    if (data?.[0]) {
      setEditData(data[0]);
      setOpen(true);
      setIsEditMode(true);
    }
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (data?.[0]?.id) {
      await deleteAboutUs(data[0].id);
      refetch();
      setDeleteDialogOpen(false);
    }
  };

  return (
    <AnimationWrapper>
      <div>
        <DialogModal open={open} setOpen={setOpen}>
          <AddEditAboutUs
            setOpen={setOpen}
            refetch={refetch}
            editData={editData}
            isEditMode={isEditMode}
          />
        </DialogModal>

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                About Us content.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {data?.length === 0 ? (
          <EmptyData
            title="No About Us Data Found"
            Icon={FolderPlusIcon}
            onClick={handleOpenModal}
            buttonText="Add About Us"
          />
        ) : (
          <>
            {isLoading && <AboutUsSkeleton />}
            {!isLoading && data?.[0] && (
              <div className="flex flex-col gap-4">
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={handleEdit}
                    className="bg-blue-600 hover:bg-blue-700"
                    size="sm"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  {/* <Button
                  onClick={handleDeleteClick}
                  className="bg-red-600 hover:bg-red-700"
                  size="sm"
                  disabled={isDeleting}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button> */}
                </div>
                <div className="p-5 border border-dashed rounded-md bg-gray-50">
                  <div
                    dangerouslySetInnerHTML={{ __html: data[0].content || "" }}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AnimationWrapper>
  );
}

export default AboutUsView;
