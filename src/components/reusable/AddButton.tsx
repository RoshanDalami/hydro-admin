
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
function AddButton({ onClick, title }: { onClick?: () => void; title: string }) {
  return (
    <div className="flex justify-end mb-4">
      <Button onClick={onClick} className="bg-blue-600 hover:bg-blue-700">
        <Plus className="w-4 h-4 mr-2" /> {title}
      </Button>
    </div>
  );
}

export default AddButton;
