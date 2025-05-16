import { createBrowserRouter, type RouteObject } from "react-router";
import DefaultLayout from "./layouts/DefaultLayout";
import LandingPage from "./pages/landing-page";
import LoginPage from "./pages/login";

const routes: RouteObject[] = [{
  path: "/",
  Component: DefaultLayout,
  children: [{
      path: "/",
      Component: LandingPage
    },{
      path: "/login",
      Component: LoginPage
    }
  ]
}];

const router = createBrowserRouter(routes);

export default router;
