import {users} from '@prisma/client'

export function indexUserResource(user:users){
    return {
        id:user.id,
        email:user.email,
        username:user.username,
    }
}