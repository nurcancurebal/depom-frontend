<template>
  <v-card style="margin: 40px; padding: 40px">
    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Stok Kodu/Barkod:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-text-field variant="outlined" />
      </v-col>
    </v-row>

    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Ürün Adı:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-text-field variant="outlined" />
      </v-col>
    </v-row>

    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Tarih:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-text-field
          variant="outlined"
          @click="datePickers = !datePickers"
          v-model="dateFormat"
          v-show="!datePickers"
        />

        <v-date-picker
          show-adjacent-months
          v-model="date"
          v-show="datePickers"
        />

        <v-btn
          :disabled="loading"
          style="margin: 0 24px; width: 316px; min-width: 316px"
          plain
          @click="dateClose"
          v-show="datePickers"
        >
          Kapat
        </v-btn>
      </v-col>
    </v-row>

    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Kategori:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-select
          clearable
          :items="items"
          variant="outlined"
          v-model="selectKategori"
        />
      </v-col>
    </v-row>

    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Alt Kategori:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-select clearable :items="items" variant="outlined" />
      </v-col>
    </v-row>

    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Tedarikçi:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-text-field variant="outlined" />
      </v-col>
    </v-row>

    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Marka:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-text-field variant="outlined" />
      </v-col>
    </v-row>

    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Miktar:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-text-field variant="outlined" />
      </v-col>
    </v-row>

    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Birim:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-text-field variant="outlined" />
      </v-col>
    </v-row>

    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Birim Fiyat:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-text-field variant="outlined" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      date: null,
      dateFormat: null,
      datePickers: false,
      selectKategori: "",
      items: {
        "Meyve & Sebze": ["Meyve", "Sebze", "Yetiştirme Kiti"],
        "Et, Tavuk & Balık": [
          "Kırmızı Et",
          "Beyaz Et",
          "Balık ve Deniz Mahsülleri",
          "Et Şarküteri",
        ],
        "Kahvaltılık & Süt Ürünleri": [
          "Süt",
          "Peynir",
          "Yoğurt",
          "Tereyağı",
          "Margarin",
          "Yumurta",
          "Zeytin",
          "Sütlü Tatlı ve Krema",
          "Kahvaltılıklar",
        ],
        "Temel Gıda": [
          "Sıvı Yağ",
          "Tuz, Baharat ve Harç",
          "Bulyon",
          "Konserve",
          "Sos",
          "Un",
          "Şeker",
          "Sağlıklı Yaşam Ürünleri ",
        ],
        "Meze, Hazır Yemek & Donuk": [
          "Meze",
          "Paketli Sandviç",
          "Pratik Yemek",
          "Dondurulmuş Gıda ",
        ],
        İçecek: [
          "Gazlı İçecek",
          "Gazsız İçecek",
          "Çay",
          "Kahve",
          "Su",
          "Maden Suyu",
        ],
        Dondurma: ["Kap Dondurma", "Tek Dondurma", "Buz"],
        Atıştırmalık: [
          "Kuru Meyve",
          "Kuru Yemiş",
          "Cips",
          "Çikolata",
          "Gofret",
          "Bar ve Kaplamalılar",
          "Bisküvi",
        ],
        "Fırın & Pastane": [
          "Ekmek",
          "Sabah Sıcakları",
          "Hamur ve Pasta Malzemeleri",
          "Yufka, Erişte ve Mantı",
          "Kuru Pasta",
          "Pasta",
          "Galeta, Grissini ve Gevrek",
        ],
        "Deterjan & Temizlik": [
          "Çamaşır Yıkama",
          "Bulaşık Yıkama",
          "Genel Temizlik",
          "Temizlik Malzemeleri",
          "Banyo Gereçleri",
          "Çamaşır Gereçleri",
          "Çöp Poşeti",
        ],
        "Kağıt ve Islak Mendil": [
          "Islak Mendil",
          "Tuvalet Kağıdı",
          "Kağıt Havlu",
          "Peçete",
          "Kağıt Mendil",
        ],
        "Kişisel Bakım, Kozmetik &  Sağlık": [
          "Güneş Bakım",
          "Hijyenik Ped",
          "Ağız Bakım Ürünleri",
          "Saç Bakım Ürünleri",
          "Duş, Banyo ve Sabun",
          "Tıraş Malzemeleri",
          "Ağda ve Epilasyon",
        ],
        Bebek: [
          "Bebek Bezi",
          "Bebek Bakım",
          "Bebek Beslenme",
          "Bebek Banyo",
          "Bebek Deterjanı ve Yumuşatıcı",
          "Bebek Tekstil",
        ],
        "Ev & Yaşam": [
          "Mutfak Eşyaları",
          "Mobilya ve Dekorayon",
          "Bahçe ve Piknik Malzemeleri",
          "Spor ve Outdoor",
          "Ev Tekstili",
          "Giyim",
        ],
        "Kitap, Kırtasiye & Oyuncak": [
          "Kitap, Dergi ve Gazete",
          "Kırtasiye",
          "Oyuncak",
        ],
        Çiçek: ["Canlı Bitki", "Yapay Çiçek"],
        "Pet Shop": ["Köpek", "Kedi", "Kuş", "Pet Aksesuarları"],
        Elektronik: [
          "Telefon ve Aksesuarları",
          "Bilgisayar ve Aksesuarları",
          "Beyaz Eşya",
          "Elektrikli Ev Aletleri",
          "Oyun Konsolları",
          "Görüntü ve Ses Sistemleri",
          "Hobi ve Eğlence",
        ],
      },
    };
  },
  watch: {
    date: function (date) {
      this.dateFormat = `${date.getDate()}.${
        date.getMonth() + 1
      }.${date.getFullYear()}`;
    },
  },
  methods: {
    dateClose() {
      this.datePickers = !this.datePickers;
    },
  },
};
</script>


<style>
.v-picker__header,
.v-picker-title,
.v-input__details {
  display: none !important;
}
</style>