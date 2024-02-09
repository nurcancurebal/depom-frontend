<template>
  <v-data-table :items="inventory"> </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["inventory"]),
  },
  created() {
    this.getInventory({ page: 1, sort: "barcode", limit: 10 });
  },

  methods: {
    ...mapActions(["getInventory"]),
  },
};
</script>