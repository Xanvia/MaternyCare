import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import LandingPage from "./views/LandingPage";
import Login from "./views/LoginPage";
import Registration from "./views/Registration";
import MOHRegistration from "./views/MohRegistration";
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
// import Registration2 from "./views/Registration2";
import SingleMother from "./views/SingleMother";
import MotherDashboard from "./views/MotherDashboard";
import WelcomePage from "./views/WelcomePage";
import PhmSingleMotherAppointment from "./views/PhmSingleMotherAppointment";
import PhmAppointment from "./views/PhmAppointment";
//import phmSingleMotherAppointment from "./views/phmSingleMotherAppointment";
import MotherRegistrationPage from "./views/MotherRegistrationPage";
import MohProfile from "./views/MohProfile";
import PhmProfile from "./views/PhmProfile";
import DashboardVOG from "./views/DashboardVOG";
import Progress from "./views/Progress";
import PhmMotherListInMoh from "./views/PhmMotherListInMoh";
import Feedback from "./views/Feedback";
import SingleRedMother from "./views/SingleRedMother";
import SingleMotherGenral from "./views/SingleMotherGeneral";
import FormPreview from "./views/FormPreview";
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
    path: "/mother/registration",
    children: [
      {
        index: true,
        element: (
          <PublicRoute>
            <MotherRegistrationPage />
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: "/mohregistration",
    children: [
      {
        index: true,
        element: (
          <PublicRoute>
            <MOHRegistration />
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
    path: "/vogdashboard",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashboardVOG />
          </PrivateRoute>
        ),
      },
      {
        path: "patient/:id",
        element: <SingleRedMother />,
      },
    ],
  },
  {
    path: "/phmappointments",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <PhmAppointment />
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
      {
        path: "phm/:id",
        element: (
          <PrivateRoute>
            <PhmMotherListInMoh />
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
    path: "/motherappointments",
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
    path: "/motherprofile",
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
    path: "/mohprofile",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <MohProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/phmprofile",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <PhmProfile />
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
    path: "/progress",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Progress />,
      },
      {
        path: "feedback/phm/:id",
        element: (
          <PrivateRoute>
            <Feedback />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/mother-singleview/:id/appointment/:appointmentid",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <SingleMother />,
      },
    ],
  },

  {
    path: "/mother/:id/general-form",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <SingleMotherGenral />,
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
    path: "/mother/:id/form-preview",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <FormPreview />,
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
