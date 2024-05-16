import { createStore } from 'vuex'
import axios from "axios";
import router from "../router";

const baseURL = process.env.VUE_APP_BASE_URL;

const instance = axios.create({
  baseURL: baseURL,
});

instance.interceptors.request.use(config => {

  const authToken = localStorage.getItem('token');

  if (authToken) {

    config.headers.Authorization = `Bearer ${authToken}`;
  };
  return config;
});

instance.interceptors.response.use(function (response) {

  return response;

}, function (error) {

  if (error?.response?.status == 401) {

    localStorage.removeItem("token");
    router.push("/");
  };
  return Promise.reject(error);
});

export default createStore({
  state: {
    inventory: [],
    current: [],
    user: {},
  },
  getters: {
    inventory(state) {

      return state.inventory;
    },

    current(state) {

      return state.current;
    },

    user(state) {
      return state.user
    }
  },
  mutations: {
    INVENTORY(state, context) {

      state.inventory = context;
    },

    CURRENT(state, context) {

      state.current = context;
    },

    USER(state, context) {
      state.user = context
    }
  },

  actions: {

    async getInventory(context, payload) {

      try {

        const result = await instance
          .get(`/inventory?page=${payload.page}&limit=${payload.limit}&sort=${payload.sort}`);

        console.log("getInventory", result.data);

        context.commit('INVENTORY', result.data);

        return result;

      } catch (error) {

        console.error("getInventory", error);
        return error;
      };
    },

    async getInventoryCount(context, payload) {

      try {

        const result = await instance
          .get("/inventory/list/count");

        console.log("getInventoryCount", result.data.count);

        return result.data.count;

      } catch (error) {

        console.error("getInventoryCount", error);
        return error;
      };
    },

    async getCurrentCount(context, payload) {

      try {

        const result = await instance
          .get("/inventory/current/count");

        console.log("getCurrentCount", result.data.count);

        return result.data.count;

      } catch (error) {

        console.error("getCurrentCount", error);
        return error;
      };
    },

    async getListBarcode(context, payload) {

      try {

        const result = await instance
          .get(`/inventory/${payload.barcode}`);

        console.log("getListBarcode", result.data);

        return result;

      } catch (error) {

        console.error("getListBarcode", error);
        return error;
      };
    },

    async getCurrent(context, payload) {

      try {

        const result = await instance
          .get(`/inventory/current?page=${payload.page}&limit=${payload.limit}&sort=${payload.sort}`);

        console.log("getCurrent", result.data);

        context.commit('CURRENT', result.data);

        return result.data;

      } catch (error) {

        console.error("getCurrent", error);
        return error;
      };
    },

    async entryOne(context, payload) {

      try {

        const result = await instance.post("/Inventory", {
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
        return error;
      };
    },

    async checkoutOne(context, payload) {

      try {

        const result = await instance.post(`/inventory/${payload.barcode}`, {
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
        return error;
      };
    },

    async signUp(context, payload) {

      try {
        console.log("signUp", payload);

        return await instance.post("/auth/signup", payload);

      } catch (error) {

        console.error("signUp", error);
        return error;
      };
    },

    async signIn(context, payload) {

      console.log("signIn", payload);

      try {

        const result = await instance.post("/auth/signin", payload);

        localStorage.setItem("token", result.data.token);

        context.dispatch("getUser");

        return result;

      } catch (error) {

        console.error("signIn", error);
        return error;
      };
    },

    async updateUser(context, payload) {

      try {

        const result = await instance.put(`/user`, payload);

        console.log("updateUser", result.data);

        context.dispatch("getUser");

        return result;

      } catch (error) {

        console.error("updateUser", error);
        return error;
      };
    },

    async getUser(context) {

      try {

        const result = await instance
          .get("/user");

        console.log("getUser", result.data);

        context.commit("USER", result.data);

        return result;

      } catch (error) {

        console.error("getUser", error);
        return error;
      };
    },
  }
})