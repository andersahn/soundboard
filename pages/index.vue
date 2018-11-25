<template>
  <section class="container">
    <div class="categories">
      <nuxt-link
        to="/"
        :class="{
          'categories__category': true,
          'categories__category--selected': (viewCategory === false),
        }"
      >
        None
      </nuxt-link>
      <nuxt-link
        v-for="category in categories"
        v-bind:key="category"
        :to="`/${category}`"
        :class="{
          'categories__category': true,
          'categories__category--selected': (viewCategory === category),
        }"
      >
        {{category}}
      </nuxt-link>
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
        if (this.viewCategory) {
          return sound.meta.categories.includes(this.viewCategory);
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
    },
    viewCategory() {
      return this.$route.params.category || false;
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
    text-decoration: none;
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

.appear-active,
.page-active,
.container {
  transition: opacity .25s;

  .sound {
    transition: opacity .25s;
  }
}

.appear {
  opacity: 0;
}

.appear-enter,
.appear-leave,
.appear-leave-to,
.page-enter-to {
  opacity: 1;

  .sound {
    opacity: 1;
  }
}

.page-leave-to {
  opacity: 1;

  .sound {
    opacity: 0;
  }
}
</style>
