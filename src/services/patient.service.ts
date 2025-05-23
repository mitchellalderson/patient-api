import { PrismaClient, Patient } from '../../generated/prisma';
import { NotFoundError } from '../utils/errors';

export class PatientService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getAllPatients(): Promise<Patient[]> {
    return this.prisma.patient.findMany();
  }

  public async getPatientById(id: number): Promise<Patient> {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      include: { providers: true }
    });

    if (!patient) {
      throw new NotFoundError(`Patient with id ${id} not found`);
    }

    return patient;
  }

  public async createPatient(patientData: Omit<Patient, 'id'>): Promise<Patient> {
    return this.prisma.patient.create({
      data: patientData
    });
  }

  public async updatePatient(id: number, patientData: Partial<Omit<Patient, 'id'>>): Promise<Patient> {
    const patient = await this.prisma.patient.findUnique({
      where: { id }
    });

    if (!patient) {
      throw new NotFoundError(`Patient with id ${id} not found`);
    }

    return this.prisma.patient.update({
      where: { id },
      data: patientData
    });
  }

  public async deletePatient(id: number): Promise<void> {
    const patient = await this.prisma.patient.findUnique({
      where: { id }
    });

    if (!patient) {
      throw new NotFoundError(`Patient with id ${id} not found`);
    }

    await this.prisma.patient.delete({
      where: { id }
    });
  }
}
