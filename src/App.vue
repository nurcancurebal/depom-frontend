<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12">
        <TheNavbar />
      </v-col>
    </v-row>
    <router-view />
  </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar.vue";

export default {
  components: {
    TheNavbar,
  },
};
</script>