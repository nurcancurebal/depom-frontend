<template>
  <v-data-table-server
    class="ma-5"
    density="compact"
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items-length="inventoryCount"
    :items="inventory"
    :loading="loading"
    item-value="_id"
    @update:options="updateOptions"
  />
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      itemsPerPage: 10,
      loading: false,
      inventoryCount: 0,
      currentPage: 1,
      headers: [
        {
          title: "Stok Kodu / Barkod",
          value: "barcode",
          sortable: true,
        },
        {
          title: "Ürün Adı",
          value: "productname",
          sortable: true,
        },
        {
          title: "Kategori",
          value: "category",
          sortable: true,
        },
        {
          title: "Alt Kategori",
          value: "subcategory",
          sortable: true,
        },
        {
          title: "Tedarikçi",
          value: "supplier",
          sortable: true,
        },
        {
          title: "Marka",
          value: "brand",
          sortable: true,
        },
        {
          title: "Birim",
          value: "unit",
          sortable: true,
        },
        {
          title: "Miktar",
          value: "quantity",
          sortable: true,
        },
        {
          title: "Birim Fiyat",
          value: "unitprice",
          sortable: true,
        },
        {
          title: "İşlem",
          value: "process",
          sortable: true,
        },
        {
          title: "Tarih",
          value: "date",
          sortable: true,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["inventory"]),
  },
  created() {
    this.loading = true;
    this.getInventoryCount().then((count) => {
      this.inventoryCount = count;
    });
  },

  methods: {
    ...mapActions(["getInventory", "getInventoryCount"]),
    updateOptions(options) {
      console.log("options", options);
      this.currentPage = options.page;
      let sort =
        options.sortBy && options.sortBy.length > 0
          ? options.sortBy[0]
          : "barcode";
      let desc =
        options.sortDesc && options.sortDesc.length > 0
          ? options.sortDesc[0]
          : false;
      this.getInventory({
        page: this.currentPage,
        sort: desc ? "-" + sort : sort,
        limit: this.itemsPerPage,
      }).then(() => {
        this.loading = false;
      });
    },
  },
};
</script>