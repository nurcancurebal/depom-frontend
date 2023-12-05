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
        <TheContent />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar.vue";
import TheSidebar from "./components/TheSidebar.vue";
import TheContent from "./components/TheContent.vue";

export default {
  components: {
    TheNavbar,
    TheSidebar,
    TheContent,
  },
};
</script>