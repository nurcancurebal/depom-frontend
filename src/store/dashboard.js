import instance from "../services/axios";

export default {
  namespaced: true,

  actions: {
    async totalStock(_context, _payload) {
      try {
        const result = await instance.get("/dashboard/total/stock");

        console.log("totalStock", result.data);

        return result.data;
      } catch (error) {
        console.error("totalStock", error);
        return error;
      }
    },

    async dailyTransaction(_context, _payload) {
      try {
        const result = await instance.get("/dashboard/daily/transaction");

        console.log("dailyTransaction", result.data);

        return result.data;
      } catch (error) {
        console.error("dailyTransaction", error);
        return error;
      }
    },

    async totalProfitloss(_context, _payload) {
      try {
        const result = await instance.get("/dashboard/total/profitloss");

        console.log("totalProfitloss", result.data);

        return result.data;
      } catch (error) {
        console.error("totalProfitloss", error);
        return error;
      }
    },

    async enteredProductQuantity(_context, _payload) {
      try {
        const result = await instance.get(
          "/dashboard/entered/product/quantity"
        );

        console.log("enteredProductQuantity", result.data);

        return result.data;
      } catch (error) {
        console.error("enteredProductQuantity", error);
        return error;
      }
    },
  },
};
