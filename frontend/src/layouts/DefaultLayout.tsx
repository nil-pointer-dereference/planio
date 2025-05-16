import { Outlet } from "react-router";
import Navbar from "./navbar";
import AppBar from "@/components/appbar";

export default function DefaultLayout() {
  return (
    <div className="w-full h-screen">
      <Navbar></Navbar>
      <div className="w-full h-full flex flex-col justify-top items-center pl-30 pr-30 pt-25">
        <Outlet></Outlet>
      </div>
      <AppBar></AppBar>
    </div>
  );
}
