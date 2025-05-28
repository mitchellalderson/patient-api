import {NextFunction, Request, Response, Router} from "express";
import {ValidationError} from "../utils/errors";
import {UserService} from "../services/user.service";
import {PatientService} from "../services/patient.service";


const userService = new UserService();
const patientService = new PatientService();


const router = Router()
const path = '/patients';

const getUser = async (req: Request) => {
    // get user id from header
    const userId = req.header('user-id');
    if (!userId) {
        throw new ValidationError('User ID header is missing');
    }
    const userInt = parseInt(userId);
    return await userService.getUserById(userInt);
}


const getAllPatients = async (req: Request, res: Response, next: NextFunction) => {
    try {


        const user = await getUser(req)

        // check if user is admin or billing
        if (user.role !== 'ADMIN' && user.role !== "BILLING") {
            throw new ValidationError('User is not authorized to access this resource');
        }

        const patients = await patientService.getAllPatients();
        res.json(patients);
    } catch (error) {
        next(error);
    }
};

const getPatientById = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const user = await getUser(req)

        // check if user is admin or billing
        if (user.role !== 'ADMIN' && user.role !== "BILLING") {
            throw new ValidationError('User is not authorized to access this resource');
        }

        const id = Number(req.params.id);
        if (isNaN(id)) {
            throw new ValidationError('Invalid patient ID');
        }

        const patient = await patientService.getPatientById(id);
        res.json(patient);
    } catch (error) {
        next(error);
    }
};

const createPatient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const patientData = req.body;
        const newPatient = await patientService.createPatient(patientData);
        res.status(201).json(newPatient);
    } catch (error) {
        next(error);
    }
};



router.get(`${path}`, getAllPatients);
router.get(`${path}/:id`, getPatientById);
router.post(`${path}`, createPatient);


export default router;