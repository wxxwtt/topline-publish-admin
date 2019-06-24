import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'

Vue.use(Router)

const router = new Router({
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
      // name: 'layout', // 由于它有默认子路由，所以它的名字没有意义，否则 Vue 会给你发黄牌警告
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
        },
        {
          name: 'article-list',
          path: '/article', // 它就是 layout 的默认子路由
          component: () => import('@/views/article')
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

/**
 * 所有路由导航都要经过这里
 * to 去哪儿
 * from 来自哪里
 * next 允许通过的方法
 */

router.beforeEach((to, from, next) => {
  nprogress.start()
  const userInfo = window.localStorage.getItem('user_info')

  // 如果是非 /login 页面，判断其登录状态
  if (to.path !== '/login') {
    // 如果没有登录，让其跳转到登录页
    if (!userInfo) {
      next({ name: 'login' })
    } else {
      // 如果登录了，则允许通过
      next()
    }
  } else {
    // 如果登录了，就不允许访问登录页了
    if (userInfo) {
      next(false)
    } else {
      // 没有登录，才允许访问登录页
      next()
    }
  }
})

/**
 * 路由导航完成的时候会进入这里
 */
router.afterEach((to, from) => {
  nprogress.done()
})

export default router
