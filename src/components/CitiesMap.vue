<template>
  <div>
    <h1>Carte des villes</h1>
    <div id="map"></div>
  </div>
</template>

<script>
import axios from "axios";
//import Mapbox from 'mapbox-gl-vue';
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
//import {onMounted} from "vue";

export default {
  name: 'CitiesMap',

  methods: {
    loadCities(citiesData) {
      for (const city of citiesData) {
        //console.log(city);
        new mapboxgl.Marker().setLngLat([city.coord.lon, city.coord.lat]).addTo(this.map)
      }
    },
  },
  mounted() {

    mapboxgl.accessToken = "pk.eyJ1IjoiaGptYXJpY2hhbCIsImEiOiJja2w5ODd0MnQwNzYzMm5vb3g3NmY2ZGt0In0.UI6GQiO0BtxHM6VncDE3BQ";

    this.map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v9",
      center: [process.env.VUE_APP_DEFAULT_LONGITUDE, process.env.VUE_APP_DEFAULT_LATITUDE],
      zoom: 12,
    });
    axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${process.env.VUE_APP_DEFAULT_LATITUDE}&lon=${process.env.VUE_APP_DEFAULT_LONGITUDE}&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${process.env.VUE_APP_OW_APP_ID}`)
        .then((resp) => this.loadCities(resp.data.list));
  },

}
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}

</style>
