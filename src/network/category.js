import { request } from "./request";

//分类数据接口
export function getCategories() {
    return request({
        url: '/categories'
    })
}

//点击分类获取响应分类
export function categoryClick(cid) {
    return request({
        url: '/goods/search',
        params: {
            cid
        }
    })
}