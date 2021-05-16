import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

let routes: Array<RouteRecordRaw> = []

// load and append all routes from the src/routes folder
const files = require.context('./../routes', true, /.ts$/i)
files
  .keys()
  .map(files)
  .map((m: any) => {
    routes = routes.concat(m.default)
  })

const router = createRouter({
  linkActiveClass: 'active',
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
