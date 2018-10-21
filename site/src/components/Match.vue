<template>
  <div class="match-viewer">
    <!-- <button @click="createDummyPlay"> create SHIT play</button> -->
    <p v-if="!app"> No feathers connection </p>
    <div class="field" :style="fieldStyle">
      <!-- <img src="../assets/field.svg" :style="fieldBgStyle" /> -->
      <div
        class=end
        :style="{height: 30 * scaleFactor - 10 + 'px', width: 160 * scaleFactor + 'px'}"
      >
      </div>
      <div
        class=yard
        v-for="(yard, index) in [0, 10, 20, 30, 40, 50, 40, 30, 20, 10]"
        :key="index"
        :style="{'height': 30 * scaleFactor - 10 + 'px', 'width': 160 * scaleFactor + 'px'}"
      >
        {{yard}}
      </div>
      <div
        class=end
        :style="{height: 30 * scaleFactor - 10 + 'px', width: 160 * scaleFactor + 'px'}"
      >
      </div>
      <div
        v-for="(playerData) in (play || {}).offensivePlay"
        :key="playerData.player._id"
      >
        <p
          v-if="play"
          class="player offense"
          :style="playerStyle(playerData)"
        >
          <span> {{playerData.player.jerseyNumber}} </span>
        </p>
        <p class="arrow" :style="arrowStyle(playerData)">---></p>
      </div>
      <div
        v-for="(playerData) in (play || {}).defensivePlay"
        :key="playerData.player._id"
      >
        <p
          v-if="play"
          class="player defense"
          :style="playerStyle(playerData)"
        >
          <span> {{playerData.player.jerseyNumber}} </span>
        </p>
      </div>
    </div>
    <button style="position: fixed; bottom: 100px; left: 100px;" @click="timeStep += 1">STEP FORWARD</button>
    <button style="position: fixed; bottom: 100px; left: 260px;" @click="generateDummyCoordinates">Generate dumb play</button>
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
    arrowStyle () {
      const scaleFactor = this.scaleFactor
      return playerData => {
        if(!playerData || !playerData.coordinates)
          return
        if (!Array.isArray(playerData.coordinates))
          return { display: 'none' }
        const {x, y} = playerData.coordinates[this.timeStep]
        let prev
        let angle = 0
        if (this.timeStep) {
          prev = playerData.coordinates[this.timeStep - 1]
          const vector = { dx: x - prev.x, dy: y - prev.y }
          angle = 180 * Math.atan(vector.dy / vector.dx) / Math.PI
        }
        console.log(angle)
        return {
          left: x * scaleFactor + 'px',
          top: y * scaleFactor + 'px',
          transform: `rotate(${angle}deg)`
        }
      }
    },
    playerStyle () {
      const scaleFactor = this.scaleFactor
      return playerData => {
        if(!playerData || !playerData.coordinates)
          return
        const {x, y} = Array.isArray(playerData.coordinates) ? playerData.coordinates[this.timeStep] : playerData.coordinates
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
  }, 
  methods: {
    generateDummyCoordinates () {
      const { offensivePlay, defensivePlay } = this.play
      const fakePath = [
        {x: 0, y: 0},
        {x: 3, y: 3},
        {x: 3, y: 3},
        {x: 3, y: 6},
        {x: 6, y: 6},
        {x: 6, y: 9},
        {x: 6, y: 12},
        {x: 9, y: 15},
        {x: 9, y: 18},
        {x: 12, y: 21},
        {x: 15, y: 21},
        {x: 18, y: 21},
      ]
      offensivePlay[0].coordinates = fakePath
    },
    async createDummyPlay () {
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
  width: 100%
  text-align: center
  .field
    width: 160px
    height: 360px
    background: blue
    .end
      background: #449944
      border: 5px solid white
    .yard
      background: green
      border: 5px solid white
    img
      opacity: 0.4
      background: red
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
  .arrow
    position: absolute
    font-size: 24px
    font-weight: bold
    color: red
    width: 100px
    height: 100px
    margin: -50px

</style>
