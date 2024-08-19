<template>
  <v-form class="main-div my-8 response-width ma-auto mt-16">
    <h2>Öneride Bulun</h2>
    <v-divider class="my-5 mb-8 w-100"></v-divider>
    <v-text-field
      prepend-inner-icon="mdi-email"
      label="E-posta"
      variant="outlined"
      rounded="xl"
      class="w-100 mt-2"
      v-model="email"
      :rules="[
        () => !!email || 'E-posta boş bırakılamaz!',
        () => /.+@.+\..+/.test(email) || 'Geçerli bir e-posta adresi giriniz!',
      ]"
      @keyup.enter="suggestionsClick"
    />

    <v-textarea
      prepend-inner-icon="mdi-comment"
      label="Önerileriniz"
      row-height="50"
      rows="10"
      variant="outlined"
      auto-grow
      rounded="xl"
      class="w-100 mt-2"
      :rules="[
        () => !!message || 'Önerileriniz boş bırakılamaz!',
        () =>
          message.length >= 30 || 'Önerileriniz en az 30 karakter olmalıdır!',
        () =>
          message.length <= 600 ||
          'Önerileriniz en fazla 600 karakter olmalıdır!',
      ]"
      @keyup.enter="suggestionsClick"
      clear-icon="mdi-close-circle"
      clearable
      v-model="message"
    />

    <v-btn
      class="font-weight-bold w-100 mt-2 text-white"
      rounded="xl"
      color="#00c853"
      @click="suggestionsClick"
    >
      Gönder
    </v-btn>
  </v-form>
</template>
<script>
import { mapActions } from "vuex";
import { useToast } from "vue-toast-notification";

export default {
  data() {
    return {
      email: "",
      message: "",
    };
  },
  created() {
    this.toast = useToast();
  },
  methods: {
    ...mapActions("suggestion", ["suggestionMessage"]),
    async suggestionsClick() {
      try {
        if (!this.email || !this.message) {
          this.toast.error("E-posta ve önerileriniz boş bırakılamaz.", {
            position: "bottom",
            duration: 2000,
          });
          return;
        }

        if (!/.+@.+\..+/.test(this.email)) {
          this.toast.error("Geçerli bir e-posta adresi giriniz.", {
            position: "bottom",
            duration: 2000,
          });
          return;
        }

        if (this.message.length < 30 || this.message.length > 600) {
          this.toast.error(
            "Önerileriniz en az 30 en çok 600 karakter olmalıdır.",
            {
              position: "bottom",
              duration: 2000,
            }
          );
          return;
        }

        await this.suggestionMessage({
          email: this.email,
          message: this.message,
        });

        this.toast.success("Önerileriniz başarıyla gönderildi.", {
          position: "bottom",
          duration: 2000,
        });

        this.email = "";
        this.message = "";
      } catch (error) {
        this.toast.error("Önerileriniz Gönderilemedi.", {
          position: "bottom",
          duration: 2000,
        });
      }
    },
  },
};
</script>

<style>
.response-width {
  width: 50%;
}

@media (max-width: 490px) {
  .response-width {
    width: 75% !important;
  }
}
</style>