import { createBrowserRouter, type RouteObject } from "react-router";
import DefaultLayout from "./layouts/DefaultLayout";
import LandingPage from "./pages/landing-page";

const routes: RouteObject[] = [{
  path: "/",
  Component: DefaultLayout,
  children: [{
    path: "/",
    Component: LandingPage
  }]
}];

const router = createBrowserRouter(routes);

export default router;
