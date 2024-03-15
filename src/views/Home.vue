<template>
  <v-row
    align="center"
    style="background-color: #ededed"
    justify="center"
    class="py-16"
  >
    <v-col cols="4" style="padding: 0" class="my-5">
      <v-sheet
        :elevation="13"
        :height="signInUp ? '590' : '400'"
        style="border-radius: 25px 0px 0px 25px; background-color: #208ec6"
        class="d-flex align-center justify-center flex-column px-2"
      >
        <h2 class="text-h3 font-weight-bold" style="color: #ededed">Depom</h2>
        <p class="my-4 text-body-1 text-center" style="color: #ededed">
          Stok takip ve yönetim uygulaması
        </p>
        <ul style="list-style-type: disc; color: #ededed">
          <li>Depo - Stok</li>
          <li>Stok Giriş</li>
          <li>Stok Çıkış</li>
          <li>Cari</li>
        </ul>
      </v-sheet>
    </v-col>
    <v-col cols="5" style="padding: 0">
      <v-sheet
        :elevation="13"
        :height="400"
        style="border-radius: 0px 25px 25px 0px"
        v-show="!signInUp"
        class="pa-16"
      >
        <form class="d-flex align-center flex-column justify-center">
          <v-text-field
            prepend-inner-icon="mdi-account"
            variant="solo"
            rounded="xl"
            style="width: 100%"
            placeholder="Kullanıcı Adı"
          />
          <v-text-field
            prepend-inner-icon="mdi-lock"
            variant="solo"
            style="width: 100%"
            rounded="xl"
            placeholder="Şifre"
            :type="visible ? 'text' : 'password'"
            @click:append-inner="visible = !visible"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          />
          <v-btn
            type="submit"
            style="width: 100%; background-color: #208ec6; color: #ededed"
            rounded="xl"
          >
            Giriş Yap
          </v-btn>
        </form>
        <v-divider class="ma-5" />
        <div class="text-end">
          <v-btn
            variant="plain"
            style="color: #208ec6"
            @click="signInUp = !signInUp"
            class="mr-5"
          >
            Kayıt Ol!
          </v-btn>
        </div>
      </v-sheet>

      <v-sheet
        :elevation="13"
        :height="590"
        style="border-radius: 0px 25px 25px 0px"
        v-show="signInUp"
        class="pa-16"
      >
        <form class="d-flex align-center flex-column justify-center">
          <v-text-field
            prepend-inner-icon="mdi-account"
            variant="solo"
            rounded="xl"
            style="width: 100%"
            placeholder="Ad"
          />
          <v-text-field
            prepend-inner-icon="mdi-account"
            variant="solo"
            rounded="xl"
            style="width: 100%"
            placeholder="Soyad"
          />
          <v-text-field
            prepend-inner-icon="mdi-account"
            variant="solo"
            rounded="xl"
            style="width: 100%"
            placeholder="Kullanıcı Adı"
          />

          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            min-width="auto"
          >
            <template v-slot:activator="{ attrs }">
              <v-text-field
                v-model="formatDate"
                readonly
                v-bind="attrs"
                @click="menu = !menu"
                prepend-inner-icon="mdi-calendar"
                variant="solo"
                rounded="xl"
                style="width: 100%"
                placeholder="Doğum Tarihi"
              />
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-btn text color="#208ec6" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="#208ec6" @click="formatDateClick"> OK </v-btn>
            </v-date-picker>
          </v-menu>

          <v-text-field
            prepend-inner-icon="mdi-lock"
            variant="solo"
            style="width: 100%"
            rounded="xl"
            placeholder="Şifre"
            :type="visible ? 'text' : 'password'"
            @click:append-inner="visible = !visible"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          />
          <v-btn
            type="submit"
            style="width: 100%; background-color: #208ec6; color: #ededed"
            rounded="xl"
          >
            Kayıt Ol
          </v-btn>
        </form>
        <v-divider class="ma-5" />
        <div class="text-end">
          <v-btn
            variant="plain"
            style="color: #208ec6"
            @click="signInUp = !signInUp"
            class="mr-5"
          >
            Giriş Yap!
          </v-btn>
        </div>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      signInUp: false,
      visible: false,
      date: null,
      menu: false,
      formatDate: null,
    };
  },
  methods: {
    formatDateClick() {
      this.menu = false;
      const d = new Date(this.date);
      const day = ("0" + d.getDate()).slice(-2);
      const month = ("0" + (d.getMonth() + 1)).slice(-2);
      const year = d.getFullYear();
      this.formatDate = day + "." + month + "." + year;
    },
  },
};
</script>
<style>
.v-field__input {
  color: gray !important;
}
.v-picker-title {
  display: none;
}
</style>