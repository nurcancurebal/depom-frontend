<template>
  <div class="my-8 main-div ma-auto w-75">
    <h3>Ayarlar</h3>
    <v-divider class="my-5 w-100" />

    <v-text-field label="kullanıcı adı" v-model="username" />
    <v-text-field label="password" v-model="password" />

    <v-btn @click="handleClick"> Button </v-btn>
  </div>
</template>
<script>
import { useToast } from "vue-toast-notification";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    handleClick() {
      if (!this.username && !this.password) {
        return;
      } else {
        const toast = useToast();

        toast.success("Order placed.", {
          position: "top",
        });

        toast.open({
          message: "error",
          type: "error",
          position: "bottom-left",
        });

        toast.open({
          message: "success",
          type: "success",
          position: "bottom",
        });

        toast.open({
          message: "info",
          type: "info",
          position: "top-right",
        });

        toast.open({
          message: "warning",
          type: "warning",
          position: "bottom-right",
        });

        toast.open({
          message: "default",
          type: "default",
          position: "top-left",
        });
      }
    },
  },
};
</script>
