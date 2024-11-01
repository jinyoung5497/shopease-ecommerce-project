import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteProduct } from "@/lib/product/hooks/useDeleteProduct";
import { Button } from "@/packages/button/Button";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";

interface DeleteModalProps {
  id: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: deleteProduct } = useDeleteProduct();

  const handleDelete = (id: string) => {
    deleteProduct(id);
  };

  return (
    <div className="absolute top-2 right-2">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button variant="link" color="black">
            <i className="fi fi-rs-trash text-2xl"></i>
          </Button>
        </DialogTrigger>
        <DialogContent
          aria-labelledby="dialog-title"
          className="flex flex-col items-center justify-center text-primary"
        >
          <DialogHeader className="flex flex-col items-center justify-center py-5">
            <DialogTitle>
              <div id="dialog-title" className="font-semibold text-[40px]">
                상품 삭제
              </div>
            </DialogTitle>
            <DialogDescription />
            <div>
              정말로 삭제하시겠습니까? 삭제 후에는 다시 되돌릴 수 없습니다.
            </div>
          </DialogHeader>
          <Button
            full
            radius="full"
            onClick={() => handleDelete(id)}
            size="large"
          >
            상품 삭제
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteModal;
