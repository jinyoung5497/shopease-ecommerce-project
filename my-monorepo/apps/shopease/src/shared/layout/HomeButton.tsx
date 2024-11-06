import { useNavigation } from "@/shared/hooks/useNavigation";
import { Button } from "@/shared/components/button/Button";

interface HomeButtonProps {
  style?: string;
}

const HomeButton: React.FC<HomeButtonProps> = ({ style }) => {
  const { navToHome } = useNavigation();

  return (
    <Button variant="link" onClick={navToHome} className={style}>
      <i className="fi fi-rs-arrow-small-left text-[25px] translate-y-1"></i>
      <p>home</p>
    </Button>
  );
};

export default HomeButton;
