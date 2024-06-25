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
                !!(checkoutQuantity <= quantity) ||
                'Çıkış yapılan miktar toplam miktardan küçük olmak zorundadır.',
            ]"
            @keyup.enter="checkoutKeyupEnter"
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
            @keyup.enter="checkoutKeyupEnter"
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
            @click="checkout"
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
    quantity: Number,
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
        this.checkoutQuantity <= this.quantity &&
        this.checkoutUnitprice !== "" &&
        /^\d+(\.\d+)?$/.test(this.checkoutUnitprice) !== false
      );
    },
  },

  watch: {
    overlay(val) {
      this.overlay = val;
    },
    openOverlayData() {
      this.overlay = true;
    },
  },

  created() {
    this.toast = useToast();
  },

  methods: {
    ...mapActions("inventory", ["checkoutOne"]),
    checkout() {
      this.checkoutOne({
        barcode: this.barcode,
        productname: this.productname,
        category: this.category,
        subCategory: this.subCategory,
        supplier: this.supplier,
        brand: this.brand,
        unit: this.unit,
        quantity: this.checkoutQuantity,
        unitprice: this.checkoutUnitprice,
      })
        .then(() => {
          this.toast.success("Ürün çıkışı başarıyla gerçekleştirildi.", {
            position: "bottom",
            duration: 2000,
          });

          this.showCheckoutInventory = false;
          this.overlay = false;
          this.barcode = "";
          this.productname = "";
          this.category = "";
          this.subCategory = "";
          this.supplier = "";
          this.brand = "";
          this.unit = "";
          this.checkoutQuantity = "";
          this.checkoutUnitprice = "";
          this.unitDisabled = false;
          this.quantityDisabled = false;
          this.unitpriceDisabled = false;
          this.unitprice = "";
          this.unitItems = [
            "adet",
            "bağ",
            "boy",
            "cm",
            "çuval",
            "gr",
            "grup",
            "kg",
            "koli",
            "kutu",
            "lt",
            "m²",
            "m³",
            "m",
            "mm",
            "ml",
            "paket",
            "saat",
            "ton",
            "top",
          ];
        })
        .catch(() => {
          this.toast.error("Lütfen tüm alanları doğru bir şekilde doldurunuz", {
            position: "bottom",
            duration: 2000,
          });
        });
    },
    checkoutKeyupEnter() {
      if (
        !!this.checkoutQuantity &&
        /^\d+(\.\d+)?$/.test(this.checkoutQuantity) &&
        !!(this.checkoutQuantity > 0) &&
        !!(this.checkoutQuantity <= this.quantity) &&
        !!this.checkoutUnitprice &&
        /^\d+(\.\d+)?$/.test(this.checkoutUnitprice)
      ) {
        this.checkout();
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