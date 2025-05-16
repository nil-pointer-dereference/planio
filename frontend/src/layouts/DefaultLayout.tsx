import { Outlet } from "react-router";
import Navbar from "./navbar";

export default function DefaultLayout() {
  return (
    <>
      <Navbar></Navbar>
      <div className="w-full h-screen flex flex-col justify-top items-center pl-30 pr-30 pt-25">
        <Outlet></Outlet>
      </div>
    </>
  );
}
