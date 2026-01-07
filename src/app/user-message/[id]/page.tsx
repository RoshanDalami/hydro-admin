"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  User,
  MessageSquare,
  Calendar,
  ArrowLeft,
  FileText,
} from "lucide-react";
import PageHeader from "@/components/reusable/PageHeader";
import AnimationWrapper from "@/components/reusable/AnimationWrapper";
import { useUserMessagesById } from "@/api/hooks/user-message.hook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function UserMessageDetail() {
  const params = useParams();
  const router = useRouter();
  const messageId = Number(params.id);

  const { data: message, isLoading, isError } = useUserMessagesById(messageId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20 text-muted-foreground animate-pulse">
        Loading message details...
      </div>
    );
  }

  if (isError || !message) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-muted-foreground">Message not found</p>
        <Button variant="outline" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <AnimationWrapper>
      <PageHeader
        title="Message Details"
        description="View user message details"
      />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <Button
          variant="ghost"
          className="gap-2 pl-0 hover:pl-2 transition-all cursor-pointer"
          onClick={() => router.back()}
        >
          <ArrowLeft size={16} />
          Back to Messages
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="rounded-2xl shadow-sm border-border/50 overflow-hidden">
            <CardHeader className="space-y-6 pb-6 border-b bg-muted/10">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="text-2xl md:text-3xl font-bold leading-tight">
                    {message.subject}
                  </CardTitle>
                  <Badge
                    variant={message.isActive ? "default" : "secondary"}
                    className="rounded-md px-3 py-1 text-sm"
                  >
                    {message.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full">
                    <Calendar size={16} />
                    {new Date(message.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-8 pt-8">
              {/* Contact Information */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="text-primary" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Name
                    </p>
                    <p className="font-semibold text-foreground truncate">
                      {message.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Email
                    </p>
                    <a
                      href={`mailto:${message.email}`}
                      className="font-semibold text-primary hover:underline truncate block"
                    >
                      {message.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Contact
                    </p>
                    <a
                      href={`tel:${message.contact}`}
                      className="font-semibold text-foreground hover:text-primary truncate block"
                    >
                      {message.contact}
                    </a>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Message Content */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MessageSquare className="text-primary" size={20} />
                  Message
                </h3>
                <div className="prose prose-stone max-w-none">
                  <div className="bg-muted/20 rounded-lg p-6 border border-border/50">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {message.message}
                    </p>
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <Separator />
              <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <FileText size={16} />
                  <span>Message ID: {message.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>
                    Received:{" "}
                    {new Date(message.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AnimationWrapper>
  );
}

export default UserMessageDetail;
