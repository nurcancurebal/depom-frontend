import instance from "../services/axios";

export default {
  namespaced: true,
  actions: {
    async signUp(_context, payload) {
      try {
        const result = await instance.post("/auth/signup", payload);

        console.log("signUp", result);

        return result;
      } catch (error) {
        console.error("signUp", error);
        throw error;
      }
    },

    async signIn(context, payload) {
      try {
        const result = await instance.post("/auth/signin", payload);

        console.log("signIn", result);

        localStorage.setItem("token", result.data.token);

        context.dispatch("user/getUser", null, { root: true });

        return result;
      } catch (error) {
        throw error;
      }
    },
  },
};
