<template>
  <v-sheet>
    <v-toolbar style="color: white; background-color: #208ec6">
      <img
        width="50"
        height="50"
        aspect-ratio="16/9"
        cover
        src="@/assets/logo.png"
        alt="logo"
        class="ml-4"
      />
      <v-toolbar-title class="text-h4">
        <router-link to="/stock" style="text-decoration: none; color: white">
          Depom
        </router-link>
      </v-toolbar-title>
      <v-toolbar-items style="align-items: center">
        {{ user.firstname }} {{ user.lastname }}
      </v-toolbar-items>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
        <v-menu activator="parent">
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <router-link
                  style="
                    text-decoration: none;
                    color: #208ec6;
                    font-family: 'Material Design Icons';
                  "
                  to="/update-account"
                >
                  Hesabımı Düzenle
                </router-link>
              </v-list-item-title>
              <v-list-item-title>
                <router-link
                  style="
                    text-decoration: none;
                    color: #208ec6;
                    font-family: 'Material Design Icons';
                  "
                  to="/"
                >
                  Çıkış
                </router-link>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>

      <v-btn icon="mdi-dots-vertical" />
    </v-toolbar>
  </v-sheet>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions(["getUser"]),
  },
  created() {
    this.getUser();
  },
};
</script>

<style>
.v-toolbar-title__placeholder {
  overflow: visible !important;
  font-family: "Material Design Icons" !important;
}
</style>