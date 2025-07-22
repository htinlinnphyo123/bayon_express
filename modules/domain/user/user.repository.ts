import { UserRepositoryInterface } from './userRepository.interface';
import { baseRepository } from '../base/base.repository';
import prisma from '../../../config/db';
import { users } from '@prisma/client';

const base = baseRepository<users>(prisma.users);

export const userRepository: UserRepositoryInterface = {
  ...base,
};
