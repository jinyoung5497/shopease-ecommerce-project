import { useNavigate } from "react-router-dom";

import { pageRoutes } from "@/app/apiRoutes";
import { Button } from "@/shared/components/button/Button";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleClickNavigateHomeButton = () => {
    navigate(pageRoutes.home, { replace: true });
  };

  return (
    <div
      id="error-page"
      className="w-screen h-screen flex flex-col justify-center items-center gap-2"
    >
      <h1 className="font-bold text-4xl">404</h1>
      <p>페이지 경로가 잘못 되었습니다!</p>
      <Button onClick={handleClickNavigateHomeButton}>Home으로 이동</Button>
    </div>
  );
};
