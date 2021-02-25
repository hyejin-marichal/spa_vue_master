import {createStore} from 'vuex'
import axios from 'axios'
import State from "@/store/state";
import City from "@/store/city";

export default createStore<State>({

    state: {//data
        cities: []

    },
    getters: {
        resFiltCities: state => (cityName: any) => {
            console.log()
            return state.cities.filter(cities => cities.name.toLowerCase().startsWith(cityName.toLowerCase()))
        }
    },
    mutations: { //computed
        // initialiseStore(state) {
        //     // Check if the ID exists
        //     if (localStorage.getItem('cities')) {
        //         // Replace the state object with the stored item
        //         this.replaceState(
        //             Object.assign(state, JSON.parse(localStorage.getItem('cities') || '{}'))
        //         );
        //     }
        // },
        setCities: (state, payload: City[]) => {
            state.cities = payload;
        },
        addCity: (state, payload: City) => {
            state.cities.unshift(payload)
        },
        removeCity: (state, index: number) => {
            state.cities.splice(index, 1);
        },
        // filterCity: (state, payload: City[]) => {
        //     state.cities = payload
        // }
    },
    actions: {
        // getCities: ({commit, dispatch}) => {
        getCities: ({commit}) => {
            console.log(("funtion start"))
            if (Date.now() < parseInt(localStorage.getItem('validity') || '') && localStorage.getItem("cities")) {
                console.log(("localstorage"))
                commit('setCities', JSON.parse(localStorage.getItem("cities") as string));
            } else {
                console.log(("appel api"))
                axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${process.env.VUE_APP_DEFAULT_LATITUDE}&lon=${process.env.VUE_APP_DEFAULT_LONGITUDE}&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${process.env.VUE_APP_OW_APP_ID}`)
                    .then(resp => {
                        const cities = resp.data.list.map((data: any) => ({
                            id: data.id,
                            name: data.name,
                            weather: data.weather.description,
                            temperature: data.main.temp,
                            lat: data.coord.lat,
                            lon: data.coord.lon,
                            icon: data.weather.icon,
                            updatedAt: new Date(data.dt * 1000)
                        } as City));
                        commit('setCities', cities);
                        let validity = Date.now() + 200000
                        localStorage.setItem("validity", validity.toString());
                    })
            }
        },

        addCity: ({commit}, cityName) => {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=fr&units=metric&appid=${process.env.VUE_APP_OW_APP_ID}`)
                .then(({
                           data: {
                               id,
                               name,
                               coord: {lat, lon},
                               weather: [{description: weather, icon: icon}],
                               main: {temp: temperature},
                               dt: updatedAt
                           }
                       }: any) => {
                    const city = {
                        id,
                        name,
                        weather,
                        temperature,
                        lat,
                        lon,
                        icon,
                        updatedAt: new Date(updatedAt * 1000)
                    } as City;
                    commit('addCity', city);
                })
        }
        , removeCity: ({commit, state}, id) => {
            let index = state.cities.findIndex(city => city.id === id);
            commit('removeCity', index);
        }
    },
    modules: {}
})
