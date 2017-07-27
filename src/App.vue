<template>
  <v-app id="app" standalone>
    <notifications position='top right'/>

    <!-- drawer left -->
    <v-navigation-drawer
      temporary
      v-model="drawer" 
      :mini-variant.sync="mini" 
      light 
      overflow
      fixed
      v-if="logged === true"
    >
      <v-list class="pa-0">
        <v-list-tile avatar tag="div">
          <v-list-tile-content>
            <v-list-tile-title>Cashier</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>

        <div>
          <v-divider></v-divider>
          <v-list-tile v-for="item in MenuSidebar" :key="item.path"
          @click.native.prevent="$router.push(item.path)">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>
          <v-list-tile @click.native.prevent="logout()">
            <v-list-tile-action>
              <v-icon>subdirectory_arrow_left</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </div>

      </v-list>

    </v-navigation-drawer>
    <!-- end drawer left -->

    <v-toolbar fixed class="indigo" dark>
      <v-toolbar-side-icon v-if="logged === true" @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Resto</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    
    <main id="main">
      <v-container fluid>
        <!--v-router-->
        
        <Auth v-if="logged === false"></Auth>
        <router-view v-else="logged === true"></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex'
  import Auth from '@/components/Auth'
  import MenuSidebar from '@/data/MenuSidebar.js'

  export default {
    components: {
      Auth
    },
    data () {
      return {
        drawer: null,
        mini: false,
        MenuSidebar
      }
    },
    methods: {
      ...mapActions([
        'changeLogged'
      ]),
      logout () {
        this.changeLogged(false)
        let LS = this.$localStorage.set('dataUserLevel')
        LS = {}
        LS.logged = false
      }
    },
    computed: {
      ...mapGetters([
        'logged'
      ])
    },
    mounted () {
      if (this.$localStorage.get('dataUserLevel').logged === true) {
        this.changeLogged(true)
      }
    },
    watch: {
      logged () {
        if (this.logged === 'rejected') {
          this.$notify({
            type: 'error',
            title: 'Pesan',
            text: 'Username dan Password tidak sama.'
          })
          this.changeLogged(false)
        }
        if (this.logged === true) {
          this.$notify({
            title: 'Pesan',
            text: 'Selamat datang.'
          })
        }
      }
    }
  }
</script>

<style>
  #main {
    padding-top:25px;
  }
</style>
