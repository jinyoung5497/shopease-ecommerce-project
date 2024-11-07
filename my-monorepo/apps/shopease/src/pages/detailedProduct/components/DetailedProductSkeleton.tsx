const DetailedProductSkeleton = () => {
  return (
    <div className="flex items-center justify-center gap-20 m-40 w-3/5  ">
      <div className="bg-slate-100 h-[600px] w-[500px] rounded-md animate-pulse" />
      <div className="flex flex-col gap-5 w-2/5">
        <div className="bg-slate-100 h-10 rounded-lg animate-pulse" />
        <div className="bg-slate-100 h-96 rounded-lg animate-pulse" />
        <div className="bg-slate-100 h-10 rounded-lg animate-pulse" />
      </div>
    </div>
  );
};

export default DetailedProductSkeleton;
