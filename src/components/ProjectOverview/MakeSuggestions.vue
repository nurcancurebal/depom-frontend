<template>
  <v-form class="main-div my-8 w-50 ma-auto mt-16">
    <h2>Öneride Bulun</h2>
    <v-divider class="my-5 mb-8 w-100"></v-divider>
    <v-text-field
      prepend-inner-icon="mdi-account"
      label="İsim"
      variant="outlined"
      rounded="xl"
      class="w-100"
      v-model="firstname"
      :rules="[() => !!firstname || 'Ad boş bırakılamaz!']"
      @keyup.enter="suggestionsClick"
    />
    <v-text-field
      prepend-inner-icon="mdi-email"
      label="E-posta"
      variant="outlined"
      rounded="xl"
      class="w-100 mt-2"
      v-model="email"
      :rules="[() => !!email || 'E-posta boş bırakılamaz!']"
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
      :rules="[() => !!message || 'Önerileriniz boş bırakılamaz!']"
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
export default {
  data() {
    return {
      firstname: "",
      email: "",
      message: "",
    };
  },
  methods: {
    suggestionsClick() {
      console.log("Öneri Gönderildi");
    },
  },
};
</script>