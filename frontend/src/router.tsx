import { createBrowserRouter, type RouteObject } from "react-router";
import DefaultLayout from "./layouts/DefaultLayout";
import LandingPage from "./pages/landing-page";
import LoginPage from "./pages/login";
import QuestionnairePage from "./pages/questionnaire";
import DayplanPage from "./pages/dayplan";
import QuestionairePage from "./pages/questionaire";

const routes: RouteObject[] = [
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    //TODO Create register page
    Component: LoginPage,
  },
  {
    path: "/",
    Component: DefaultLayout,
    children: [
      {
        path: "/questionaire",
        Component: QuestionairePage,
      },
      {
        path: "/questionnaire",
        Component: QuestionnairePage,
      },
      {
        path: "/dayplan",
        Component: DayplanPage,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
