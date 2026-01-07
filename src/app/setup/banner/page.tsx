import BannerView from "./components/BannerView";
import PageHeader from "@/components/reusable/PageHeader";
function BannerIndex() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Banners" description="Manage your banners here" />
      <BannerView />
    </div>
  );
}

export default BannerIndex;
