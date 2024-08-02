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
    <div>
      <v-card class="chart-style">
        <div>Yapılan işlem Ürün Miktarı</div>
        <div id="chart" class="mt-3"></div>

        <div>
          <div class="chart-cointainer">
            <div class="chart-box" style="background-color: #f05a4f" />
            <div>Stok Giriş</div>
          </div>
          <div class="chart-cointainer">
            <div class="chart-box" style="background-color: #d60206" />
            <div>Stok Çıkış</div>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import "chartist/dist/index.css";
import { PieChart, LineChart } from "chartist";

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
    this.enteredProductQuantity().then(
      ({ entryTotalQuantity, checkoutTotalQuantity }) => {
        let chartData;

        if (entryTotalQuantity === 0 && checkoutTotalQuantity === 0) {
          chartData = {
            series: [1],
          };
        } else {
          chartData = {
            series: [checkoutTotalQuantity, entryTotalQuantity],
          };
        }
        const options = {
          labelInterpolationFnc: (value) => {
            if (entryTotalQuantity === 0 && checkoutTotalQuantity === 0) {
              return "0%";
            }
            return (
              Math.round(
                (+value / chartData.series.reduce((a, b) => a + b)) * 100
              ) + "%"
            );
          },
        };

        new PieChart("#chart", chartData, options);
      }
    );
  },

  methods: {
    ...mapActions("dashboard", [
      "totalStock",
      "dailyTransaction",
      "totalProfitloss",
      "enteredProductQuantity",
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
.chart-style {
  display: inline-flex !important;
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
.chart-box {
  width: 20px;
  height: 20px;
  margin: 5px;
}
.chart-cointainer {
  display: flex;
  align-items: center;
}
</style>