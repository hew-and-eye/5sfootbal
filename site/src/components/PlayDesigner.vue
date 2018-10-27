<template>
  <div class="match-viewer">
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
        v-for="(playerData) in (play || {}).playerData"
        v-if="playerData.team === 'Offense'"
        :key="playerData.player._id"
      >
        <p
          @mousedown="startDrag(playerData.player)"
          v-if="play"
          class="player offense"
          :style="playerStyle(playerData)"
        >
          <span> {{playerData.player.jerseyNumber}} </span>
        </p>
      </div>
      <div
        v-for="(playerData) in (play || {}).playerData"
        v-if="playerData.team === 'Defense'"
        :key="playerData.player._id"
      >
        <p
          @mousedown="startDrag(playerData.player)"
          v-if="play"
          class="player defense"
          :style="playerStyle(playerData)"
        >
          <span> {{playerData.player.jerseyNumber}} </span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    app: { type: Object, required: true }
  },
  data () {
    return {
      play: null,
      game: {},
      timeStep: 0,
      fieldDims: null,
      scaleFactor: null,
      playerPhysicsOffense: [],
      playerPhysicsDefense: [],
      playerWithBall: 0
    }
  },
  mounted () {
    const { width, height } = document.body.getBoundingClientRect()
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
        if (!playerData || !playerData.coordinates) return
        const { x, y } = playerData.coordinates
        console.log(playerData.player)
        if (playerData.player.isBeingDragged) {
          console.log('oh boy')
        }
        return {
          left: x * scaleFactor + 'px',
          top: y * scaleFactor + 'px',
          width: 4 * scaleFactor + 'px',
          height: 4 * scaleFactor + 'px',
          'margin-left': -2 * scaleFactor + 'px',
          'margin-right': -2 * scaleFactor + 'px',
          background: playerData.player.isBeingDragged ? 'green' : null
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
        left: -marginTop - 50 + 'px'
      }
    }
  },
  methods: {
    startDrag (player) {
      console.log('doing it')
      player.isBeingDragged = true
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
    height: 1em
    width: 1em
    margin-left: -0.5em
    margin-top: -0.5em
    border-radius: 100%
    border: 2px solid white
    color: white
    transition: top 0.25s, left 0.25s
    cursor: pointer
    user-select: none
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
