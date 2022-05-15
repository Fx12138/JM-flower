import { localReq } from "./request";
export function sendOtherCards(flowerUserList) {
    return localReq({
        url: '/flower/sendOtherCards',
        method: 'get',
        params: { flowerUserList }
    })
}
export function sendCard(username, roomId, pockers) {
    return localReq({
        url: '/flowerGame/sendcard',
        method: 'post',
        data: { username, roomId, pockers }
    })
}