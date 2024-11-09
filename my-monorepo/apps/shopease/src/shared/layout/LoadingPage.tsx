import { Loader2 } from "lucide-react";
import { DeferredComponent } from "./DeferredComponent";

export const LoadingPage = () => {
  return (
    <DeferredComponent>
      <div className="flex justify-center items-center h-screen fixed top-0 w-screen">
        Loading... <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    </DeferredComponent>
  );
};
