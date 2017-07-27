<template>
  <v-container fluid>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm6>
        <v-card>
          <v-toolbar class="indigo">
            <v-btn icon>
              <v-icon class="white--text">people</v-icon>
            </v-btn>
            <v-toolbar-title class="white--text">Cashier</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    label="Username"
                    v-model="username"
                    counter
                    max="35"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Password"
                    v-model="password"
                    max="35"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-flex xs12>
                <v-btn class="indigo" dark right @click.native.prevent="login()">Login</v-btn>
              </v-flex xs12>
              
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login () {
        let data = {
          username: this.username,
          password: this.password
        }
        this.$socket.emit('loginCashier', data)
      }
    }
  }
</script>

