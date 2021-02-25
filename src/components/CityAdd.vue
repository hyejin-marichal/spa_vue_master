<template>
  <div>
    <h1>Get weather </h1>

    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="Enter a city..." v-model="cityName">
      <button type="submit">search</button>
    </form>

  </div>
</template>

<script lang="ts">


import {defineComponent} from 'vue';


export default defineComponent({
  name: 'CityAdd',
  data() {
    return {
      cityName: ''
    }
  },
  methods: {
    onSubmit() {
      if (this.cityName === null || this.cityName === '') {
        alert("Enter a city name")
      } else {
        this.$store.dispatch('addCity', this.cityName)
      }
    }
  }
})
</script>

<style scoped>
h1 {
  margin: 20px;
}

form {
  padding: 10px;
}
</style>
