"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetAllBanners, useDeleteBanner } from "@/api/hooks/banner.hook";
import DataTable from "@/components/reusable/DataTable";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, ImageIcon } from "lucide-react";
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
import { TBanner } from "@/types/banner.type";
import AddBanner from "./AddBanner";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { imageurlgenerator } from "@/utils/imgareurlgenerator";
import { Badge } from "@/components/ui/badge";

function BannerView() {
  const { data, isLoading, refetch } = useGetAllBanners();
  const { mutateAsync: deleteBanner, isPending: isDeleting } =
    useDeleteBanner();
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<TBanner | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleAdd = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleEdit = (banner: TBanner) => {
    setEditData(banner);
    setModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteId) {
      await deleteBanner(deleteId);
      refetch();
      setDeleteDialogOpen(false);
    }
  };

  const columns: ColumnDef<TBanner>[] = [
    {
      accessorKey: "imageUrl",
      header: "Banner Image",
      cell: (info) => {
        const imageUrl = info.getValue() as string;
        return (
          <div className="relative w-24 h-16 rounded-md overflow-hidden">
            <Image
              src={imageurlgenerator(imageUrl)}
              alt="Banner"
              fill
              className="object-cover"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: (info) =>
        info.getValue() ? (
          <Badge variant="default">Active</Badge>
        ) : (
          <Badge variant="secondary">Inactive</Badge>
        ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: (info) => {
        const banner = info.row.original;
        return (
          <div className="flex gap-2">
            <Button
              size="icon-sm"
              variant="outline"
              onClick={() => handleEdit(banner)}
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              size="icon-sm"
              variant="destructive"
              onClick={() => handleDeleteClick(banner.id)}
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
        <AddBanner
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
              banner.
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

      {data?.length === 0 && (
        <div className="flex justify-end mb-4">
          <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" /> Add Banner
          </Button>
        </div>
      )}

      {isLoading ? (
        <Skeleton className="h-40 w-full" />
      ) : data?.length === 0 ? (
        <EmptyData
          title="No Banners Found"
          Icon={ImageIcon}
          onClick={handleAdd}
          buttonText="Add Banner"
        />
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <DataTable columns={columns} data={data || []} className="w-full" />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default BannerView;
