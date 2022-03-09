import { User } from "@/lib/NotificationSignalTypes";
import { Module } from "vuex";
import { State } from "..";
import moment, { Moment } from "moment";
import ServerApi from "@/lib/ServerApi";

export type AuthState = {
  token: string | null;
  tokenExp: Moment | null;
  user: User | null;
  loggedIn: boolean;
};

const authModule: Module<AuthState, State> = {
  state: {
    token: localStorage.getItem("token"),
    tokenExp: moment(Number(localStorage.getItem("tokenExp"))),
    user: null,
    loggedIn: !!localStorage.getItem("token"),
  },
  getters: {},
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    setTokenExp(state, tokenExp) {
      state.tokenExp = tokenExp;
    },
    setLoggedIn(state, loggedIn) {
      state.loggedIn = loggedIn;
    },
  },
  actions: {
    setUser({ commit }, user) {
      const parsedUser = user;
      parsedUser.created_at = moment(user.created_at);
      parsedUser.updated_at = moment(user.updated_at);
      if (parsedUser.verified) {
        parsedUser.verified = moment(user.verified);
      }
      commit("setUser", parsedUser);
    },
    setToken({ commit }, token) {
      commit("setToken", token);
      ServerApi.setToken(token);
      localStorage.setItem("token", token);
    },
    setTokenExp({ commit }, expireIn) {
      const expirationTime = moment().add(expireIn, "ms");
      commit("setTokenExp", expirationTime);
      localStorage.setItem("tokenExp", String(expirationTime.valueOf()));
    },
    setLoggedIn({ commit }, loggedIn) {
      commit("setLoggedIn", loggedIn);
    },
    logout({ commit }) {
      commit("setUser", null);
      commit("setToken", null);
      commit("setTokenExp", null);
      commit("setLoggedIn", false);
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExp");
      ServerApi.deleteToken();
    },
  },
};

export default authModule;
