<template>
  <div>
    <div> Here are the number of things in the appasdfasdf: <br/> {{Object.keys(app || {}).length}} </div>
    <button @click="fetchPlayers"> Fetch some players </button>
    <div v-for="p in players" :key="p">
      {{p}}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    app: { type: Object }
  },
  data () {
    return {
      players: []
    }
  },
  methods: {
    async fetchPlayers () {
      console.log('Trying to fetch players. Here is the app: ', this.app)
      this.players = await this.app.services('players').find({})
      console.log('Here are the players:', this.players)
    }
  }
}
</script>
