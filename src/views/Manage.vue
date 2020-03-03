<template>
  <MainPanel>
    <v-container class="full-screen" fluid>
      <v-row class="f-0">
        <v-col>
          <Panel class="fill" title="Commands">
            <v-text-field
              class="command-input"
              label="Execute command"
              outlined
              disabled
            />
            <p>*This feature is comming soon!</p>
          </Panel>
        </v-col>
        <v-col>
          <Panel class="fill" title="Server Manager">
            <div class="d-flex justify-space-around align-center fill">
              <v-btn
                @click="toggleServer()"
                class="white--text"
                x-large
                :color="serverRunning ? 'error' : 'indigo'"
              >
                <span v-if="serverRunning === null">
                  <v-progress-circular indeterminate color="white" />
                </span>
                <span v-else>
                  {{ serverRunning ? "Stop" : "Start" }} Server
                </span>
              </v-btn>
              <v-btn disabled x-large color="error">Kill Minecraft</v-btn>
            </div>
          </Panel>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <Panel scrollable="true" class="server-log fill" title="Server Log">
            <Console />
          </Panel>
        </v-col>
      </v-row>
    </v-container>
  </MainPanel>
</template>

<style lang="scss" scoped>
.f-0 {
  flex: 0;
}

.command-input {
  margin-top: 1.1rem;
}

.fill {
  height: 100%;
}

.full-screen {
  display: flex;
  height: 100%;
  flex-direction: column;
}

.server-log {
  flex: 1;
}
</style>

<script>
// @ is an alias to /src
import MainPanel from "@/layouts/MainPanel";
import Panel from "@/components/Panel";
import Console from "@/components/Console";

import { mapState } from "vuex";

export default {
  name: "Manage",
  components: {
    MainPanel,
    Panel,
    Console
  },
  methods: {
    toggleServer() {
      const word = this.serverRunning ? "stop" : "start";
      this.$store.commit("log", `Atempting to ${word} the server...`);

      if (!this.serverRunning) {
        this.$store.dispatch("startServer");
      } else {
        this.$store.dispatch("stopServer");
      }
    }
  },
  computed: mapState({ serverRunning: state => state.serverRunning })
};
</script>
