import { Outlet } from "react-router";
import AppBar from "@/components/appbar";
import Navbar from "./navbar";
import AiPopup from "@/components/AiPopup/AiPopup";

export default function DefaultLayout() {
  return (
    <div className="w-screen h-screen">
      <div className="w-full min-h-full flex flex-col justify-top items-center">
        <AiPopup></AiPopup>
        <Navbar></Navbar>
        <Outlet></Outlet>
      </div>
      <AppBar></AppBar>
    </div>
  );
}
