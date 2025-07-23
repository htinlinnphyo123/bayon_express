import { userRepository } from "@/modules/domain/user/user.repository";
import * as userResource from "@/modules/Web/users/resources/index";
import getPagination from '@util/request/get-pagination'

export const get = async (req:any) => {
    const { limit,page } = getPagination(req.query);
    const users = await userRepository.select(['id', 'email', 'username']).order('createdAt','desc').getWithPaginate(page,limit);
    return userResource.indexUserResource(users);
}