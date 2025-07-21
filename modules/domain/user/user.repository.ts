import { UserRepositoryInterface } from './userRepository.interface';
import { baseRepository } from '../base/base.repository';
import prisma from '../../../config/db';
import { User } from '@prisma/client';

const base = baseRepository<User>(prisma.user);

export const userRepository: UserRepositoryInterface = {
  ...base,
};
