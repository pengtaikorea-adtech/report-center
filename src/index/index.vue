<template>
  <v-app id="index">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col style="max-width: 480px;">
            <v-card >
              <v-card-title>Welcome, Report Center</v-card-title>
              <v-card-text>
                <v-btn text ripple outlined style="width:100%; padding: 24px;">
                  <v-icon>mdi-google</v-icon>
                  <v-spacer />
                  Sign in with Google
                </v-btn>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <template v-if="mode_debug" class="pa-24">
                  <v-btn text ripple color="grey lighten-4" outlined @click.stop="moveover('dashboard')">Dashboard</v-btn>
                  <v-btn text ripple color="grey lighten-4" outlined @click.stop="moveover('agency')">Agency</v-btn>
                </template>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: 'App',
  methods: {
    moveover(path) {
      window.location = `/${path}${ this.mode_debug ? '.html' : ''}`;
    }
  },
  data() {
    return {
      mode_debug: true,
    };
  }
}
</script>