import { createBrowserRouter } from "react-router";
import Dashboard from "../pages/dashboard/Dashboard";
import App from "../App";
import AppInventory from "../pages/app-inventory/AppInventory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "", element: <Dashboard /> }],
  },
  {
    path: "/inventory",
    element: <AppInventory />,
  },
]);
