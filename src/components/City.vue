<template>
  <div>
    <h2>{{ name }} <span> <button @click="deleteCity(id)">delete</button></span> </h2>
    <p>Temps : {{ weather }} - Température : {{ temperature }}°C</p>
    <p><em>Dernière mise à jour : {{ currentDateTime(updatedAt) }}</em></p>

  </div>
</template>

<script lang="ts">


import {defineComponent} from 'vue';
import moment from 'moment'

export default defineComponent({
  name: 'City',
  props: {
    id:Number,
    name: String,
    weather: String,
    temperature: Number,
    updatedAt: [String, Date]
  },
  methods: {
    currentDateTime(updatedAt: string) {
      moment.locale("fr");
      return moment(updatedAt).fromNow();
    }
    ,
    deleteCity(id: number){
      this.$store.dispatch('removeCity', id)
    }
  }
})
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}
</style>
