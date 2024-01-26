<template>
  <v-card style="margin: 40px; padding: 40px" v-show="!showUpdateInventory">
    <v-row align="center">
      <v-col cols="2" style="padding: 0 0 25px 0">
        <v-list-subheader style="padding-inline-end: 0">
          Stok Kodu/Barkod:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-text-field
          variant="outlined"
          v-model="barcode"
          required
          :rules="[() => !!barcode || 'Bu alan boş bırakılamaz.']"
          :error-messages="errorMessages"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="3" offset="9" style="padding: 0">
        <v-btn
          variant="text"
          style="color: rgb(89 86 86); font-family: auto; width: 100%"
          @click="
            getOneInventory({ barcode }).then((result) => {
              if (result.data) {
                showUpdateInventory = !showUpdateInventory;
                resultData = result.data;
              }
              resultDataCheck();
            })
          "
          :disabled="!disabled"
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
import { mapActions } from "vuex";

export default {
  components: {
    UpdateInventory,
  },

  data() {
    return {
      showUpdateInventory: false,
      barcode: "",
      disabled: false,
      errorMessages: "",
      resultData: "",
    };
  },

  methods: {
    ...mapActions(["getOneInventory"]),
    resultDataCheck() {
      this.errorMessages = !this.resultData
        ? `Bu barkoda ait ürün bulunamadı.`
        : "";

      return true;
    },
  },

  watch: {
    barcode(value) {
      this.disabled = !!value;
    },
  },
};
</script>