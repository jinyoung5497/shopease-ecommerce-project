import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useAddProduct } from "@/lib/product/hooks/useAddProduct";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useProductStore } from "@/store/product/useProductStore";
import { IProduct } from "@/lib/product";
import { Button } from "@/packages/button/Button";
import { Dropdown } from "@/packages/Dropdown/Dropdown";

const RegisterModal = () => {
  const { mutate: addProduct } = useAddProduct();
  const { user } = useAuthStore();
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategoryType>("Men's Clothing");
  const { imageNameList, setImageNameList, resetImageNameList } =
    useProductStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageList, setImageList] = useState<File[]>([]);

  type ProductCategoryType = IProduct["productCategory"];

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
    setValue,
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
        resetImageNameList();
        setImageList([]);
        setIsModalOpen(false);
      }
    },
    [addProduct, selectedCategory, user, setValue, imageNameList, imageList]
  );

  const handleCategory = (category: ProductCategoryType) => {
    setSelectedCategory(category);
  };

  const handleImageName = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files = event.target.files;
    console.log(files?.length);
    if (files && files.length > 0) {
      setImageList((prev) => [...prev, ...Array.from(files)]);
      const fileNames = Array.from(files)
        .map((file) => file.name)
        .join(", ");
      setImageNameList(fileNames);
    } else {
      setImageNameList("파일을 선택해주세요");
    }
  };

  return (
    <div className="w-full  my-10 px-40 flex justify-end">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="medium">
            <i className="fi fi-rs-plus-small text-2xl translate-y-[3px]"></i>
            <div>상품 등록</div>
          </Button>
        </DialogTrigger>
        <DialogContent
          aria-labelledby="dialog-title"
          className="flex flex-col items-center justify-center text-primary"
        >
          <DialogHeader className="flex flex-col items-center justify-center">
            <DialogTitle>
              <div id="dialog-title" className="font-semibold text-[40px]">
                상품 등록
              </div>
            </DialogTitle>
            <DialogDescription />
            <div>상품 상세 정보를 입력하여 상품을 등록하세요</div>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-2"
          >
            <p>상품 이름</p>
            <input
              {...register("title")}
              id="title"
              type="text"
              placeholder="상품 이름"
              className="w-full p-3 border-primary rounded-[7px] border-[1px]"
            />
            {errors.title && (
              <div className="text-red-600 text-sm">{errors.title.message}</div>
            )}
            <p>상품 카테고리</p>
            <Dropdown.Root>
              <Dropdown.Trigger variant="outline" full size="large">
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
                <Dropdown.MenuItem onClick={() => handleCategory("Sneakers")}>
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
            <p>상품 가격</p>
            <input
              {...register("price", {
                setValueAs: (value) => parseFloat(value),
              })}
              id="price"
              type="number"
              placeholder="상품 가격"
              className="w-full p-3 border-primary rounded-[7px] border-[1px]"
            />
            {errors.price && (
              <div className="text-red-600 text-sm">{errors.price.message}</div>
            )}
            <p>상품 재고</p>
            <input
              {...register("remainder", {
                setValueAs: (value) => parseFloat(value),
              })}
              id="remainder"
              type="number"
              placeholder="상품 재고"
              className="w-full p-3 border-primary rounded-[7px] border-[1px]"
            />
            {errors.remainder && (
              <div className="text-red-600 text-sm">
                {errors.remainder.message}
              </div>
            )}
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
            <p>상품 이미지</p>
            <input
              {...register("image")}
              type="file"
              name="image"
              multiple
              className="w-full p-3 border-primary rounded-[7px] border-[1px]"
              onChange={handleImageName}
            />
            <div className="flex gap-2 flex-wrap">
              {imageNameList.map((value, index) => (
                <div key={index}>{value}</div>
              ))}
            </div>
            {errors.image && (
              <div className="text-red-600 text-sm">
                {/* {errors.image.message} */}
              </div>
            )}
            <button
              type="submit"
              className="rounded-full text-white w-full p-2 text-sm h-11 hover:bg-sky-800 bg-primary mt-6"
            >
              상품 등록
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegisterModal;
