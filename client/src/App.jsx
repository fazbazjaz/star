import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";
import Protected from "./components/Protected";
import Questions from "./pages/Questions";
import AddQuestion from "./pages/AddQuestion";
import Question from "./pages/Question";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route
        path="profile"
        element={
          <Protected>
            <Profile />
          </Protected>
        }
      />
      <Route
        path="users"
        element={
          <Protected>
            <Users />
          </Protected>
        }
      />
      <Route
        path="questions"
        element={
          <Protected>
            <Questions />
          </Protected>
        }
      />
      <Route
        path="questions/add"
        element={
          <Protected>
            <AddQuestion />
          </Protected>
        }
      />
      <Route
        path="questions/:id"
        element={
          <Protected>
            <Question />
          </Protected>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
