import instance from "../services/axios";

export default {
  namespaced: true,
  actions: {
    async signUp(_context, payload) {
      const result = await instance.post("/auth/signup", payload);

      console.log("signUp", result);

      return result;
    },

    async signIn(context, payload) {
      const result = await instance.post("/auth/signin", payload);

      console.log("signIn", result);

      localStorage.setItem("token", result.data.token);

      context.dispatch("user/getUser", null, { root: true });

      return result;
    },
  },
};
