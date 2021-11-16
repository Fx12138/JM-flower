const state = {
    userInfo: { name: 'dadawdad' }
}
const getters = {
    userInfo(state) { return state.userInfo }
}
const actions = {
    getPayload(context, payload) {
        return new Promise((resolve, reject) => {
            context.commit(logPayload, payload)
            resolve('以输出')
        })
    }
}
const mutations = {
    setUserInfo(state, payload) {
        state.userInfo = payload
    }
}
export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations
}