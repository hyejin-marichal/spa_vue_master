<template>
  <div><CityAdd/></div>
  <div>
    <h1>Liste des villes</h1>
    <City v-for="city of $store.state.cities" :key="city.id" :name="city.name" :weather="city.weather"
          :temperature="city.temperature" :updated-at="city.updatedAt"></City>
  </div>


</template>

<script lang="ts">
import City from "./City.vue";
import {defineComponent} from "vue";
import CityAdd from "./CityAdd.vue";

export default defineComponent({
  name: 'CitiesList',
  components: {
    City,
    CityAdd

  },
  mounted() {
    this.$store.dispatch('getCities')
  }
})
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}
</style>
