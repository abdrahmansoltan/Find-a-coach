import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  // not name-spaced to make it modify the global state
  state() {
    // initial state-values
    return {
      userId: null,
      token: null,
      tokenExpiration: null,
      didAutoLogout: false,
    };
  },
  mutations,
  actions,
  getters,
};
