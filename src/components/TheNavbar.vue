<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-sheet>
        <v-toolbar style="color: white; background-color: #2d98c9">
          <v-toolbar-title class="text-h4"> Stok Takip </v-toolbar-title>
        </v-toolbar>
      </v-sheet>
    </v-col>
    <v-col cols="4">
      <v-card style="border-radius: unset">
        <v-layout>
          <v-navigation-drawer
            floating
            permanent
            style="position: absolute; width: 100%; background-color: #ededed"
          >
            <v-list density="compact" nav>
              <v-list-item
                prepend-icon="mdi-view-dashboard"
                title="Home"
                value="home"
              />
              <v-list-item
                prepend-icon="mdi-forum"
                title="About"
                value="about"
              />
            </v-list>
          </v-navigation-drawer>
          <v-main style="height: 250px" />
        </v-layout>
      </v-card>
    </v-col>
    <v-col cols="8">
      <v-sheet>
        <v-toolbar style="color: white; background-color: #2d98c9">
          <v-toolbar-title class="text-h4"> Stok Takip </v-toolbar-title>
        </v-toolbar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>