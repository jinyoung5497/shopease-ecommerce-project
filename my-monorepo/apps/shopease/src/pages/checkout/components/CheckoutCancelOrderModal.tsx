import { useNavigation } from "@/shared/hooks/useNavigation";
import { Cart } from "@/shared/types/cart/types";
import { Button } from "@repo/ui/button/Button";
import { Modal } from "@repo/ui/modal/Modal";
import { UseMutateFunction } from "@tanstack/react-query";
import { ArrowLeft, X } from "lucide-react";

type Props = {
  data: Cart[] | undefined;
  updateQuantity: UseMutateFunction<
    void,
    Error,
    {
      productId: string;
      quantity: number;
    },
    unknown
  >;
};

const CheckoutCancelOrderModal = ({ data, updateQuantity }: Props) => {
  const { navToHome } = useNavigation();

  return (
    <Modal.Root>
      <Modal.Trigger asChild>
        <Button
          variant="link"
          iconLeft={<ArrowLeft />}
          className="absolute top-60 left-10"
        >
          돌아가기
        </Button>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Close topRight>
          <X className="h-5 w-5" />
        </Modal.Close>
        <Modal.Header>
          <Modal.Title title="결제 취소" />
          <Modal.Description description="결제를 취소하고 홈으로 돌아갑니다." />
        </Modal.Header>
        <Modal.Divider />
        <Modal.Footer>
          <div className="flex items-center justify-center mt-4">
            <Button
              full
              onClick={() => {
                data?.map((value) =>
                  updateQuantity({
                    productId: value.productId,
                    quantity: 1,
                  }),
                );
                navToHome();
              }}
            >
              결제 취소
            </Button>
          </div>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
};

export default CheckoutCancelOrderModal;
