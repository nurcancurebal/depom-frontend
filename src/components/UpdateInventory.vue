<template>
  <v-card style="margin: 40px; padding: 40px">
    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Stok Kodu/Barkod:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-text-field variant="outlined" v-model="barcode" disabled>
          dfghjkl
        </v-text-field>
      </v-col>
    </v-row>

    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Ürün Adı:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-text-field variant="outlined" v-model="productname" />
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
          style="margin: 0 24px; width: 316px; min-width: 316px"
          plain
          @click="datePickers = !datePickers"
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
          :items="getCategories"
          variant="outlined"
          @click="
            () => {
              selectedSubCategory = '';
              selectedBrand = '';
            }
          "
          v-model="selectedCategory"
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
          @click="selectedBrand = ''"
          :items="getSubCategories"
          v-model="selectedSubCategory"
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
        <v-text-field variant="outlined" v-model="supplier" />
      </v-col>
    </v-row>

    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Marka:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-select
          clearable
          variant="outlined"
          :items="getSubCategoriesWithBrand"
          v-model="selectedBrand"
        />
      </v-col>
    </v-row>

    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Birim:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-select
          clearable
          variant="outlined"
          v-model="unit"
          :items="[
            'adet',
            'bağ',
            'boy',
            'cm',
            'çuval',
            'gr',
            'grup',
            'kg',
            'koli',
            'kutu',
            'lt',
            'm²',
            'm³',
            'm',
            'mm',
            'ml',
            'paket',
            'saat',
            'ton',
            'top',
          ]"
        />
      </v-col>
    </v-row>

    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Miktar:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-text-field variant="outlined" v-model="quantity" />
      </v-col>
    </v-row>

    <v-row style="margin: 10px" align="center">
      <v-col cols="2" style="padding: 0">
        <v-list-subheader style="padding-inline-end: 0">
          Birim Fiyat:
        </v-list-subheader>
      </v-col>

      <v-col cols="10" style="padding: 0">
        <v-text-field variant="outlined" v-model="unitprice" />
      </v-col>
    </v-row>

    <v-row style="margin: 10px">
      <v-col cols="2" offset="10" style="padding: 0">
        <v-btn
          variant="text"
          style="color: rgb(89 86 86); font-family: auto; width: 100%"
          @click="
            createInventory({
              barcode,
              productname,
              date,
              selectedCategory,
              selectedSubCategory,
              selectedBrand,
              supplier,
              unit,
              quantity,
              unitprice,
            })
          "
        >
          Çıkış Yap
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>