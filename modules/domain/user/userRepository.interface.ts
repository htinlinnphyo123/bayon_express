import { User } from "@prisma/client";
import { BaseRepositoryInterface } from "../base/baseRepository.interface";

export interface UserRepositoryInterface extends BaseRepositoryInterface<User> {
}
