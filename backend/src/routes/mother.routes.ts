import { EmailController } from "../controller/EmailController";
import { MotherController } from "../controller/MotherController";
import { jwtMiddleware } from "../middlewear/jwtMiddleware";
// import { roleMiddleware } from "../middlewear/roleMiddleware";

export const MotherRoutes = [
  {
    method: "get",
    route: "/users/mother/all",
    controller: MotherController,
    action: "all",
    middlewares: [],
  },
  {
    method: "get",
    route: "/users/mother/:id",
    controller: MotherController,
    action: "one",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [],
  },

  {
    method: "get",
    route: "/users/motherbyuser/:userId",
    controller: MotherController,
    action: "getMotherByUser",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [],
  },

  {
    method: "get",
    route: "/phm/mothers/:id",
    controller: MotherController,
    action: "getPhmAllMothersByPhmId",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [jwtMiddleware],
  },
  {
    method: "get",
    route: "/phm/user/mothers/:id",
    controller: MotherController,
    action: "getPhmAllMothersByUserId",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [jwtMiddleware],
  },

  {
    method: "get",
    route: "/vog/mothers/",
    controller: MotherController,
    action: "getMothersByRiskType",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [],
  },

  {
    method: "get",
    route: "/mother/:motherId/kickcounts/",
    controller: MotherController,
    action: "getKickCountData",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [],
  },

  {
    method: "get",
    route: "/mother/:motherId/emergency-plan/",
    controller: MotherController,
    action: "getEmergencyData",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [],
  },

  {
    method: "get",
    route: "/mother/:motherId/emergency-plan/",
    controller: MotherController,
    action: "getEmergencyData",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [],
  },

  {
    method: "get",
    route: "/mother/:motherId/counseling-form/",
    controller: MotherController,
    action: "getCounselingDetails",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [],
  },

  {
    method: "put",
    route: "/users/mother/:id/rich-text-content",
    controller: MotherController,
    action: "updateRedMotherContent",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [],
  },

  {
    method: "post",
    route: "/users/mother",
    controller: MotherController,
    action: "save",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [jwtMiddleware],
  },
  {
    method: "put",
    route: "/users/mother/:id/basic-details",
    controller: MotherController,
    action: "updateBasicDetails",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [jwtMiddleware],
  },

  {
    method: "put",
    route: "/users/mother/:id/updateClinicCareCheckUp",
    controller: MotherController,
    action: "updateClinicCareCheckUp",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [jwtMiddleware],
  },

  {
    method: "put",
    route: "/users/mother/:id/present-obstetric-history",
    controller: MotherController,
    action: "updatePresentObstetricHistory",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [jwtMiddleware],
  },

  {
    method: "put",
    route: "/users/mother/update-emergency-plan",
    controller: MotherController,
    action: "updateEmergencyPlan",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [],
  },

  {
    method: "put",
    route: "/users/mother/update-counseling-form",
    controller: MotherController,
    action: "updateCounselingForm",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [],
  },

  {
    method: "put",
    route: "/users/mother/:id/update-dashboard",
    controller: MotherController,
    action: "updateDashboard",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [],
  },

  {
    method: "put",
    route: "/users/mother/:id/signature",
    controller: MotherController,
    action: "updateSignature",
    middlewares: [jwtMiddleware],
  },

  {
    method: "put",
    route: "/users/mother/:id/vogsignature",
    controller: MotherController,
    action: "updateVogSignature",
    middlewares: [jwtMiddleware],
  },

  {
    method: "put",
    route: "/users/mother/:id/dentistsignature",
    controller: MotherController,
    action: "updateDentistSignature",
    middlewares: [jwtMiddleware],
  },

  {
    method: "put",
    route: "/mother/update-kick-count",
    controller: MotherController,
    action: "updateKickCount",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [],
  },

  {
    method: "delete",
    route: "/users/mother/:id",
    controller: MotherController,
    action: "remove",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [jwtMiddleware],
  },

  {
    method: "post",
    route: "/send-email",
    controller: EmailController,
    action: "sendHealthIssueReport",
    middlewares: [],
  },
];
