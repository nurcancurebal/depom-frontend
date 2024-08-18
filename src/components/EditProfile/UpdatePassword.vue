<template>
  <v-form class="my-8 main-div w-50 ma-auto mt-16">
    <h2>Şifremi Düzenle</h2>
    <v-divider class="my-5 mb-7 w-100"></v-divider>
    <v-text-field
      prepend-inner-icon="mdi-lock"
      label="Eski Şifre"
      variant="outlined"
      rounded="xl"
      class="w-100"
      v-model="oldPassword"
      :type="visible ? 'text' : 'password'"
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
          newPassword === newPasswordRepeat || 'Şifreler birbiriyle uyuşmuyor.',
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
</template>

<script>
import { mapActions } from "vuex";
import { useToast } from "vue-toast-notification";

export default {
  data() {
    return {
      oldPassword: "",
      visible: false,
      newPassword: "",
      newPasswordRepeat: "",
    };
  },

  created() {
    this.toast = useToast();
  },

  methods: {
    ...mapActions("user", ["updatePassword"]),

    async updatePasswordClick() {
      try {
        if (
          !!this.newPassword &&
          !!this.newPasswordRepeat &&
          !!this.oldPassword &&
          this.newPassword === this.newPasswordRepeat &&
          !/[ğĞçÇüÜöÖıİşŞ]/g.test(this.newPassword) &&
          !!/^.{6,18}$/.test(this.newPassword)
        ) {
          await this.updatePassword({
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
          });

          this.toast.success("Şifre güncellendi", {
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
        this.toast.error("Eski şifrenizi yanlış girdiniz!", {
          position: "bottom",
          duration: 2000,
        });
      }
    },
  },
};
</script>