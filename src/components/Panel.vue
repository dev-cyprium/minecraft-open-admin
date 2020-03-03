<template>
  <v-card>
    <v-toolbar dark flat color="indigo">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-toolbar>
    <v-card-text class="fill-card">
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
.fill-card {
  height: calc(100% - 64px);
}
</style>

<script>
export default {
  props: ["title"]
};
</script>
