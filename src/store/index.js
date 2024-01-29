import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    inventory: [],
    inventoryOne: {}
  },
  getters: {
    inventory(state) {

      return state.inventory;
    },
    inventoryOne(state) {

      return state.inventoryOne;
    },
  },
  mutations: {
    INVENTORY(state, context) {
      state.inventory = context;
    },
    INVENTORY_ONE(state, context) {
      state.inventoryOne = context;
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

    async getOneInventory(context, payload) {

      try {

        const result = await axios
          .get(`http://localhost:3000/inventory/${payload.barcode}`);

        console.log("getOneInventory", result.data);

        context.commit("INVENTORY_ONE", result.data);

        return result;

      } catch (error) {

        console.error("getOneInventory", error);

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
