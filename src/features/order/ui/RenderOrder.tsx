import { Dropdown } from "@/shared/components/dropdown/Dropdown";
import { Order } from "@/shared/types/order/types";
import { memo } from "react";

type AdminOrders = {
  data: Order[] | undefined;
  handleSelect: (orderId: string | undefined, status: string) => void;
};

const RenderOrder = memo(({ data, handleSelect }: AdminOrders) => {
  const renderOrderItems = () =>
    data?.map((value) => (
      <div
        key={value.id}
        className="flex flex-col gap-1 relative cursor-pointer mb-10 "
      >
        <div className="absolute top-4 right-4 rounded-[10px] font-semibold">
          <Dropdown.Root>
            <Dropdown.Trigger
              variant="outline"
              full
              size="small"
              rightIcon={
                <i className="fi fi-rs-angle-small-down text-2xl translate-y-1"></i>
              }
            >
              {value.status}
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Title title="Category" />

              {["주문 완료", "발송 대기", "발송 시작", "주문 취소"].map(
                (status, index) => (
                  <Dropdown.MenuItem
                    key={index}
                    onClick={() => handleSelect(value.id, status)}
                  >
                    {status}
                  </Dropdown.MenuItem>
                )
              )}
            </Dropdown.Menu>
          </Dropdown.Root>
        </div>

        <img
          src={value.productDetails?.image}
          alt="productImage"
          className="w-72"
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
    ));
  return <>{renderOrderItems()}</>;
});

export default RenderOrder;
