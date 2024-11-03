import { Loader2 } from "lucide-react";

import { Layout } from "@/shared/layout/Layout";

export const LoadingPage = () => {
  return (
    <Layout containerClassName="pt-8">
      <div className="flex justify-center items-center h-[300px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    </Layout>
  );
};
