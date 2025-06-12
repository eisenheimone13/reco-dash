import { createBrowserRouter } from "react-router";
import App from "../App";

import Dashboard from "../pages/dashboard/Dashboard";
import AppInventory from "../pages/app-inventory/AppInventory";
import SettingsPage from "../pages/settings/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Dashboard /> },
      {
        path: "/inventory",
        element: <AppInventory />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
  },
]);
