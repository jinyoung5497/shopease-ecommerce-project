import { useNavigation } from "@/hooks/useNavigation";

interface HomeButtonProps {
  style?: string;
}

const HomeButton: React.FC<HomeButtonProps> = ({ style }) => {
  const { navToHome } = useNavigation();

  return (
    <button
      className={`${style} flex items-center justify-center gap-3`}
      onClick={navToHome}
    >
      <i className="fi fi-rs-arrow-small-left text-[25px] translate-y-1"></i>
      <p>home</p>
    </button>
  );
};

export default HomeButton;
