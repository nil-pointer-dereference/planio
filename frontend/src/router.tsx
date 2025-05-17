import { createBrowserRouter, type RouteObject } from "react-router";
import DefaultLayout from "./layouts/DefaultLayout";
import LandingPage from "./pages/landing-page";
import LoginPage from "./pages/login";
import QuestionnairePage from "./pages/questionnaire";
import DayplanPage from "./pages/dayplan";
import RegisterPage from "./pages/register";
import SummaryPage from "./pages/summary";

const routes: RouteObject[] = [
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/summary",
    Component: SummaryPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/questionnaire",
    Component: QuestionnairePage,
  },

  {
    path: "/",
    Component: DefaultLayout,
    children: [
      {
        path: "/dayplan",
        Component: DayplanPage,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
