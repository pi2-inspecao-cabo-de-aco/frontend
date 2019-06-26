
const routes = [
  {
    path: '/',
    component: () => import('layouts/TopBarLayout.vue'),
    children: [
      { path: '', component: () => import('pages/CablesPage.vue') }
    ]
  },
  {
    path: '/overview',
    component: () => import('layouts/TopBarLayout.vue'),
    children: [
      { path: '', component: () => import('pages/OverviewPage.vue') }
    ]
  },
  {
    path: '/report',
    component: () => import('layouts/TopBarLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ReportPage.vue') }
    ]
  },
  {
    path: '/report/show',
    component: () => import('layouts/TopBarLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ShowReportPage.vue') }
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
