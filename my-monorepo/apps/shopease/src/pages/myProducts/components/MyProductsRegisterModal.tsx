import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useAddProduct } from "@/features/product/hooks/useAddProduct";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { Button } from "@repo/ui/button/Button";
import { Modal } from "@repo/ui/modal/Modal";
import { Input } from "@repo/ui/input/Input";
import { FormFields, schema } from "../hooks/myProductsValidation";
import { useImageUpload } from "@/shared/hooks/useImageUpload";
import { ProductCategoryType } from "../hooks/useHandleCategory";
import { MyProductsClearButton } from "./MyProductsClearButton";
import MyProductsDropdown from "./MyProductsDropdown";

const RegisterModal = () => {
  const { mutate: addProduct } = useAddProduct();
  const { user } = useAuthStore();
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategoryType>("Men's Clothing");
  const [imageNameList, setImageNameList] = useState<string[]>([]);
  const [imageList, setImageList] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleImageUpload } = useImageUpload({
    setImageList,
    setImageNameList,
  });

  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = useCallback(
    async (data) => {
      const { title, price, remainder, description } = data;
      if (user) {
        const productData = {
          sellerId: user.uid,
          productName: title,
          productPrice: price,
          productQuantity: remainder,
          productDescription: description,
          productCategory: selectedCategory,
          productImageName: imageNameList,
        };
        addProduct({
          product: productData,
          imageFiles: imageList,
        });
        setValue("title", "");
        setValue("price", 0);
        setValue("remainder", 0);
        setValue("description", "");
        setSelectedCategory("Men's Clothing");
        setImageNameList([]);
        setImageList([]);
        setIsModalOpen(false);
      }
    },
    [addProduct, selectedCategory, user, setValue, imageNameList, imageList],
  );

  return (
    <div className="w-full  my-10 px-40 flex justify-end">
      <Modal.Root
        controlledOpen={isModalOpen}
        setControlledOpen={setIsModalOpen}
      >
        <Modal.Trigger asChild>
          <Button
            iconLeft={
              <i className="fi fi-rs-plus-small text-2xl translate-y-[2px]"></i>
            }
            variant="outline"
          >
            상품 추가
          </Button>
        </Modal.Trigger>
        <Modal.Content>
          <Modal.Close topRight>
            <i className="fi fi-rs-cross-small"></i>
          </Modal.Close>
          <Modal.Header>
            <Modal.Title title="상품 등록" />
            <Modal.Description description="상품 상세 정보를 입력하여 상품을 등록하세요" />
          </Modal.Header>
          <Modal.Divider />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-2"
          >
            <Modal.Items>
              <Input
                {...register("title")}
                id="title"
                type="text"
                placeholder="상품 이름"
                full
                label="상품 이름"
                radius="medium"
                isError={errors.title}
                errorMessage={errors.title?.message}
                rightIcon={
                  <MyProductsClearButton
                    resetField={resetField}
                    setImageNameList={setImageNameList}
                    field="title"
                  />
                }
              />
              <p className="text-[15px] text-primary">상품 카테고리</p>
              <MyProductsDropdown setSelectedCategory={setSelectedCategory} />
              <Input
                {...register("price", {
                  setValueAs: (value) => parseFloat(value),
                })}
                id="price"
                type="number"
                placeholder="상품 가격"
                full
                label="상품 가격"
                radius="medium"
                isError={errors.price}
                errorMessage={errors.price?.message}
                rightIcon={
                  <MyProductsClearButton
                    resetField={resetField}
                    setImageNameList={setImageNameList}
                    field="price"
                  />
                }
              />
              <Input
                {...register("remainder", {
                  setValueAs: (value) => parseFloat(value),
                })}
                id="remainder"
                type="number"
                placeholder="상품 재고"
                full
                label="상품 재고"
                radius="medium"
                isError={errors.remainder}
                errorMessage={errors.remainder?.message}
                rightIcon={
                  <MyProductsClearButton
                    resetField={resetField}
                    setImageNameList={setImageNameList}
                    field="remainder"
                  />
                }
              />
              <p>상품 설명</p>
              <textarea
                {...register("description")}
                id="description"
                placeholder="상품 설명"
                className="w-full p-3 border-primary rounded-[7px] border-[1px]"
              />
              {errors.description && (
                <div className="text-red-600 text-sm">
                  {errors.description.message}
                </div>
              )}
              <Input
                {...register("image")}
                name="image"
                type="file"
                multiple
                full
                label="상품 이미지"
                radius="medium"
                onChange={handleImageUpload}
                rightIcon={
                  <MyProductsClearButton
                    resetField={resetField}
                    setImageNameList={setImageNameList}
                    field="image"
                  />
                }
              />
              <div className="flex gap-2 flex-wrap">
                {imageNameList.map((value, index) => (
                  <div key={index}>{value}</div>
                ))}
              </div>
            </Modal.Items>
            <Modal.Footer>
              <Button
                type="submit"
                radius="full"
                full
                className="flex items-center justify-center"
              >
                상품 등록
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Content>
      </Modal.Root>
    </div>
  );
};

export default RegisterModal;
