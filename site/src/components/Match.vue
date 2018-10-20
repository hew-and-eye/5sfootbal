<template>
  <div class="match-viewer">
    <p>
      Here is the match viewer. Lucky you.
    </p>
    <p v-if="!app"> No feathers connection </p>
    <div class="field">
      field should be here
      <p class="player" v-for="(p, index) in players" :key="index" :style="playerStyle(index)"></p>
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
    background: green
</style>
