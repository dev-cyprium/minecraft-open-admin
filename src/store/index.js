import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import axios from "axios";

export default new Vuex.Store({
  state: {
    serverLog: [],
    serverRunning: null
  },
  mutations: {
    log(state, item) {
      state.serverLog.push(item);

      if (state.serverLog.length > 60) {
        state.serverLog.shift();
      }
    },
    setRunning(state, status) {
      state.serverRunning = status;
    }
  },
  actions: {
    readLatestLog({ commit }) {
      commit("log", "Fetching latest server logs!!");
      axios
        .get("http://" + process.env.VUE_APP_API_SERVER + "/initial")
        .then(({ data: { logs } }) => {
          logs
            .filter(log => log.trim() !== "")
            .forEach(log => commit("log", log));
        });
    },
    fetchServerData({ commit }) {
      axios
        .get("http://" + process.env.VUE_APP_API_SERVER + "/status")
        .then(({ data: { status } }) => {
          commit("setRunning", status);
        });
    },
    stopServer({ commit }) {
      commit("setRunning", null);
      axios
        .delete("http://" + process.env.VUE_APP_API_SERVER + "/stop")
        .then(() => {
          commit("log", "Server pinged, waiting for response");
        });
    },
    startServer({ commit }) {
      commit("setRunning", null);
      axios
        .post("http://" + process.env.VUE_APP_API_SERVER + "/start")
        .then(() => {
          commit("log", "Server pinged, waiting for response");
        });
    }
  }
});
