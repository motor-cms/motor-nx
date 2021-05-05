import {createApp} from "vue";
import {createRouter, createWebHistory, RouteLocation} from "vue-router";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

// mouting point for the whole app
import App from "@/App.vue";

// layouts
import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";

// views for Admin layout
import Dashboard from "@/views/admin/Dashboard.vue";
import Settings from "@/views/admin/Settings.vue";
import Tables from "@/views/admin/Tables.vue";
import Maps from "@/views/admin/Maps.vue";
import Callbacks from "@/views/admin/partymeister-core/Callbacks.vue";
import CallbackForm from "@/views/admin/partymeister-core/callbacks/CallbackForm.vue";
import Events from "@/views/admin/partymeister-core/Events.vue";
import EventForm from "@/views/admin/partymeister-core/events/EventForm.vue";
import EventTypes from "@/views/admin/partymeister-core/EventTypes.vue";


// views for Auth layout
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

// views without layouts
import Landing from "@/views/Landing.vue";
import Profile from "@/views/Profile.vue";
import Index from "@/views/Index.vue";
import store from './store'
import i18n from './i18n'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost/'

// styles

// routes
function checkAuth(to: RouteLocation, from: RouteLocation, next: Function)
{
    if (!localStorage.getItem('token')) {
        next('/auth/login');
    } else {
        next();
    }

}

const routes = [
    {
        path: "/admin",
        redirect: "/admin/dashboard",
        component: Admin,
        beforeEnter: checkAuth,
        children: [
            {
                path: "/admin/dashboard",
                component: Dashboard,
                beforeEnter: checkAuth,
            },
            {
                path: "/admin/settings",
                component: Settings,
                beforeEnter: checkAuth,
            },
            {
                path: "/admin/tables",
                component: Tables,
                beforeEnter: checkAuth,
            },
            {
                path: "/admin/maps",
                component: Maps,
                beforeEnter: checkAuth,
            },
            {
                name: 'partymeister-core.callbacks.index',
                path: "/admin/partymeister-core/callbacks",
                component: Callbacks,
                beforeEnter: checkAuth,
            },
            {
                name: 'partymeister-core.callbacks.create',
                path: "/admin/partymeister-core/callbacks/create",
                component: CallbackForm,
                beforeEnter: checkAuth,
            },
            {
                name: 'partymeister-core.callbacks.edit',
                path: "/admin/partymeister-core/callbacks/:id/edit",
                component: CallbackForm,
                props: true,
                beforeEnter: checkAuth,
            },
            {
                name: 'partymeister-core.events.index',
                path: "/admin/partymeister-core/events",
                component: Events,
                beforeEnter: checkAuth,
            },
            {
                name: 'partymeister-core.events.create',
                path: "/admin/partymeister-core/events/create",
                component: EventForm,
                beforeEnter: checkAuth,
            },
            {
                name: 'partymeister-core.events.edit',
                path: "/admin/partymeister-core/events/:id/edit",
                component: EventForm,
                props: true,
                beforeEnter: checkAuth,
            },
            {
                name: 'partymeister-core.event_types.index',
                path: "/admin/partymeister-core/event_types",
                component: EventTypes,
                beforeEnter: checkAuth,
            },
            {
                name: 'partymeister-core.event_types.create',
                path: "/admin/partymeister-core/event_types/create",
                component: Events,
                beforeEnter: checkAuth,
            },
            {
                name: 'partymeister-core.event_types.edit',
                path: "/admin/partymeister-core/event_types/:id/edit",
                component: Events,
                props: true,
                beforeEnter: checkAuth,
            },
        ],
    },
    {
        path: "/auth",
        redirect: "/auth/login",
        component: Auth,
        children: [
            {
                path: "/auth/login",
                component: Login,
            },
            {
                path: "/auth/register",
                component: Register,
            },
        ],
    },
    {
        path: "/landing",
        component: Landing,
    },
    {
        path: "/profile",
        component: Profile,
    },
    {
        path: "/",
        component: Index,
    },
    {path: "/:pathMatch(.*)*", redirect: "/"},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(i18n).use(store).use(router).mount("#app");
