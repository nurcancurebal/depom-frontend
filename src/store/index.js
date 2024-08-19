import { createStore } from "vuex";

import inventory from "./inventory";
import auth from "./auth";
import user from "./user";
import dashboard from "./dashboard";
import suggestion from "./suggestion";

export default createStore({
  modules: {
    inventory,
    auth,
    user,
    dashboard,
    suggestion,
  },
});
