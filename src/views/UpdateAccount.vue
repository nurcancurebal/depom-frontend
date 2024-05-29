<template>
  <div>
    <v-form class="my-8 main-div w-50 ma-auto">
      <h2>Hesabımı Düzenle</h2>
      <v-divider class="mt-5 mb-7 w-100" />
      <v-text-field
        prepend-inner-icon="mdi-account"
        label="Ad"
        variant="outlined"
        rounded="xl"
        class="w-100"
        v-model="cacheUser.firstname"
        :rules="[() => !!cacheUser.firstname || 'Ad boş bırakılamaz!']"
        @keyup.enter="updateUserClick"
      />
      <v-text-field
        prepend-inner-icon="mdi-account"
        label="Soyad"
        variant="outlined"
        rounded="xl"
        class="w-100"
        v-model="cacheUser.lastname"
        :rules="[() => !!cacheUser.lastname || 'Soyad boş bırakılamaz!']"
        @keyup.enter="updateUserClick"
      />
      <v-text-field
        prepend-inner-icon="mdi-account"
        label="Kullanıcı Adı"
        variant="outlined"
        rounded="xl"
        class="w-100"
        v-model="cacheUser.username"
        :rules="[
          () => !!cacheUser.username || 'Kullanıcı adı boş bırakılamaz.',
          () =>
            !/[ğĞçÇüÜöÖıİşŞ]/g.test(cacheUser.username) ||
            'Kullanıcı adında Türkçe karakterler kullanılamaz.',
          () =>
            !!/^.{6,18}$/.test(cacheUser.username) ||
            'Kullanıcı adı 6 ile 18 karakter arasında olmak zorundadır.',
        ]"
        @keyup.enter="updateUserClick"
      />

      <v-text-field
        v-model="formatDate"
        readonly
        @click="menu = !menu"
        prepend-inner-icon="mdi-calendar"
        label="Doğum Tarihi"
        variant="outlined"
        rounded="xl"
        class="w-100"
        :rules="[() => !!formatDate || 'Doğum Tarihi boş bırakılamaz!']"
        tabindex="0"
        @keyup.enter="updateUserClick"
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
            style="height: 476px"
          >
            <v-btn text color="#208ec6" class="mt-3" @click="menu = false">
              İptal
            </v-btn>
            <v-btn text color="#208ec6" class="mt-3" @click="this.menu = false">
              Tamam
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-text-field>

      <v-btn
        class="font-weight-bold w-100 text-white"
        style="background-color: #00c853"
        rounded="xl"
        @click="updateUserClick"
      >
        Düzenle
      </v-btn>
    </v-form>

    <v-form class="my-8 main-div w-50 ma-auto mt-16">
      <h2>Şifremi Düzenle</h2>
      <v-divider class="mt-5 mb-7 w-100" />
      <v-text-field
        prepend-inner-icon="mdi-lock"
        label="Eski Şifre"
        variant="outlined"
        rounded="xl"
        class="w-100"
        v-model="oldPassword"
        :type="visible ? 'text' : 'oldPassword'"
        @click:append-inner="visible = !visible"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :rules="[() => !!oldPassword || 'Eski şifre boş bırakılamaz!']"
        @keyup.enter="updatePasswordClick"
      />
      <v-text-field
        prepend-inner-icon="mdi-lock"
        label="Yeni Şifre"
        variant="outlined"
        rounded="xl"
        class="w-100"
        v-model="newPassword"
        :rules="[
          () => !!newPassword || 'Yeni şifre boş bırakılamaz.',
          () =>
            !/[ğĞçÇüÜöÖıİşŞ]/g.test(newPassword) ||
            'Şifrede Türkçe karakterler kullanılamaz.',
          () =>
            !!/^.{6,18}$/.test(newPassword) ||
            'Şifre 6 ile 18 karakter arasında olmak zorundadır.',
        ]"
        @keyup.enter="updatePasswordClick"
      />

      <v-text-field
        prepend-inner-icon="mdi-lock"
        label="Yeni Şifre Tekrar"
        variant="outlined"
        rounded="xl"
        class="w-100"
        v-model="newPasswordRepeat"
        :rules="[
          () => !!newPasswordRepeat || 'Yeni şifre tekrar boş bırakılamaz!',
          () =>
            newPassword === newPasswordRepeat ||
            'Şifreler birbiriyle uyuşmuyor.',
        ]"
        @keyup.enter="updatePasswordClick"
      />

      <v-btn
        class="font-weight-bold w-100 text-white"
        style="background-color: #00c853"
        rounded="xl"
        @click="updatePasswordClick"
      >
        Düzenle
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { useToast } from "vue-toast-notification";

export default {
  data: () => ({
    menu: false,
    formatDate: null,
    cacheUser: {},
    newPassword: "",
    newPasswordRepeat: "",
    oldPassword: "",
    visible: false,
  }),

  computed: {
    ...mapGetters("user", ["user"]),
  },

  watch: {
    "cacheUser.birthdate"(value) {
      if (value) {
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
    ...mapActions("user", ["getUser", "updateUser", "updatePassword"]),

    updateUserClick() {
      const toast = useToast();
      if (
        !!/^.{6,18}$/.test(this.cacheUser.username) &&
        !/[ğĞçÇüÜöÖıİşŞ]/g.test(this.cacheUser.username) &&
        !!this.cacheUser.username &&
        !!this.cacheUser.firstname &&
        !!this.cacheUser.lastname &&
        !!this.formatDate
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
        }).then(async () => {
          toast.success("Kullanıcı bilgileri güncellendi", {
            position: "bottom",
            duration: 2000,
          });
        });
      } else {
        toast.error("Lütfen tüm alanları doğru bir şekilde doldurunuz.", {
          position: "bottom",
          duration: 2000,
        });
      }
    },
    updatePasswordClick() {
      const toast = useToast();
      if (
        !!this.newPassword &&
        !!this.newPasswordRepeat &&
        !!this.oldPassword &&
        this.newPassword === this.newPasswordRepeat &&
        !/[ğĞçÇüÜöÖıİşŞ]/g.test(this.newPassword) &&
        !!/^.{6,18}$/.test(this.newPassword)
      ) {
        this.updatePassword({
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        })
          .then(async () => {
            this.cacheUser.password = this.newPassword;

            toast.success("Şifre güncellendi", {
              position: "bottom",
              duration: 2000,
            });
            await new Promise(() =>
              setTimeout(() => {
                this.newPassword = "";
                this.newPasswordRepeat = "";
                this.oldPassword = "";
              }, 2000)
            );
          })
          .catch(() => {
            toast.error("Eski şifrenizi yanlış girdiniz.", {
              position: "bottom",
              duration: 2000,
            });
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