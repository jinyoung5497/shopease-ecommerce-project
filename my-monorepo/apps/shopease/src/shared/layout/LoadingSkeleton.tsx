export const LoadingSkeleton = () => (
  <div className="grid grid-cols-5 gap-20 items-center justify-items-center mx-40 mb-10">
    {[...Array(10)].map((_, index) => (
      <div
        key={index}
        className="bg-slate-100 rounded-[5px] w-60 h-80 flex items-center justify-center"
      />
    ))}
  </div>
);
