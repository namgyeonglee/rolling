import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./components/App";
import { HomePage } from "./pages/HomePage";
import { ListPage } from "./pages/ListPage/ListPage";
import { MessageCreatePage } from "./pages/MessageCreatePage/MessageCreatePage";
import PostCreatePage from "./pages/PostCreatePage/PostCreatePage";
import { PostPage } from "./pages/PostPage/PostPage";

export function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/post">
            <Route index element={<PostCreatePage />} />
            <Route path=":postId">
              <Route index element={<PostPage />} />
              <Route path="edit" element={<PostPage editable={true} />} />
            </Route>
            <Route path=":postId">
              <Route path="message" element={<MessageCreatePage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
