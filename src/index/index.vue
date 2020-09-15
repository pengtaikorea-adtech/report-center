<template>
  <v-app id="index">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="6" md="8" sm="12">
            <v-card>
              <v-card-title>Welcome, Report Center</v-card-title>
              <v-card-text>
                <v-btn text ripple outlined>
                  <v-icon>mdi-google</v-icon>
                  Sign in with Google
                </v-btn>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn text ripple color="grey" outlined @click.stop="moveover('dashboard')">Dashboard</v-btn>
                <v-btn text ripple color="grey" outlined @click.stop="moveover('agency')">Agency</v-btn>
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
      window.location = `/${path}.html`;
    }
  },
  data() {
    return {};
  }
}
</script>