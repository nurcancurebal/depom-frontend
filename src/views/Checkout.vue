<template>
  <div class="my-8 main-div ma-auto w-75">
    <h2>Stok Çıkış</h2>
    <v-divider class="my-5 mb-8 w-100"></v-divider>
    <v-card class="w-100 my-5 pa-11" v-if="!showCheckoutInventory">
      <v-row align="center">
        <v-col cols="12" md="3" class="col-padding">
          <v-list-subheader class="padding-end-zero">
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
      :successCheckoutProps="handleSuccessCheckoutProps"
      @update:quantityData="handleQuantityData"
      @update:unitData="handleUnitData"
    />

    <ExitForm
      :openOverlayData="openOverlay"
      :quantityData="Number(quantityData)"
      :checkoutSuccessful="checkoutSuccessful"
      @onCheckout="handleSuccessCheckout"
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
      checkoutSuccessful: false,
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
    ...mapActions("inventory", ["getListBarcode", "checkoutOne"]),
    async findProduct() {
      try {
        const result = await this.getListBarcode({ barcode: this.barcode });

        if (result.data.length > 0) {
          this.showCheckoutInventory = true;
          const products = result.data;
          this.productname = products[0].productname;
          this.category = products[0].category;
          this.subCategory = products[0].subcategory;
          this.brand = products[0].brand;
          this.supplier = products[0].supplier;
          this.unitItems = [
            ...new Set(products.map((product) => product.unit)),
          ];
        } else {
          this.toast.error("Bu barkoda ait ürün bulunamadı!", {
            position: "bottom",
            duration: 2000,
          });
          return;
        }
      } catch (error) {
        this.toast.error("Barkoda ait ürün getirilirken bir hata oluştu!", {
          position: "bottom",
          duration: 2000,
        });
      }
    },
    handleQuantityData(val) {
      this.quantityData = val;
    },
    handleUnitData(val) {
      this.unit = val;
      this.openOverlay = !this.openOverlay;
    },
    async handleSuccessCheckout(data) {
      try {
        await this.checkoutOne({
          barcode: this.barcode,
          productname: this.productname,
          category: this.category,
          subCategory: this.subCategory,
          supplier: this.supplier,
          brand: this.brand,
          unit: this.unit,
          quantity: data.quantity,
          unitprice: data.unitprice,
        });

        this.toast.success("Ürün çıkışı başarıyla gerçekleştirildi.", {
          position: "bottom",
          duration: 2000,
        });

        this.handleSuccessCheckoutProps = !this.handleSuccessCheckoutProps;
        this.showCheckoutInventory = false;
        this.barcode = "";
        this.productname = "";
        this.category = "";
        this.subCategory = "";
        this.supplier = "";
        this.brand = "";
        this.unitItems = [];
        this.checkoutSuccessful = !this.checkoutSuccessful;
      } catch (error) {
        this.toast.error("Ürün çıkışı gerçekleştirilemedi!", {
          position: "bottom",
          duration: 2000,
        });
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
    padding: 0 0 24px 0 !important;
  }
  .subheader-margin {
    margin-left: 20px !important;
  }
}
</style>