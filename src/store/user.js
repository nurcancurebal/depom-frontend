import instance from "../services/axios";

export default {
  namespaced: true,
  state: {
    user: {},
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  mutations: {
    USER(state, context) {
      state.user = context;
    },
  },

  actions: {
    async updateUser(context, payload) {
      const result = await instance.put(`/user`, payload);

      console.log("updateUser", result.data);

      context.dispatch("getUser");

      return result;
    },

    async updatePassword(context, payload) {
      const result = await instance.put(`/user/update/password`, payload);

      console.log("updatePassword", result.data);

      context.dispatch("getUser");

      return result;
    },

    async getUser(context) {
      const token = localStorage.getItem("token");

      if (token) {
        const result = await instance.get("/user");

        console.log("getUser", result.data);

        context.commit("USER", result.data);

        return result;
      }
    },
  },
};
