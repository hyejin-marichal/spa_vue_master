<template>
  <div>
    <h1>filter</h1>
    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="Enter a temp..." v-model="filter">
      <button type="submit">filter</button>
    </form>
    <ul v-if="filter && result">
      <p>Result search</p>
      <li v-for="city in result" :key="city.id"></li>
    </ul>

  </div>
  <!--  <div>-->
  <!--    <h1>Rechercher la météo par ville</h1>-->
  <!--    <form>-->
  <!--      <input type="text" v-model="searchQuery">-->
  <!--      <button @click="onButtonClicked($event)">Ajouter</button>-->
  <!--    </form>-->
  <!--    <ul v-if="searchQuery || haveResult">-->
  <!--      <p>Liste de villes ajoutées :</p>-->
  <!--      <li v-for="city in searchCities" :key="city">-->
  <!--        {{ city }},-->
  <!--      </li>-->
  <!--    </ul>-->

  <!--    <form>-->
  <!--      <button @click="showcity()">Rechercher</button>-->
  <!--    </form>-->
  <!--    <div v-if="showResult || haveResult">-->
  <!--      <City v-for="result in results" :key="result.name" :name="result.name" :weather="result.weather[0].description"-->
  <!--            :temperature="result.main.temp" :updated-at="result.updatedAt"></City>-->

  <!--    </div>-->
  <!--    </div>-->

</template>

<script lang="ts">


import {defineComponent} from 'vue';
import {mapGetters} from "vuex";


export default defineComponent({
  name: 'CityFilter',
  data() {
    return {
      filter: ''
    }
  },
  computed: {
    ...mapGetters([
      'resFiltCities'])
  },
  methods: {
    onSubmit() {
      if (this.filter === null || this.filter === '') {
        alert("Enter a temp")
      } else {
        this.resFiltCities(this.filter)
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
