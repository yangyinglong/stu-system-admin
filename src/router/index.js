import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/authorize/Register'
import ForgotPass from '@/authorize/ForgotPass'
import UserCenter from '@/authorize/UserCenter'
import Center from '@/components/operation/Center'
import HonorExam from '@/components/operation/center/honorOper/HonorExam'
import PaperExam from '@/components/operation/center/paperOper/PaperExam'
import PatentExam from '@/components/operation/center/patentOper/PatentExam'
import CompetitionExam from '@/components/operation/center/competitionOper/CompetitionExam'
import EntrProExam from '@/components/operation/center/entrProOper/EntrProExam'
import InnoProExam from '@/components/operation/center/innoProOper/InnoProExam'
import EngiProExam from '@/components/operation/center/engiProOper/EngiProExam'
import AcadExchExam from '@/components/operation/center/acadExchOper/AcadExchExam'
import MasterPaperExam from '@/components/operation/center/masterPaperOper/MasterPaperExam'
import WorkExam from '@/components/operation/center/workOper/WorkExam'
import BaseInfoShow from '@/components/operation/center/baseInfoOper/BaseInfoShow'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
    	path: '/register',
    	name: 'Register',
    	component: Register
    },
    {
      path: '/forgotpass',
      name: 'ForgotPass',
      component: ForgotPass
    },
    {
      path: '/usercenter',
      name: 'UserCenter',
      component: UserCenter
    },
    {
      path: '/center',
      name: 'Center',
      component: Center,
      meta: {authRequired: true}
    },
    {     
      path: '/honorExam',
      name: 'HonorExam',
      component: HonorExam,
      meta: {authRequired: true}
    },
    {     
      path: '/paperExam',
      name: 'PaperExam',
      component: PaperExam,
      meta: {authRequired: true}
    },
    {     
      path: '/patentExam',
      name: 'PatentExam',
      component: PatentExam,
      meta: {authRequired: true}
    },
    {     
      path: '/competitionExam',
      name: 'CompetitionExam',
      component: CompetitionExam,
      meta: {authRequired: true}
    },
    {     
      path: '/entrProExam',
      name: 'EntrProExam',
      component: EntrProExam,
      meta: {authRequired: true}
    },
    {     
      path: '/innoProExam',
      name: 'InnoProExam',
      component: InnoProExam,
      meta: {authRequired: true}
    },
    {     
      path: '/engiProExam',
      name: 'EngiProExam',
      component: EngiProExam,
      meta: {authRequired: true}
    },
    {     
      path: '/acadExchExam',
      name: 'AcadExchExam',
      component: AcadExchExam,
      meta: {authRequired: true}
    },
    {     
      path: '/masterPaperExam',
      name: 'MasterPaperExam',
      component: MasterPaperExam,
      meta: {authRequired: true}
    },
    {     
      path: '/workExam',
      name: 'WorkExam',
      component: WorkExam,
      meta: {authRequired: true}
    },
    {     
      path: '/baseInfoShow',
      name: 'BaseInfoShow',
      component: BaseInfoShow,
      meta: {authRequired: true}
    }
  ]
})

router.beforeEach((to, from, next) => {    //判断是否需要登录拦截
  if (to.meta.authRequired) {        //存在token正常跳转
    if (sessionStorage.getItem('status') != 0) {
      next()
    } else {
      next({path: '/'})
      // next()
    }
  } else {
    next()
  }
})

export default router
