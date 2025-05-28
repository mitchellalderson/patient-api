import { PrismaClient, User } from '../../generated/prisma';
import { NotFoundError } from '../utils/errors';
import * as crypto from 'crypto';

export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }


  public async checkPasswordHash(password: string, hash: string): Promise<boolean> {
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    return hashedPassword === hash;
  }

  public async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  public async getUserById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }

    return user;
  }

  public async createUser(userData: Omit<User, 'id'>): Promise<User> {

    // Hash the password before saving it to the database
    const hashedPassword = crypto.createHash('sha256').update(userData.password).digest('hex');
    return this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword
      }
    });
  }

  public async updateUser(id: number, userData: Partial<Omit<User, 'id'>>): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }

    return this.prisma.user.update({
      where: { id },
      data: userData
    });
  }

  public async deleteUser(id: number): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }

    await this.prisma.user.delete({
      where: { id }
    });
  }
}
