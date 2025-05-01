import {createRouter, createWebHistory} from 'vue-router';
import CharacterList from '../views/CharacterList.vue';
import StarshipList from '../views/StarshipList.vue';
import PlanetsList from '../views/PlanetsList.vue';
import Home from '../views/Home.vue'
const routes = [
    {path: '/characters', name: 'characters', component: CharacterList},
    {path: '/starships', name: 'starshipts', component: StarshipList},
    {path: '/planets', name: 'planets', component: PlanetsList},
    {path: '/', name: 'home', component: Home},

]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;