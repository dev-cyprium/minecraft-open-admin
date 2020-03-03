<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("fetchServerData");
  }
};
</script>
