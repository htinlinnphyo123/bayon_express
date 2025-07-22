import { userRepository } from "@/modules/domain/user/user.repository";
import * as userResource from "@/modules/Web/users/resources/index";

export const get = async () => {
    const users = await userRepository.getWithPaginate();
    return users.map(userResource.indexUserResource);
}