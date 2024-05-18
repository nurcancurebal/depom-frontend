import instance from '../services/axios'

export default {
    namespaced: true,
    state: {
        user: {},
    },
    getters: {
        user(state) {
            return state.user
        }
    },
    mutations: {
        USER(state, context) {
            state.user = context
        }
    },

    actions: {

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

            const token = localStorage.getItem('token');

            if (!token) {
                return;
            }

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
}