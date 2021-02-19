import {createStore} from 'vuex'
import axios from 'axios'
import State from "@/store/state";
import City from "@/store/city";

export default createStore<State>({

    state: {//data
        cities: []
    },
    mutations: { //computed
        setCities: (state, payload: any[]) => {
            state.cities = payload.map(({
                                            name,
                                            coord: {lat, lon},
                                            weather: [{description: weather, icon: icon}],
                                            main: {temp: temperature},
                                            dt: updatedAt
                                        }) => ({
                name,
                weather,
                temperature,
                lat,
                lon,
                icon,
                updatedAt: new Date(updatedAt * 1000)
            } as City));
        }
    },
    actions: {
        getCities: ({commit}) => {
            axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${process.env.VUE_APP_DEFAULT_LATITUDE}&lon=${process.env.VUE_APP_DEFAULT_LONGITUDE}&cnt=20&cluster=yes&lang=fr&units=metric&APPID=${process.env.VUE_APP_OW_APP_ID}`)
                .then(resp => {
                    commit('setCities', resp.data.list);
                })
        }
    },
    modules: {}
})
