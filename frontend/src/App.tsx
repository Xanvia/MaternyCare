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
import MotherGuide from "./views/MotherGuide";
import SinglePost from "./views/SinglePost";
import { DashboardPHM } from "./views/DashboardPHM";
import RoleContextProvider from "./contexts/RoleContextProvider";
import { PrivateRoute } from "./components/PrivateRoute";

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
        element: (
          <PrivateRoute>
            <Dashboard />,
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/phmdashboard",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashboardPHM />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/notices",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Notices />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/appointments",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Appointments />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/profile",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/guide",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <MotherGuide />
          </PrivateRoute>
        ),
      },
      { path: "singlepost/:id", element: <SinglePost /> },
    ],
  },
]);

function App() {
  return (
    <div>
      {/* if you have any context which should include in everywhere of the application you can wrap this RouterProvider with that context */}
      <RoleContextProvider>
        <HeartRateContextProvider>
          <RouterProvider router={router} />
        </HeartRateContextProvider>
      </RoleContextProvider>
    </div>
  );
}

export default App;
