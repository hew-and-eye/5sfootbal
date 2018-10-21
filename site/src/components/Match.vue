<template>
  <div class="match-viewer">
    <!-- <button @click="createDummyPlay"> create SHIT play</button> -->
    <p>
      Here is the match viewer. Lucky you.
    </p>
    <p v-if="!app"> No feathers connection </p>
    <div class="field">
      field should be here
      <p
        v-if="play"
        class="player offense"
        v-for="(playerData) in play.offensivePlay"
        :key="playerData.player._id"
        :style="playerStyle(playerData)"
      >
        <span> {{playerData.player.jerseyNumber}} </span>
      </p>
      <p
        v-if="play"
        class="player defense"
        v-for="(playerData) in play.defensivePlay"
        :key="playerData.player._id"
        :style="playerStyle(playerData)"
      >
        <span> {{playerData.player.jerseyNumber}} </span>
      </p>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import ObjectId from 'bson-objectid'

export default {
  props: {
    app: { type: Object }
  },
  data () {
    return {
      play: null,
      timeStep: 0
    }
  },
  watch: {
    app: {
      async handler (after, before) {
        if (!!after && !before) {
          console.log('ello')
          const result = await this.app.service('plays').find({})
          console.log(result)
          this.play = result.data[0]
          console.log(this.play)
        }
      }
    }
  },
  computed: {
    playerStyle () {
      return playerData => {
        if(!playerData || !playerData.coordinates)
          return
        const {x, y} = playerData.coordinates
        return {
          top: y * 3 + 'px',
          left: x * 3 + 'px'
        }
      }
    }
  }, 
  methods: {
    async createDummyPlay() {
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
    let defenseId = new ObjectId()
    let defensivePlay = []
    let offensivePlay = []

    for (let player of players) {
      let playerOffense = {}
      playerOffense.player = player
      playerOffense.coordinates = {}
      playerOffense.coordinates.x = Math.floor(Math.random() * 160)
      playerOffense.coordinates.y = Math.floor(Math.random() * 360)
      offensivePlay.push(playerOffense)
      player.teamId = defenseId
      let playerDefense = {}
      playerDefense.player = player
      playerDefense.coordinates = {}
      playerDefense.coordinates.x = Math.floor(Math.random() * 160)
      playerDefense.coordinates.y = Math.floor(Math.random() * 360)
      defensivePlay.push(playerDefense)
    }
    await this.app.service('plays').create({
      defensivePlay,offensivePlay
    })
    }
  }
}
</script>
<style lang="sass" scoped>
.match-viewer
  display: flex
  flex-direction: column
  height: 100%
  .field
    width: 100%
    height: 100%
    background: green
  .player
    display: flex
    justify-content: center
    align-items: center
    position: fixed
    height: 3em
    width: 3em
    border-radius: 100%
    border: 2px solid white
    color: white
    &.offense
      background: blue
    &.defense
      background: red
</style>
