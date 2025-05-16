import { RouterProvider } from "react-router";
import "./index.css";
import router from "./router";
import { SidebarProvider } from "./components/ui/sidebar";
import AiPopup from "./components/AiPopup/AiPopup";

function App() {
  return (
    <SidebarProvider defaultOpen={false}>
      <RouterProvider router={router}></RouterProvider>;
    </SidebarProvider>
  );
}

export default App;
