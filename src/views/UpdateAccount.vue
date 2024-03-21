<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12">
        <TheNavbar />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="2">
        <TheSidebar />
      </v-col>
      <v-col cols="10">
        <v-sheet class="pa-16">
          <form class="d-flex align-center flex-column justify-center">
            <v-text-field
              prepend-inner-icon="mdi-account"
              variant="solo"
              rounded="xl"
              style="width: 100%"
              placeholder="Ad"
              v-model="firstname"
              :error-messages="firstnameError"
            />
            <v-text-field
              prepend-inner-icon="mdi-account"
              variant="solo"
              rounded="xl"
              style="width: 100%"
              placeholder="Soyad"
              v-model="lastname"
              :error-messages="lastnameError"
            />
            <v-text-field
              prepend-inner-icon="mdi-account"
              variant="solo"
              rounded="xl"
              style="width: 100%"
              placeholder="Kullanıcı Adı"
              v-model="username"
              :error-messages="usernameError"
            />

            <v-text-field
              v-model="formatDate"
              readonly
              @click="menu = !menu"
              prepend-inner-icon="mdi-calendar"
              variant="solo"
              rounded="xl"
              style="width: 100%"
              placeholder="Doğum Tarihi"
              :error-messages="birthdateError"
            >
              <v-menu
                activator="parent"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                min-width="auto"
              >
                <v-date-picker
                  v-model="date"
                  no-title
                  scrollable
                  style="height: 476px; margin-top: auto"
                >
                  <v-btn text color="#208ec6" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="#208ec6" @click="formatDateClick">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-text-field>

            <v-text-field
              prepend-inner-icon="mdi-lock"
              variant="solo"
              style="width: 100%"
              rounded="xl"
              placeholder="Şifre"
              :type="visible ? 'text' : 'password'"
              @click:append-inner="visible = !visible"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              v-model="password"
              :error-messages="passwordError"
            />

            <v-btn
              style="width: 100%; background-color: #208ec6; color: #ededed"
              rounded="xl"
            >
              Düzenle
            </v-btn>
          </form>
        </v-sheet>
        <v-snackbar
          v-model="successSnackbar"
          :timeout="2000"
          color="#208ec6"
          rounded="pill"
          height="48px"
        >
          Tebrikler kullanıcı bilgileri değiştirildi!
        </v-snackbar>
        <v-snackbar
          v-model="snackbarError"
          :timeout="2000"
          color="#208ec6"
          rounded="pill"
          height="48px"
        >
          Lütfen doğru bir şekilde tüm alanları doldurunuz!
        </v-snackbar>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TheSidebar from "../components/TheSidebar.vue";
import TheNavbar from "../components/TheNavbar.vue";

export default {
  components: {
    TheSidebar,
    TheNavbar,
  },

  data: () => ({
    firstname: "",
    firstnameError: "",
    lastname: "",
    lastnameError: "",
    username: "",
    usernameError: "",
    menu: false,
    formatDate: null,
    date: null,
    birthdateError: "",
    visible: false,
    password: "",
    passwordError: "",
    successSnackbar: false,
    snackbarError: false,
  }),

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