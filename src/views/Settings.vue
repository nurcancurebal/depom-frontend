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
        <div
          style="display: flex; flex-direction: column; align-items: center"
          class="my-7"
        >
          <h3>Ayarlar</h3>
          <v-divider style="width: 85%" class="my-5" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TheSidebar from "../components/TheSidebar.vue";
import TheNavbar from "../components/TheNavbar.vue";

export default {
  components: {
    TheSidebar,
    TheNavbar,
  },
};
</script>