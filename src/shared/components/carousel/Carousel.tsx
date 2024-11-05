import { useCustomContext } from "@/shared/hooks/useCustomContext";
import { ReactNode, createContext, useRef, useState } from "react";

type RootProps = {
  children: ReactNode;
};
type CarouselContentProps = {
  children: ReactNode;
};
type CarouselItemsProps = {
  images: string[] | undefined;
};
type CarouselPreviousProps = {
  children: ReactNode;
  images: string[] | undefined;
};
type CarouselNextProps = {
  children: ReactNode;
  images: string[] | undefined;
};

const CarouselContext = createContext<{
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

export const CarouselRoot = ({ children }: RootProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <CarouselContext.Provider
      value={{
        currentIndex,
        setCurrentIndex,
      }}
    >
      <div className="flex items-center justify-center gap-10">{children}</div>
    </CarouselContext.Provider>
  );
};

export const CarouselContent = ({ children }: CarouselContentProps) => {
  return (
    <div className="bg-white drop-shadow-md rounded-lg w-[500px] h-[650px] p-5">
      {children}
    </div>
  );
};

// Carousel Items Container with slide transition and drag support
export const CarouselItems = ({ images }: CarouselItemsProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const currentTranslate = useRef(0);
  const context = useCustomContext(CarouselContext);

  if (!images) throw new Error();

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    startX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    currentTranslate.current = e.clientX - startX.current;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (currentTranslate.current < -100) {
      context?.setCurrentIndex((prev) => (prev + 1) % images.length); // next
    } else if (currentTranslate.current > 100) {
      context?.setCurrentIndex((prev) =>
        prev === 0 ? images.length - 1 : prev - 1
      ); // previous
    }
    currentTranslate.current = 0;
  };

  if (!context) {
    throw new Error();
  }

  return (
    <div
      className="relative flex w-full h-full overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setIsDragging(false)}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${context?.currentIndex * 100}%)`,
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        {images.map((value, index) => (
          <img
            key={index}
            className="flex-shrink-0 w-full h-full flex items-center justify-center"
            style={{
              minWidth: "100%", // 각 슬라이드가 부모의 100% 너비를 가집니다.
              height: "100%", // 각 슬라이드가 부모의 100% 높이를 가집니다.
            }}
            src={value}
            alt="productImage"
          />
        ))}
      </div>
    </div>
  );
};

export const CarouselPrevious = ({
  children,
  images,
}: CarouselPreviousProps) => {
  const context = useCustomContext(CarouselContext);
  if (!images) throw new Error();

  const handlePrevious = () => {
    context?.setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return <button onClick={handlePrevious}>{children}</button>;
};

export const CarouselNext = ({ children, images }: CarouselNextProps) => {
  const context = useCustomContext(CarouselContext);
  if (!images) throw new Error();

  const handleNext = () => {
    context?.setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return <button onClick={handleNext}>{children}</button>;
};

export const Carousel = {
  Root: CarouselRoot,
  Content: CarouselContent,
  Items: CarouselItems,
  Previous: CarouselPrevious,
  Next: CarouselNext,
};
