import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DataProvider from "./store/Provider.tsx";
import HomePage from "./pages/Home/index.tsx";
import RuralProducerList from "./pages/RuralProducerList/index.tsx";
import RuralProducerForm from "./pages/RuralProducerForm/index.tsx";
import Layout from "./shared/components/Layout/index.tsx";

async function enableMocking() {
  const { worker } = await import("./mocks/browser.ts");
  return worker.start(
    process.env.NODE_ENV === "development"
      ? {}
      : {
          serviceWorker: {
            url: "/test-brain-agriculture/",
          },
        }
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/list", element: <RuralProducerList /> },
      { path: "/form", element: <RuralProducerForm /> },
      { path: "/form/:id", element: <RuralProducerForm /> },
    ],
  },
]);

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </StrictMode>
  );
});
