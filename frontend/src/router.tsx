import { createBrowserRouter, type RouteObject } from "react-router";
import DefaultLayout from "./layouts/DefaultLayout";
import LandingPage from "./pages/landing-page";
import LoginPage from "./pages/login";
import QuestionnairePage from "./pages/questionnaire";
import DayplanPage from "./pages/dayplan";
import RegisterPage from "./pages/register";

const routes: RouteObject[] = [
  {
    path: "/",
    Component: LandingPage,
  },
  {
<<<<<<< Updated upstream
=======
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage
  },
  {
>>>>>>> Stashed changes
    path: "/",
    Component: DefaultLayout,
    children: [
      {
        path: "/login",
        Component: LoginPage,
      },
      {
<<<<<<< Updated upstream
        path: "/questionaire",
        Component: QuestionairePage,
=======
        path: "/register",
        Component: RegisterPage
>>>>>>> Stashed changes
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
