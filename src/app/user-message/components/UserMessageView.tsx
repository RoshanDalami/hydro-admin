"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserMessages } from "@/api/hooks/user-message.hook";
import DataTable from "@/components/reusable/DataTable";
import { Button } from "@/components/ui/button";
import { Eye, MessageSquare } from "lucide-react";
import EmptyData from "@/components/reusable/EmptyData";
import { Skeleton } from "@/components/ui/skeleton";
import { TUserMessage } from "@/types/user-message.type";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import AnimationWrapper from "@/components/reusable/AnimationWrapper";

function UserMessageView() {
  const { data, isLoading } = useUserMessages();
  const router = useRouter();

  const handleView = (id: number) => {
    router.push(`/user-message/${id}`);
  };

  const columns: ColumnDef<TUserMessage>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: (info) => (
        <span className="font-medium">{info.getValue() as string}</span>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (info) => (
        <span className="text-sm text-muted-foreground">
          {info.getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "contact",
      header: "Contact",
      cell: (info) => <span className="text-sm">{info.getValue() as string}</span>,
    },
    {
      accessorKey: "subject",
      header: "Subject",
      cell: (info) => (
        <span className="font-medium truncate max-w-50 block">
          {info.getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: (info) => (
        <span className="text-sm text-muted-foreground line-clamp-2 max-w-62.5">
          {info.getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: (info) => (
        <span className="text-sm">
          {new Date(info.getValue() as string).toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
            month: "short"
          })}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: (info) => {
        const message = info.row.original;
        return (
          <div className="flex gap-2">
            <Button
              size="icon-sm"
              variant="outline"
              onClick={() => handleView(message.id)}
              className="border border-blue-600"
              title="View Details"
            >
              <Eye className="w-4 h-4 text-blue-500" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <AnimationWrapper>
      <div className="w-full">
        {isLoading ? (
          <Skeleton className="h-40 w-full" />
        ) : data?.length === 0 ? (
          <EmptyData
            title="No User Messages Found"
            Icon={MessageSquare}
            onClick={() => {}}
            buttonText="No messages yet"
          />
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <DataTable
                columns={columns}
                data={data || []}
                className="w-full"
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </AnimationWrapper>
  );
}

export default UserMessageView;
