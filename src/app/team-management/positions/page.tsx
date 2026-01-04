import PageHeader from "@/components/reusable/PageHeader";
import PositionTableView from "./components/PositionTableView";
function PositionsIndex() {
  return (
    <div>
      <PageHeader
        title="Positions"
        description="Welcome back! Here's an positions page of your platform."
      />
      <PositionTableView />
    </div>
  );
}

export default PositionsIndex;
