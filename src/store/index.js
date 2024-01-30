import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    inventory: [],
    listBarcode: []
  },
  getters: {
    inventory(state) {

      return state.inventory;
    },
    listBarcode(state) {

      return state.listBarcode;
    },
  },
  mutations: {
    INVENTORY(state, context) {
      state.inventory = context;
    },
    LİST_BARCODE(state, context) {
      state.listBarcode = context;
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

    async getListBarcode(context, payload) {

      try {

        const result = await axios
          .get(`http://localhost:3000/inventory/${payload.barcode}`);

        console.log("getListBarcode", result.data);

        context.commit("LİST_BARCODE", result.data);

        return result;

      } catch (error) {

        console.error("getListBarcode", error);

      };
    },

    async entryOne(context, payload) {

      try {

        const result = await axios.post("http://localhost:3000/Inventory", {
          "barcode": payload.barcode,
          "productname": payload.productname,
          "category": payload.selectedCategory,
          "subcategory": payload.selectedSubCategory,
          "supplier": payload.supplier,
          "brand": payload.selectedBrand,
          "unit": payload.unit,
          "quantity": payload.quantity,
          "unitprice": payload.unitprice,
          "date": new Date(),
          "process": "entry"
        });

        console.log("entryOne", result.data);

        context.dispatch("getInventory");

        return result;

      } catch (error) {

        console.error("entryOne", error);

      };
    },

    async checkoutOne(context, payload) {

      try {

        const result = await axios.post(`http://localhost:3000/inventory/${payload.barcode}`, {
          "barcode": payload.barcode,
          "productname": payload.productname,
          "category": payload.selectedCategory,
          "subcategory": payload.selectedSubCategory,
          "supplier": payload.supplier,
          "brand": payload.selectedBrand,
          "unit": payload.unit,
          "quantity": payload.quantity,
          "unitprice": payload.unitprice,
          "date": new Date(),
          "process": "checkout"
        });

        console.log("entryOne", result.data);

        context.dispatch("getInventory");

        return result;

      } catch (error) {

        console.error("entryOne", error);

      };
    },
  }
})
