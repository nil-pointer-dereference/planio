import { RouterProvider } from "react-router";
import "./index.css";
import router from "./router";

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
