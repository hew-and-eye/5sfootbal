<template>
  <div id="app">
    <router-view :app="app"/>
  </div>
</template>

<script>
import feathers from '@feathersjs/feathers'
import io from 'socket.io-client'
import socketio from '@feathersjs/socketio-client'
const SOCKET_URL = 'http://localhost:3030'
export default {
  name: 'App',
  async mounted () {
    await this.makeSocketConnection()
  },
  data () {
    return {
      app: null,
      socket: null
    }
  },
  methods: {
    async makeSocketConnection () {
      if (!this.socket) {
        this.socket = io(SOCKET_URL)
      }
      this.app = await feathers()
        .configure(socketio(this.socket))
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
