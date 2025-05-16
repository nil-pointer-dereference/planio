import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 w-screen p-3 flex flex-row align-center">
      <div>
        <Link to="/" className="flex p-1 m-1 justify-center mr-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 6V2H8" />
            <path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z" />
            <path d="M2 12h2" />
            <path d="M9 11v2" />
            <path d="M15 11v2" />
            <path d="M20 12h2" />
          </svg>
          <div className="w-3"></div>
          <h1 className="text-xl font-bold">WIP</h1>
        </Link>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              className="font-bold"
              onClick={() => navigate("/login")}
            >
              Zaloguj się
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className="font-bold"
              onClick={() => navigate("/register")}
            >
              Zarejestruj się
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
