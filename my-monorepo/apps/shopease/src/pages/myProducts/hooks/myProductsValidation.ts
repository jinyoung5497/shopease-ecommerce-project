import { z } from "zod";

export const schema = z.object({
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

export type FormFields = z.infer<typeof schema>;
