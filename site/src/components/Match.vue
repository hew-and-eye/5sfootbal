<template>
  <div class="match-viewer">
    <button @click="populatePlayerPhysics" style="position:fixed; top:20px; left:20px; z-index:2000;"> populatePlayerPhysics</button>
    <button @click="updatePlayerPositionsOffense" style="position:fixed; top:500px; left:20px; z-index:2000;"> updatePlayerPositionsOffense</button>
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
  </div>
</template>
<script>
/* eslint-disable */
import ObjectId from "bson-objectid";

export default {
  props: {
    app: { type: Object }
  },
  data() {
    return {
      play: null,
      game: {},
      timeStep: 0,
      fieldDims: null,
      scaleFactor: null,
      playerPhysicsOffense: [],
      playerPhysicsDefense: [],
      playerWithBall: 0
    };
  },
  mounted() {
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
          top: y * scaleFactor + "px"
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
    populatePlayerPhysics() {
      for (let item of this.play.offensivePlay) {
        this.playerPhysicsOffense.push({
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
        });
      }
      for (let item of this.play.defensivePlay) {
        this.playerPhysicsDefense.push({
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
        });
      }
      this.game.ballCoordinates = this.playerPhysicsOffense[0].d;
      // this.playerPhysicsOffense.forEach(element => {
      //   console.log(element);
      // });
    },
    updatePlayerPositionsOffense() {
      for (let i = 0; i < this.play.offensivePlay.length; i++) {
        let currentAction = this.play.offensivePlay[i].actions[0];
        if (
          currentAction.actionType === "handOff" &&
          this.playerWithBall == i
        ) {
          let target = currentAction.params.playerTo;
          this.playerWithBall = target;
          this.game.ballCoordinates = this.playerPhysicsOffense[target].d;
        } else if (currentAction.actionType === "runBlock") {
          let vGoal = {
            x: 0,
            y: 0
          };
          vGoal = this.differenceVector(
            this.playerPhysicsDefense[currentAction.params.opposingPlayer].d,
            this.playerPhysicsOffense[i].d
          );
          vGoal = this.normalizeVector(vGoal);
          let a = this.normalizeVector(
            this.differenceVector(
              vGoal,
              this.scaleVector(
                this.playerPhysicsOffense[i].v,
                1 / this.playerPhysicsOffense[i].vMax
              )
            )
          );
          this.playerPhysicsOffense[i].v = this.addVector(
            this.playerPhysicsOffense[i].v,
            this.scaleVector(a, 0.6 * 0.25)
          );
          this.playerPhysicsOffense[i].d = this.addVector(
            this.playerPhysicsOffense[i].d,
            this.scaleVector(this.playerPhysicsOffense[i].v, 0.25)
          );
        } else if (currentAction.actionType === "run") {
          console.log("a");
        }
        this.play.offensivePlay[i].actions[0].duration -= 0.25;
        if (this.play.offensivePlay[i].actions[0].duration <= 0)
          this.play.offensivePlay[i].actions.shift();
        this.play.offensivePlay[i].coordinates = this.playerPhysicsOffense[i].d;
      }
    },
    distance(p1, p2) {
      return Math.sqrt((p1.x - p2.x) ^ (2 + (p1.y - p2.y)) ^ 2);
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
      let r = this.distance({ x: 0, y: 0 }, p1);
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
