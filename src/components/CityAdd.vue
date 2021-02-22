<template>
  <div>
    <h1>Add a city!</h1>
    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="Enter a city..." v-model="cityName">
      <button type="submit">Add City</button>
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
      this.$store.dispatch('addCity',  this.cityName)
    }
  }
})
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}

form {
  padding: 10px;
}
</style>
