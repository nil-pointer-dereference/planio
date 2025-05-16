import { createBrowserRouter, type RouteObject } from "react-router";
import DefaultLayout from "./layouts/DefaultLayout";
import LandingPage from "./pages/landing-page";
import LoginPage from "./pages/login";
import QuestionnairePage from "./pages/questionnaire";

const routes: RouteObject[] = [
  {
    path: "/",
    Component: DefaultLayout,
    children: [
      {
        path: "/",
        Component: LandingPage,
      },
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "/questionnaire",
        Component: QuestionnairePage,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
