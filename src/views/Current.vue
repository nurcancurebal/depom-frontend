<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12">
        <TheNavbar />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="2">
        <TheSidebar />
      </v-col>
      <v-col cols="10">
        <div
          style="display: flex; flex-direction: column; align-items: center"
          class="my-7"
        >
          <h3>Cari</h3>
          <v-divider style="width: 80%" class="my-5" />
          <v-card
            style="
              width: 90%;
              display: flex;
              justify-content: center;
              padding: 45px;
              margin-top: 20px;
            "
          >
            <v-data-table-server
              class="elevation-1"
              density="compact"
              v-model:items-per-page="itemsPerPage"
              :headers="headers"
              :items-length="currentCount"
              :items="formattedCurrent"
              :loading="loading"
              item-value="_id"
              must-sort
              fixed-header
              style="font-size: 14px"
              @update:options="updateOptions"
            />
          </v-card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TheSidebar from "../components/TheSidebar.vue";
import TheNavbar from "../components/TheNavbar.vue";

export default {
  components: {
    TheSidebar,
    TheNavbar,
  },

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
    ...mapGetters(["current"]),
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
    this.getCurrentCount().then((count) => {
      this.currentCount = count;
    });
  },

  methods: {
    ...mapActions(["getCurrent", "getCurrentCount"]),
    updateOptions(options) {
      this.currentPage = options.page;
      this.itemsPerPage = options.itemsPerPage;

      if (options.sortBy && options.sortBy.length > 0) {
        this.sort = options.sortBy[0].key;
        this.desc = options.sortBy[0].order === "desc" ? "-" : "";
      }

      this.getCurrent({
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