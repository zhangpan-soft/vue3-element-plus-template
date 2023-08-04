import Cookies from "js-cookie";
import ObjectUtils from "@/utils/object-utils";

const state: any = {
  sidebar: {
    opened: !ObjectUtils.isEmpty(Cookies.get("sidebarStatus"))
      ? !Cookies.get("sidebarStatus")
      : true,
    withoutAnimation: false,
  },
  device: "desktop",
};

const mutations = {
  TOGGLE_SIDEBAR: (state: any) => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      Cookies.set("sidebarStatus", "true");
    } else {
      Cookies.set("sidebarStatus", "false");
    }
  },
  CLOSE_SIDEBAR: (state: any, withoutAnimation: boolean) => {
    Cookies.set("sidebarStatus", "true");
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE: (state: any, device: string) => {
    state.device = device;
  },
};

const actions = {
  toggleSideBar({ commit }: any) {
    commit("TOGGLE_SIDEBAR");
  },
  closeSideBar({ commit }: any, { withoutAnimation }: any) {
    commit("CLOSE_SIDEBAR", withoutAnimation);
  },
  toggleDevice({ commit }: any, device: string) {
    commit("TOGGLE_DEVICE", device);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
