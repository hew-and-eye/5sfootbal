
<template>
  <div>
    <div> Here are the number of things in the appasdfasdf: <br/> {{Object.keys(app || {}).length}} </div>
    <button @click="fetchPlayers"> Fetch some players </button>
    <!-- <button @click="createPlayers"> create some players </button> -->
    <div class="player-cards">
      <div v-for="p in players" :key="p._id">
        <player-card :player="p" />
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import ObjectId from 'bson-objectid'
import PlayerCard from '@/components/PlayerCard'
export default {
  components: { PlayerCard },
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
      
      this.players = (await this.app.service('players').find({$limit: 100})).data
      console.log('Here are the players:', this.players)
    },
    async createPlayers () {
      const teamOffense = new ObjectId()
      const players = [
      {
        name: 'JASON KELCE',
        stats: {
          size: 8,
          strength: 8,
          speed: 3,
          skill: 3,
          smart: 4
        },
        jerseyNumber: 62,
        teamId: teamOffense
      },
      {
        name: 'DAVID DECASTRO',
        stats: {
          size: 7,
          strength: 9,
          speed: 2,
          skill: 3,
          smart: 3
        },
        jerseyNumber: 66,
        teamId: teamOffense
      },{
        name: 'ZACK MARTIN',
        stats: {
          size: 9,
          strength:8,
          speed: 3,
          skill: 5,
          smart: 2
        },
        jerseyNumber: 70,
        teamId: teamOffense
      },{
        name: 'DAVID BAKHTIARI',
        stats: {
          size: 7,
          strength:7,
          speed: 5,
          skill: 5,
          smart: 2
        },
        jerseyNumber: 69,
        teamId: teamOffense
      },{
        name: 'DARYL WILLIAMS',
        stats: {
          size: 9,
          strength:8,
          speed: 3,
          skill: 5,
          smart: 2
        },
        jerseyNumber: 60,
        teamId: teamOffense
      },{
        name: 'ROB GRONKOWSKI',
        stats: {
          size: 8,
          strength:8,
          speed: 6,
          skill: 7,
          smart: 3
        },
        jerseyNumber: 87,
        teamId: teamOffense
      },{
        name: 'JIMMY GRAHAM',
        stats: {
          size: 8,
          strength:6,
          speed: 7,
          skill: 6,
          smart: 4
        },
        jerseyNumber: 80,
        teamId: teamOffense
      },{
        name: 'ANTONIO BROWN',
        stats: {
          size: 3,
          strength:5,
          speed: 9,
          skill: 8,
          smart: 6
        },
        jerseyNumber: 84,
        teamId: teamOffense
      },{
        name: 'JULIO JONES',
        stats: {
          size: 7,
          strength:6,
          speed: 9,
          skill: 7,
          smart: 5
        },
        jerseyNumber: 70,
        teamId: teamOffense
      },{
        name: 'SAQUON BARKLEY',
        stats: {
          size: 6,
          strength:9,
          speed: 8,
          skill: 7,
          smart: 4
        },
        jerseyNumber: 26,
        teamId: teamOffense
      },{
        name: 'DREW BREES',
        stats: {
          size: 4,
          strength:5,
          speed: 6,
          skill: 9,
          smart: 9
        },
        jerseyNumber: 9,
        teamId: teamOffense
      }
    ]

    for (let player of players) {
      await this.app.service('players').create(player)
    }
      
    }
  }
}
</script>
<style lang="sass" scoped>
.player-cards
  justify-content: center
  display: flex
  overflow: auto
  flex-wrap: wrap
  background: #fafafa
</style>

