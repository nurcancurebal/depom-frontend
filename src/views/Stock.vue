<template>
  <div class="ma-8 main-div">
    <h2>Depo - Stok</h2>
    <v-divider class="my-5 mb-8 w-100"></v-divider>
    <v-card class="card-custom">
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
import { useToast } from "vue-toast-notification";

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
    ...mapGetters("inventory", { inventoryData: "inventory" }),
    formattedInventory() {
      return this.inventoryData.map((item) => {
        const date = new Date(item.date);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        let processTranslated = item.process;
        if (item.process === "entry") {
          processTranslated = "Giriş";
        } else if (item.process === "checkout") {
          processTranslated = "Çıkış";
        }

        return {
          ...item,
          date: `${day}.${month}.${year}`,
          process: processTranslated,
        };
      });
    },
  },

  created() {
    this.loading = true;
    this.inventoryLength();
    this.toast = useToast();
  },

  methods: {
    ...mapActions("inventory", ["getInventory", "getInventoryCount"]),
    async inventoryLength() {
      try {
        const count = await this.getInventoryCount();
        this.inventoryCount = count;
      } catch (error) {
        this.toast.error("Stok verileri alınırken bir hata oluştu!", {
          position: "bottom",
          duration: 2000,
        });
      }
    },
    async updateOptions(options) {
      try {
        this.currentPage = options.page;
        this.itemsPerPage = options.itemsPerPage;

        if (options.sortBy && options.sortBy.length > 0) {
          this.sort = options.sortBy[0].key;
          this.desc = options.sortBy[0].order === "desc" ? "-" : "";
        }

        await this.getInventory({
          page: this.currentPage,
          sort: this.desc + this.sort,
          limit: this.itemsPerPage,
        });
        this.loading = false;
      } catch (error) {
        this.toast.error("Stok ürünlerini getirirken bir hata oluştu!", {
          position: "bottom",
          duration: 2000,
        });
      }
    },
  },
};
</script>

<style>
.card-custom {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
  padding: 44px !important;
}

@media (max-width: 960px) {
  .card-custom {
    padding: 0 !important;
  }
}
</style>