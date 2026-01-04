"use client";
import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { TPosition } from "@/types/position.type";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/reusable/DataTable";
import { useGetPositions, useDeletePosition } from "@/api/hooks/position.hook";
import { Trash2, Pencil } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import AddButton from "@/components/reusable/AddButton";
import AddEditPosition from "./AddEditPosition";
import DialogModal from "@/components/reusable/DialogModal";
import AlertDeleteDialogModal from "@/components/reusable/AlertDeleteDialogModal";
import AnimationWrapper from "@/components/reusable/AnimationWrapper";
import EmptyData from "@/components/reusable/EmptyData";
import { FileArchive } from "lucide-react";
function PositionTableView() {
  const { data: Positions, isLoading, refetch } = useGetPositions();
  const { mutateAsync: DeletePositionMutatiion, isPending } =
    useDeletePosition();
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editData, setEditData] = useState<TPosition | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const columns: ColumnDef<TPosition>[] = [
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
  const onEditHandler = (data: TPosition) => {
    setEditData(data);
    setIsEdit(true);
    setOpenAddModal(true);
  };
  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setOpenDeleteModal(true);
  };
  const handleAddButtonClick = () => {
    setOpenAddModal(true);
  };
  const onClose = () => {
    setIsEdit(false);
    setOpenAddModal(false);
    setEditData(null);
  };
  const onSuccess = () => {
    setIsEdit(false);
    setOpenAddModal(false);
    refetch();
  };
  const onDeleteConfirm = async () => {
    if (deleteId) {
      await DeletePositionMutatiion(deleteId);
      setOpenDeleteModal(false);
      setDeleteId(null);
      refetch();
    }
  };
  return (
    <div>
      <AddButton title="Add Position" onClick={handleAddButtonClick} />
      <DialogModal open={openAddModal} setOpen={setOpenAddModal}>
        <AddEditPosition
          isEdit={isEdit}
          onClose={onClose}
          onSuccess={onSuccess}
          editData={editData as TPosition}
        />
      </DialogModal>
      <AlertDeleteDialogModal
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
        disableState={isPending}
        onConfirm={onDeleteConfirm}
      />
      {isLoading ? (
        <Skeleton className="h-44 w-full" />
      ) : (
        <AnimationWrapper>
          {
            Positions?.length === 0 ? <EmptyData Icon={FileArchive} title="No Positions Found" onClick={handleAddButtonClick} buttonText="Add Position" /> :
              <DataTable columns={columns} data={Positions as TPosition[]} />
          }
        </AnimationWrapper>
      )}
    </div>
  );
}

export default PositionTableView;
