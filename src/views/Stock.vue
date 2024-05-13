<template>
  <div class="ma-8 main-div">
    <h3>Depo - Stok</h3>
    <v-divider class="my-5 w-100" />
    <v-card class="card-padding card-custom">
      <v-data-table-server
        class="elevation-1"
        style="font-size: 14px"
        density="compact"
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items-length="inventoryCount"
        :items="formattedInventory"
        :loading="loading"
        item-value="_id"
        must-sort
        fixed-header
        @update:options="updateOptions"
      />
    </v-card>
  </div>
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
      headers: [
        {
          title: "Stok Kodu / Barkod",
          value: "barcode",
          sortable: true,
          width: "130px",
          align: "center",
        },
        {
          title: "Ürün Adı",
          value: "productname",
          sortable: true,
          width: "250px",
          align: "center",
        },
        {
          title: "Kategori",
          value: "category",
          sortable: true,
          width: "200px",
          align: "center",
        },
        {
          title: "Alt Kategori",
          value: "subcategory",
          sortable: true,
          align: "center",
        },
        {
          title: "Tedarikçi",
          value: "supplier",
          sortable: true,
          align: "center",
        },
        {
          title: "Marka",
          value: "brand",
          sortable: true,
          align: "center",
        },
        {
          title: "Birim",
          value: "unit",
          sortable: true,
          align: "center",
        },
        {
          title: "Miktar",
          value: "quantity",
          sortable: true,
          align: "center",
        },
        {
          title: "Birim Fiyat",
          value: "unitprice",
          sortable: true,
          align: "center",
        },
        {
          title: "İşlem",
          value: "process",
          sortable: true,
          align: "center",
        },
        {
          title: "Tarih",
          value: "date",
          sortable: true,
          align: "center",
        },
      ],
    };
  },

  computed: {
    ...mapGetters(["inventory"]),
    formattedInventory() {
      return this.inventory.map((item) => {
        const date = new Date(item.date);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return { ...item, date: `${day}.${month}.${year}` };
      });
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

<style>
.card-padding {
  padding: 44px !important;
}
.card-custom {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

@media (max-width: 960px) {
  .card-padding {
    padding: 0 !important;
  }
}
</style>