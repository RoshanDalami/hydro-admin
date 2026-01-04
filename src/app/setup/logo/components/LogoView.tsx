"use client";
import { useState } from "react";
import { useGetFirstLogo } from "@/api/hooks/logo.hook";
import { imageurlgenerator } from "@/utils/imgareurlgenerator";
import Image from "next/image";
import LogoViewSkeleton from "./LogoViewSkeleton";
import AnimationWrapper from "@/components/reusable/AnimationWrapper";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import DialogModal from "@/components/reusable/DialogModal";
import AddEditLogo from "./AddEditLogo";
import { TLogo } from "@/types/logo.type";
function LogoView() {
  const { data: LogoData, isLoading, refetch } = useGetFirstLogo();
  const src = imageurlgenerator(LogoData?.url as string);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState<TLogo | null>(null);
  const handleEdit = (data: TLogo) => {
    setOpen(true);
    setEdit(true);
    setEditData(data);
  };

  const onClose = () => {
    setOpen(false);
    setEdit(false);
    setEditData(null);
  };

  const onSuccess = () => {
    onClose();
    refetch();
  }


  return (
    <AnimationWrapper>
      <DialogModal open={open} setOpen={setOpen}>
        <AddEditLogo isEdit={edit} data={editData as TLogo} onClose={onClose} onSuccess={onSuccess} />
      </DialogModal>
      <div className="flex justify-end my-3">
        <Button onClick={() => handleEdit(LogoData as TLogo)}>
          <Edit />
          Edit
        </Button>
      </div>
      {isLoading ? (
        <LogoViewSkeleton />
      ) : (
        <div className="bg-gray-50 rounded-2xl border border-dashed p-5">
          <div className="h-75 w-75 rounded-full bg-gray-100">
            <Image src={src} alt="logo" width={300} height={300} />
          </div>
          <div className="mt-5">
            <h1>
              <span className="font-bold text-lg"> Company Name:</span>{" "}
              <span>{LogoData?.name}</span>
            </h1>
            <h1>
              <span className="font-bold text-lg">Slogan:</span>{" "}
              <span>
                {LogoData?.slogan ? LogoData?.slogan : " No Slogan Given"}
              </span>
            </h1>
          </div>
        </div>
      )}
    </AnimationWrapper>
  );
}

export default LogoView;
