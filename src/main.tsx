import router from "@/app/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "@/app/index.css";

const queryClient = new QueryClient();

const isDevEnvironment = import.meta.env.DEV;

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <QueryClientProvider client={queryClient}>
      {isDevEnvironment && <ReactQueryDevtools />}
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
} else {
  console.error("Failed to find the root element.");
}
