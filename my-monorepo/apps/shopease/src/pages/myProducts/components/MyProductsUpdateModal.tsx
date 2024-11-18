import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useUpdateProduct } from "@/features/product/hooks/useUpdateProduct";
import { Product } from "@/features/product/api";
import { Button } from "@repo/ui/button/Button";
import { Modal } from "@repo/ui/modal/Modal";
import { Input } from "@repo/ui/input/Input";
import React from "react";
import { useFetchDetailedProduct } from "@/features/product/hooks/useFetchDetailedProduct";
import { FormFields, schema } from "../hooks/myProductsValidation";
import { useImageUpload } from "@/shared/hooks/useImageUpload";
import { MyProductsClearButton } from "./MyProductsClearButton";
import MyProductsDropdown from "./MyProductsDropdown";

interface UpdateModalProps {
  id: string;
}

type ProductCategoryType = Product["productCategory"];

const UpdateModal = React.memo(({ id }: UpdateModalProps) => {
  const { mutate: updateProduct } = useUpdateProduct();
  const { user } = useAuthStore();
  const { data } = useFetchDetailedProduct(id);
  const initialCategory = useMemo(
    () => (data ? data.productCategory : "Men's Clothing"),
    [data],
  );
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategoryType>(initialCategory);
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
    resetField,
    reset,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: data?.productName || "",
      price: data?.productPrice || 0,
      remainder: data?.productQuantity || 0,
      description: data?.productDescription || "",
      image: data?.productImages,
    },
  });

  // Reset form values whenever `data` changes
  useEffect(() => {
    if (data) {
      reset({
        title: data.productName || "",
        price: data.productPrice || 0,
        remainder: data.productQuantity || 0,
        description: data.productDescription || "",
        image: data.productImages,
      });
      setSelectedCategory(data.productCategory);
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<FormFields> = useCallback(
    async (formData) => {
      const { title, price, remainder, description } = formData;
      if (user && data) {
        const productId = data.id;
        const productData = {
          sellerId: user.uid,
          productName: title,
          productPrice: price,
          productQuantity: remainder,
          productDescription: description,
          productCategory: selectedCategory,
          productImageName: imageNameList,
          productImages: [],
        };
        updateProduct({
          productId: productId,
          updatedData: productData,
          imageFiles: imageList,
        });
        setIsModalOpen(false);
        setImageList([]);
        setImageNameList([]);
      }
    },
    [updateProduct, selectedCategory, user, imageNameList, imageList],
  );

  return (
    <div className="absolute top-2 left-2">
      <Modal.Root
        controlledOpen={isModalOpen}
        setControlledOpen={setIsModalOpen}
      >
        <Modal.Trigger asChild>
          <Button variant="link">
            <i className="fi fi-rs-edit text-xl"></i>
          </Button>
        </Modal.Trigger>
        <Modal.Content>
          <Modal.Close topRight>
            <i className="fi fi-rs-cross-small"></i>
          </Modal.Close>
          <Modal.Header>
            <Modal.Title title="상품 편집" />
            <Modal.Description description="상품 상세 정보를 편집하세요" />
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
              <MyProductsDropdown
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
              />
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
                {imageNameList.length > 0
                  ? imageNameList.map((value, index) => (
                      <div key={index}>{value}</div>
                    ))
                  : data?.productImageName.map((value, index) => (
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
                상품 편집
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Content>
      </Modal.Root>
    </div>
  );
});

export default UpdateModal;
