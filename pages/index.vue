<template>
  <section class="container">
    <Sound v-for="sound in sounds" v-bind:key="sound.name" :sound="sound" />
  </section>
</template>

<script>
import Sound from '../components/Sound';
export default {
  components: {
    Sound,
  },
  head: {
    title: 'Soundboard'
  },
  computed: {
    sounds() {
      return this.$store.state.sounds
    }
  }
}
</script>

<style lang="scss">
.container {
  font-family: Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;
  line-height: 1.5em;
  font-size: 16px;

  min-height: 100vh;
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  text-align: center;
}
</style>
