import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import LandingPage from "./views/LandingPage";
import Login from "./views/LoginPage";
import Registration from "./views/Registration";
import Notices from "./views/Notices";
import HeartRateContextProvider from "./contexts/HeartRateContextProvider";
import Appointments from "./views/Appointments";
import Profile from "./views/Profile";
import Notification from "./views/Notification";
import MotherGuide from "./views/MotherGuide";
import SinglePost from "./views/SinglePost";

import DashboardPHM from "./views/DashboardPHM";
import RoleContextProvider from "./contexts/RoleContextProvider";
import { PrivateRoute } from "./routes/PrivateRoute";
import { PublicRoute } from "./routes/PublicRoute";
import Unauthorized from "./views/UnAuthorized";
import DashboardMOH from "./views/DashboardMOH";
import Registration2 from "./views/Registration2";
import SingleMother from "./views/SingleMother";
import MotherDashboard from "./views/MotherDashboard";
import WelcomePage from "./views/WelcomePage";
import PhmSingleMotherAppointment from "./views/PhmSingleMotherAppointment";
//import phmSingleMotherAppointment from "./views/phmSingleMotherAppointment";
import MotherRegistrationPage from "./views/MotherRegistrationPage";
// import MotherRegistration from "./views/MotherReg";

// You can add your routes here
// Add a baselayout too if needed

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: (
          <PublicRoute>
            <WelcomePage />
          </PublicRoute>
        ),
      },
    ],
  },

  {
    path: "/landing",
    children: [
      {
        index: true,
        element: (
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        ),
      },
    ],
  },

  {
    path: "/login",
    children: [
      {
        index: true,
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: "/registration",
    children: [
      {
        index: true,
        element: (
          <PublicRoute>
            <Registration />
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: "/Mother/Registration",
    children: [
      {
        index: true,
        element: (
          <PublicRoute>
           <MotherRegistrationPage/>
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: "/registration2",
    children: [
      {
        index: true,
        element: (
          <PublicRoute>
            <Registration2 />
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: "/motherdashboard",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <MotherDashboard />
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
    path: "/mohdashboard",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashboardMOH />
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
  {
    path: "/mother-singleview/:id",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <SingleMother />,
      },
    ],
  },
  {
    path: "/mother-appointment-singleview/:id",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <PhmSingleMotherAppointment />,
      },
    ],
  },
  {
    path: "/unauthorized",
    children: [
      {
        index: true,
        element: <Unauthorized />,
      },
    ],
  },
  // {
  //   path: "/basic-details-preview",
  //   children: [
  //     {
  //       index: true,
  //       element: <BasicDetailsPreview />,
  //     },
  //   ],
  // },
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
