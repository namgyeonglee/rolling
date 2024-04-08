import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Nav from "../components/Nav"

export function App() {
  return (
    <>
      <Nav />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
