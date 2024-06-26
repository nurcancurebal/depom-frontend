<template>
  <div class="my-8 main-div ma-auto w-75">
    <h3>Stok Çıkış</h3>
    <v-divider class="my-5 w-100" />
    <v-card class="w-100 my-5 pa-11" v-if="!showCheckoutInventory">
      <v-row align="center">
        <v-col cols="12" md="3" class="col-padding">
          <v-list-subheader style="padding-inline-end: 0">
            Stok Kodu / Barkod:
          </v-list-subheader>
        </v-col>

        <v-col cols="12" md="9" class="pa-0">
          <v-text-field
            variant="outlined"
            v-model="barcode"
            required
            :rules="[() => !!barcode || 'Stok kodu/barkod boş bırakılamaz.']"
            @keyup.enter="findProduct"
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
              'background-color': isBarcodeValid ? '#00c853' : '#ededed',
              'font-family': 'auto',
              width: '100%',
            }"
            @click="findProduct"
            :disabled="!isBarcodeValid"
          >
            Ürünü Bul
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <CheckoutForm
      :showCheckoutInventory="showCheckoutInventory"
      :barcodeData="barcode"
      :productnameData="productname"
      :categoryData="category"
      :subCategoryData="subCategory"
      :supplierData="supplier"
      :brandData="brand"
      :unitItemsData="unitItems"
      @update:openOverlayData="handleOpenEvent"
      @update:quantityData="handleQuantityData"
      @update:unitData="handleUnitData"
      :successCheckoutProps="handleSuccessCheckoutProps"
    />

    <ExitForm
      :openOverlayData="openOverlay"
      :quantityData="Number(quantityData)"
      :barcodeData="barcode"
      :productnameData="productname"
      :categoryData="category"
      :subCategoryData="subCategory"
      :supplierData="supplier"
      :brandData="brand"
      :unitData="unit"
      @successCheckout="handleSuccessCheckout"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { useToast } from "vue-toast-notification";
import CheckoutForm from "@/components/CheckoutInventories/CheckoutForm.vue";
import ExitForm from "@/components/CheckoutInventories/ExitForm.vue";

export default {
  components: {
    CheckoutForm,
    ExitForm,
  },

  data() {
    return {
      barcode: "",
      showCheckoutInventory: false,
      isBarcodeValid: false,
      productname: "",
      category: "",
      subCategory: "",
      brand: "",
      supplier: "",
      unitItems: [],
      openOverlay: false,
      quantityData: "",
      unit: "",
      handleSuccessCheckoutProps: false,
    };
  },

  watch: {
    barcode(value) {
      this.isBarcodeValid = !!value;
    },
  },

  created() {
    this.toast = useToast();
  },

  methods: {
    ...mapActions("inventory", ["getListBarcode"]),
    findProduct() {
      this.getListBarcode({ barcode: this.barcode })
        .then((result) => {
          if (result.data.length > 0) {
            this.showCheckoutInventory = !this.showCheckoutInventory;
            this.productname = result.data[0].productname;
            this.category = result.data[0].category;
            this.subCategory = result.data[0].subcategory;
            this.brand = result.data[0].brand;
            this.supplier = result.data[0].supplier;
            this.unitItems = [
              ...new Set(
                result.data.map((element) => {
                  return element.unit;
                })
              ),
            ];
          } else {
            this.toast.error("Bu barkoda ait ürün bulunamadı.", {
              position: "bottom",
              duration: 2000,
            });
            return;
          }
        })
        .catch(() => {
          this.toast.error("Bir hata oluştu. Lütfen tekrar deneyin.", {
            position: "bottom",
            duration: 2000,
          });
        });
    },
    handleOpenEvent(val) {
      this.openOverlay = val;
    },
    handleQuantityData(val) {
      this.quantityData = val;
    },
    handleUnitData(val) {
      this.unit = val;
    },
    handleSuccessCheckout(val) {
      this.handleSuccessCheckoutProps = val;
      if (val) {
        this.showCheckoutInventory = false;
        this.barcode = "";
        this.productname = "";
        this.category = "";
        this.subCategory = "";
        this.supplier = "";
        this.brand = "";
        this.unitItems = [];
      }
    },
  },
};
</script>

<style>
.v-list-subheader__text {
  overflow: visible !important;
  text-overflow: unset !important;
  white-space: normal !important;
}
.col-padding {
  padding: 0 !important;
}

.subheader-margin {
  margin-left: 0 !important;
}
.v-btn__content {
  white-space: normal !important;
}
.main-div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (min-width: 960px) {
  .col-padding {
    padding: 0 0 25px 0 !important;
  }
  .subheader-margin {
    margin-left: 20px !important;
  }
}
</style>