<template>
  <div class="match-viewer">
    <!-- <button @click="createDummyPlay"> create SHIT play</button> -->
    <p v-if="!app"> No feathers connection </p>
    <div class="field" :style="fieldStyle">
      <img src="../assets/field.svg" :style="fieldBgStyle" />
      <p
        v-if="play"
        class="player offense"
        v-for="(playerData) in (play || {}).offensivePlay"
        :key="playerData.player._id"
        :style="playerStyle(playerData)"
      >
        <span> {{playerData.player.jerseyNumber}} </span>
      </p>
      <p
        v-if="play"
        class="player defense"
        v-for="(playerData) in (play || {}).defensivePlay"
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
      timeStep: 0,
      fieldDims: null,
      scaleFactor: null
    }
  },
  mounted () {
    const { width, height } =document.body.getBoundingClientRect()
    this.fieldDims = { width, height }
    this.scaleFactor = (width - 100) / 160
  },
  watch: {
    app: {
      async handler (after, before) {
        if (!!after && !before) {
          const result = await this.app.service('plays').find({})
          this.play = result.data[0]
        }
      }
    }
  },
  computed: {
    playerStyle () {
      const scaleFactor = this.scaleFactor
      return playerData => {
        if(!playerData || !playerData.coordinates)
          return
        const {x, y} = playerData.coordinates
        return {
          left: x * scaleFactor + 'px',
          top: y * scaleFactor + 'px'
        }
      }
    },
    fieldStyle () {
      return {
        width: 160 * this.scaleFactor + 'px',
        height: 360 * this.scaleFactor + 'px'
      }
    },
    fieldBgStyle () {
      const garbage = { w: 1.067, h: 1.05 }
      const width = 360 * this.scaleFactor * garbage.w
      const height = 160 * this.scaleFactor * garbage.h
      const marginTop = (width - height) / 2
      return {
        position: 'absolute',
        height: height + 'px',
        width: width + 'px',
        top: marginTop + 'px',
        left: -marginTop - 50 + 'px',
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
  height: 100%
  .field
    width: 160px
    height: 360px
    margin-left: 50px
    background: blue
    img
      transform: rotate(90deg)
  .player
    display: flex
    justify-content: center
    align-items: center
    position: absolute
    height: 3em
    width: 3em
    margin-left: -1.5em
    margin-top: -1.5em
    border-radius: 100%
    border: 2px solid white
    color: white
    &.offense
      background: blue
    &.defense
      background: red
</style>
