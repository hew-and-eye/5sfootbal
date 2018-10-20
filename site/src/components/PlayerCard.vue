<template>
  <div class="player-card">
    <h2> {{player.name}} </h2>
    <h3> {{player.jerseyNumber}} </h3>
    <hr>
    <p>Size: {{player.stats.size}} </p>
    <p>Strength: {{player.stats.strength}} </p>
    <p>Speed: {{player.stats.speed}} </p>
    <p>Skill: {{player.stats.skill}} </p>
    <p>Smart: {{player.stats.smart}} </p>
  </div>
</template>
<script>
export default {
  props: {
    player: { type: Object, required: true }
  }
}
</script>
<style lang="sass" scoped>
.player-card
  width: 24em
  height: 32em
  border-radius: 4px
  padding: 1em
  margin: 1em
  background: white
  box-shadow: 0 2px 10px 4px #dadada

</style>
