import { useDeleteProduct } from "@/features/product/hooks/useDeleteProduct";
import { Modal } from "@/shared/components/modal/Modal";
import { Button } from "@/shared/components/button/Button";
import { X } from "lucide-react";

interface DeleteModalProps {
  id: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ id }) => {
  const { mutate: deleteProduct } = useDeleteProduct();

  const handleDelete = (id: string) => {
    deleteProduct(id);
  };

  return (
    <div className="absolute top-2 right-2">
      <Modal.Root>
        <Modal.Trigger variant="link">
          <i className="fi fi-rs-trash text-2xl"></i>
        </Modal.Trigger>
        <Modal.Content>
          <Modal.Close topRight>
            <X className="h-5 w-5" />
          </Modal.Close>
          <Modal.Header>
            <Modal.Title title="상품 삭제" />
            <Modal.Description description="정말로 삭제하시겠습니까? 삭제 후에는 다시 되돌릴 수 없습니다." />
          </Modal.Header>
          <Modal.Footer>
            <Button
              full
              radius="full"
              onClick={() => handleDelete(id)}
              size="large"
              className="mt-10"
            >
              상품 삭제
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
    </div>
  );
};

export default DeleteModal;
