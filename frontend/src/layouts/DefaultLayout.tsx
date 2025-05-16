import { Outlet } from "react-router";
import AppBar from "@/components/appbar";
import Navbar from "./Navbar";

export default function DefaultLayout() {
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex flex-col justify-top items-center">
        <Navbar></Navbar>
        <Outlet></Outlet>
      </div>
      <AppBar></AppBar>
    </div>
  );
}
