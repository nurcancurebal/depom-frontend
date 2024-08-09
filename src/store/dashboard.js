import instance from "../services/axios";

export default {
  namespaced: true,

  actions: {
    async totalStock(_context, _payload) {
      const result = await instance.get("/dashboard/total/stock");

      console.log("totalStock", result.data);

      return result.data;
    },

    async dailyTransaction(_context, _payload) {
      const result = await instance.get("/dashboard/daily/transaction");

      console.log("dailyTransaction", result.data);

      return result.data;
    },

    async totalProfitloss(_context, _payload) {
      const result = await instance.get("/dashboard/total/profitloss");

      console.log("totalProfitloss", result.data);

      return result.data;
    },

    async enteredProductQuantity(_context, _payload) {
      const result = await instance.get("/dashboard/entered/product/quantity");

      console.log("enteredProductQuantity", result.data);

      return result.data;
    },

    async mountlyProfitLoss(_context, _payload) {
      const result = await instance.get("/dashboard/monthly/profitloss");

      console.log("mountlyProfitLoss", result.data);

      return result.data;
    },
  },
};
