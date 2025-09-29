import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Home from "../pages/Home.jsx";
import AddItem from "../pages/AddItem.jsx";
import EditItem from "../pages/EditItem.jsx";
import ItemDetails from "../pages/ItemDetails.jsx";
import NotAllowed from "../pages/NotAllowed.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, 
    children: [

      {
        index: true, 
        element: <Home />,
      },
      {
        path: "/add", 
        element: <AddItem />,
      },
      {
        path: "/edit/:id", 
        element: <EditItem />,
      },
      {
        path: "/item/:id", 
        element: <ItemDetails />,
      },
      {
        path: "*", 
        element: <NotAllowed />,
      },
    ],
  },
]);

export default router;