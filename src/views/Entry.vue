<template>
  <div class="my-8 main-div ma-auto w-75">
    <h3>Stok Giriş</h3>
    <v-divider class="my-5 w-100"></v-divider>
    <v-card class="w-100 mt-5 pa-11">
      <v-row align="center">
        <v-col cols="12" md="2" class="col-padding">
          <v-list-subheader style="padding-inline-end: 0">
            Stok Kodu / Barkod:
          </v-list-subheader>
        </v-col>

        <v-col cols="12" md="10" class="pa-0">
          <v-text-field
            variant="outlined"
            v-model="barcode"
            required
            :rules="[() => !!barcode || 'Stok kodu/barkod boş bırakılamaz.']"
            @keyup.enter="findProduct"
            :disabled="allDisabled"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="5"
          offset="7"
          sm="3"
          offset-sm="9"
          md="2"
          offset-md="10"
          class="pa-0"
        >
          <v-btn
            :style="{
              'background-color': isBarcodeEntered ? '#00c853' : '#ededed',
              'font-family': 'auto',
              width: '100%',
            }"
            @click="findProduct"
            :disabled="!isBarcodeEntered"
          >
            Ürünü Bul
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <AddInventory
      :barcode="barcode"
      :allDisabled="allDisabled"
      @resetFields="resetFields"
      :entryProductname="entryProductname"
      :entrySelectedCategory="entrySelectedCategory"
      :entrySelectedSubCategory="entrySelectedSubCategory"
      :entrySupplier="entrySupplier"
      :entrySelectedBrand="entrySelectedBrand"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { useToast } from "vue-toast-notification";
import AddInventory from "../components/EntryInventories/AddInventory.vue";

export default {
  components: {
    AddInventory,
  },

  data() {
    return {
      isBarcodeEntered: false,
      allDisabled: false,
      barcode: "",
      entryProductname: "",
      entrySelectedCategory: "",
      entrySelectedSubCategory: "",
      entrySupplier: "",
      entrySelectedBrand: "",
    };
  },

  watch: {
    barcode(value) {
      this.isBarcodeEntered = !!value;
    },
  },

  created() {
    this.toast = useToast();
  },

  methods: {
    ...mapActions("inventory", ["getListBarcode"]),
    async findProduct() {
      try {
        const result = await this.getListBarcode({ barcode: this.barcode });
        if (result.data.length > 0) {
          this.allDisabled = true;
          this.entryProductname = result.data[0].productname;
          this.entrySelectedCategory = result.data[0].category;
          this.entrySelectedSubCategory = result.data[0].subcategory;
          this.entrySelectedBrand = result.data[0].brand;
          this.entrySupplier = result.data[0].supplier;

          this.toast.info("Ürün bulundu: Barkod ile eşleşen bir stok var.", {
            position: "bottom",
            duration: 2000,
          });
        } else {
          this.toast.info(
            "Ürün bulunamadı: Lütfen ürün bilgilerini doldurunuz.",
            {
              position: "bottom",
              duration: 2000,
            }
          );
          this.allDisabled = false;
        }
      } catch (error) {
        this.toast.error("Bir hata oluştu!", {
          position: "bottom",
          duration: 2000,
        });
      }
    },

    resetFields() {
      this.barcode = "";
      this.allDisabled = false;
    },
  },
};
</script>