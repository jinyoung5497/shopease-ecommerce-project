import { DeferredComponent } from "./DeferredComponent";

export const LoadingSkeleton = ({
  numberOfCards,
  styles,
}: {
  numberOfCards: number;
  styles?: string;
}) => (
  <DeferredComponent>
    <div className={`${styles}`}>
      {[...Array(numberOfCards)].map((_, index) => (
        <div key={index} className="flex flex-col gap-2 justify-center">
          <div className="w-72 h-80 bg-slate-100 rounded-[5px] animate-pulse" />
          <div className="bg-slate-100 h-5 rounded-full animate-pulse" />
          <div className="bg-slate-100 h-4 w-40 rounded-full animate-pulse" />
        </div>
      ))}
    </div>
  </DeferredComponent>
);
