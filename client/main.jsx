import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Login from "./src/pages/Login.jsx";
import Signup from "./src/pages/SignUp.jsx";
import Home from "./src/pages/Home.jsx";
import Error from "./src/pages/Error.jsx";
import CreateGrid from "./src/pages/CreateGrid.jsx";
import Battle from "./src/pages/Battle.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/creategrid",
        element: <CreateGrid />,
      },
      {
        path: "/battle",
        element: <Battle />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
