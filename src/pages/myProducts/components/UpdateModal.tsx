import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useFetchProducts } from "@/lib/product/hooks/useFetchProduct";
import { useProductStore } from "@/store/product/useProductStore";
import { useUpdateProduct } from "@/lib/product/hooks/useUpdateProduct";

interface UpdateModalProps {
  index: number;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ index }) => {
  const { mutate: updateProduct } = useUpdateProduct();
  const { user } = useAuthStore();
  const { data } = useFetchProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { imageNameList, setImageNameList } = useProductStore();
  const [toggle, setToggle] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (data && data.pages[0].products[index]) {
      setSelectedCategory(data.pages[0].products[index].productCategory);
      // setImageNameList(data.pages[0].products[index].productImageName);
    }
  }, [data, index, toggle]);

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
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: data?.pages[0].products[index]?.productName || "",
      price: data?.pages[0].products[index]?.productPrice || 0,
      remainder: data?.pages[0].products[index]?.productQuantity || 0,
      description: data?.pages[0].products[index]?.productDescription || "",
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageNameList(file.name);
    } else {
      setImageNameList("파일을 선택해주세요");
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
          productImage: formData.image[0],
        };
        console.log(formData.image[0]);
        updateProduct({
          productId: productId,
          updatedData: productData,
        });
        setIsModalOpen(false);
      }
    },
    [updateProduct, selectedCategory, user, index]
  );

  const handleCategory = (
    event: React.MouseEvent<HTMLDivElement>,
    category: string
  ) => {
    event.preventDefault();
    setSelectedCategory(category);
  };

  return (
    <div className="absolute top-2 left-2">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <button
            onClick={() => setToggle((prev) => !prev)}
            className="text-xl"
          >
            <i className="fi fi-rs-edit"></i>
          </button>
        </DialogTrigger>
        <DialogContent
          aria-labelledby="dialog-title"
          className="flex flex-col items-center justify-center text-primary"
        >
          <DialogHeader className="flex flex-col items-center justify-center">
            <DialogTitle>
              <div id="dialog-title" className="font-semibold text-[40px]">
                상품 편집
              </div>
            </DialogTitle>
            <DialogDescription />
            <div>상품 상세 정보를 편집하세요</div>
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
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="w-full p-3 border-primary rounded-[7px] border-[1px] flex">
                  {selectedCategory}
                </div>
              </DropdownMenuTrigger>
              {/* //TODO width change */}
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={(event) => handleCategory(event, "Men's Clothing")}
                >
                  Men's Clothing
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(event) => handleCategory(event, "Women's Clothing")}
                >
                  Women's Clothing
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(event) => handleCategory(event, "Sneakers")}
                >
                  Sneakers
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(event) => handleCategory(event, "Flats")}
                >
                  Flats
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(event) => handleCategory(event, "Sandals")}
                >
                  Sandals
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* //TODO dropdown error message */}
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
            <input
              {...register("description")}
              id="description"
              type="text"
              placeholder="상품 설명"
              className="w-full p-3 border-primary rounded-[7px] border-[1px]"
            />
            {errors.description && (
              <div className="text-red-600 text-sm">
                {errors.description.message}
              </div>
            )}
            <p>상품 이미지</p>
            {/* <label
              htmlFor="image"
              className="cursor-pointer w-full p-3 border-primary rounded-[7px] border-[1px] flex items-center justify-between"
            >
              <input
                {...register("image")}
                id="image"
                onChange={handleImageChange}
                type="file"
                className="hidden"
              />
              {imageName}
              <i className="fi fi-rs-folder-upload translate-y-1"></i>
            </label> */}
            <input
              {...register("image")}
              id="image"
              onChange={handleImageChange}
              type="file"
              className=""
            />
            {typeof errors.image?.message === "string" && (
              <div className="text-red-600 text-sm">{errors.image.message}</div>
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

export default UpdateModal;
