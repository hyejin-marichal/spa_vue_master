import {createStore} from 'vuex'
import axios from 'axios'
import State from "@/store/state";
import City from "@/store/city";

export default createStore<State>({

    state: {//data
        cities: []
    },
    mutations: { //computed
        setCities: (state, payload: City[]) => {
            state.cities = payload;
        },
        addCity: (state, payload: City) => {
            state.cities.unshift(payload)
        }
    },
    actions: {

        getCities: ({commit}) => {
            if (window.localStorage.getItem("cities") === null) {
                axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${process.env.VUE_APP_DEFAULT_LATITUDE}&lon=${process.env.VUE_APP_DEFAULT_LONGITUDE}&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${process.env.VUE_APP_OW_APP_ID}`)
                    .then(resp => {
                        console.log(resp.data.list)
                        const cities = resp.data.list.map(({
                                                               name,
                                                               coord: {lat, lon},
                                                               weather: [{description: weather, icon: icon}],
                                                               main: {temp: temperature},
                                                               dt: updatedAt
                                                           }: any) => ({
                            name,
                            weather,
                            temperature,
                            lat,
                            lon,
                            icon,
                            updatedAt: new Date(updatedAt * 1000)
                        } as City));
                        commit('setCities', cities);
                        window.localStorage.setItem("cities", JSON.stringify(cities));
                    })
            } else {
                commit('setCities', JSON.parse(localStorage.getItem("cities") as string));
            }
        },
        addCity: ({commit}, cityName) => {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=fr&units=metric&appid=${process.env.VUE_APP_OW_APP_ID}`)
                .then(({data:{
                           name,
                           coord: {lat, lon},
                           weather: [{description: weather, icon: icon}],
                           main: {temp: temperature},
                           dt: updatedAt
                       }}: any) => {
                    const city = {
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
    },
    modules: {}
})
