<template>
  <v-data-table-server
    class="ma-5"
    density="compact"
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items-length="inventoryCount"
    :items="uniqueInventory"
    :loading="loading"
    item-value="_id"
    @update:options="updateOptions"
    must-sort
    fixed-header
    height="399px"
    style="font-size: 14px"
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
      sort: "barcode",
      desc: "",
      stockquantity: "",
      totalunitprice: "",
      profit: "",
      loss: "",
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
          width: "250px",
        },
        {
          title: "Kategori",
          value: "category",
          sortable: true,
          width: "200px",
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
          title: "Stok Miktarı",
          value: "stockquantity",
          sortable: true,
        },
        {
          title: "Toplam Birim Fiyat",
          value: "totalunitprice",
          sortable: true,
          width: "120px",
        },
        {
          title: "Kar",
          value: "profit",
          sortable: true,
        },
        {
          title: "Zarar",
          value: "loss",
          sortable: true,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["inventory"]),
    uniqueInventory() {
      return this.inventory.reduce((acc, current) => {
        const x = acc.find(
          (item) =>
            item.barcode === current.barcode && item.unit === current.unit
        );
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
    },
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
      this.currentPage = options.page;
      this.itemsPerPage = options.itemsPerPage;

      if (options.sortBy && options.sortBy.length > 0) {
        this.sort = options.sortBy[0].key;
        this.desc = options.sortBy[0].order === "desc" ? "-" : "";
      }

      if (options.sortBy && options.sortBy.length > 0) {
        this.sort = options.sortBy[0].key;
      }

      this.getInventory({
        page: this.currentPage,
        sort: this.desc + this.sort,
        limit: this.itemsPerPage,
      }).then(() => {
        this.loading = false;
      });
    },
  },
};
</script>