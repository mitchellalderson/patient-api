import { Router } from 'express';
import {UserService} from "../services/user.service";
import {UserController} from "../controllers/user.controller";
import {PatientService} from "../services/patient.service";
import {PatientController} from "../controllers/patient.controller";

const router = Router();

const userService = new UserService();
const userController = new UserController(userService);

const patientService = new PatientService();
const patientController = new PatientController(patientService);

router.use('/', userController.router);
router.use('/', patientController.router);

export default router;
