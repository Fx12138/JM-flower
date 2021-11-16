import { localReq } from "./request";

//获取所有消息
export function getAllMessage(userFrom) {
    return localReq({
        url: '/getAllMessage',
        method: 'get'
    })
}

//发送消息时,将消息存入数据库
export function saveMes(fromUserId, content, create_time) {
    return localReq({
        url: '/saveMes',
        method: 'post',
        data: {
            fromUserId, content, create_time
        }
    })
}