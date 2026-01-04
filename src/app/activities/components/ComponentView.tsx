"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGetActivities,
  useDeleteActivitiesById,
} from "@/api/hooks/activities.hook";
// ...existing code...
import DataTable from "@/components/reusable/DataTable";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, FolderPlusIcon } from "lucide-react";
import DialogModal from "@/components/reusable/DialogModal";
import EmptyData from "@/components/reusable/EmptyData";
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
import { Skeleton } from "@/components/ui/skeleton";
import { TActivities } from "@/types/activities.type";

import AddActivities from "./AddActivities";
import { ColumnDef } from "@tanstack/react-table";

function ComponentView() {
  const { data, isLoading, refetch } = useGetActivities();
  const { mutateAsync: deleteActivity, isPending: isDeleting } =
    useDeleteActivitiesById();
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<TActivities | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleAdd = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleEdit = (activity: TActivities) => {
    setEditData(activity);
    setModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteId) {
      await deleteActivity(deleteId);
      refetch();
      setDeleteDialogOpen(false);
    }
  };

  const columns: ColumnDef<TActivities>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: info => info.getValue(),
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: info => info.getValue(),
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: info => info.getValue(),
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: info =>
        info.getValue() ? (
          <span className="text-green-600 font-semibold">Active</span>
        ) : (
          <span className="text-gray-400">Inactive</span>
        ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: info => {
        const activity = info.row.original;
        return (
          <div className="flex gap-2">
            <Button
              size="icon-sm"
              variant="outline"
              onClick={() => handleEdit(activity)}
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              size="icon-sm"
              variant="destructive"
              onClick={() => handleDeleteClick(activity.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full">
      <DialogModal open={modalOpen} setOpen={setModalOpen}>
        <AddActivities
          setOpen={setModalOpen}
          refetch={refetch}
          editData={editData}
        />
      </DialogModal>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              activity.
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

      <div className="flex justify-end mb-4">
        <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" /> Add Activity
        </Button>
      </div>

      {isLoading ? (
        <Skeleton className="h-40 w-full" />
      ) : data?.data?.length === 0 ? (
        <EmptyData
          title="No Activities Found"
          Icon={FolderPlusIcon}
          onClick={handleAdd}
          buttonText="Add Activity"
        />
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <DataTable columns={columns} data={data.data} className="w-full" />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default ComponentView;
