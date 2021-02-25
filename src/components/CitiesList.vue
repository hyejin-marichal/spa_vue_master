<template>
  <div>
    <CityAdd/>
  </div>
  <h1>filter</h1>
  <div><input v-model="searchQuery"></div>

  <div>
    <h1>Liste des villes</h1>
    <City v-for="city of $store.getters.resFiltCities(searchQuery)" :key="city.id" :id="city.id" :name="city.name" :weather="city.weather"
          :temperature="city.temperature" :updated-at="city.updatedAt"></City>
  </div>


</template>

<script lang="ts">
import City from "./City.vue";
import {defineComponent} from "vue";
import CityAdd from "./CityAdd.vue";

export default defineComponent({
  name: 'CitiesList',
  data() {
    return {
      searchQuery: ''
    }
  },
  components: {
    City,
    CityAdd
  },
  mounted() {
    this.$store.dispatch('getCities')
    setInterval(() => {
      this.$store.dispatch('getCities')
    }, 300000)
  }
})
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}
</style>
