const CategoryFilterButton = () => {
  return (
    <div className="flex gap-4">
      <button
        className={`w-24 hover:bg-primary hover:text-white p-1 px-2 border-primary rounded-[7px] border-[1px] flex items-center justify-center`}
      >
        Men's
      </button>
      <button
        className={`w-24 hover:bg-primary hover:text-white p-1 px-2 border-primary rounded-[7px] border-[1px] flex items-center justify-center`}
      >
        Women's
      </button>
      <button
        className={`w-24 hover:bg-primary hover:text-white p-1 px-2 border-primary rounded-[7px] border-[1px] flex items-center justify-center`}
      >
        Sneakers
      </button>
      <button
        className={`w-24 hover:bg-primary hover:text-white p-1 px-2 border-primary rounded-[7px] border-[1px] flex items-center justify-center`}
      >
        Flats
      </button>
      <button
        className={`w-24 hover:bg-primary hover:text-white p-1 px-2 border-primary rounded-[7px] border-[1px] flex items-center justify-center`}
      >
        Sandals
      </button>
    </div>
  );
};

export default CategoryFilterButton;
