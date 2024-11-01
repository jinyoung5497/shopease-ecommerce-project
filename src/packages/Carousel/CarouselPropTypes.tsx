import { ReactNode } from "react";

export type RootProps = {
  children: ReactNode;
};
export type CarouselContentProps = {
  children: ReactNode;
};
export type CarouselItemsProps = {
  images: string[] | undefined;
};
export type CarouselPreviousProps = {
  children: ReactNode;
  images: string[] | undefined;
};
export type CarouselNextProps = {
  children: ReactNode;
  images: string[] | undefined;
};
