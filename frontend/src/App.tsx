import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import LandingPage from "./views/LandingPage";
import Login from "./views/LoginPage";
import Registration from "./views/Registration";
import Dashboard from "./views/Dashboard";
import Notices from "./views/Notices";
import HeartRateContextProvider from "./contexts/HeartRateContextProvider";
import Appointments from "./views/Appointments";
import Profile from "./views/Profile";
import Notification from "./views/Notification";
import MotherGuide from "./views/MotherGuide";
import SinglePost from "./views/SinglePost";
import {DashboardPHM} from "./views/DashboardPHM";

// You can add your routes here
// Add a baselayout too if needed

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
    ],
  },

  {
    path: "/login",
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/registration",
    children: [
      {
        index: true,
        element: <Registration />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/phmdashboard",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <DashboardPHM />,
      },
    ],
  },
  {
    path: "/notices",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Notices />,
      },
    ],
  },
  {
    path: "/appointments",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Appointments />,
      },
    ],
  },
  {
    path: "/profile",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Profile />,
      },
    ],
  },
   {
    path: "/guide",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <MotherGuide />,
      },
      { path: "singlepost/:id", element: <SinglePost /> },
    ],
  },
   {
    path: "/notification",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Notification />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      {/* if you have any context which should include in everywhere of the application you can wrap this RouterProvider with that context */}
      <HeartRateContextProvider>
        <RouterProvider router={router} />
      </HeartRateContextProvider>
    </div>
  );
}

export default App;
