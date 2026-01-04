import PageHeader from "@/components/reusable/PageHeader";
import TeamCategoryTableView from "./components/TeamCategoryTableView";
function TeamCategoryIndex() {
  return (
    <div>
      <PageHeader
        title="Team Category"
        description="Welcome back! Here's an team category page of your platform."
      />
      <TeamCategoryTableView />
    </div>
  );
}

export default TeamCategoryIndex;
