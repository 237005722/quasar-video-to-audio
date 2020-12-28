
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/Index.vue') },
      { path: 'videoToAudio', name: 'videoToAudio', component: () => import('pages/video/VideoToAudio.vue') },
      { path: 'imagesToVideo', name: 'imagesToVideo', component: () => import('pages/video/ImagesToVideo.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
