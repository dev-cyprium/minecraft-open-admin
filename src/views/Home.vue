<template>
  <MainPanel>
    <v-container class="fill-height" fluid>
      <v-row>
        <v-col>
          <h1 class="text-center">Welcome to Server Manage Panel</h1>
          <p class="text-center text-muted">
            Please use the navigation on the left to manage aspects of your
            server
          </p>
          <v-btn class="d-block centered">Customize Front Page</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </MainPanel>
</template>

<style lang="scss" scoped>
.centered {
  margin: 0 auto;
}
</style>

<script>
// @ is an alias to /src
import MainPanel from "@/layouts/MainPanel";

export default {
  name: "Home",
  components: {
    MainPanel
  }
};
</script>
