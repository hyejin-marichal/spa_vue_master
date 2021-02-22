<!--<template>-->
<!--  <div>-->
<!--    <h1>Carte des villes</h1>-->
<!--    <div id="map"></div>-->
<!--  </div>-->
<!--</template>-->
<template>
  <div style="height: 100vh; width: 100vw;">
    <l-map
        v-model="zoom"
        v-model:zoom="zoom"
        :center="[45.8910906, 6.0925617]"
    >
      <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>

      <l-marker v-for="city in $store.state.cities" :lat-lng="[city.lat, city.lon]" :key="city.name">
        <l-icon :icon-url="`https://openweathermap.org/img/wn/${city.icon}.png`" :icon-size="iconSize"/>
      </l-marker>
    </l-map>
  </div>
</template>

<!--<script lang="ts">-->
<script>


import {defineComponent} from 'vue';
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
} from "@vue-leaflet/vue-leaflet";

import "leaflet/dist/leaflet.css";


export default defineComponent({
  name: 'CitiesMap',
  data() {
    const iconWidth = 50;
    const iconHeight = 50;
    return {
      zoom: 12,
      iconWidth,
      iconHeight,
    }
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
  },
  computed: {
    iconSize() {
      return [this.iconWidth, this.iconHeight];
    },
  },

  mounted() {
    setInterval(() => {
      this.$store.dispatch('getCities')
    }, 5000)
  }
  // mounted() {
  //   mapboxgl.accessToken =
  //       "pk.eyJ1IjoiaGptYXJpY2hhbCIsImEiOiJja2w5ODd0MnQwNzYzMm5vb3g3NmY2ZGt0In0.UI6GQiO0BtxHM6VncDE3BQ";
  //   const map = new mapboxgl.Map({
  //     container: "map",
  //     style: "https://maps.hotentic.com/styles/isere/style.json",
  //     center: [process.env.VUE_APP_DEFAULT_LONGITUDE, process.env.VUE_APP_DEFAULT_LATITUDE],
  //     zoom: 10,
  //   });
  //   map.on('load', async () => {
  //     const mapboxgl = require('mapbox-gl/dist/mapbox-gl');
  //     await this.$store.dispatch('getCities')
  //     this.$store.state.cities.forEach((city: City) => {
  //       let el = document.createElement('img');
  //       el.src = `https://openweathermap.org/img/wn/${city.icon}@2x.png`;
  //       el.classList.add('marker');
  //       el.title = `${city.name} - ${city.temperature}°C`;
  //       new mapboxgl.Marker(el)
  //           .setLngLat([city.lon, city.lat])
  //           .addTo(map);
  //     });
  //   });
  // },
});
</script>


<style scoped>
h1 {
  margin: 40px 0 0;
}

</style>
