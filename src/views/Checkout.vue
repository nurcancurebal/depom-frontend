<template>
  <v-card style="margin: 40px; padding: 40px" v-show="!showUpdateInventory">
    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Stok Kodu/Barkod:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-text-field variant="outlined" v-model="barcode" />
      </v-col>
    </v-row>

    <v-row style="margin: 10px">
      <v-col cols="3" offset="9" style="padding: 0">
        <v-btn
          variant="text"
          style="color: rgb(89 86 86); font-family: auto; width: 100%"
          @click="showUpdateInventory = !showUpdateInventory"
        >
          Ürünü Bul
        </v-btn>
      </v-col>
    </v-row>
  </v-card>

  <UpdateInventory v-show="showUpdateInventory" />
</template>

<script>
import UpdateInventory from "@/components/UpdateInventory.vue";

export default {
  components: {
    UpdateInventory,
  },

  data() {
    return {
      showUpdateInventory: false,
      barcode: "",
    };
  },
};
</script>
