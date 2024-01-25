import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    inventory: [],
  },
  getters: {
    inventory(state) {

      return state.inventory;
    },
  },
  mutations: {
    INVENTORY(state, context) {
      state.inventory = context;
    }
  },
  actions: {
    async getInventory(context) {

      try {

        const result = await axios
          .get("http://localhost:3000/inventory");

        console.log("getInventory", result.data);

        context.commit("INVENTORY", result.data);

        return result;

      } catch (error) {

        console.error("getInventory", error);

      };
    },

    async createInventory(context, payload) {

      try {

        const result = await axios.post("http://localhost:3000/Inventory", {
          "barcode": payload.barcode,
          "productname": payload.productname,
          "date": payload.date,
          "category": payload.selectedCategory,
          "subcategory": payload.selectedSubCategory,
          "supplier": payload.supplier,
          "brand": payload.selectedBrand,
          "unit": payload.unit,
          "quantity": payload.quantity,
          "unitprice": payload.unitprice
        });

        console.log("createInventory", result.data);

        context.dispatch("getInventory");

        return result;

      } catch (error) {

        console.error("createInventory", error);

      };
    },
  }
})
