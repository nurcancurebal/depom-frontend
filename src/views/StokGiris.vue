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
          :items="Object.keys(items)"
          variant="outlined"
          v-model="selectItemKey"
          @click="itemValuesFunction"
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
        <v-select
          clearable
          variant="outlined"
          @click="itemValuesFunction"
          :items="itemValues"
          v-model="selectItemValue"
        />
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
      items: {
        "Meyve & Sebze": {
          Meyve: [
            "Reyondan",
            "Verita",
            "Excelente",
            "Gürkan",
            "Del Monte",
            "Osmaniye",
            "Emsal",
            "M Life",
            "Genuine Coconut",
          ],
          Sebze: [
            "Reyondan",
            "Si&Ha",
            "Gurme212",
            "Eurofresh",
            "Dünya Hayat",
            "Garliko",
            "Agrotalya",
            "Yurtalan",
            "Canbaş",
            "Beyköy",
            "Verita",
            "Migros",
            "Tasconi",
            "Aressa",
          ],
          "Yetiştirme Kiti": ["Osmanlı Bahçesi", "Reyondan", "Eden Zirai"],
        },
        "Et, Tavuk & Balık": {
          "Kırmızı Et": [
            "Reyondan",
            "Uzman Kasap",
            "Pınar",
            "Superfresh",
            "Torku",
            "Gurvita",
            "Eral Et",
            "Tire",
            "Hasek",
            "Zel",
            "Orvital",
            "Migros",
            "Tire Süt Kooperatifi",
            "Erşan",
            "Eral",
          ],
          "Beyaz Et": [
            "Gedik",
            "Banvit",
            "Beypiliç",
            "Şenpiliç",
            "Erpiliç",
            "Bolez",
            "Gözde",
            "Bolca",
            "Lezita",
            "Orvital",
            "Ant Bahar",
            "İzmir",
            "Reyondan",
            "Gurvita",
          ],
          "Balık ve Deniz Mahsülleri": [
            "Reyondan",
            "Balık Dünyası",
            "Dardanel",
            "Kocaman",
            "Migros",
            "Pınar",
            "Red Tiger",
            "Conker",
            "Admirals",
            "Gusto",
            "Leroy",
            "Fish Point",
          ],
          "Et Şarküteri": [
            "Polonez",
            "Pınar",
            "Namet",
            "Erşan",
            "Apikoğlu",
            "Maret",
            "Başyazıcı",
            "Migros",
            "Yayla Türk",
            "Torku",
            "Aytaç",
            "Fümeci",
            "Özlem",
            "Banvit",
            "Reyondan",
            "Cumhuriyet Sucukları",
            "Şahin",
            "Fulya",
            "Altın Dana",
            "Yayla",
            "Altın",
            "Keskinoğlu",
            "Laz Kızı",
            "Seçme",
          ],
        },
        "Kahvaltılık & Süt Ürünleri": {
          Süt: [
            "İçim",
            "Pınar",
            "Fomilk",
            "Alpro",
            "Sek",
            "Danone",
            "Nilky",
            "Nestle",
            "VeganMilk",
            "Torku",
            "Dimes",
            "Activia",
            "Dulce De Leche",
            "Nesquik",
            "M Life",
            "Baltalı",
            "Efeler Çiftliği",
            "Orvital",
            "Alpimilk",
            "Elta Ada",
            "Milupa",
          ],
          Peynir: [
            "Tahsildaroğlu",
            "Pınar",
            "Bahçıvan",
            "İçim",
            "Ariste",
            "Muratbey",
            "La Vache Qui Rit",
            "Sek",
            "Taciroğlu",
            "President",
            "Doğruluk",
            "Altınkılıç",
            "Torku",
            "Elta Ada",
            "Hasmandıra",
            "Onsüt",
            "Kiri",
            "Golden Dutch",
            "Baltalı",
            "Ünal",
            "G.C. Gıda",
            "Akpınar",
            "Ünal Çiftliği",
            "Fomilk",
            "Lente",
            "Sütbon",
            "Ekici",
            "Milgo",
            "Anadolu Lezzetleri",
            "Laz Kızı",
            "Frico",
            "Cebir",
            "Veggy",
            "Sütaş",
            "Özışık",
            "Yardımcı",
            "Teksüt",
            "Biogurme",
            "P.E. 810",
            "Bergen",
            "Yeşil Kozan",
            "Karper",
            "Onur",
            "Primavera",
            "Koop",
            "Tire",
            "Orvital",
            "Clearspring",
            "Lactima",
            "Cebel",
            "Tire Süt Kooperatifi",
            "Alberto Di Centa",
            "Mandalinn",
            "Grandor",
            "Cibus",
            "Bergaz",
            "Gökçebayır",
            "Gündoğdu",
            "F.G",
            "Kervan",
            "Reyondan",
            "Peysan",
            "Philadelphia",
            "Savak",
            "Mersoy",
            "Kırıtaklar",
            "Cihanser",
            "Güneydoğu",
            "Efeler Çiftliği",
            "Meriç",
          ],
          Yoğurt: [
            "Activia",
            "Eker",
            "Danone",
            "İçim",
            "Sütaş",
            "Sek",
            "Arslan",
            "Pınar",
            "Elta Ada",
            "Torku",
            "Danino",
            "Tire Süt Kooperatifi",
            "Ateşoğlu",
            "Danem",
            "Nilky",
            "Belkıs Çiftliği",
            "Velioğlu",
          ],
          Tereyağı: [
            "Sek",
            "İçim",
            "Polonezköy",
            "S.S. Tire Organik Gıda Kooperatifi",
            "Laz Kızı",
            "Sütaş",
            "Pınar",
            "Tahsildaroğlu",
            "Ekici",
            "Kurpu",
            "Yörük Çiftliği",
            "Enka",
            "Elta Ada",
            "Kanlıca",
            "Hasmandıra",
            "Tire Süt Kooperatifi",
          ],
          Margarin: ["Teremyağ", "Becel", "Sana", "Bizim", "Sabah", "Lurpak"],
          Yumurta: [
            "Yumurtacım",
            "Coşkun",
            "Doğalım",
            "Raya",
            "Flotty",
            "Güres",
            "Naturaköy",
            "Orvital",
            "M Life",
            "Kor",
            "Green Ranch",
            "Gürata",
            "Tire",
            "Ordu Yumurta Üreticileri Birliği",
          ],
          Zeytin: [
            "Fora",
            "Marmarabirlik",
            "Cem Zeytin",
            "Zertum",
            "Cem",
            "Komili",
            "Adra",
            "Öncü",
            "Nutruit Olipop",
            "İlyada",
            "Bağcı",
            "Gürağaç",
            "Çukurbahçe",
            "Taneli",
            "Marmara Birlik",
            "Seleköy",
            "Oli Black",
          ],
          "Sütlü Tatlı ve Krema": [
            "Eker",
            "Dr.Oetker",
            "Eti",
            "Danette",
            "Kinder",
            "Fo",
            "Sek",
            "Pınar",
            "Pakmaya",
            "İçim",
            "Tikveşli",
            "Kenton",
            "Altın",
            "Oreo",
            "President",
            "Hulala",
            "Belkıs Çiftliği",
            "Milka",
            "Velioğlu",
            "Danissimo",
            "Danone",
            "Kısmet",
            "Green Way",
          ],
          Kahvaltılıklar: [
            "Balparmak",
            "Koska",
            "Yenigün",
            "Eti",
            "Patiswiss",
            "Beeo",
            "Kellogg's",
            "Tamek",
            "M Life",
            "Torku",
            "Nesquik",
            "Tat",
            "Nestle",
            "Fiskobirlik",
            "Sarelle",
            "Nesfit",
            "Anavarza",
            "Anadolu Lezzetleri",
            "Fellas",
            "Nustil",
            "Nut Master",
            "Züber",
            "Jif",
            "Fitnut",
            "City Farm",
            "Kühne",
            "Dr.Oetker",
            "Reyondan",
            "Penguen",
            "Fropie",
            "Canpetek",
            "Sakarkaya",
            "Emsal",
            "Melis",
            "Kaldera",
            "Berrak",
            "Nutella",
            "Ganik",
            "Richland",
            "Lotus",
            "Gold",
            "Noi",
            "Tukaş",
            "Burcu",
            "Chokella",
            "Crunch",
            "By İzzet",
            "Master Nut",
            "Schar",
            "Ülker",
            "Origin",
            "Weetabix",
            "Çokokrem",
            "Antebella",
            "Sinangil",
            "Abdurrahman Tatlıcı",
            "Şenocak",
          ],
        },
        "Temel Gıda": {
          "Sıvı Yağ": [
            "Komili",
            "Yudum",
            "Kristal",
            "Oneva",
            "Verde",
            "Sırma",
            "Orkide",
            "Tariş",
            "Anadolu Hazineleri",
            "Kırlangıç",
            "Güven Asa",
            "Çotanak",
            "Avofarm",
            "Turna",
            "Olitalia",
            "Nermin Hanım Zeytinliği",
            "Abalı",
            "Torku",
            "Marmarabirlik",
            "Hüner",
            "Asiltane",
          ],
          "Tuz, Baharat ve Harç": [
            "Bağdat",
            "Arifoğlu",
            "Knorr",
            "Reyondan",
            "Billur",
            "Efsina",
            "Ayfer Kaur",
            "Baharat Dünyası",
            "Dünya Hayat",
            "Salina",
            "Si&Ha",
            "Anadolu Lezzetleri",
            "Müsan",
            "Purelife",
            "Bizim",
            "Yayla",
            "Migros",
            "M Life",
            "City Farm",
            "Melis",
            "Tariş",
          ],
          Bulyon: ["Knorr", "Bizim", "Fide", "Veg & Bones", "Zel"],
          Konserve: [
            "Tat",
            "Dardanel",
            "Kühne",
            "Burcu",
            "Migros",
            "Superfresh",
            "Yayla",
            "Berrak",
            "İpek",
            "Fide",
            "Tamek",
            "Penguen",
            "Ant Bahar",
            "Reyondan",
            "Tukaş",
            "Gurme",
            "Öncü",
            "Melis",
            "Pınar",
            "Talia",
            "Tada",
            "Demko",
            "Kalite Tonla",
            "Yurt Konserve",
            "Sera",
            "Anadolu Lezzetleri",
            "Gurme212",
            "M Life",
          ],
          Sos: [
            "Kühne",
            "Calve",
            "Tat",
            "Fersan",
            "Heinz",
            "Migros",
            "Pınar",
            "Doğanay",
            "Knorr",
            "Tukaş",
            "Jr.Sous Chef",
            "Burcu",
            "Barilla",
            "Tabasco",
            "Tariş",
            "Uzman Kasap",
            "Hp",
            "Maille",
            "Remia",
            "Pastavilla",
            "Ferfresh",
            "Kikkoman",
            "Lowensenf",
            "Teptip",
            "Penguen",
            "King Crown",
            "Raz",
          ],
          Un: [
            "Söke",
            "Sinangil",
            "Eriş",
            "Migros",
            "Bemtat",
            "Bünsa",
            "İnci",
            "Anadolu Lezzetleri",
            "Güzel Ada Gıda",
            "Glutensiz Ada",
            "İstiklal Yolu",
            "Oneva",
            "M Life",
            "Schar",
            "Bağdat",
          ],
          Şeker: [
            "Migros",
            "Torku",
            "Irmak",
            "Bor Şeker",
            "Dr.Oetker",
            "Takita",
          ],
          "Sağlıklı Yaşam Ürünleri ": [
            "M Life",
            "Fellas",
            "Takita",
            "Doyum",
            "Züber",
            "Bio Protein",
            "Muscle Station",
            "Uniq2go",
            "Schar",
            "Orgalife",
            "Canderel",
            "City Farm",
            "Eti",
            "Tada",
            "Bemtat",
            "Sinangil",
            "Glutensiz Ada",
            "Güzel Ada Gıda",
            "Jr.Sous Chef",
            "Tchibo",
            "Delly",
            "Veggy",
            "Yayla",
            "Barilla",
            "Söke",
            "Saka",
            "Tat",
            "Powerade",
            "Bigjoy",
            "Kaldera",
            "Heinz",
            "Çaykur",
            "S.S. Tire Organik Gıda Kooperatifi",
            "The Lifeco",
            "Ant Bahar",
            "Huxol",
            "Anadolu Hazineleri",
            "Pastavilla",
            "Kristal",
            "Karali",
            "Kühne",
            "Calve",
          ],
        },
        "Meze, Hazır Yemek & Donuk": {
          Meze: [
            "Reyondan",
            "Gurumen",
            "Mezzetürk",
            "Beypazarı",
            "Biberes",
            "Mister No",
          ],
          "Paketli Sandviç": ["Tada", "Mister No", "Mr.No"],
          "Pratik Yemek": [
            "Yayla",
            "Knorr",
            "Tada",
            "Dardanel",
            "Zel",
            "Bizim",
            "Tat",
            "Gurmepack",
            "Yurt Konserve",
            "Tamek",
            "Burcu",
            "Veg & Bones",
            "Fide",
            "Veggy",
            "Gurme212",
            "Gurme",
            "G.C. Gıda",
            "Anadolu Lezzetleri",
            "Tukaş",
          ],
          "Dondurulmuş Gıda ": [
            "Superfresh",
            "Feast",
            "Muti Gıda",
            "Pınar",
            "Pek Food",
            "Lavi",
            "Embi",
            "Elmasoğlu",
            "Dr.Oetker",
            "Pizza Mi Go",
            "Galez",
            "Privegi",
            "Nelipide",
            "Veggy",
            "Yeşil",
            "Torpat",
            "Sarıvadi",
            "Toblerone",
            "Milka",
            "Başyazıcı",
            "Serez",
          ],
        },
        İçecek: {
          "Gazlı İçecek": [
            "Coca Cola",
            "Red Bull",
            "Pepsi",
            "Uludağ",
            "Schweppes",
            "Fanta",
            "Çamlıca",
            "Sprite",
            "Monster",
            "Yedigün",
            "Maltana",
            "Burn",
            "Coca-Cola",
            "Fruko",
            "Black Bruin",
            "Fever Tree",
            "Dydo",
            "Mountain Dew",
            "Beyoğlu Gazozu",
            "Joozy",
            "Seven Up",
            "Migros",
            "Peja",
            "Haliç Altın",
          ],
          "Gazsız İçecek": [
            "Dimes",
            "Cappy",
            "Tamek",
            "Migros",
            "Eker",
            "Elite Naturel",
            "Altınkılıç",
            "Uludağ",
            "Juss",
            "İçim",
            "Doğanay",
            "Sütaş",
            "Sek",
            "Danem",
            "The Good Wild",
            "Herby",
            "Pınar",
            "Serafresh",
            "Danone",
            "M Life",
            "Sarıyer",
            "Torku",
            "Kavaklıdere",
            "Arslan",
            "Vivo",
            "Orvital",
            "Serfresh",
            "Elta Ada",
            "High Five",
            "Balaban",
            "Vefa",
            "Pin",
            "DK",
            "Naturel",
            "Limmo",
            "Fo",
            "Tat",
          ],
          Çay: [],
          Kahve: [],
          Su: [],
          "Maden Suyu": [],
        },
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
      selectItemKey: "",
      itemValues: "",
      selectItemValue: "",
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
    itemValuesFunction() {
      this.selectItemValue = "";
      for (const iterator of Object.entries(this.items)) {
        if (iterator[0] == this.selectItemKey) {
          return (this.itemValues = iterator[1]);
        }
      }
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