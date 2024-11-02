import { useNavigation } from "@/shared/hooks/useNavigation";

const Footer = () => {
  const { navToHome } = useNavigation();
  return (
    <div className="w-full h-80 bg-primary flex flex-col items-center justify-center text-white sticky bottom-0">
      <button
        className="flex gap-2 text-[26px] items-center justify-center"
        onClick={navToHome}
      >
        <i className="fi fi-rs-basket-shopping-simple translate-y-[2px]"></i>
        <h1 className="font-medium">ShopEase</h1>
      </button>
      <div>
        <i className="fi fi-rr-circle-c"></i>
        <p className="text-[10px] mt-2">2024 Company. All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
