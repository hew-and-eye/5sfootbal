<template>
  <div class="match-viewer">
    <button @click="populatePlayerPhysics" style="position:fixed; top:20px; left:20px; z-index:2000;"> populatePlayerPhysics</button>
    <button @click="updatePlayerPositionsOffense" style="position:fixed; top:500px; left:20px; z-index:2000;"> updatePlayerPositionsOffense</button>
    <p v-if="!app"> No feathers connection </p>
    <div class="field" :style="fieldStyle">
      <!-- <img src="../assets/field.svg" :style="fieldBgStyle" /> -->
      <div
        class=end
        :style="{height: 30 * scaleFactor - 10 + 'px', width: 160 * scaleFactor + 'px'}">
      </div>
      <div
        class=yard
        v-for="(yard, index) in [0, 10, 20, 30, 40, 50, 40, 30, 20, 10]"
        :key="index"
        :style="{'height': 30 * scaleFactor - 10 + 'px', 'width': 160 * scaleFactor + 'px'}">
        {{yard}}
      </div>
      <div
        class=end
        :style="{height: 30 * scaleFactor - 10 + 'px', width: 160 * scaleFactor + 'px'}">
      </div>
      <div
        v-for="(playerData) in (play || {}).playerData"
        v-if="playerData.team === 'Offense'"
        :key="playerData.player._id">
        <div
          v-if="play"
          class="player offense"
          :style="playerStyle(playerData)">
          <span> {{playerData.player.jerseyNumber}} </span>
          <div
            class="player-hover-data"
            v-if="playerData.hoverData">
            {{ playerData.hoverData }}
          </div>
        </div>
      </div>
      <div
        v-for="(playerData) in (play || {}).playerData"
        v-if="playerData.team === 'Defense'"
        :key="playerData.player._id">
        <div
          v-if="play"
          class="player defense"
          :style="playerStyle(playerData)">
          <span> {{playerData.player.jerseyNumber}} </span>
          <div
            class="player-hover-data"
            v-if="playerData.hoverData">
            {{ playerData.hoverData }}
          </div>
        </div>
      </div>
    </div>
    <button style="position: fixed; bottom: 100px; left: 100px;" @click="startFrameInterval">
      <img style="height: 75px" src="../assets/my-face.png"/>
    </button>
  </div>
</template>
<script>
/* eslint-disable */
import ObjectId from "bson-objectid";

export default {
  props: {
    app: { type: Object }
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
      playerWithBall: 0,
      frameInterval: null
    }
  },
  mounted () {
    const { width, height } = document.body.getBoundingClientRect();
    this.fieldDims = { width, height };
    this.scaleFactor = (width - 100) / 160;
  },
  watch: {
    app: {
      async handler(after, before) {
        if (!!after && !before) {
          const result = await this.app.service("plays").find({});
          this.play = result.data[0];
        }
      }
    }
  },
  computed: {
    playerStyle() {
      const scaleFactor = this.scaleFactor;
      return playerData => {
        if (!playerData || !playerData.coordinates) return;
        const { x, y } = playerData.coordinates;
        return {
          left: x * scaleFactor + "px",
          top: y * scaleFactor + "px",
          width: 4 * scaleFactor + 'px',
          height: 4 * scaleFactor + 'px',
          'margin-left': -2 * scaleFactor + 'px',
          'margin-right': -2 * scaleFactor + 'px'
        };
      };
    },
    fieldStyle() {
      return {
        width: 160 * this.scaleFactor + "px",
        height: 360 * this.scaleFactor + "px"
      };
    },
    fieldBgStyle() {
      const garbage = { w: 1.067, h: 1.05 };
      const width = 360 * this.scaleFactor * garbage.w;
      const height = 160 * this.scaleFactor * garbage.h;
      const marginTop = (width - height) / 2;
      return {
        position: "absolute",
        height: height + "px",
        width: width + "px",
        top: marginTop + "px",
        left: -marginTop - 50 + "px"
      };
    }
  },
  methods: {
    startFrameInterval () {
      const context = this
      this.populatePlayerPhysics()
      if (!this.frameInterval)
        this.frameInterval = setInterval(function () {
          context.updatePlayerPositionsOffense()
        }, 25)
      else {
        clearInterval(this.frameInterval)
        this.frameInterval = null
      }
    },
    populatePlayerPhysics() {
      for (let item of this.play.playerData) {
        item.physics = {
          d: item.coordinates,
          v: {
            x: 0,
            y: 0
          },
          a: {
            x: 0,
            y: 0
          },
          m: 0.7 * item.player.stats.size + 0.3 * item.player.stats.strength,
          vMax: item.player.stats.speed * 3.3
        };
      }
      this.game.ballCoordinates = this.play.playerData[0].d;
    },
    addHoverData (el) {
      if (!el.hoverData)
          el.hoverData = {}
      el.hoverData.x = el.coordinates.x
      el.hoverData.y = el.coordinates.y
    },
    updatePlayerPositionsOffense() {
      this.play.playerData.forEach(el => {
        let currentAction = el.actions[0];
        if (
          currentAction.actionType === "handOff" &&
          this.playerWithBall == this.play.playerData.indexOf(el)
        ) {
          let target = currentAction.params.playerTo;
          this.playerWithBall = target;
          this.game.ballCoordinates = el.physics.d;
        } else if (currentAction.actionType === "runBlock") {
          this.calculateGoalAcceleration(el, currentAction);
        }
        // else if (currentAction.actionType === "run") {
        //   console.log("a");
        // }
        el.actions[0].duration -= 0.25;
        if (el.actions[0].duration <= 0) el.actions.shift();
        el.coordinates = el.physics.d;
        this.addHoverData(el)
      });
      // this.resolveCollisions(this.play.playerData);
      this.updateVelocities(this.play.playerData);
      this.updatePositions(this.play.playerData);
    },
    calculateGoalAcceleration(el, currentAction) {
      let vGoal = this.differenceVector(
        this.play.playerData[currentAction.params.opposingPlayer].physics.d,
        el.physics.d
      );
      vGoal = this.normalizeVector(vGoal);

      el.physics.a = this.normalizeVector(
        this.differenceVector(
          vGoal,
          this.scaleVector(el.physics.v, 1 / el.physics.vMax)
        )
      );
    },
    updateVelocities(playerData) {
      this.play.playerData.forEach(el => {
        el.physics.v = this.addVector(
          el.physics.v,
          this.scaleVector(el.physics.a, 0.6 * el.physics.vMax)
        );
      });
    },
    updatePositions(playerData) {
      this.play.playerData.forEach(el => {
        el.physics.d = this.addVector(
          el.physics.d,
          this.scaleVector(el.physics.v, 0.25)
        );
      });
    },
    resolveCollisions(playerData) {
      this.play.playerData.forEach(el => {});
    },

    distance(p1, p2) {
      return Math.sqrt(Math.abs(((p2.x - p1.x) ^ 2) + ((p2.y - p1.y) ^ 2)));
    },
    differenceVector(p1, p2) {
      let p = {};
      p.x = p1.x - p2.x;
      p.y = p1.y - p2.y;
      return p;
    },
    addVector(p1, p2) {
      let p = {};
      p.x = p2.x + p1.x;
      p.y = p2.y + p1.y;
      return p;
    },
    scaleVector(p1, a) {
      return { x: p1.x * a, y: p1.y * a };
    },
    normalizeVector(p1) {
      let r = Math.sqrt(p1.x * p1.x + p1.y * p1.y);
      if (r === 0) return p1;
      return { x: p1.x / r, y: p1.y / r };
    }
  }
};
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
    // transition: top 0.1s, left 0.1s
    &.offense
      background: blue
    &.defense
      background: red
    &:hover
      .player-hover-data
        display: block
    .player-hover-data
      display: none
      position: absolute
      background: #3d3d3d
      box-shadow: 0 2px 4px 6px #333
      top: 80px
      width: 100px
      z-index: 100
  .arrow
    position: absolute
    font-size: 24px
    font-weight: bold
    color: red
    width: 100px
    height: 100px
    margin: -50px

</style>
