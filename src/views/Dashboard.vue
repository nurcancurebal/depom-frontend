<template>
  <div class="my-8 ma-auto w-75">
    <h3 class="text-center my-5">Ön İzleme</h3>
    <v-divider class="w-100" />
    <div class="container-div">
      <v-card class="box-style">
        <div>Toplam Kar / Zarar</div>
        <h2>{{ totalProfitLossValue }}</h2>
        <h3 v-if="netProfitMarginValue < 0" style="color: red">
          <v-icon size="21">mdi-arrow-down</v-icon>
          {{ netProfitMarginValue }}
        </h3>
        <h3 v-else style="color: green">
          <v-icon size="21">mdi-arrow-up</v-icon>
          {{ netProfitMarginValue }}
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
    <div class="container-div">
      <v-card class="chart-style">
        <div>Yapılan işlem Ürün Miktarı</div>
        <div id="chartPie" class="mt-3 mx-10"></div>

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
      <v-card class="chart-style">
        <div>Aylara göre Kar / Zarar</div>
        <div id="chartLine" class="mt-3"></div>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import "chartist/dist/index.css";
import { PieChart, LineChart } from "chartist";
import { useToast } from "vue-toast-notification";

export default {
  data() {
    return {
      totalStockValue: 0,
      totalDailyValue: 0,
      totalProfitLossValue: 0,
      netProfitMarginValue: 0,
    };
  },
  created() {
    this.toast = useToast();
    this.totalStokData();
    this.dailyTransactionData();
    this.totalProfitLossData();
    this.enteredProductQuantityData();
    this.mountlyProfitLossData();
  },

  methods: {
    ...mapActions("dashboard", [
      "totalStock",
      "dailyTransaction",
      "totalProfitloss",
      "enteredProductQuantity",
      "mountlyProfitLoss",
    ]),

    async totalStokData() {
      try {
        const result = await this.totalStock();
        this.totalStockValue = result.totalStockQuantity;
      } catch (error) {
        this.toast.error("Stok miktarı getirilirken bir hata oluştu!", {
          position: "bottom",
          duration: 2000,
        });
      }
    },

    async dailyTransactionData() {
      try {
        const result = await this.dailyTransaction();
        this.totalDailyValue = result.total;
      } catch (error) {
        this.toast.error("Günlük işlem sayısı getirilirken bir hata oluştu!", {
          position: "bottom",
          duration: 2000,
        });
      }
    },

    async totalProfitLossData() {
      try {
        const result = await this.totalProfitloss();
        this.totalProfitLossValue = Number(result.totalProfitLoss.toFixed(2));
        this.netProfitMarginValue = Number(result.netProfitMargin.toFixed(2));
      } catch (error) {
        this.toast.error("Kar / Zarar getirilirken bir hata oluştu!", {
          position: "bottom",
          duration: 2000,
        });
      }
    },

    async enteredProductQuantityData() {
      try {
        const { entryTotalQuantity, checkoutTotalQuantity } =
          await this.enteredProductQuantity();
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
          width: "275px",
          height: "275px",
        };

        new PieChart("#chartPie", chartData, options);
      } catch (error) {
        this.toast.error("Ürün miktarı getirilirken bir hata oluştu!", {
          position: "bottom",
          duration: 2000,
        });
      }
    },

    async mountlyProfitLossData() {
      try {
        const result = await this.mountlyProfitLoss();

        new LineChart(
          "#chartLine",
          {
            labels: [
              "Ocak",
              "Şubat",
              "Mart",
              "Nisan",
              "Mayıs",
              "Haziran",
              "Temmuz",
              "Ağustos",
              "Eylül",
              "Ekim",
              "Kasım",
              "Aralık",
            ],
            series: [result],
          },
          {
            low: -30,
            high: 100,
            showArea: true,
            width: "700px",
            height: "350px",
          }
        );
      } catch (error) {
        this.toast.error("Ürün miktarı getirilirken bir hata oluştu!", {
          position: "bottom",
          duration: 2000,
        });
      }
    },
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
  margin: 24px auto;
}
.chart-style {
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px !important;
  margin: 24px auto;
}

.container-div {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 44px;
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