import PageHeader from "@/components/reusable/PageHeader";
import RoleTableView from "./components/RoleTableView";
function RolesIndex() {
  return (
    <div>
      <PageHeader
        title="Roles"
        description="Welcome back! Here's an roles page of your platform."
      />
      <RoleTableView />
    </div>
  );
}

export default RolesIndex;
