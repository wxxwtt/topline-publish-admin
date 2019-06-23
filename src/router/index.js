import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   // 路由的名字，和组件名没关系，说白了就是 path 的别名
    //   // 好处就是，加入你的 path 是 /x/x/x/x ，我们跳转的时候就可以直接
    //   // $router.push('/x/x/x/')
    //   // $router.push({ name: 'xxx' })，不仅仅如此，你就记住，给路由起个名字是一个好的做法
    //   name: 'home',
    //   path: '/',
    //   // @ 表示 src 目录，无论你当前文件在哪里，@ 都是 src
    //   component: () => import('@/views/home')
    // },
    {
      name: 'layout',
      path: '/',
      component: () => import('@/views/layout'),
      // 嵌套路由：https://router.vuejs.org/zh/guide/essentials/nested-routes.html
      // 所有 children 路由都显示到父路由的 router-view 中
      children: [
        {
          name: 'home',
          path: '', // 它就是 layout 的默认子路由
          component: () => import('@/views/home')
        },
        {
          name: 'publish',
          path: '/publish', // 它就是 layout 的默认子路由
          component: () => import('@/views/publish')
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    }
  ]
})
