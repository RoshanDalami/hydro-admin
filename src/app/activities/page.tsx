import ComponentView from "./components/ComponentView";
import PageHeader from "@/components/reusable/PageHeader";
function ActivitiesIndex() {
  return (
    <div>
      <PageHeader
        title="Activities"
        description="Welcome back! Here's an activities page of your platform."
      />
      <ComponentView />
    </div>
  );
}

export default ActivitiesIndex;
