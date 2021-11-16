import Vue from 'vue'
import Vuex from 'vuex'

import {
    ADD_CART,
    ADD_COUNT
} from './mutation-types'

import userInfo from './moudles/userInfo'

//安装插件
Vue.use(Vuex)

//创建store对象
const store = new Vuex.Store({
    state: {
        cartList: []
    },
    mutations: {
        //mutations中建议只进行一步操作,稍微复杂的操作放到actions中

        //商品存在于购物车,数量加1
        [ADD_COUNT](state, payload) {
            // payload.count += 1
            let index = null;
            let i = state.cartList.length;
            while (i -= 1) {
                if (state.cartList[i].goods_id == payload.goods_id) {
                    index = i;
                }
            }
            let goods = state.cartList.find(item => item.goods_id == payload.goods_id)
            goods.count = goods.count + 1;
            Vue.set(state.cartList, index, goods)
        },

        //添加商品到购物车
        [ADD_CART](state, payload) {
            // Vue.set(state.cartList, state.cartList.length + 1, payload)
            state.cartList.push(payload)
        }
    },
    actions: {
        addToCart(context, payload) {
            return new Promise((resolve, reject) => {
                //判断商品是否已经在购物车中
                let oldGoods = context.state.cartList.find(item => item.goods_id == payload.goods_id)
                if (oldGoods) {
                    //商品已经存在于购物车中,数量加1
                    context.commit(ADD_COUNT, oldGoods)
                    resolve('商品已经存在于购物车中,数量加1')
                } else {
                    //商品不存在,数量等于一并加入到购物车列表中
                    payload.count = 1
                    context.commit(ADD_CART, payload)
                    resolve('商品不存在,数量等于一并加入到购物车列表中')
                }
            })
        }
    },
    getters: {
        getCartList(state) {
            return state.cartList
        }
    },
    modules: {
        userInfo
    }
})

//挂在到vue实例上
export default store