import { localReq } from "./request";

/**
 * 进入房间
 * @param {房间id} roomId 
 * @param {用户信息} user 
 * @returns 
 */
export function inFlowerRoom(roomId, user) {
    return localReq({
        url: '/flowerRoom/inRoom',
        method: 'post',
        data: {
            roomId,
            username: user.username
        }
    })
}

/**
 * 获取房间内用户列表
 * @param {房间id} roomId 
 * @returns 
 */
export function getFlowerUserList(roomId) {
    return localReq({
        url: '/flowerRoom/flowerUserList',
        method: 'get',
        params: {
            roomId
        }
    })
}


export function outFlowerRoom(roomId, username) {
    return localReq({
        url: '/flowerRoom/outRoom',
        method: 'get',
        params: {
            roomId: roomId,
            username: username
        }
    })
}

export function getRooms() {
    return localReq({
        url: '/flowerRoom/rooms',
        method: 'get',
    })
}
