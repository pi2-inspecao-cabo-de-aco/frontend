
const routes = [
  {
    path: '/',
    component: () => import('layouts/TopBarLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/cables',
    component: () => import('layouts/TopBarLayout.vue'),
    children: [
      { path: '', component: () => import('pages/CablePage.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
