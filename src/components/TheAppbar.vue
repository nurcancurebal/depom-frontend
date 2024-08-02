<template>
  <v-app-bar
    v-if="$route.name !== 'UserAuth'"
    style="background-color: #208ec6"
    class="text-white"
    prominent
  >
    <router-link
      to="/dashboard"
      id="title"
      class="text-white text-decoration-none"
    >
      <img
        width="50"
        height="50"
        aspect-ratio="16/9"
        cover
        src="@/assets/logo.png"
        alt="logo"
        class="ml-4"
      />
    </router-link>
    <v-toolbar-title class="text-h4">
      <router-link
        to="/dashboard"
        id="title"
        class="text-white text-decoration-none"
      >
        Depom
      </router-link>
    </v-toolbar-title>

    <template v-if="$vuetify.display.lgAndUp">
      <v-toolbar-items class="align-center">
        {{ formattedName(userData.firstname) }}
        {{ formattedName(userData.lastname) }}
      </v-toolbar-items>

      <v-btn icon>
        <v-icon icon="mdi-account"></v-icon>
        <v-menu activator="parent">
          <v-list>
            <router-link
              style="color: #208ec6; font-family: 'Material Design Icons'"
              to="/update-account"
              class="text-decoration-none"
            >
              <v-list-item-title value="hesabimiduzenle" class="pa-1 mx-2">
                Hesabımı Düzenle
              </v-list-item-title>
            </router-link>

            <router-link
              style="color: #208ec6; font-family: 'Material Design Icons'"
              to="/"
              class="text-decoration-none"
              @click="exitToast"
            >
              <v-list-item-title value="cikis" class="pa-1 mx-2">
                Çıkış
              </v-list-item-title>
            </router-link>
          </v-list>
        </v-menu>
      </v-btn>
    </template>
    <v-btn
      v-if="$vuetify.display.mdAndDown"
      icon="mdi-dots-vertical"
      @click.stop="$emit('toggleDrawer')"
    />
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { useToast } from "vue-toast-notification";

export default {
  computed: {
    ...mapGetters("user", { userData: "user" }),
  },
  created() {
    this.userDetails();
    this.toast = useToast();
  },
  methods: {
    ...mapActions("user", ["getUser"]),

    async userDetails() {
      try {
        await this.getUser();
      } catch (error) {
        this.toast.error("Kullanıcı bilgileri getirilirken oluştu!", {
          position: "bottom",
          duration: 2000,
        });
      }
    },

    formattedName(name) {
      if (!name) return "";
      return name.charAt(0).toUpperCase() + name.slice(1);
    },

    exitToast() {
      this.toast.success("Başarıyla çıkış yaptınız.", {
        position: "bottom",
        duration: 2000,
      });
    },
  },
};
</script>

<style>
#title:hover {
  background-color: #208ec6;
}
</style>