import instance from "../services/axios";

export default {
  namespaced: true,

  state: {
    inventory: [],
    current: [],
  },

  getters: {
    inventory(state) {
      return state.inventory;
    },

    current(state) {
      return state.current;
    },
  },

  mutations: {
    INVENTORY(state, context) {
      state.inventory = context;
    },

    CURRENT(state, context) {
      state.current = context;
    },
  },

  actions: {
    async getInventory(context, payload) {
      try {
        const result = await instance.get(
          `/inventory?page=${payload.page}&limit=${payload.limit}&sort=${payload.sort}`
        );

        console.log("getInventory", result.data);

        context.commit("INVENTORY", result.data);

        return result;
      } catch (error) {
        console.error("getInventory", error);
        return error;
      }
    },

    async getInventoryCount(_context, _payload) {
      try {
        const result = await instance.get("/inventory/list/count");

        console.log("getInventoryCount", result.data.count);

        return result.data.count;
      } catch (error) {
        console.error("getInventoryCount", error);
        return error;
      }
    },

    async getCurrentCount(_context, _payload) {
      try {
        const result = await instance.get("/inventory/current/count");

        console.log("getCurrentCount", result.data.count);

        return result.data.count;
      } catch (error) {
        console.error("getCurrentCount", error);
        return error;
      }
    },

    async getListBarcode(_context, payload) {
      try {
        const result = await instance.get(`/inventory/${payload.barcode}`);

        console.log("getListBarcode", result.data);

        return result;
      } catch (error) {
        console.error("getListBarcode", error);
        return error;
      }
    },

    async getCurrent(context, payload) {
      try {
        const result = await instance.get(
          `/inventory/current?page=${payload.page}&limit=${payload.limit}&sort=${payload.sort}`
        );

        console.log("getCurrent", result.data);

        context.commit("CURRENT", result.data);

        return result.data;
      } catch (error) {
        console.error("getCurrent", error);
        return error;
      }
    },

    async entryOne(_context, payload) {
      try {
        const result = await instance.post("/Inventory", {
          barcode: payload.barcode,
          productname: payload.productname,
          category: payload.selectedCategory,
          subcategory: payload.selectedSubCategory,
          supplier: payload.supplier,
          brand: payload.selectedBrand,
          unit: payload.unit,
          quantity: payload.quantity,
          unitprice: payload.unitprice,
        });

        console.log("entryOne", result.data);

        return result;
      } catch (error) {
        console.error("entryOne", error);
        throw error;
      }
    },

    async checkoutOne(_context, payload) {
      try {
        const result = await instance.post(`/inventory/${payload.barcode}`, {
          productname: payload.productname,
          category: payload.category,
          subcategory: payload.subCategory,
          supplier: payload.supplier,
          brand: payload.brand,
          unit: payload.unit,
          quantity: payload.quantity,
          unitprice: payload.unitprice,
        });

        console.log("checkoutOne", result.data);

        return result;
      } catch (error) {
        console.error("checkoutOne", error);
        throw error;
      }
    },

    async totalStock(_context, _payload) {
      try {
        const result = await instance.get("/inventory/total/stock");

        console.log("totalStock", result.data);

        return result.data;
      } catch (error) {
        console.error("totalStock", error);
        throw error;
      }
    },

    async dailyTransaction(_context, _payload) {
      try {
        const result = await instance.get("/inventory/daily/transaction");

        console.log("dailyTransaction", result.data);

        return result.data;
      } catch (error) {
        console.error("dailyTransaction", error);
        throw error;
      }
    },

    async totalProfitloss(_context, _payload) {
      try {
        const result = await instance.get("/inventory/total/profitloss");

        console.log("totalProfitloss", result.data);

        return result.data;
      } catch (error) {
        console.error("totalProfitloss", error);
        throw error;
      }
    },
  },
};
