import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./Root";
import { Flowbite } from "flowbite-react";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Index from "./pages/Index/Index";
import Accounting from "./pages/Accounting/Accounting";
import TodoList from "./pages/TodoList/TodoList";
import Test from "./pages/Test/test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            errorElement: <ErrorPage />,
            path: "account",
            element: <Accounting />,
          },
          {
            errorElement: <ErrorPage />,
            path: "todolist",
            element: <TodoList />,
          },
          {
            errorElement: <ErrorPage />,
            path: "test",
            element: <Test />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Flowbite>
        <RouterProvider router={router} />
    </Flowbite>
  </React.StrictMode>
);
