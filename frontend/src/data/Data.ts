import {
  AppointmentsIcon,
  DashboardIcon,
  NoticesIcon,
  ProfileIcon,
  LogoutIcon,
  Help,
} from "../assets/icons/Icons";

export const navLinks = [
  {
    name: "Dashboard",
    icon: DashboardIcon,
    path: "/dashboard",
  },
  {
    name: "Notices",
    icon: NoticesIcon,
    path: "/notices",
  },
  {
    name: "Appointments",
    icon: AppointmentsIcon,
    path: "/appointments",
  },
  {
    name: "Profile",
    icon: ProfileIcon,
    path: "/profile",
  },
  {
    name: "Mother's Guide",
    icon: Help,
    path: "/guide",
  },
  {
    name: "Logout",
    icon: LogoutIcon,
    path: "",
  },
];

export const categories = [
  {
    name: "Breastfeeding",
    content: [
      {
        path: "/guide/breastfeeding",
        title: "Breastfeeding Basics",
        subtitle:
          "Learn the basics of breastfeeding, including best practices and common challenges.",
        img: "https://img.freepik.com/free-vector/hand-drawn-breastmilk-illustration_23-2149197117.jpg?w=826&t=st=1716718061~exp=1716718661~hmac=db4b5d8237d5f418284eeb144f043a3096095ccbf1e34e7116f6c61641e27bf4",
      },
      {
        path: "/guide/breastfeeding-positions",
        title: "Breastfeeding Positions",
        subtitle:
          "Discover different positions for breastfeeding that may be comfortable for you and your baby.",
        img: "https://img.freepik.com/free-vector/hand-drawn-breastmilk-illustration_23-2149207116.jpg?w=826&t=st=1716718073~exp=1716718673~hmac=39b4407f2859f0da7127fb122f6373210d99b90e32b843a2a92b93ead0deb9d1",
      },
      {
        path: "/guide/breastfeeding-diet",
        title: "Diet While Breastfeeding",
        subtitle:
          "Understand the importance of your diet while breastfeeding and what foods you should eat.",
        img: "https://img.freepik.com/free-vector/beautiful-woman-with-her-baby-breastfeeding-illustrated_23-2149218820.jpg?w=826&t=st=1716718076~exp=1716718676~hmac=56d2bda232cd5af50eb6cdc5497aacf227d1b9816d01dbb5dd48ba4ab46d7fd7",
      },
    ],
  },
  {
    name: "Baby Care",
    content: [
      {
        path: "/guide/diapering",
        title: "Diapering Your Baby",
        subtitle:
          "Learn how to properly diaper your baby to prevent rashes and discomfort.",
        img: "https://img.freepik.com/free-vector/flat-mothers-day-illustration-spanish_23-2149375192.jpg?w=826&t=st=1716718382~exp=1716718982~hmac=54344e254c5e44b72f5941351ca19ea6b435026f48ed63795305bc3b0811b731",
      },
      {
        path: "/guide/bathing",
        title: "Bathing Your Baby",
        subtitle:
          "Discover safe and effective methods for bathing your newborn.",
        img: "https://img.freepik.com/free-vector/motherhood-concept-illustration_114360-2684.jpg?w=826&t=st=1716718287~exp=1716718887~hmac=3fc6ff3aab0c21db933998fef81d406e93bdaf69a18f789d5e32f556921aae21",
      },
      {
        path: "/guide/sleeping",
        title: "Baby Sleep Basics",
        subtitle:
          "Understand your baby's sleep patterns and learn techniques to help them sleep better.",
        img: "https://img.freepik.com/free-vector/pregnancy-maternity-scenes-illustrated_52683-45258.jpg?w=826&t=st=1716718319~exp=1716718919~hmac=d57acab9e25c4448619e642fdee634533d7eed8304cb109caeae49864dd62415",
      },
    ],
  },
  {
    name: "Postpartum Care",
    content: [
      {
        path: "/guide/recovery",
        title: "Postpartum Recovery",
        subtitle:
          "Learn about the recovery process after childbirth and how to take care of yourself.",
        img: "https://img.freepik.com/free-vector/nurse-helping-patient-concept-illustration_114360-22273.jpg?t=st=1716718514~exp=1716722114~hmac=ab3e8e63c4b3f9ec7cec05cc5fc8f6fc75a9a1738276b611acbc593f7229615e&w=826",
      },
      {
        path: "/guide/exercise",
        title: "Postpartum Exercise",
        subtitle:
          "Discover safe and effective exercises to help you regain strength and energy after childbirth.",
        img: "https://img.freepik.com/free-vector/flat-nurse-helping-patient-background_23-2148149093.jpg?t=st=1716718543~exp=1716722143~hmac=54e736b9a713c0392e6f748966345a29cd6b04a4abf6f56a0ac9403537ad3b74&w=826",
      },
      {
        path: "/guide/mental-health",
        title: "Postpartum Mental Health",
        subtitle:
          "Understand the importance of mental health after childbirth and learn about common mental health issues.",
        img: "https://img.freepik.com/free-vector/flat-nurse-helping-patient_23-2148146860.jpg?t=st=1716718561~exp=1716722161~hmac=ee7558b2ebb4a82d0ebc5b7a5fcbec879d1a4db7ce298dccab5c05e0df95ccb2&w=826",
      },
    ],
  },
];
