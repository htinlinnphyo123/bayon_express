import {users} from '@prisma/client'
import { PaginationResourceType } from '@web/base/types/paginate';

type UserCollectionResource = {
    data: users[],
} & PaginationResourceType;

export function indexUserResource(user:UserCollectionResource){
    return {
        data: user.data.map((usr) => ({
            id: usr.id,
            email: usr.email,
            username: usr.username,
            services: usr.services,
            phoneNumberPrefix: usr.phoneNumberPrefix,
        })),
        "page": user.page,
        "limit": user.limit,
        "total": user.total,
        "totalPages": user.totalPages
    }
}