<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    density="compact"
    :items-length="inventory.length"
    :items="inventory"
    :loading="loading"
    item-value="_id"
    @update:options="getInventory"
  />
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      itemsPerPage: 10,
      loading: false,
      headers: [
        {
          title: "Stok Kodu / Barkod",
          value: "barcode",
        },
        {
          title: "Ürün Adı",
          value: "productname",
        },
        {
          title: "Kategori",
          value: "category",
        },
        {
          title: "Alt Kategori",
          value: "subcategory",
        },
        {
          title: "Tedarikçi",
          value: "supplier",
        },
        {
          title: "Marka",
          value: "brand",
        },
        {
          title: "Birim",
          value: "unit",
        },
        {
          title: "Miktar",
          value: "quantity",
        },
        {
          title: "Birim Fiyat",
          value: "unitprice",
        },
        {
          title: "İşlem",
          value: "process",
        },
        {
          title: "Tarih",
          value: "date",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["inventory"]),
  },
  created() {
    this.loading = true;
    this.getInventory({
      page: 1,
      sort: "barcode",
      limit: this.itemsPerPage,
    }).then(() => {
      this.loading = false;
    });
  },

  methods: {
    ...mapActions(["getInventory"]),
  },
};
</script>