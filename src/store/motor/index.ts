// import getters from './getters'
// import mutations from './mutations'
// import actions from './actions'

export default {
  namespaced: true,
  state: {
    authenticated: <boolean>false,
    user: {},
  },
  mutations: {
    setAuthenticationStatus(state: any, value: boolean) {
      state.authenticated = value
    },
    setUser(state: any, value: object) {
      state.user = value
    },
  },
  // getters,
  // mutations,
  // actions,
}
