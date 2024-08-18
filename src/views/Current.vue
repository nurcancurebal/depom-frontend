<template>
  <div class="ma-8 main-div">
    <h3>Cari Hesaplar</h3>
    <v-divider class="my-5 w-100"></v-divider>
    <v-card class="card-padding card-custom">
      <v-data-table-server
        class="elevation-1"
        style="font-size: 14px"
        density="compact"
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items-length="currentCount"
        :items="formattedCurrent"
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
      currentPage: 1,
      loading: false,
      sort: "barcode",
      desc: "",
      currentCount: 0,
      headers: [
        {
          title: "Stok Kodu / Barkod",
          value: "_id.barcode",
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
          value: "_id.unit",
          sortable: true,
          align: "center",
        },
        {
          title: "Stok Miktarı",
          value: "stockQuantity",
          sortable: true,
          align: "center",
        },
        {
          title: "Toplam Birim Fiyat",
          value: "totalUnitPrice",
          sortable: true,
          width: "120px",
          align: "center",
        },
        {
          title: "Kar / Zarar",
          value: "profitLoss",
          sortable: true,
          align: "center",
        },
        {
          title: "Son İşlem Tarihi",
          value: "date",
          sortable: true,
          width: "120px",
          align: "center",
        },
      ],
    };
  },

  computed: {
    ...mapGetters("inventory", ["current"]),
    formattedCurrent() {
      return this.current.map((item) => {
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
    this.currentLength();
    this.toast = useToast();
  },

  methods: {
    ...mapActions("inventory", ["getCurrent", "getCurrentCount"]),
    async currentLength() {
      try {
        const count = await this.getCurrentCount();
        this.currentCount = count;
      } catch (error) {
        this.toast.error("Cari hesap verileri alınırken bir hata oluştu!", {
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

        await this.getCurrent({
          page: this.currentPage,
          sort: this.desc + this.sort,
          limit: this.itemsPerPage,
        });
        this.loading = false;
      } catch (error) {
        this.toast.error("Cari hesap bilgileri getirilirken bir hata oluştu!", {
          position: "bottom",
          duration: 2000,
        });
      }
    },
  },
};
</script>