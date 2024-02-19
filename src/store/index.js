import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    inventory: [],
  },
  getters: {
    inventory(state) {

      return state.inventory;
    }
  },
  mutations: {
    INVENTORY(state, context) {

      state.inventory = context;
    }
  },
  actions: {

    async getInventory(context, payload) {

      try {

        const result = await axios
          .get("http://localhost:3000/inventory", {
            params: {
              page: payload.page,
              limit: payload.limit,
              sort: payload.sort
            }
          });

        console.log("getInventory", result);

        context.commit('INVENTORY', result.data);

        return result;

      } catch (error) {

        console.error("getInventory", error);

      };
    },

    async getInventoryCount(context, payload) {

      try {

        const result = await axios
          .get("http://localhost:3000/inventory/count");

        console.log("getInventoryCount", result.data.count);

        return result.data.count;

      } catch (error) {

        console.error("getInventoryCount", error);

      };
    },

    async getListBarcode(context, payload) {

      try {

        const result = await axios
          .get(`http://localhost:3000/inventory/${payload.barcode}`);

        console.log("getListBarcode", result.data);

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
        });

        console.log("entryOne", result.data);

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
        });

        console.log("checkoutOne", result.data);

        return result;

      } catch (error) {

        console.error("checkoutOne", error);

      };
    },
  }
})