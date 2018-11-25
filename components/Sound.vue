<template>
  <div :class="{ 'sound': true, 'sound--playing': isPlaying }" v-on:click="play" v-on:mouseover.once="load">
    <audio
      :src="soundUrl"
      ref="audio"
      v-on:play="setPlaying"
      v-on:pause="setPaused"
      v-on:ended="resetTime"
      v-on:timeupdate="setTime"
      v-on:loadedmetadata="setDuration"
    />
    <div class="sound__name">
      {{name}}
    </div>
    <div v-if="isPlaying" class="sound__icon sound__icon--left">🎶</div>
    <div v-if="isPlaying" class="sound__icon sound__icon--right">🎶</div>
    <div class="sound__progress">
      <div
        class="sound__progress__indicator"
        :style="{
          width: `${percentagePlayed}%`,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sound: Object,
  },
  data() {
    return {
      loadAudio: false,
      isPlaying: false,
      time: 0,
      duration: false,
    };
  },
  computed: {
    soundUrl() {
      if (!this.loadAudio) {
        return false;
      }

      return `${process.env.baseUrl}sounds/${this.sound.filename}`;
    },
    percentagePlayed() {
      if (!this.duration) {
        return;
      }

      return 100 / this.duration * this.time;
    },
    name() {
      return this.sound.meta.name || this.sound.name;
    },
  },
  methods: {
    load() {
      if (!this.loadAudio) {
        // console.log('load', this.sound.filename);
        this.loadAudio = true;
      }
    },
    play() {
      this.load();

      setTimeout(() => {
        const isPaused = this.$refs.audio.paused;
        if (isPaused) {
          this.$refs.audio.play();
        } else {
          this.$refs.audio.pause();
          this.$refs.audio.currentTime = 0;
        }
      }, 0);
    },
    setPlaying() {
      this.isPlaying = true;
    },
    setPaused() {
      this.isPlaying = false;
    },
    setDuration(e) {
      this.duration = e.srcElement.duration;
    },
    setTime(e) {
      this.time = e.srcElement.currentTime;
    },
    resetTime(e) {
      this.time = 0;
    },
  },
}
</script>

<style lang="scss">
.sound {
  position: relative;
  display: block;
  padding: 8px 12px;
  margin: 0 4px 8px;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-color: #dcdfe6;
  border-radius: 3px;
  color: #606266;
  font-weight: 500;

  transition-property: color, border-color, background-color;
  transition-duration: 120ms;
  transition-timing-function: ease-in;

  cursor: pointer;

  &:first-letter {
    text-transform: uppercase;
  }

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

  &__name {
    user-select: none;
  }

  &__progress {
    position: absolute;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 4px;

    &__indicator {
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;

      width: 0;
      border-radius: 0 0 3px 3px;

      background-color: currentColor;
      will-change: width;
    }
  }
}
</style>
