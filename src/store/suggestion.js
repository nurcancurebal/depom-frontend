import instance from "../services/axios";

export default {
  namespaced: true,

  actions: {
    async suggestionMessage(_context, payload) {
      const result = await instance.post("/suggestion/send", {
        email: payload.email,
        message: payload.message,
      });

      console.log("suggestionMessage", result.data);

      return result;
    },
  },
};
