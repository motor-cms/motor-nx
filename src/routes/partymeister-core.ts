import { RouteRecordRaw } from 'vue-router'

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
    },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/admin/partymeister-core/Events.vue'
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
    },
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/admin/partymeister-core/EventTypes.vue'
      ),
  },
]

export default routes
