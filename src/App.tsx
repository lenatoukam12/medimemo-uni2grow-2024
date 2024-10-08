import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./components/layout/Layout.tsx";
import Contacts from "./pages/contacts/Contacts.tsx";
import Login from "./pages/login/Login";
import { Therapies } from "./pages/therapies/Therapies.tsx";
import Medication from "./pages/medications/Medication";
import Dashboard from "./pages/Dashboard";
import AddEditContact from "./pages/contacts/actions/AddEditContact.tsx";
import ViewContact from "./pages/contacts/viewContact/ViewContact.tsx";
import EditContact from "./pages/editContact/editContact.tsx";

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
    path: "/",
    loader: () => redirect("/login"),
  },

  {
    element: <Layout />,
    children: [
      {
        path: "/contacts",
        element: <Contacts />,
      },
      {
        path: "/addeditcontact",
        element: <AddEditContact />,
      },
      {
        path: "/viewContact/:id",
        element: <ViewContact />,
      },
      {
        path: "/editContact/:id",
        element: <EditContact />,
      },
      {
        path: "/medications",
        element: <Medication />,
      },
      {
        path: "/Therapies",
        element: <Therapies />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
