import { localReq } from "./request";
export function sendOtherCards(flowerUserList) {
    return localReq({
        url: '/flower/sendOtherCards',
        method: 'get',
        params: { flowerUserList }
    })
}