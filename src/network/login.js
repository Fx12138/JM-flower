import { localReq } from "./request";

export function loginByUsername(userFrom) {
    return localReq({
        url: '/user/login',
        method: 'post',
        data: userFrom
    })
}

export function getUserById(userId) {
    return localReq({
        url: '/user',
        method: 'get',
        params: {
            user_id: userId
        }
    })
}