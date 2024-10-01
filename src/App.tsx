import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/login/Login";
import Therapies from "./pages/therapies/Therapies";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },

  {
    path: "/therapies",
    element: <Therapies/>,
  },

  {
    path: "/",
    loader: () => redirect("/login"),
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
