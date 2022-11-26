import { createStore } from "vuex";
import { getToken } from "./Token";
import {
  getCurrentUser,
  isLogged,
} from "./User";
import { getTime } from "./WorkingTime";

import createPersistedState from "vuex-persistedstate";

const store = createStore({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state: {
    jwt: {
      token: null,
    },
    user: {},
    workingTimes: [],
  },
  getters: {
    getToken,
    getCurrentUser,
    isLogged,
    getTime
  },
  mutations: {
    setToken(state, token) {
      state.jwt.token = token;
    },
    setCurrentUser(state, user) {
      state.user = user;
    },
    setWorkingTimes(state, workingTimes) {
      state.workingTimes = workingTimes;
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    setCurrentUser({ commit }, user) {
      commit("setCurrentUser", user);
    },
    setWorkingTimes({ commit }, workingTimes) {
      commit("setWorkingTimes", workingTimes);
    }
  },
});

export default store;
