import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    {path: '', name: '', component: null}
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;