import React from "react";
import UserMessageView from "./components/UserMessageView";
import PageHeader from "@/components/reusable/PageHeader";

function UserMessageIndex() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="User Messages"
        description="View and manage messages from users."
      />
      <UserMessageView />
    </div>
  );
}

export default UserMessageIndex;