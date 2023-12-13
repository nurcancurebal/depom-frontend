<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12">
        <TheNavbar />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="2">
        <TheSidebar />
      </v-col>
      <v-col cols="10">
        <router-view />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar.vue";
import TheSidebar from "./components/TheSidebar.vue";

export default {
  components: {
    TheNavbar,
    TheSidebar,
  },
};
</script>