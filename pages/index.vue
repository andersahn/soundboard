<template>
  <section class="container">
    <div class="categories">
      <button
        :class="{
          'categories__category': true,
          'categories__category--selected': (filterCategory === false),
        }"
        v-on:click="() => setCategory(false)"
      >
        None
      </button>
      <button
        v-for="category in categories"
        v-bind:key="category"
        :class="{
          'categories__category': true,
          'categories__category--selected': (filterCategory === category),
        }"
        v-on:click="() => setCategory(category)"
      >
        {{category}}
      </button>
    </div>
    <Sound v-for="sound in filteredSounds" v-bind:key="sound.name" :sound="sound" />
  </section>
</template>

<script>
import Sound from '../components/Sound';
export default {
  components: {
    Sound,
  },
  head: {
    title: 'Soundboard',
  },
  data() {
    return {
      filterCategory: false,
    };
  },
  computed: {
    sounds() {
      return this.$store.state.sounds.sort();
    },
    filteredSounds() {
      return this.sounds.filter((sound) => {
        if (this.filterCategory) {
          return sound.meta.categories.includes(this.filterCategory);
        }

        return true;
      });
    },
    categories() {
      const keys = {};
      this.sounds.forEach((sound) => {
        if (sound.meta.categories) {
          sound.meta.categories.forEach((category) => {
            keys[category] = true;
          });
        }
      });

      return Object.keys(keys).sort();
    }
  },
  methods: {
    setCategory(category) {
      this.filterCategory = category;
    },
  },
}
</script>

<style lang="scss">
.container {
  font-family: Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;
  line-height: 1.5em;
  font-size: 16px;

  min-height: 100vh;
  padding: 20px 16px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  text-align: center;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;

  margin-bottom: 10px;

  &__category {
    display: block;
    border-radius: 3px;
    color: #444;
    font-size: 14px;
    font-weight: 500;
    padding: 5px 10px;
    margin: 0 5px 10px;

    color: rgb(230, 70, 97);
    background-color: #ffecee;


    border: 1px solid #ffc6cd;
    outline: 0;
    cursor: pointer;

    &::first-letter {
      text-transform: uppercase;
    }

    &--selected {
      color: rgb(70, 230, 177);
      border-color: #c6ffe4;
      background-color: #ecfff7;
    }
  }
}
</style>
