import { RouteRecordRaw } from 'vue-router'
import checkAuth from '@/router/checkAuth'

const routes: Array<RouteRecordRaw> = [
  /**
   * Callbacks
   */
  {
    path: '/admin/partymeister-core/callbacks',
    name: 'admin.partymeister-core.callbacks',
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title: 'partymeister-core.callbacks.callbacks',
    },
    beforeEnter: checkAuth,
    component: () =>
      import('../views/admin/partymeister-core/callbacks/index.vue'),
  },
  {
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
      import('../views/admin/partymeister-core/callbacks/edit.vue'),
  },
  {
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
      import('../views/admin/partymeister-core/callbacks/edit.vue'),
  },
  {
    path: '/admin/partymeister-core/events',
    name: 'admin.partymeister-core.events',
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title: 'partymeister-core.events.events',
    },
    beforeEnter: checkAuth,
    component: () =>
      import('../views/admin/partymeister-core/events/index.vue'),
  },
  /**
   * Events
   */
  {
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
    component: () => import('../views/admin/partymeister-core/events/edit.vue'),
  },
  {
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
    component: () => import('../views/admin/partymeister-core/events/edit.vue'),
  },
  /**
   * Event types
   */
  {
    path: '/admin/partymeister-core/event-types',
    name: 'admin.partymeister-core.event-types',
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title: 'partymeister-core.event_types.event_types',
    },
    beforeEnter: checkAuth,
    component: () =>
      import('../views/admin/partymeister-core/event-types/index.vue'),
  },
  {
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
      import('../views/admin/partymeister-core/event-types/edit.vue'),
  },
  {
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
      import('../views/admin/partymeister-core/event-types/edit.vue'),
  },
  /**
   * Schedules
   */
  {
    path: '/admin/partymeister-core/schedules',
    name: 'admin.partymeister-core.schedules',
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title: 'partymeister-core.schedules.schedules',
    },
    beforeEnter: checkAuth,
    component: () =>
      import('../views/admin/partymeister-core/schedules/index.vue'),
  },
  {
    path: '/admin/partymeister-core/schedules/create',
    name: 'admin.partymeister-core.schedules.create',
    meta: {
      title: 'partymeister-core.schedules.schedules',
      breadcrumbs: [
        {
          route: 'admin.partymeister-core.schedules',
          name: 'partymeister-core.schedules.schedules',
        },
        {
          name: 'partymeister-core.schedules.new',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () =>
      import('../views/admin/partymeister-core/schedules/edit.vue'),
  },
  {
    path: '/admin/partymeister-core/schedules/edit/:id',
    name: 'admin.partymeister-core.schedules.edit',
    meta: {
      title: 'partymeister-core.schedules.schedules',
      breadcrumbs: [
        {
          route: 'admin.partymeister-core.schedules',
          name: 'partymeister-core.schedules.schedules',
        },
        {
          name: 'partymeister-core.schedules.edit',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () =>
      import('../views/admin/partymeister-core/schedules/edit.vue'),
  },
  /**
   * Visitors
   */
  {
    path: '/admin/partymeister-core/visitors',
    name: 'admin.partymeister-core.visitors',
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title: 'partymeister-core.visitors.visitors',
    },
    beforeEnter: checkAuth,
    component: () =>
      import('../views/admin/partymeister-core/visitors/index.vue'),
  },
  {
    path: '/admin/partymeister-core/visitors/create',
    name: 'admin.partymeister-core.visitors.create',
    meta: {
      title: 'partymeister-core.visitors.visitors',
      breadcrumbs: [
        {
          route: 'admin.partymeister-core.visitors',
          name: 'partymeister-core.visitors.visitors',
        },
        {
          name: 'partymeister-core.visitors.new',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () =>
      import('../views/admin/partymeister-core/visitors/edit.vue'),
  },
  {
    path: '/admin/partymeister-core/visitors/edit/:id',
    name: 'admin.partymeister-core.visitors.edit',
    meta: {
      title: 'partymeister-core.visitors.visitors',
      breadcrumbs: [
        {
          route: 'admin.partymeister-core.visitors',
          name: 'partymeister-core.visitors.visitors',
        },
        {
          name: 'partymeister-core.visitors.edit',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () =>
      import('../views/admin/partymeister-core/visitors/edit.vue'),
  },
]

export default routes
