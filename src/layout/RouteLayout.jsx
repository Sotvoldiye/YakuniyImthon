import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
export default function RouteLayout({ children }) {
  return (
    <>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
