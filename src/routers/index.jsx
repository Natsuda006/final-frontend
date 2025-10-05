import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout.jsx"
import NotFound from "../pages/NotAllowed.jsx";
import Home from "../pages/Home.jsx";
import AddItem from "../pages/AddItem.jsx";
import UpdateItem from "../pages/UpdateItem.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
       {
      path: "items",      
      element: <Home />
    },
      
      {
        path: "items/update/:type/:id",
        element: <UpdateItem />
      },
      {
        path: "add-book",
        element: <AddItem />
      },
      {
        path: "*",
        element: <NotFound />
      },
    ],
  },
]);

export default router;