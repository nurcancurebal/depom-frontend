<template>
  <v-app style="font-size: 1.13rem">
    <TheAppbar @toggle-drawer="drawer = !drawer" />

    <TheSidebar :drawer="drawer" @toggle-drawer="drawer = !drawer" />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import TheSidebar from "./components/AppLayout/TheSidebar.vue";
import TheAppbar from "./components/AppLayout/TheAppbar.vue";

export default {
  data() {
    return {
      drawer: true,
    };
  },

  components: {
    TheSidebar,
    TheAppbar,
  },

  created() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },

  methods: {
    handleResize() {
      if (window.innerWidth > 1280) {
        this.drawer = true;
      } else {
        this.drawer = false;
      }
    },
  },
};
</script>

<style>
.v-toolbar-title__placeholder {
  overflow: visible !important;
  font-family: "Material Design Icons" !important;
}
a:hover {
  background-color: #fdfcfcac;
}
.router-link {
  text-decoration: none;
  display: flex;
  align-items: center;
  color: #424242;
  margin: 15px;
  padding: 13px;
  border-radius: 8px;
}
.a-list-item-title {
  font-size: 18px !important;
  margin-left: 10px !important;
}
</style>