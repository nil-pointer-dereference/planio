import { Navigate, Outlet } from "react-router";

export default function ProtectedLayout() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Outlet></Outlet>;
  }

  return <Navigate to="/"></Navigate>
}
