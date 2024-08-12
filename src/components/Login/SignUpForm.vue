<template>
  <v-sheet
    :elevation="13"
    :height="650"
    style="border-radius: 0px 25px 25px 0px"
  >
    <form class="d-flex align-center flex-column justify-center">
      <h2 class="mt-6">Kayıt Ol</h2>
      <v-divider class="ma-5 w-50"></v-divider>
      <v-text-field
        prepend-inner-icon="mdi-account"
        rounded="xl"
        class="w-50"
        label="Ad"
        variant="outlined"
        v-model="firstname"
        :rules="[() => !!firstname || 'Ad boş bırakılamaz!']"
        @keyup.enter="signUpClick"
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
      />
      <v-text-field
        prepend-inner-icon="mdi-account"
        label="Kullanıcı Adı"
        variant="outlined"
        rounded="xl"
        class="w-50"
        v-model="signupusername"
        :rules="[
          () => !!signupusername || 'Kullanıcı adı boş bırakılamaz.',
          () =>
            !/[ğĞçÇüÜöÖıİşŞ]/g.test(signupusername) ||
            'Kullanıcı adında Türkçe karakterler kullanılamaz.',
          () =>
            !!/^.{6,18}$/.test(signupusername) ||
            'Kullanıcı adı 6 ile 18 karakter arasında olmak zorundadır.',
        ]"
        @keyup.enter="signUpClick"
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
            <v-btn text color="#208ec6" class="mt-3" @click="formatDateClick">
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
        :rules="[
          () => !!signuppassword || 'Şifre boş bırakılamaz.',
          () =>
            !/[ğĞçÇüÜöÖıİşŞ]/g.test(signuppassword) ||
            'Şifrede Türkçe karakterler kullanılamaz.',
          () =>
            !!/^.{6,18}$/.test(signuppassword) ||
            'Şifre 6 ile 18 karakter arasında olmak zorundadır.',
        ]"
        @keyup.enter="signUpClick"
      />
      <v-btn
        class="font-weight-bold w-50 text-white"
        color="#ffd600"
        rounded="xl"
        @click="signUpClick"
      >
        Kayıt Ol
      </v-btn>
      <v-divider class="ma-5 w-50"></v-divider>
      <v-btn
        class="font-weight-bold w-50 text-white"
        color="#00c853"
        rounded="xl"
        @click="changeSignUpIn"
      >
        Giriş Yap!
      </v-btn>
    </form>
  </v-sheet>
</template>

<script>
import { useToast } from "vue-toast-notification";
import { mapActions } from "vuex";

export default {
  props: {
    signInUp: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      firstname: "",
      lastname: "",
      signuppassword: "",
      signupusername: "",
      birthdate: null,
      menu: false,
      formatDate: null,
      visible: false,
    };
  },

  created() {
    this.toast = useToast();
  },

  methods: {
    ...mapActions("auth", ["signUp"]),

    formatDateClick() {
      this.menu = false;
      const d = new Date(this.birthdate);
      const day = ("0" + d.getDate()).slice(-2);
      const month = ("0" + (d.getMonth() + 1)).slice(-2);
      const year = d.getFullYear();
      this.formatDate = day + "." + month + "." + year;
    },

    async signUpClick() {
      try {
        if (
          !!/^.{6,18}$/.test(this.signupusername) &&
          !/[ğĞçÇüÜöÖıİşŞ]/g.test(this.signupusername) &&
          !!/^.{6,18}$/.test(this.signuppassword) &&
          !/[ğĞçÇüÜöÖıİşŞ]/g.test(this.signuppassword) &&
          !!this.signuppassword &&
          !!this.signupusername &&
          !!this.firstname &&
          !!this.lastname &&
          !!this.formatDate
        ) {
          await this.signUp({
            firstname: this.firstname,
            lastname: this.lastname,
            username: this.signupusername,
            birthdate: this.birthdate,
            password: this.signuppassword,
          });

          this.toast.success("Kayıt işlemi başarılı. Giriş yapabilirsiniz.", {
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
              this.$emit("change-signInUp", !this.signInUp);
            }, 2000)
          );
        } else {
          this.toast.error(
            "Lütfen tüm alanları doğru bir şekilde doldurunuz!",
            {
              position: "bottom",
              duration: 2000,
            }
          );
        }
      } catch (error) {
        this.toast.error("Kayıt işlemi gerçekleştirilemedi!", {
          position: "bottom",
          duration: 2000,
        });
      }
    },

    changeSignUpIn() {
      this.firstname = "";
      this.lastname = "";
      this.signupusername = "";
      this.birthdate = null;
      this.signuppassword = "";
      this.formatDate = null;
      this.menu = false;
      this.$emit("change-signInUp", !this.signInUp);
    },
  },
};
</script>