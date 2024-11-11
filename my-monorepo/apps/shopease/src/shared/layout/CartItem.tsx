import { useUpdateCart } from "@/features/cart/hooks/useUpdateCart";
import { Cart } from "../types/cart/types";
import { useDeleteCart } from "@/features/cart/hooks/useDeleteCart";
import { useCallback } from "react";
import React from "react";

type CartItemProps = {
  data: Cart[] | undefined;
};

const CartItem = React.memo(({ data }: CartItemProps) => {
  const { mutate: updateCart } = useUpdateCart();
  const { mutate: deleteCartItem } = useDeleteCart();
  const increaseQuantity = useCallback(
    (index: number) => {
      if (data) {
        updateCart({ cartQuantity: data[index].quantity + 1, index });
      }
    },
    [data, updateCart],
  );

  const decreaseQuantity = useCallback(
    (index: number) => {
      if (data && data[index].quantity > 1) {
        updateCart({ cartQuantity: data[index].quantity - 1, index });
      }
    },
    [data, updateCart],
  );

  return data?.map((value, index) => (
    <div
      key={value.productId}
      className="flex items-center justify-between w-full border-slate-200 border-b-[1px] py-4"
    >
      <div className="flex items-center gap-4">
        <img
          src={value.productImage}
          alt="productImage"
          className="w-14 h-14 border-[1px] border-slate-200 p-2"
        />
        <div className="flex flex-col items-start gap-1">
          <div>{value.productName}</div>
          <div className="flex items-center">
            <div className="flex border-slate-200 border-[1px] p-1 px-3 gap-2 items-center justify-center">
              <i
                onClick={() => increaseQuantity(index)}
                className="fi fi-rs-plus-small translate-y-[2px] cursor-pointer"
              ></i>
              <div>{value.quantity}</div>
              <i
                onClick={() => decreaseQuantity(index)}
                className="fi fi-rs-minus-small translate-y-[2px] cursor-pointer"
              ></i>
            </div>
            <div className="ml-4 text-gray text-sm">
              {value.productPrice.toLocaleString("ko-KR", {
                style: "currency",
                currency: "KRW",
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <i
          onClick={() => deleteCartItem(value.productId)}
          className="fi fi-rs-cross-small text-xl cursor-pointer"
        ></i>
        <div>
          {value.totalPrice.toLocaleString("ko-KR", {
            style: "currency",
            currency: "KRW",
          })}
        </div>
      </div>
    </div>
  ));
});

export default CartItem;
