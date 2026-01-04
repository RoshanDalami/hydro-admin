"use client";
import { useState } from "react";
import {
  useGetTeamCategories,
  useDeleteTeamCategory,
} from "@/api/hooks/team-category.hook";
import DataTable from "@/components/reusable/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { TTeamCategory } from "@/types/team-category.type";
import { Skeleton } from "@/components/ui/skeleton";
import AnimationWrapper from "@/components/reusable/AnimationWrapper";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";
import AddButton from "@/components/reusable/AddButton";
import DialogModal from "@/components/reusable/DialogModal";
import AddEditTeamCategory from "./AddEditTeamCategory";
import AlertDeleteDialogModal from "@/components/reusable/AlertDeleteDialogModal";
import EmptyData from "@/components/reusable/EmptyData";
import { FileArchive } from "lucide-react";
function TeamCategoryTableView() {
  const {
    data: TeamCategories,
    isLoading,
    refetch: TableRefetch,
  } = useGetTeamCategories();
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editData, setEditData] = useState<TTeamCategory | null>(null);
  const [deleteId, setDeleteId] = useState<number>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { mutateAsync: DeleteTeamCategoryMutation, isPending: deletePending } =
    useDeleteTeamCategory();

  const columns: ColumnDef<TTeamCategory>[] = [
    {
      header: "Title",
      accessorKey: "title",
      cell: (info) => info.getValue(),
    },
    {
      header: "Status",
      accessorKey: "isActive",
      cell: (info) =>
        info.getValue() ? (
          <span className="text-green-600 font-semibold">Active</span>
        ) : (
          <span className="text-gray-400">Inactive</span>
        ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: (info) => {
        const data = info.row.original;
        return (
          <div className="flex gap-2">
            <Button
              size="icon-sm"
              variant="outline"
              onClick={() => onEditHandler(data)}
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              size="icon-sm"
              variant="destructive"
              onClick={() => handleDeleteClick(data.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  const onAddClickHandler = () => {
    setAddModalOpen(true);
  };
  const onEditHandler = (data: TTeamCategory) => {
    setEditData(data);
    setIsEdit(true);
    setAddModalOpen(true);
  };
  const onClose = () => {
    setAddModalOpen(false);
    setEditData(null);
    setIsEdit(false);
  };
  const onSuccess = () => {
    setEditData(null);
    setAddModalOpen(false);
    setIsEdit(false);
    TableRefetch();
  };
  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const onDeleteConfirm = async () => {
    if (deleteId) {
      await DeleteTeamCategoryMutation(deleteId);
      setDeleteDialogOpen(false);
      TableRefetch();
    }
  };

  return (
    <div>
      <DialogModal open={addModalOpen} setOpen={setAddModalOpen}>
        <AddEditTeamCategory
          isEdit={isEdit}
          editData={editData as TTeamCategory}
          onClose={onClose}
          onSuccess={onSuccess}
        />
      </DialogModal>
      <AlertDeleteDialogModal
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        disableState={deletePending}
        onConfirm={onDeleteConfirm}
      />
      <AddButton title="Add Category" onClick={onAddClickHandler} />
      {isLoading ? (
        <Skeleton className="h-44 w-full" />
      ) : (
        <AnimationWrapper>
          {
            TeamCategories?.length === 0 ? <EmptyData Icon={FileArchive} title="No Categories Found" onClick={onAddClickHandler} buttonText="Add Team Category" /> :
              <DataTable
                columns={columns}
                data={TeamCategories as TTeamCategory[]}
              />
          }
        </AnimationWrapper>
      )}
    </div>
  );
}

export default TeamCategoryTableView;
