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
      const result = await instance.get(
        `/inventory?page=${payload.page}&limit=${payload.limit}&sort=${payload.sort}`
      );

      console.log("getInventory", result.data);

      context.commit("INVENTORY", result.data);

      return result;
    },

    async getInventoryCount(_context, _payload) {
      const result = await instance.get("/inventory/list/count");

      console.log("getInventoryCount", result.data.count);

      return result.data.count;
    },

    async getCurrentCount(_context, _payload) {
      const result = await instance.get("/inventory/current/count");

      console.log("getCurrentCount", result.data.count);

      return result.data.count;
    },

    async getListBarcode(_context, payload) {
      const result = await instance.get(`/inventory/${payload.barcode}`);

      console.log("getListBarcode", result);

      return result;
    },

    async getCurrent(context, payload) {
      const result = await instance.get(
        `/inventory/current?page=${payload.page}&limit=${payload.limit}&sort=${payload.sort}`
      );

      console.log("getCurrent", result.data);

      context.commit("CURRENT", result.data);

      return result.data;
    },

    async entryOne(_context, payload) {
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
    },

    async checkoutOne(_context, payload) {
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
    },
  },
};
