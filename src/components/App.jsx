import { Outlet } from "react-router-dom";
import { Nav } from "./Nav";

export function App() {
  return (
    <>
      <Nav />
      <div>
        <Outlet />
      </div>
    </>
  );
}
