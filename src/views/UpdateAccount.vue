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
                  v-model="birthdate"
                  no-title
                  scrollable
                  style="height: 476px; margin-top: auto"
                >
                  <v-btn text color="#208ec6" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="#208ec6" @click="this.menu = false">
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
              @click="patternCheck"
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
import { mapActions, mapGetters } from "vuex";

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
    birthdate: null,
    birthdateError: "",
    visible: false,
    password: "",
    passwordError: "",
    successSnackbar: false,
    snackbarError: false,
  }),

  computed: {
    ...mapGetters(["user"]),
  },

  watch: {
    firstname(value) {
      if (!value) {
        this.firstnameError = "Ad boş bırakılamaz!";
      } else {
        this.firstnameError = "";
      }
    },
    lastname(value) {
      if (!value) {
        this.lastnameError = "Soyad boş bırakılamaz!";
      } else {
        this.lastnameError = "";
      }
    },
    username(value) {
      const pattern = /[ğĞçÇüÜöÖıİşŞ]/g;

      const matchesusername = value.match(pattern);

      if (!value) {
        this.usernameError = "Kullanıcı adı boş bırakılamaz!";
      } else if (
        matchesusername != null ||
        value.length < 6 ||
        value.length > 18
      ) {
        this.usernameError =
          " Kullanıcı adında türkçe karakter kullanılamaz ve 6 ile 18 karakter arasında olmak zorundadır. ";
      } else {
        this.usernameError = "";
      }
    },
    password(value) {
      const pattern = /[ğĞçÇüÜöÖıİşŞ]/g;

      const matchespassword = value.match(pattern);

      if (!value) {
        this.passwordError = "Şifre boş bırakılamaz!";
      } else if (
        matchespassword != null ||
        value.length < 6 ||
        value.length > 18
      ) {
        this.passwordError =
          "Şifre de türkçe karakter kullanılamaz ve 6 ile 18 karakter arasında olmak zorundadır.";
      } else {
        this.passwordError = "";
      }
    },
    birthdate(value) {
      if (!value) {
        this.birthdateError = "Doğum tarihi boş bırakılamaz!";
      } else {
        const d = new Date(value);
        const day = ("0" + d.getDate()).slice(-2);
        const month = ("0" + (d.getMonth() + 1)).slice(-2);
        const year = d.getFullYear();
        this.formatDate = day + "." + month + "." + year;
      }
    },
    formatDate(value) {
      if (!value) {
        this.birthdateError = "Doğum tarihi boş bırakılamaz!";
      } else {
        this.birthdateError = "";
      }
    },
  },

  created() {
    this.getUser().then((response) => {
      this.firstname = response.data.firstname;
      this.lastname = response.data.lastname;
      this.username = response.data.username;
      this.birthdate = new Date(response.data.birthdate);
    });
  },

  methods: {
    ...mapActions(["updateUser", "getUser"]),

    patternCheck() {
      if (
        this.firstnameError === "" &&
        this.lastnameError === "" &&
        this.usernameError === "" &&
        this.birthdateError === "" &&
        this.passwordError === "" &&
        this.firstname &&
        this.lastname &&
        this.username &&
        this.birthdate &&
        this.password
      ) {
        this.updateUser({
          firstname: this.firstname,
          lastname: this.lastname,
          username: this.username,
          birthdate: this.birthdate,
          password: this.password,
        }).then(() => {
          this.successSnackbar = true;
          setTimeout(() => {
            this.$router.push("/stock");
          }, 2000);
        });
      } else {
        this.snackbarError = true;
      }
    },
  },
};
</script>