import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useUpdateProduct } from "@/features/product/hooks/useUpdateProduct";
import { Product } from "@/features/product/api";
import { Button } from "@repo/ui/button/Button";
import { Dropdown } from "@repo/ui/dropdown/Dropdown";
import { Modal } from "@repo/ui/modal/Modal";
import { Input } from "@repo/ui/input/Input";
import React from "react";
import imageCompression from "browser-image-compression";
import { useFetchDetailedProduct } from "@/features/product/hooks/useFetchDetailedProduct";

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

  const schema = z.object({
    title: z.string().min(1, "이름은 필수입니다"),
    price: z.number({
      required_error: "가격은 필수 입력 항목입니다.",
    }),
    remainder: z.number({
      required_error: "남은 재고 입력은 필수 입력 항목입니다.",
    }),
    description: z.string().min(1, "상품 설명을 입력하세요"),
    image: z
      .any()
      .refine((files) => files && files.length > 0, "이미지는 필수입니다")
      .refine(
        (files) => files[0] instanceof File,
        "업로드된 파일이 유효하지 않습니다",
      ),
  });

  type FormFields = z.infer<typeof schema>;

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

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    const files = event.target.files;
    if (files && files.length > 0) {
      const compressedFiles: File[] = [];
      const fileNames: string[] = [];

      // Compression options
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
        fileType: "image/webp",
      };

      for (const file of files) {
        try {
          const compressedFile = await imageCompression(file, options);

          // 파일 이름에 .webp 확장자 추가
          const webpFile = new File(
            [compressedFile],
            `${file.name.split(".")[0]}.webp`,
            {
              type: "image/webp",
            },
          );

          compressedFiles.push(webpFile);
          fileNames.push(webpFile.name);
        } catch (error) {
          console.error("Image compression error:", error);
        }
      }
      setImageList((prev) => [...prev, ...compressedFiles]);
      setImageNameList((prev) => [...prev, ...fileNames]);
    } else {
      setImageList([]);
      setImageNameList([]);
    }
  };

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

  const handleCategory = (category: ProductCategoryType) => {
    setSelectedCategory(category);
  };

  const clearButton = (
    field:
      | "title"
      | "price"
      | "remainder"
      | "description"
      | "remainder"
      | "image",
  ) => {
    return (
      <Button
        onClick={(event) => {
          event.preventDefault();
          resetField(field);
          if (field === "image") setImageNameList([]);
        }}
        variant="link"
      >
        <i className="fi fi-rs-cross-small"></i>
      </Button>
    );
  };

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
                rightIcon={clearButton("title")}
              />
              <p className="text-[15px] text-primary">상품 카테고리</p>
              <Dropdown.Root>
                <Dropdown.Trigger asChild>
                  <Button
                    variant="outline"
                    size="large"
                    full
                    between
                    iconRight={
                      <i className="fi fi-rs-angle-small-down text-2xl translate-y-1"></i>
                    }
                  >
                    {selectedCategory}
                  </Button>
                </Dropdown.Trigger>
                <Dropdown.Menu>
                  <Dropdown.Title title="Category" />
                  <Dropdown.MenuItem asChild value="Men's Clothing">
                    <button onClick={() => handleCategory("Men's Clothing")}>
                      Men's Clothing
                    </button>
                  </Dropdown.MenuItem>
                  <Dropdown.MenuItem asChild value="Women's Clothing">
                    <button onClick={() => handleCategory("Women's Clothing")}>
                      Women's Clothing
                    </button>
                  </Dropdown.MenuItem>
                  <Dropdown.MenuItem asChild value="Sneakers">
                    <button onClick={() => handleCategory("Sneakers")}>
                      Sneakers
                    </button>
                  </Dropdown.MenuItem>
                  <Dropdown.MenuItem asChild value="Hat">
                    <button onClick={() => handleCategory("Hat")}>Hat</button>
                  </Dropdown.MenuItem>
                  <Dropdown.MenuItem asChild value="Kids">
                    <button onClick={() => handleCategory("Kids")}>Kids</button>
                  </Dropdown.MenuItem>
                </Dropdown.Menu>
              </Dropdown.Root>
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
                rightIcon={clearButton("price")}
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
                rightIcon={clearButton("remainder")}
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
                rightIcon={clearButton("image")}
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
