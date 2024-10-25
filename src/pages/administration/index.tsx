import { useFetchAdmin } from "@/lib/order/hooks/useFetchAdmin";
import HomeButton from "../common/components/HomeButton";
import { Layout, authStatusType } from "../common/components/Layout";
import NavigationBar from "../common/components/NavigationBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useUpdateOrder } from "@/lib/order/hooks/useUpdateOrder";

const Administration = () => {
  const { data } = useFetchAdmin();
  const { mutate: updateStatus } = useUpdateOrder();
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleSelect = (orderId: string, status: string) => {
    setSelectedStatus(status);
    updateStatus({ orderId, status });
  };

  return (
    <Layout authStatus={authStatusType.SELLER}>
      <div>
        <NavigationBar />
        <HomeButton style="absolute top-32 left-10" />
        <div className="flex flex-col items-center justify-center w-full h-48 border-b-[1px] border-gray-light">
          <h1 className="text-primary font-semibold text-[50px]">
            Administration
          </h1>
          <p>
            관리자 페이지에선 주문 완료된 상품들을 관리할 수 있는 페이지 입니다.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-4 items-start justify-items-center mx-20 m-20">
          {data?.map((value, index) => (
            <div
              key={index}
              className="flex flex-col gap-1 relative cursor-pointer mb-10 "
            >
              <div className="absolute top-4 right-4 bg-white rounded-[10px] font-semibold">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="w-full px-2 border-primary rounded-[7px] border-[1px] flex items-center justify-center">
                      {selectedStatus ? selectedStatus : value.status}
                      <i className="fi fi-rs-angle-small-down text-2xl translate-y-1"></i>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => handleSelect(value.id!, "주문 완료")}
                    >
                      주문 완료
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleSelect(value.id!, "발송 대기")}
                    >
                      발송 대기
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleSelect(value.id!, "발송 시작")}
                    >
                      발송 시작
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleSelect(value.id!, "주문 취소")}
                    >
                      주문 취소
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <img
                src={value.productDetails?.image}
                alt="productImage"
                className="w-72"
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
      </div>
    </Layout>
  );
};

export default Administration;
