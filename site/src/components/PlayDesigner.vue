<template>
  <div>
    <div> Here are the number of things in the app: <br/> {{Object.keys(app).length}} </div>
  </div>
</template>
<script>
export default {
  props: {
    app: { type: Object, required: true }
  }
}
</script>
