import { BrowserRouter, Route, Routes } from "react-router-dom"
import { App } from "./components/App"
import { HomePage } from "./pages/HomePage"
import ListPage from "./pages/ListPage"
import PostPage from "./pages/PostPage"

export function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/post">
            <Route index element={<PostPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
