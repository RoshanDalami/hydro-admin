import React from "react";
import PageHeader from "@/components/reusable/PageHeader";
import LogoView from "./components/LogoView";
function LogoIndex() {
  return (
    <div>
      <PageHeader
        title="Logo"
        description="Welcome back! Here's an logo page of your platform."
      />
      <div className="my-6">

      <LogoView />
      </div>
    </div>
  );
}

export default LogoIndex;
