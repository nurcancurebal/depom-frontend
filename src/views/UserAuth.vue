<template>
  <v-row align="center" style="background-color: #ededed" class="row-height">
    <v-col cols="12" md="4" lg="3" offset-md="2" offset-lg="3" class="pa-0">
      <v-sheet
        :elevation="13"
        :height="signInUp ? '650' : '400'"
        style="border-radius: 25px 0px 0px 25px; background-color: #2b96cc"
        class="d-flex align-center justify-center flex-column px-2"
        id="sheet-height"
      >
        <img
          width="80"
          height="80"
          aspect-ratio="16/9"
          cover
          src="@/assets/logo.png"
          alt="Depom Stok Takip ve Yönetim Uygulaması Logo"
        />
        <div class="text-h3 font-weight-bold" style="color: #ededed">Depom</div>
        <p
          class="my-4 text-body-1 text-center text-decoration-underline"
          style="color: #ededed"
        >
          Stok Takip ve Yönetim Uygulaması
        </p>
        <ul style="color: #ededed">
          <li>Depo - Stok</li>
          <li>Stok Giriş</li>
          <li>Stok Çıkış</li>
          <li>Cari Hesaplar</li>
        </ul>
      </v-sheet>
    </v-col>

    <v-col cols="12" md="4" lg="3" class="pa-0">
      <SignInForm
        v-show="!signInUp"
        @update:signInFormUpdate="handleSignUpFormUpdate"
      />
      <SignUpForm
        v-show="signInUp"
        :signInUp="signInUp"
        @change-signInUp="handleSignInUpChange"
      />
    </v-col>
    <v-col md="2" lg="3" class="pa-0" />
  </v-row>
</template>

<script>
import SignUpForm from "../components/Login/SignUpForm.vue";
import SignInForm from "../components/Login/SignInForm.vue";

export default {
  components: {
    SignInForm,
    SignUpForm,
  },

  data() {
    return {
      signInUp: false,
    };
  },

  methods: {
    handleSignUpFormUpdate(newSignInUp) {
      this.signInUp = newSignInUp;
    },
    handleSignInUpChange(newValue) {
      this.signInUp = newValue;
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