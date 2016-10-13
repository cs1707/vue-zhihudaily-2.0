import Vue from 'vue'
import Vuex from 'vuex'
import * as api from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    list: [],
    detail: {}
  },
  actions: {

    FETCH_LATEST ({ commit, state }) {
      return api.fetchLatest()
        .then(({data}) => {
          commit('SET_LIST', [ data ])
        })
    },

    FETCH_BEFORE ({ commit, state }) {
      const latest = state.list[state.list.length - 1]
      if (!latest) {
        return Promise.reject()
      }
      return api.fetchBefore(latest.date)
        .then(({data}) => {
          commit('SET_LIST', [ ...state.list, data ])
        })
    },

    FETCH_DETAIL ({ commit, state }, id) {
      return api.fetchDetail(id)
        .then(({data}) => {
          commit('SET_DETAIL', data)
        })
    }
  },
  mutations: {
    SET_LIST (state, data) {
      state.list = data
    },

    SET_DETAIL (state, data) {
      state.detail = data
    }
  }
})

export default store
