<template>
  <div>
    <v-form class="my-8 main-div w-50 ma-auto">
      <h2>Hesabımı Düzenle</h2>
      <v-divider class="my-5 mb-8 w-100"></v-divider>
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
            <v-btn text color="#2b96cc" class="mt-3" @click="menu = false">
              İptal
            </v-btn>
            <v-btn text color="#2b96cc" class="mt-3" @click="this.menu = false">
              Tamam
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-text-field>

      <v-btn
        class="font-weight-bold w-100 text-white"
        color="#00c853"
        rounded="xl"
        @click="updateUserClick"
      >
        Düzenle
      </v-btn>
    </v-form>

    <UpdatePassword />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { useToast } from "vue-toast-notification";
import UpdatePassword from "../components/EditProfile/UpdatePassword.vue";

export default {
  components: {
    UpdatePassword,
  },

  data() {
    return {
      menu: false,
      formatDate: null,
      cacheUser: {},
    };
  },

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
    this.userDetails();
    this.toast = useToast();
  },

  methods: {
    ...mapActions("user", ["getUser", "updateUser"]),

    async userDetails() {
      try {
        await this.getUser();
        Object.keys(this.user).forEach((key) => {
          if (key === "birthdate") {
            this.cacheUser[key] = new Date(this.user[key]);
          } else {
            this.cacheUser[key] = this.user[key];
          }
        });
      } catch (error) {
        this.toast.error("Kullanıcı bilgileri getirilirken oluştu!", {
          position: "bottom",
          duration: 2000,
        });
      }
    },

    async updateUserClick() {
      try {
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
          await this.updateUser({
            firstname: this.cacheUser.firstname,
            lastname: this.cacheUser.lastname,
            username: this.cacheUser.username,
            birthdate,
          });

          this.toast.success("Kullanıcı bilgileri güncellendi", {
            position: "bottom",
            duration: 2000,
          });
        } else {
          this.toast.error("Lütfen tüm alanları doldurunuz!", {
            position: "bottom",
            duration: 2000,
          });
        }
      } catch (error) {
        this.toast.error("Kullanıcı bilgileri güncellenemedi!", {
          position: "bottom",
          duration: 2000,
        });
      }
    },
  },
};
</script>