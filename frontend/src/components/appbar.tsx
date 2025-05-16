import { Sidebar, SidebarContent, SidebarHeader } from "./ui/sidebar";

export default function AppBar() {
  return (
    <Sidebar side="right" collapsible="offcanvas">
      <SidebarHeader>
        <div className="absolute p-2 right-0 top-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>
        <h1>Siema eniu</h1>
      </SidebarHeader>
      <SidebarContent></SidebarContent>
    </Sidebar>
  );
}
