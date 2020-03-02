<template>
  <MainPanel>
    <v-container class="fill-height" fluid>
      <v-row>
        <v-col>
          <h1 class="w-100 text-center">Welcome to Server Manage Panel</h1>
        </v-col>
      </v-row>
    </v-container>
  </MainPanel>
</template>

<script>
// @ is an alias to /src
import MainPanel from "@/layouts/MainPanel";

export default {
  name: "About",
  components: {
    MainPanel
  }
};
</script>
