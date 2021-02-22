<!--<template>-->
<!--  <div>-->
<!--    <h1>Carte des villes</h1>-->
<!--    <div id="map"></div>-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--import mapboxgl from "mapbox-gl";-->
<!--import "mapbox-gl/dist/mapbox-gl.css";-->
<!--import {defineComponent} from 'vue';-->
<!--// eslint-disable-next-line no-unused-vars-->
<!--import City from "@/store/city";-->


<!--export default defineComponent({-->
<!--  name: 'CitiesMapbox',-->
<!--  mounted() {-->
<!--    mapboxgl.accessToken =-->
<!--        "pk.eyJ1IjoiaGptYXJpY2hhbCIsImEiOiJja2w5ODd0MnQwNzYzMm5vb3g3NmY2ZGt0In0.UI6GQiO0BtxHM6VncDE3BQ";-->
<!--    const map = new mapboxgl.Map({-->
<!--      container: "map",-->
<!--      style: "https://maps.hotentic.com/styles/isere/style.json",-->
<!--      center: [process.env.VUE_APP_DEFAULT_LONGITUDE, process.env.VUE_APP_DEFAULT_LATITUDE],-->
<!--      zoom: 10,-->
<!--    });-->
<!--    map.on('load', async () => {-->
<!--      const mapboxgl = require('mapbox-gl/dist/mapbox-gl');-->
<!--      await this.$store.dispatch('getCities')-->
<!--      this.$store.state.cities.forEach((city: City) => {-->
<!--        let el = document.createElement('img');-->
<!--        el.src = `https://openweathermap.org/img/wn/${city.icon}@2x.png`;-->
<!--        el.classList.add('marker');-->
<!--        el.title = `${city.name} - ${city.temperature}°C`;-->
<!--        new mapboxgl.Marker(el)-->
<!--            .setLngLat([city.lon, city.lat])-->
<!--            .addTo(map);-->
<!--      });-->
<!--    });-->
<!--  },-->
<!--});-->
<!--</script>-->


<!--<style scoped>-->
<!--h1 {-->
<!--  margin: 40px 0 0;-->
<!--}-->

<!--</style>-->
