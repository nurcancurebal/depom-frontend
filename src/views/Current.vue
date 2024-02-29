<template>
  <v-data-table-server
    class="ma-5"
    density="compact"
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items-length="current.length"
    :items="formattedCurrent"
    :loading="loading"
    item-value="_id"
    must-sort
    fixed-header
    height="399px"
    style="font-size: 14px"
    @update:options="updateOptions"
  />
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      itemsPerPage: 10,
      current: [],
      loading: false,
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
          value: "stockQuantity",
          sortable: true,
        },
        {
          title: "Toplam Birim Fiyat",
          value: "totalUnitPrice",
          sortable: true,
          width: "120px",
        },
        {
          title: "Kar / Zarar",
          value: "profitLoss",
          sortable: true,
        },
        {
          title: "Son İşlem Tarihi",
          value: "date",
          sortable: true,
          width: "120px",
        },
      ],
    };
  },
  computed: {
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
    this.getCurrent().then((result) => {
      this.current = result;
      this.loading = false;
    });
  },

  methods: {
    ...mapActions(["getCurrent"]),
    updateOptions(options) {
      console.log(options);
    },
  },
};
</script>