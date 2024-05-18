import instance from '../services/axios'

export default {
    namespaced: true,
    actions: {

        async signUp(_context, payload) {

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

                console.log("signIn", result);

                localStorage.setItem("token", result.data.token);

                context.dispatch("user/getUser", null, { root: true });

                return result;

            } catch (error) {

                console.error("signIn", error);
                return error;
            };
        },
    }
}