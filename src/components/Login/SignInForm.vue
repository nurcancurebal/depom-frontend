<template>
  <v-sheet
    :elevation="13"
    :height="400"
    style="border-radius: 0px 25px 25px 0px"
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
      />
      <v-btn
        class="font-weight-bold w-50 text-white"
        color="#00c853"
        rounded="xl"
        @click="logIn"
      >
        Giriş Yap
      </v-btn>
      <v-divider class="ma-5 w-50" />
      <v-btn
        color="#ffd600"
        rounded="xl"
        @click="changeSignInUp"
        class="font-weight-bold w-50 text-white"
      >
        Kayıt Ol!
      </v-btn>
    </form>
  </v-sheet>
</template>

<script>
import { useToast } from "vue-toast-notification";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
      visible: false,
      signInUp: false,
    };
  },

  created() {
    this.toast = useToast();
  },

  methods: {
    ...mapActions("auth", ["signIn"]),

    changeSignInUp() {
      this.username = "";
      this.password = "";
      this.signInUp = !this.signInUp;
      this.$emit("update:signInFormUpdate", this.signInUp);
    },

    logIn() {
      if (this.username && this.password) {
        const { username, password } = this;

        this.signIn({ username, password })
          .then(async () => {
            this.toast.success(
              "Giriş başarılı ana sayfaya yönlendiriliyorsunuz.",
              {
                position: "bottom",
                duration: 2000,
              }
            );
            await new Promise(() =>
              setTimeout(() => {
                this.$router.push("/stock");
              }, 2000)
            );
          })
          .catch(() => {
            this.toast.error("Kullanıcı bilgileri bulunamadı.", {
              position: "bottom",
              duration: 2000,
            });
          });
      } else {
        this.toast.error("Lütfen tüm alanları doldurunuz.", {
          position: "bottom",
          duration: 2000,
        });
      }
    },
  },
};
</script>