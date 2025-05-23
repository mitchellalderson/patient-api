import { Request, Response, Router, NextFunction } from 'express';
import { IController } from '../interfaces/controller.interface';
import { PatientService } from '../services/patient.service';
import { NotFoundError, ValidationError } from '../utils/errors';

export class PatientController implements IController {
  public path = '/patients';
  public router = Router();
  private patientService: PatientService;

  constructor(patientService: PatientService) {
    this.patientService = patientService;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.getAllPatients);
    this.router.get(`${this.path}/:id`, this.getPatientById);
    this.router.post(`${this.path}`, this.createPatient);
    this.router.put(`${this.path}/:id`, this.updatePatient);
    this.router.delete(`${this.path}/:id`, this.deletePatient);
  }

  private getAllPatients = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const patients = await this.patientService.getAllPatients();
      res.json(patients);
    } catch (error) {
      next(error);
    }
  };

  private getPatientById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        throw new ValidationError('Invalid patient ID');
      }
      
      const patient = await this.patientService.getPatientById(id);
      res.json(patient);
    } catch (error) {
      next(error);
    }
  };

  private createPatient = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const patientData = req.body;
      const newPatient = await this.patientService.createPatient(patientData);
      res.status(201).json(newPatient);
    } catch (error) {
      next(error);
    }
  };

  private updatePatient = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        throw new ValidationError('Invalid patient ID');
      }
      
      const patientData = req.body;
      const updatedPatient = await this.patientService.updatePatient(id, patientData);
      res.json(updatedPatient);
    } catch (error) {
      next(error);
    }
  };

  private deletePatient = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        throw new ValidationError('Invalid patient ID');
      }
      
      await this.patientService.deletePatient(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
