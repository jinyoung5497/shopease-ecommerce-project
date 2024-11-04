import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useFetchInfiniteProducts } from "@/features/product/hooks/useInfiniteFetchProduct";
import { useUpdateProduct } from "@/features/product/hooks/useUpdateProduct";
import { Product } from "@/features/product/api";
import { Button } from "@/shared/components/button/Button";
import { Dropdown } from "@/shared/components/dropdown/Dropdown";
import { Modal } from "@/shared/components/modal/Modal";
import { Input } from "@/shared/components/input/Input";

interface UpdateModalProps {
  index: number;
}

type ProductCategoryType = Product["productCategory"];

const UpdateModal: React.FC<UpdateModalProps> = ({ index }) => {
  const { mutate: updateProduct } = useUpdateProduct();
  const { user } = useAuthStore();
  const { data } = useFetchInfiniteProducts();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategoryType>(
    data && data.pages[0]?.products[index]
      ? data.pages[0].products[index].productCategory
      : "Men's Clothing"
  );
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
        "업로드된 파일이 유효하지 않습니다"
      ),
  });

  type FormFields = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: data?.pages[0].products[index]?.productName || "",
      price: data?.pages[0].products[index]?.productPrice || 0,
      remainder: data?.pages[0].products[index]?.productQuantity || 0,
      description: data?.pages[0].products[index]?.productDescription || "",
      image: data?.pages[0].products[index].productImages,
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files = event.target.files;
    if (files && files.length > 0) {
      setImageList((prev) => [...prev, ...Array.from(files)]);
      const fileNames = Array.from(files)
        .map((file) => file.name)
        .join(", ");
      setImageNameList((prev) => [...prev, fileNames]);
    }
  };

  const onSubmit: SubmitHandler<FormFields> = useCallback(
    async (formData) => {
      const { title, price, remainder, description } = formData;
      if (user && data) {
        const productId = data.pages[0].products[index].id;
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
    [updateProduct, selectedCategory, user, imageNameList, imageList]
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
      | "image"
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
      <Modal.Root>
        <Modal.Trigger variant="link" color="black">
          <div onClick={() => setIsModalOpen(true)}>
            <i className="fi fi-rs-edit text-xl"></i>
          </div>
        </Modal.Trigger>
        {isModalOpen && (
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
                  <Dropdown.Trigger
                    variant="outline"
                    size="large"
                    full
                    between
                    rightIcon={
                      <i className="fi fi-rs-angle-small-down text-2xl translate-y-1"></i>
                    }
                  >
                    카테고리 선택
                  </Dropdown.Trigger>
                  <Dropdown.Menu>
                    <Dropdown.Title title="Category" />
                    <Dropdown.MenuItem
                      onClick={() => handleCategory("Men's Clothing")}
                    >
                      Men's Clothing
                    </Dropdown.MenuItem>
                    <Dropdown.MenuItem
                      onClick={() => handleCategory("Women's Clothing")}
                    >
                      Women's Clothing
                    </Dropdown.MenuItem>
                    <Dropdown.MenuItem
                      onClick={() => handleCategory("Sneakers")}
                    >
                      Sneakers
                    </Dropdown.MenuItem>
                    <Dropdown.MenuItem onClick={() => handleCategory("Hat")}>
                      Hat
                    </Dropdown.MenuItem>
                    <Dropdown.MenuItem onClick={() => handleCategory("Kids")}>
                      Kids
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
                  onChange={handleImageChange}
                  rightIcon={clearButton("image")}
                />
                <div className="flex gap-2 flex-wrap">
                  {imageNameList.length > 0
                    ? imageNameList.map((value, index) => (
                        <div key={index}>{value}</div>
                      ))
                    : data?.pages[0].products[index].productImageName.map(
                        (value, index) => <div key={index}>{value}</div>
                      )}
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
        )}
      </Modal.Root>
    </div>
  );
};

export default UpdateModal;
