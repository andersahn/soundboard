<template>
  <div :class="{ 'sound': true, 'sound--playing': isPlaying }" v-on:click="play" >
    <audio :src="soundUrl" ref="audio" v-on:play="setPlaying" v-on:pause="setPaused" />
    {{sound.name}}
    <div v-if="isPlaying" class="sound__icon sound__icon--left">🎶</div>
    <div v-if="isPlaying" class="sound__icon sound__icon--right">🎶</div>
  </div>
</template>

<script>
export default {
  props: {
    sound: Object,
  },
  data: function() {
    return {
      isPlaying: false,
    };
  },
  computed: {
    soundUrl() {
      return `${process.env.baseUrl}sounds/${this.sound.filename}`;
    },
  },
  methods: {
    play() {
      const isPaused = this.$refs.audio.paused;
      if (isPaused) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
        this.$refs.audio.currentTime = 0;
      }
    },
    setPlaying() {
      this.isPlaying = true;
    },
    setPaused() {
      this.isPlaying = false;
    },
  },
}
</script>


<style lang="scss">
.sound {
  position: relative;
  display: block;
  padding: 5px 10px;
  margin: 0 5px 5px;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-color: #dcdfe6;
  color: #606266;
  border-radius: 3px;

  transition-property: color, border-color, background-color;
  transition-duration: 120ms;
  transition-timing-function: ease-in;

  cursor: pointer;

  &:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }

  &--playing {
    color: rgb(230, 94, 70) !important;
    border-color: #ffcdc6 !important;
    background-color: #ffedec !important;
  }

  &__icon {
    position: absolute;
    top: 0;

    &--left {
      left: 0;
      transform: translate3d(-30%, -30%, 0);
    }
    &--right {
      right: 0;
      transform: translate3d(50%, -30%, 0);
    }
  }
}
</style>