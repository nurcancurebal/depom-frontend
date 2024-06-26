<template>
  <v-overlay v-model="overlay" class="align-center justify-center">
    <v-card class="overlay-checkout ma-10 pa-10">
      <v-row>
        <v-col cols="12" class="pa-0 main-div">
          <h3>Stok Çıkış</h3>
          <v-divider class="my-5 w-100" />
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="6" style="padding: 0 0 25px 0">
          <v-list-subheader style="padding-inline-end: 0">
            Çıkış Yapılan Miktar:
          </v-list-subheader>
        </v-col>

        <v-col cols="6" class="pa-0">
          <v-text-field
            variant="outlined"
            v-model="checkoutQuantity"
            required
            :rules="[
              () =>
                !!checkoutQuantity || 'Çıkış yapılan miktar boş bırakılamaz.',
              () =>
                /^\d+(\.\d+)?$/.test(checkoutQuantity) ||
                'Lütfen yalnızca sayısal bir değer giriniz.',
              () =>
                !!(checkoutQuantity > 0) ||
                'Çıkış yapılan miktar sıfırdan büyük olmak zorundadır.',
              () =>
                !!(checkoutQuantity <= quantityData) ||
                'Çıkış yapılan miktar toplam miktardan küçük olmak zorundadır.',
            ]"
            @keyup.enter="checkoutClick"
          />
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="6" style="padding: 0 0 25px 0">
          <v-list-subheader style="padding-inline-end: 0">
            Çıkış Yapılan Birim Fiyat:
          </v-list-subheader>
        </v-col>

        <v-col cols="6" class="pa-0">
          <v-text-field
            variant="outlined"
            v-model="checkoutUnitprice"
            required
            :rules="[
              () =>
                !!checkoutUnitprice ||
                'Çıkış yapılan birim fiyat boş bırakılamaz.',
              () =>
                /^\d+(\.\d+)?$/.test(checkoutUnitprice) ||
                'Lütfen yalnızca sayısal bir değer giriniz.',
            ]"
            @keyup.enter="checkoutClick"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="5" offset="7" md="4" offset-md="8" class="pa-0">
          <v-btn
            :style="{
              'background-color': checkoutClickDisabled ? '#00c853' : '#ededed',
              'font-family': 'auto',
              width: '100%',
            }"
            :disabled="!checkoutClickDisabled"
            @click="checkoutClick"
          >
            Çıkış Yap
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-overlay>
</template>

<script>
import { mapActions } from "vuex";
import { useToast } from "vue-toast-notification";

export default {
  props: {
    openOverlayData: Boolean,
    quantityData: Number,
    barcodeData: String,
    productnameData: String,
    categoryData: String,
    subCategoryData: String,
    supplierData: String,
    brandData: String,
    unitData: String,
  },
  data() {
    return {
      checkoutQuantity: "",
      checkoutUnitprice: "",
      overlay: false,
    };
  },

  computed: {
    checkoutClickDisabled() {
      return (
        this.checkoutQuantity !== "" &&
        this.checkoutQuantity > 0 &&
        /^\d+(\.\d+)?$/.test(this.checkoutQuantity) !== false &&
        this.checkoutQuantity <= this.quantityData &&
        this.checkoutUnitprice !== "" &&
        /^\d+(\.\d+)?$/.test(this.checkoutUnitprice) !== false
      );
    },
  },

  watch: {
    openOverlayData() {
      this.overlay = true;
    },
  },

  created() {
    this.toast = useToast();
  },

  methods: {
    ...mapActions("inventory", ["checkoutOne"]),
    checkoutClick() {
      if (this.checkoutClickDisabled) {
        this.checkoutOne({
          barcode: this.barcodeData,
          productname: this.productnameData,
          category: this.categoryData,
          subCategory: this.subCategoryData,
          supplier: this.supplierData,
          brand: this.brandData,
          unit: this.unitData,
          quantity: this.checkoutQuantity,
          unitprice: this.checkoutUnitprice,
        })
          .then(() => {
            this.toast.success("Ürün çıkışı başarıyla gerçekleştirildi.", {
              position: "bottom",
              duration: 2000,
            });
            this.checkoutQuantity = "";
            this.checkoutUnitprice = "";
            this.overlay = false;
            this.$emit("successCheckout", true);
          })
          .catch(() => {
            this.toast.error(
              "Lütfen tüm alanları doğru bir şekilde doldurunuz",
              {
                position: "bottom",
                duration: 2000,
              }
            );
          });
      } else {
        this.toast.error("Ürün çıkışı gerçekleştirilemedi.", {
          position: "bottom",
          duration: 2000,
        });
      }
    },
  },
};
</script>

<style>
.overlay-checkout {
  width: 75% !important;
}

@media (min-width: 960px) {
  .overlay-checkout {
    width: 450px !important;
  }
}
</style>