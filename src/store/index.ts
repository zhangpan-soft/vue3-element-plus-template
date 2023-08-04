import { createStore } from "vuex";
import app from "@/store/modules/app";
import settings from "@/store/modules/settings";
import user from "@/store/modules/user";
import getters from "@/store/getters";

export default createStore({
  state: {},
  getters,
  mutations: {},
  actions: {},
  modules: {
    app,
    settings,
    user,
  },
});
