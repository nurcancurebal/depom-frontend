<template>
  <div class="my-8 ma-auto w-75">
    <h3 class="text-center">Ön İzleme</h3>
    <v-divider class="my-5 w-100" />
    <div class="d-flex flex-wrap justify-space-between display-align-column">
      <v-card class="box-style">
        <div>Toplam Kar / Zarar</div>
        <h2>{{ totalProfitLossValue }}</h2>
        <h3 v-if="percentageProfitlossValue < 0" style="color: red">
          <v-icon size="21">mdi-arrow-down</v-icon>
          {{ percentageProfitlossValue }}
        </h3>
        <h3 v-else style="color: green">
          <v-icon size="21">mdi-arrow-up</v-icon>
          {{ percentageProfitlossValue }}
        </h3>
      </v-card>
      <v-card class="box-style">
        <div>Toplam Stok Miktarı</div>
        <h2>{{ totalStockValue }}</h2>
      </v-card>
      <v-card class="box-style">
        <div>Bugünkü İşlem Sayısı</div>
        <h2>{{ totalDailyValue }}</h2>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      totalStockValue: 0,
      totalDailyValue: 0,
      totalProfitLossValue: 0,
      percentageProfitlossValue: 0,
    };
  },
  created() {
    this.totalStock().then((val) => {
      this.totalStockValue = val.totalStockQuantity;
    });
    this.dailyTransaction().then((val) => {
      this.totalDailyValue = val.total;
    });
    this.totalProfitloss().then((val) => {
      this.totalProfitLossValue = Number(val.totalProfitLoss.toFixed(2));
      this.percentageProfitlossValue = Number(
        val.percentageProfitloss.toFixed(2)
      );
    });
  },

  methods: {
    ...mapActions("dashboard", [
      "totalStock",
      "dailyTransaction",
      "totalProfitloss",
    ]),
  },
};
</script>

<style>
.box-style {
  width: 200px;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px !important;
  margin: 20px 0;
}
@media (max-width: 575px) {
  .display-align-column {
    align-items: center !important;
    flex-direction: column !important;
  }
}
</style>