import { Dropdown } from "@repo/ui/dropdown/Dropdown";
import { useCallback } from "react";
import { Button } from "@repo/ui/button/Button";
import { useFetchAdmin } from "@/features/order/hooks/useFetchAdmin";
import { useUpdateOrder } from "@/features/order/hooks/useUpdateOrder";

const AdminRenderOrder = () => {
  const { data } = useFetchAdmin();
  const { mutate: updateStatus } = useUpdateOrder();

  const handleSelect = useCallback(
    (orderId: string | undefined, status: string) => {
      if (!orderId) throw new Error();
      updateStatus({ orderId, status });
    },
    [updateStatus],
  );

  return (
    <div className="grid grid-cols-5 gap-4 items-start justify-items-center mx-20 m-20">
      {data?.map((value) => (
        <div
          key={value.id}
          className="flex flex-col gap-1 relative cursor-pointer mb-10 w-80"
        >
          <div className="absolute top-4 right-4 rounded-[10px] font-semibold">
            <Dropdown.Root>
              <Dropdown.Trigger asChild>
                <Button
                  variant="outline"
                  full
                  size="small"
                  iconRight={
                    <i className="fi fi-rs-angle-small-down text-2xl translate-y-1"></i>
                  }
                >
                  {value.status}
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Menu>
                <Dropdown.Title title="Category" />

                {["주문 완료", "발송 대기", "발송 시작", "주문 취소"].map(
                  (status, index) => (
                    <Dropdown.MenuItem key={index} value={status} asChild>
                      <Button
                        variant="link"
                        onClick={() => handleSelect(value.id, status)}
                      >
                        {status}
                      </Button>
                    </Dropdown.MenuItem>
                  ),
                )}
              </Dropdown.Menu>
            </Dropdown.Root>
          </div>

          <img
            src={value.productDetails?.image}
            alt="productImage"
            className=""
            loading="lazy"
          />
          <div className="text-gray text-[12px]">
            {value.productDetails?.category}
          </div>
          <div>{value.productDetails?.name}</div>
          <div>
            {value.productDetails?.price.toLocaleString("ko-KR", {
              style: "currency",
              currency: "KRW",
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminRenderOrder;
