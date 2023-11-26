import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Protected from "./components/Protected";
import ProfilePage from "./pages/ProfilePage";
import UsersPage from "./pages/UsersPage";
import QuestionsPage from "./pages/QuestionsPage";
import AddQuestionPage from "./pages/AddQuestionPage";
import QuestionPage from "./pages/QuestionPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
      <Route
        path="profile"
        element={
          <Protected>
            <ProfilePage />
          </Protected>
        }
      />
      <Route
        path="users"
        element={
          <Protected>
            <UsersPage />
          </Protected>
        }
      />
      <Route
        path="questions"
        element={
          <Protected>
            <QuestionsPage />
          </Protected>
        }
      />
      <Route
        path="questions/add"
        element={
          <Protected>
            <AddQuestionPage />
          </Protected>
        }
      />
      <Route
        path="questions/:id"
        element={
          <Protected>
            <QuestionPage />
          </Protected>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
