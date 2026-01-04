'use client'
import React, { useState } from 'react'
import DataTable from '@/components/reusable/DataTable'
import { useGetGalleryCategory, useDeleteGalleryCategory } from '@/api/hooks/gallery-category.hook'
import AnimationWrapper from '@/components/reusable/AnimationWrapper';
import { TGalleryCategory } from '@/types/gallery-category.type';
import { ColumnDef } from '@tanstack/react-table';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, FilePlus2 } from 'lucide-react';
import AddButton from '@/components/reusable/AddButton';
import DialogModal from '@/components/reusable/DialogModal';
import AddEditGalleryCategory from './AddEditGalleryCategory';
import AlertDeleteDialogModal from '@/components/reusable/AlertDeleteDialogModal';
import EmptyData from '@/components/reusable/EmptyData';

function GalleryCategoryView() {
  const { data, isLoading, refetch } = useGetGalleryCategory();
  const { mutateAsync: deleteCategory, isPending: deletePending } = useDeleteGalleryCategory();
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editData, setEditData] = useState<TGalleryCategory | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const columns: ColumnDef<TGalleryCategory>[] = [{
    header: "Title",
    accessorKey: 'title',
    cell: info => info.getValue()
  }, {
    header: 'Status',
    accessorKey: "isActive",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.isActive ? (
            <span className="text-green-500">Active</span>
          ) : (

            <span className="text-red-500">Inactive</span>
          )}
        </div>
      )
    }
  }, {
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
  },]

  const onClose = () => {
    setOpenAddModal(false)
    setIsEdit(false)
    setEditData(null)
  }

  const onSuccess = () => {
    refetch()
    onClose()
  }

  const handleOpenAddModal = () => {
    setOpenAddModal(true)
    setIsEdit(false)
    setEditData(null)
  }

  const onEditHandler = (data: TGalleryCategory) => {
    setOpenAddModal(true)
    setIsEdit(true)
    setEditData(data)
  }

  const handleDeleteClick = (id: number) => {
    setDeleteId(id)
    setOpenDeleteModal(true)
  }

  const onConfirmDelete = async () => {
    await deleteCategory(deleteId as number)
    refetch()
    setOpenDeleteModal(false)
  }


  return (
    <AnimationWrapper>
      <AddButton title="Add Categories" onClick={handleOpenAddModal} />
      {isLoading ? <Skeleton className="h-[300px]" /> : data?.length === 0 ? <EmptyData buttonText='Add Categories' title="No Categories Found" onClick={handleOpenAddModal} Icon={FilePlus2} /> : <DataTable
        data={data as TGalleryCategory[]}
        columns={columns}
      />}
      <DialogModal
        open={openAddModal}
        setOpen={() => setOpenAddModal(false)}
      >
        <AddEditGalleryCategory
          isEdit={isEdit}
          editData={editData as TGalleryCategory}
          onClose={onClose}
          onSuccess={onSuccess}
        />
      </DialogModal>
      <AlertDeleteDialogModal
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
        onConfirm={onConfirmDelete}
        disableState={deletePending}
      />
    </AnimationWrapper>
  )
}

export default GalleryCategoryView