<template>
  <v-sheet>
    <form class="d-flex align-center flex-column justify-center my-7">
      <h2>Hesabımı Düzenle</h2>
      <v-divider class="mt-5 mb-7" style="width: 100%" />
      <v-text-field
        prepend-inner-icon="mdi-account"
        label="Ad"
        variant="outlined"
        rounded="xl"
        style="width: 100%"
        v-model="cacheUser.firstname"
        :error-messages="errors.firstname"
      />
      <v-text-field
        prepend-inner-icon="mdi-account"
        label="Soyad"
        variant="outlined"
        rounded="xl"
        style="width: 100%"
        v-model="cacheUser.lastname"
        :error-messages="errors.lastname"
      />
      <v-text-field
        prepend-inner-icon="mdi-account"
        label="Kullanıcı Adı"
        variant="outlined"
        rounded="xl"
        style="width: 100%"
        v-model="cacheUser.username"
        :error-messages="errors.username"
      />

      <v-text-field
        v-model="formatDate"
        readonly
        @click="menu = !menu"
        prepend-inner-icon="mdi-calendar"
        label="Doğum Tarihi"
        variant="outlined"
        rounded="xl"
        style="width: 100%"
        placeholder="Doğum Tarihi"
        :error-messages="errors.birthdate"
      >
        <v-menu
          activator="parent"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          min-width="auto"
        >
          <v-date-picker
            v-model="cacheUser.birthdate"
            no-title
            scrollable
            style="height: 476px; margin-top: auto"
          >
            <v-btn text color="#208ec6" class="mt-3" @click="menu = false">
              İptal
            </v-btn>
            <v-btn text color="#208ec6" class="mt-3" @click="menu = false">
              Tamam
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-text-field>

      <v-btn
        style="width: 100%; background-color: #00c853; color: white"
        rounded="xl"
        @click="patternCheck"
        class="font-weight-bold"
      >
        Düzenle
      </v-btn>
    </form>
    <v-snackbar
      v-model="errors.successSnackbar"
      :timeout="2000"
      color="#208ec6"
      rounded="pill"
      height="48px"
    >
      Tebrikler kullanıcı bilgileri değiştirildi!
    </v-snackbar>
    <v-snackbar
      v-model="errors.snackbarError"
      :timeout="2000"
      color="#208ec6"
      rounded="pill"
      height="48px"
    >
      Lütfen doğru bir şekilde tüm alanları doldurunuz!
    </v-snackbar>
  </v-sheet>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    menu: false,
    formatDate: null,
    cacheUser: {},
    errors: {
      firstname: "",
      lastname: "",
      username: "",
      birthdate: null,
      successSnackbar: false,
      snackbarError: false,
    },
  }),

  computed: {
    ...mapGetters(["user"]),
  },

  watch: {
    "cacheUser.firstname"(value) {
      if (!value) {
        this.errors.firstname = "Ad boş bırakılamaz!";
      } else {
        this.errors.firstname = "";
      }
    },
    "cacheUser.lastname"(value) {
      if (!value) {
        this.errors.lastname = "Soyad boş bırakılamaz!";
      } else {
        this.errors.lastname = "";
      }
    },
    "cacheUser.username"(value) {
      const pattern = /[ğĞçÇüÜöÖıİşŞ]/g;

      const matchesusername = value.match(pattern);

      if (!value) {
        this.errors.username = "Kullanıcı adı boş bırakılamaz!";
      } else if (
        matchesusername != null ||
        value.length < 6 ||
        value.length > 18
      ) {
        this.errors.username =
          " Kullanıcı adında türkçe karakter kullanılamaz ve 6 ile 18 karakter arasında olmak zorundadır. ";
      } else {
        this.errors.username = "";
      }
    },
    "cacheUser.birthdate"(value) {
      if (!value) {
        this.errors.birthdate = "Doğum tarihi boş bırakılamaz!";
      } else {
        this.errors.birthdate = "";
        const d = new Date(value);
        const day = ("0" + d.getDate()).slice(-2);
        const month = ("0" + (d.getMonth() + 1)).slice(-2);
        const year = d.getFullYear();
        this.formatDate = day + "." + month + "." + year;
      }
    },
  },

  created() {
    this.getUser().then(() => {
      Object.keys(this.user).forEach((key) => {
        if (key === "birthdate") {
          this.cacheUser[key] = new Date(this.user[key]);
        } else {
          this.cacheUser[key] = this.user[key];
        }
      });
    });
  },

  methods: {
    ...mapActions(["getUser", "updateUser"]),

    patternCheck() {
      if (
        this.errors.firstname === "" &&
        this.errors.lastname === "" &&
        this.errors.username === "" &&
        this.errors.birthdate === "" &&
        this.cacheUser.firstname &&
        this.cacheUser.lastname &&
        this.cacheUser.username &&
        this.cacheUser.birthdate
      ) {
        const birthdate = new Date(
          this.cacheUser.birthdate.setHours(
            this.cacheUser.birthdate.getHours() -
              this.cacheUser.birthdate.getTimezoneOffset() / 60
          )
        );
        this.updateUser({
          firstname: this.cacheUser.firstname,
          lastname: this.cacheUser.lastname,
          username: this.cacheUser.username,
          birthdate,
        }).then(() => {
          this.errors.successSnackbar = true;
          setTimeout(() => {
            this.$router.push("/stock");
          }, 2000);
        });
      } else {
        this.errors.snackbarError = true;
      }
    },
  },
};
</script>