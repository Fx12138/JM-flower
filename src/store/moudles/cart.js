const state = {}
const getters = {
    getA(state) {
        return state.total
    }
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
    logPayload(state, payload) {
        console.log(payload)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}