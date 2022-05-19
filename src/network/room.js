import { localReq } from "./request";

/**
 * 创建房间
 * @param {*} roomName 
 * @param {*} user 
 * @returns 
 */
export function createRoom(roomName, user, password) {
    return localReq({
        url: '/flowerRoom/createRoom',
        method: 'post',
        data: {
            roomName,
            user,
            password
        }
    })
}

/**
 * 进入房间
 * @param {房间id} roomId 
 * @param {用户信息} user 
 * @returns 
 */
export function inFlowerRoom(roomId, user, password) {
    return localReq({
        url: '/flowerRoom/inRoom',
        method: 'post',
        data: {
            roomId,
            username: user.username,
            password
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


export function getRoomById(roomId) {
    return localReq({
        url: '/flowerRoom/room',
        method: 'get',
        params: {
            roomId
        }
    })
}

//保存房间信息
export function saveRoomStatus(roomInfo, flowerUserList) {
    return localReq({
        url: '/flowerRoom/saveRoomStatus',
        method: 'post',
        data: {
            "roomInfo": JSON.stringify(roomInfo), "flowerUserList": JSON.stringify(flowerUserList)
        }
    })
}


