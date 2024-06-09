import { Router } from "express";
import { UserController } from "../controller/UserController";
import { jwtMiddleware } from "../middlewear/jwtMiddleware";

const router = Router();
const userController = new UserController();

router.post("/register", userController.save);
router.post("/login", userController.login);

router.use(jwtMiddleware);

export default router;
