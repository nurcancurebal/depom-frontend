<template>
  <div class="ma-8 main-div">
    <h2>Ön İzleme</h2>
    <v-divider class="my-5 mb-8 w-100"></v-divider>
    <div class="container-div">
      <v-card class="box-style">
        <div>Toplam Kar / Zarar</div>
        <h2>
          {{ totalProfitLossValue }}<v-icon size="21">mdi-currency-try</v-icon>
        </h2>
        <h3 v-if="netProfitMarginValue < 0" style="color: red">
          <v-icon size="21">mdi-arrow-down</v-icon>
          {{ netProfitMarginValue }} %
        </h3>
        <h3 v-else style="color: green">
          <v-icon size="21">mdi-arrow-up</v-icon>
          {{ netProfitMarginValue }} %
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
        <div>Yapılan İşlem Ürün Miktarı</div>
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
        <div>Aylara Göre Toplam Kar Marjı %</div>
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

        const responsiveOptions = [
          [
            "screen and (max-width: 480px)",
            {
              width: "200px",
              height: "200px",
            },
          ],
        ];

        new PieChart("#chartPie", chartData, options, responsiveOptions);
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

        const options = {
          low: -100,
          high: 100,
          showArea: true,
          width: "800px",
          height: "350px",
        };

        const responsiveOptions = [
          [
            "screen and (max-width: 850px)",
            {
              width: "370px",
            },
          ],

          [
            "screen and (max-width: 480px)",
            {
              width: "300px",
            },
          ],
        ];

        new LineChart(
          "#chartLine",
          {
            labels: [
              "01",
              "02",
              "03",
              "04",
              "05",
              "06",
              "07",
              "08",
              "09",
              "10",
              "11",
              "12",
            ],
            series: [result],
          },
          options,
          responsiveOptions
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
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 150px;
  margin: 32px 0;
}
.chart-style {
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px !important;
  margin: 32px 0;
}

.container-div {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
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

@media (max-width: 490px) {
  .box-style {
    width: 100% !important;
  }
}
</style>