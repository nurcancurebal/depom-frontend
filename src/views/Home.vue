<template>
  <v-row
    align="center"
    style="background-color: #ededed; height: 100vh"
    justify="center"
  >
    <v-col cols="4" style="padding: 0">
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
            :error-messages="usernameError"
            v-model="username"
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
            :error-messages="passwordError"
            v-model="password"
          />
          <v-btn
            style="width: 100%; background-color: #208ec6; color: #ededed"
            rounded="xl"
            @click="
              if (
                !usernameError &&
                !passwordError &&
                !!username &&
                !!password
              ) {
                logIn();
              } else {
                showSnackbarError = true;
              }
            "
          >
            Giriş Yap
          </v-btn>
        </form>
        <v-divider class="ma-5" />
        <div class="text-end">
          <v-btn
            variant="plain"
            style="color: #208ec6"
            @click="changeSignInUp"
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
            v-model="signupusername"
            :error-messages="signupusernameError"
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
            v-model="signuppassword"
            :error-messages="signuppasswordError"
          />

          <v-btn
            style="width: 100%; background-color: #208ec6; color: #ededed"
            rounded="xl"
            @click="
              if (
                !firstnameError &&
                !lastnameError &&
                !signupusernameError &&
                !birthdateError &&
                !signuppasswordError &&
                !!firstname &&
                !!lastname &&
                !!signupusername &&
                !!date &&
                !!signuppassword
              ) {
                signUp({
                  firstname,
                  lastname,
                  username: signupusername,
                  birthdate: date,
                  password: signuppassword,
                }).then(() => {
                  firstname = '';
                  lastname = '';
                  signupusername = '';
                  date = new Date();
                  signuppassword = '';
                  formatDate = null;
                  menu = false;
                  signInUp = !signInUp;
                  showSnackbar = true;
                });
              } else {
                showSnackbarError = true;
              }
            "
          >
            Kayıt Ol
          </v-btn>
        </form>

        <v-divider class="ma-5" />
        <div class="text-end">
          <v-btn
            variant="plain"
            style="color: #208ec6"
            @click="changeSignUpIn"
            class="mr-5"
          >
            Giriş Yap!
          </v-btn>
        </div>
      </v-sheet>
      <v-snackbar
        v-model="showSnackbar"
        :timeout="2000"
        color="#208ec6"
        rounded="pill"
        height="48px"
      >
        Tebrikler kayıt oldunuz!
      </v-snackbar>
      <v-snackbar
        v-model="showSnackbarError"
        :timeout="2000"
        color="#208ec6"
        rounded="pill"
        height="48px"
      >
        Lütfen tüm alanları doldurunuz!
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      passwordUsernameError: false,
      showSnackbarError: false,
      showSnackbar: false,
      signInUp: false,
      visible: false,
      date: null,
      menu: false,
      formatDate: null,
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      signuppassword: "",
      signupusername: "",
      usernameError: "",
      passwordError: "",
      firstnameError: "",
      lastnameError: "",
      signupusernameError: "",
      birthdateError: "",
      signuppasswordError: "",
    };
  },
  watch: {
    username(value) {
      if (!value) {
        this.usernameError = "Kullanıcı adı boş bırakılamaz!";
      } else {
        this.usernameError = "";
      }
    },
    password(value) {
      if (!value) {
        this.passwordError = "Şifre boş bırakılamaz!";
      } else {
        this.passwordError = "";
      }
    },
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
    signupusername(value) {
      const pattern = /[ğĞçÇüÜöÖıİşŞ]/g;

      const matchesusername = value.match(pattern);

      if (!value) {
        this.signupusernameError = "Kullanıcı adı boş bırakılamaz!";
      } else if (
        matchesusername != null ||
        value.length < 6 ||
        value.length > 18
      ) {
        this.signupusernameError =
          " Kullanıcı adında türkçe karakter kullanılamaz ve 6 ile 18 karakter arasında olmak zorundadır. ";
      } else {
        this.signupusernameError = "";
      }
    },
    signuppassword(value) {
      const pattern = /[ğĞçÇüÜöÖıİşŞ]/g;

      const matchespassword = value.match(pattern);

      if (!value) {
        this.signuppasswordError = "Şifre boş bırakılamaz!";
      } else if (
        matchespassword != null ||
        value.length < 6 ||
        value.length > 18
      ) {
        this.signuppasswordError =
          "Şifre de türkçe karakter kullanılamaz ve 6 ile 18 karakter arasında olmak zorundadır.";
      } else {
        this.signuppasswordError = "";
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
  methods: {
    ...mapActions(["signUp", "signIn"]),

    formatDateClick() {
      this.menu = false;
      const d = new Date(this.date);
      const day = ("0" + d.getDate()).slice(-2);
      const month = ("0" + (d.getMonth() + 1)).slice(-2);
      const year = d.getFullYear();
      this.formatDate = day + "." + month + "." + year;
    },
    changeSignInUp() {
      this.username = "";
      this.password = "";
      this.signInUp = !this.signInUp;
    },
    changeSignUpIn() {
      this.firstname = "";
      this.lastname = "";
      this.signupusername = "";
      this.date = null;
      this.signuppassword = "";
      this.formatDate = null;
      this.menu = false;
      this.signInUp = !this.signInUp;
    },
    logIn() {
      const username = this.username;
      const password = this.password;

      this.signIn({ username, password })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
        })
        .then(() => {
          this.$router.push("/stock");
        })
        .catch((error) => {
          this.showSnackbarError = true;
          console.error("error", error);
        });
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
.v-snackbar__content {
  text-align: center !important;
}
</style>