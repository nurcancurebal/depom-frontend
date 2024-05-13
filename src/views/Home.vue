<template>
  <v-row align="center" style="background-color: #ededed" class="row-height">
    <v-col cols="12" md="4" lg="3" offset-md="2" offset-lg="3" class="pa-0">
      <v-sheet
        :elevation="13"
        :height="signInUp ? '650' : '400'"
        style="border-radius: 25px 0px 0px 25px; background-color: #208ec6"
        class="d-flex align-center justify-center flex-column px-2"
        id="sheet-height"
      >
        <img
          width="80"
          height="80"
          aspect-ratio="16/9"
          cover
          src="@/assets/logo.png"
          alt="logo"
        />
        <h2 class="text-h3 font-weight-bold" style="color: #ededed">Depom</h2>
        <p
          class="my-4 text-body-1 text-center text-decoration-underline"
          style="color: #ededed"
        >
          Stok Takip ve Yönetim Uygulaması
        </p>
        <ul style="list-style-type: disc; color: #ededed">
          <li>Depo - Stok</li>
          <li>Stok Giriş</li>
          <li>Stok Çıkış</li>
          <li>Cari</li>
        </ul>
      </v-sheet>
    </v-col>
    <v-col cols="12" md="5" lg="4" class="pa-0">
      <v-sheet
        :elevation="13"
        :height="400"
        style="border-radius: 0px 25px 25px 0px"
        v-show="!signInUp"
      >
        <form class="d-flex align-center flex-column justify-center">
          <h2 class="mt-7">Giriş Yap</h2>
          <v-divider class="ma-5 w-50" />
          <v-text-field
            prepend-inner-icon="mdi-account"
            label="Kullanıcı Adı"
            variant="outlined"
            rounded="xl"
            class="w-50"
            :rules="[() => !!username || 'Kullanıcı adı boş bırakılamaz!']"
            v-model="username"
            @keyup.enter="logIn"
            tabindex="0"
          />
          <v-text-field
            prepend-inner-icon="mdi-lock"
            label="Şifre"
            variant="outlined"
            class="w-50"
            rounded="xl"
            :type="visible ? 'text' : 'password'"
            @click:append-inner="visible = !visible"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :rules="[() => !!password || 'Şifre boş bırakılamaz!']"
            v-model="password"
            @keyup.enter="logIn"
            tabindex="0"
          />
          <v-btn
            class="font-weight-bold w-50 text-white"
            style="background-color: #00c853"
            rounded="xl"
            @click="logIn"
          >
            Giriş Yap
          </v-btn>
          <v-divider class="ma-5 w-50" />
          <v-btn
            style="background-color: #ffd600"
            rounded="xl"
            @click="changeSignInUp"
            class="font-weight-bold w-50 text-white"
          >
            Kayıt Ol!
          </v-btn>
        </form>
      </v-sheet>

      <v-sheet
        :elevation="13"
        :height="650"
        style="border-radius: 0px 25px 25px 0px"
        v-show="signInUp"
      >
        <form class="d-flex align-center flex-column justify-center">
          <h2 class="mt-6">Kayıt Ol</h2>
          <v-divider class="ma-5 w-50" />
          <v-text-field
            prepend-inner-icon="mdi-account"
            rounded="xl"
            class="w-50"
            label="Ad"
            variant="outlined"
            v-model="firstname"
            :rules="[() => !!firstname || 'Ad boş bırakılamaz!']"
            @keyup.enter="signUpClick"
            tabindex="0"
          />
          <v-text-field
            prepend-inner-icon="mdi-account"
            label="Soyad"
            variant="outlined"
            rounded="xl"
            class="w-50"
            v-model="lastname"
            :rules="[() => !!lastname || 'Soyad boş bırakılamaz!']"
            @keyup.enter="signUpClick"
            tabindex="0"
          />
          <v-text-field
            prepend-inner-icon="mdi-account"
            label="Kullanıcı Adı"
            variant="outlined"
            rounded="xl"
            class="w-50"
            v-model="signupusername"
            :error-messages="signupusernameError"
            @keyup.enter="signUpClick"
            tabindex="0"
          />

          <v-text-field
            v-model="formatDate"
            readonly
            @click="menu = !menu"
            prepend-inner-icon="mdi-calendar"
            label="Doğum Tarihi"
            variant="outlined"
            rounded="xl"
            class="w-50"
            :rules="[() => !!formatDate || 'Doğum Tarihi boş bırakılamaz!']"
            @keyup.enter="signUpClick"
            tabindex="0"
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
                style="height: 476px"
              >
                <v-btn text color="#208ec6" class="mt-3" @click="menu = false">
                  İptal
                </v-btn>
                <v-btn
                  text
                  color="#208ec6"
                  class="mt-3"
                  @click="formatDateClick"
                >
                  Tamam
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-text-field>

          <v-text-field
            prepend-inner-icon="mdi-lock"
            label="Şifre"
            variant="outlined"
            class="w-50"
            rounded="xl"
            :type="visible ? 'text' : 'password'"
            @click:append-inner="visible = !visible"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            v-model="signuppassword"
            :error-messages="signuppasswordError"
            @keyup.enter="signUpClick"
            tabindex="0"
          />
          <v-btn
            class="font-weight-bold w-50 text-white"
            style="background-color: #ffd600"
            rounded="xl"
            @click="signUpClick"
          >
            Kayıt Ol
          </v-btn>
          <v-divider class="ma-5 w-50" />
          <v-btn
            class="font-weight-bold w-50 text-white"
            style="background-color: #00c853"
            rounded="xl"
            @click="changeSignUpIn"
          >
            Giriş Yap!
          </v-btn>
        </form>
      </v-sheet>
    </v-col>
    <v-col md="1" lg="2" class="pa-0" />
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
import { useToast } from "vue-toast-notification";

export default {
  data() {
    return {
      signupusernameError: "",
      signuppasswordError: "",
      signInUp: false,
      visible: false,
      birthdate: null,
      menu: false,
      formatDate: null,
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      signuppassword: "",
      signupusername: "",
    };
  },

  watch: {
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
  },
  methods: {
    ...mapActions(["signUp", "signIn"]),

    formatDateClick() {
      this.menu = false;
      const d = new Date(this.birthdate);
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
      this.birthdate = null;
      this.signuppassword = "";
      this.formatDate = null;
      this.menu = false;
      this.signInUp = !this.signInUp;
    },
    logIn() {
      const toast = useToast();
      if (this.username && this.password) {
        const username = this.username;
        const password = this.password;

        this.signIn({ username, password })
          .then(async (response) => {
            localStorage.setItem("token", response.data.token);

            toast.success("Giriş başarılı ana sayfaya yönlendiriliyorsunuz.", {
              position: "bottom",
              duration: 2000,
            });
            await new Promise(() =>
              setTimeout(() => {
                this.$router.push("/stock");
              }, 2000)
            );
          })
          .catch((error) => {
            toast.error("Kullanıcı bilgileri bulunamadı.", {
              position: "bottom",
              duration: 2000,
            });
            console.error("error", error);
          });
      } else {
        toast.error("Lütfen tüm alanları doldurunuz.", {
          position: "bottom",
          duration: 2000,
        });
      }
    },
    signUpClick() {
      const toast = useToast();
      if (
        !this.signupusernameError &&
        !this.signuppasswordError &&
        !!this.signuppassword &&
        !!this.signupusername &&
        !!this.firstname &&
        !!this.lastname &&
        !!this.formatDate
      ) {
        this.signUp({
          firstname: this.firstname,
          lastname: this.lastname,
          username: this.signupusername,
          birthdate: this.birthdate,
          password: this.signuppassword,
        }).then(async () => {
          toast.success("Kayıt işlemi başarılı. Giriş yapabilirsiniz.", {
            position: "bottom",
            duration: 2000,
          });

          await new Promise(() =>
            setTimeout(() => {
              this.firstname = "";
              this.lastname = "";
              this.signupusername = "";
              this.birthdate = new Date();
              this.signuppassword = "";
              this.formatDate = null;
              this.menu = false;
              this.signInUp = !this.signInUp;
            }, 2000)
          );

          this.firstname = "";
          this.lastname = "";
          this.signupusername = "";
          this.birthdate = new Date();
          this.signuppassword = "";
          this.formatDate = null;
          this.menu = false;
          this.signInUp = !this.signInUp;
        });
      } else {
        toast.error("Lütfen tüm alanları doğru bir şekilde doldurunuz.", {
          position: "bottom",
          duration: 2000,
        });
      }
    },
  },
};
</script>

<style>
.v-picker-title {
  display: none;
}

@media (min-width: 960px) {
  .row-height {
    height: 101.7vh;
  }
}
@media (max-width: 960px) {
  #sheet-height {
    height: 400px !important;
  }
}
</style>