<template>
  <div ref="container" class="scrolling">
    <ul>
      <li :key="idx" v-for="(logItem, idx) in logs">{{ logItem }}</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.scrolling {
  height: 28rem;
  overflow-y: scroll;
}
</style>

<script>
import { mapState } from "vuex";
import client from "socket.io-client";

export default {
  created() {
    this.$store.dispatch("readLatestLog");
    const mc = client.connect(process.env.VUE_APP_API_SERVER);
    mc.on("connect", () => {
      this.$store.commit("log", "Admin front-end connected with the server!");
      this.handleScroll();
    });

    mc.on("server-output-stdout", ({ message }) => {
      this.$store.commit("setRunning", true);
      this.$store.commit("log", message);
      this.handleScroll();
    });

    mc.on("server-output-exit", ({ message }) => {
      this.$store.commit("setRunning", false);
      this.$store.commit("log", message);
      this.handleScroll();
    });

    mc.on("server-output-stderr", ({ message }) => {
      this.$store.commit("log", message);
      this.handleScroll();
    });

    mc.on("server-output-stdout-sd", ({ message }) => {
      this.$store.commit("log", message);
      this.handleScroll();
    });

    mc.on("server-output-stderr-sd", ({ message }) => {
      this.$store.commit("log", message);
      this.handleScroll();
    });
  },
  methods: {
    handleScroll() {
      this.$refs.container.scrollTop = this.$refs.container.scrollHeight + 200;
    }
  },
  computed: mapState({
    logs: state => state.serverLog,
    running: state => state.serverRunning
  })
};
</script>
