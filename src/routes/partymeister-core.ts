import { RouteRecordRaw } from 'vue-router'
import checkAuth from '@/router/checkAuth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/admin/partymeister-core/callbacks',
    name: 'admin.partymeister-core.callbacks',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title: 'partymeister-core.callbacks.callbacks',
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/admin/partymeister-core/callbacks/index.vue'
      ),
  },
  {
    // UserProfile will be rendered inside User's <router-view>
    // when /user/:id/profile is matched
    path: '/admin/partymeister-core/callbacks/create',
    name: 'admin.partymeister-core.callbacks.create',
    meta: {
      title: 'partymeister-core.callbacks.callbacks',
      breadcrumbs: [
        {
          route: 'admin.partymeister-core.callbacks',
          name: 'partymeister-core.callbacks.callbacks',
        },
        {
          name: 'partymeister-core.callbacks.new',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/admin/partymeister-core/callbacks/edit.vue'
      ),
  },
  {
    // UserPosts will be rendered inside User's <router-view>
    // when /user/:id/posts is matched
    path: '/admin/partymeister-core/callbacks/edit/:id',
    name: 'admin.partymeister-core.callbacks.edit',
    meta: {
      title: 'partymeister-core.callbacks.callbacks',
      breadcrumbs: [
        {
          route: 'admin.partymeister-core.callbacks',
          name: 'partymeister-core.callbacks.callbacks',
        },
        {
          name: 'partymeister-core.callbacks.edit',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/admin/partymeister-core/callbacks/edit.vue'
      ),
  },
  {
    path: '/admin/partymeister-core/events',
    name: 'admin.partymeister-core.events',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title: 'partymeister-core.events.events',
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/admin/partymeister-core/events/index.vue'
      ),
  },
  {
    // UserProfile will be rendered inside User's <router-view>
    // when /user/:id/profile is matched
    path: '/admin/partymeister-core/events/create',
    name: 'admin.partymeister-core.events.create',
    meta: {
      title: 'partymeister-core.events.events',
      breadcrumbs: [
        {
          route: 'admin.partymeister-core.events',
          name: 'partymeister-core.events.events',
        },
        {
          name: 'partymeister-core.events.new',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/admin/partymeister-core/events/edit.vue'
      ),
  },
  {
    // UserPosts will be rendered inside User's <router-view>
    // when /user/:id/posts is matched
    path: '/admin/partymeister-core/events/edit/:id',
    name: 'admin.partymeister-core.events.edit',
    meta: {
      title: 'partymeister-core.events.events',
      breadcrumbs: [
        {
          route: 'admin.partymeister-core.events',
          name: 'partymeister-core.events.events',
        },
        {
          name: 'partymeister-core.events.edit',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/admin/partymeister-core/events/edit.vue'
      ),
  },
  {
    path: '/admin/partymeister-core/event-types',
    name: 'admin.partymeister-core.event-types',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title: 'partymeister-core.event_types.event_types',
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/admin/partymeister-core/event-types/index.vue'
      ),
  },
  {
    // UserProfile will be rendered inside User's <router-view>
    // when /user/:id/profile is matched
    path: '/admin/partymeister-core/event-types/create',
    name: 'admin.partymeister-core.event-types.create',
    meta: {
      title: 'partymeister-core.event_types.event_types',
      breadcrumbs: [
        {
          route: 'admin.partymeister-core.event-types',
          name: 'partymeister-core.event_types.event_types',
        },
        {
          name: 'partymeister-core.event_types.new',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/admin/partymeister-core/event-types/edit.vue'
      ),
  },
  {
    // UserPosts will be rendered inside User's <router-view>
    // when /user/:id/posts is matched
    path: '/admin/partymeister-core/event-types/edit/:id',
    name: 'admin.partymeister-core.event-types.edit',
    meta: {
      title: 'partymeister-core.event_types.event_types',
      breadcrumbs: [
        {
          route: 'admin.partymeister-core.event-types',
          name: 'partymeister-core.event_types.event_types',
        },
        {
          name: 'partymeister-core.event_types.edit',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/admin/partymeister-core/event-types/edit.vue'
      ),
  },
]

export default routes
