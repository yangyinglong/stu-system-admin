// import vue from 'vue'
import axios from 'axios'
// import qs from 'qs'

axios.defaults.timeout = 60000                        // 响应时间
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'          // 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'          // 配置请求头
axios.defaults.baseURL = '/api'   // 配置线上接口地址
// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  // 在发送请求之前做某件事
  // if (config.method === 'post') {
  //   config.data = qs.stringify(config.data)
  // }
  return config
}, (error) => {
  return Promise.reject({
    stat: 'error',
    msg: '参数错误！'
  })
})
// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  if (res.status == '200') {
    return res.data
  } else {
    return Promise.reject({
      stat: 'error',
      msg: '服务出错，请重试！'
    })
  }
}, (error) => {
  var msg = ''
  if (error.response) {
    if (error.response.status == '404') {
      msg = '服务出错，请稍候再试！'
    } else if (error.response.status == '408') {
      msg = '响应超时，请重试！'
    } else {
      msg = '服务出错，请稍候再试uuuu！'
    }
  } else {
    if (error.code == 'ECONNABORTED') {
      msg = '请求超时，请重试！'
    } else {
      msg = '网络异常，请检查网络是否正常打开！'
    }
  }
  return Promise.reject({
    stat: 'error',
    msg: msg
  })
})

// 返回一个Promise(发送post请求)
export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(response => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

// 返回一个Promise(发送get请求)
export function getFetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: params}).then(response => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

export default {

  Login(params) {
    return fetch('/user/login', params)
  },
  Register(params){
    return fetch('/user/register', params)
  },
  EditBaseInfo(params){
    return fetch('/user/editBaseInfo', params)
  },
  ForgorPass(params){
    return fetch('/user/forgetPass', params)
  },
  EditEntrScore(params){
    return fetch('/score/editEntrScore', params)
  },
  GetEntrScore(params){
    return fetch('/score/getEntrScore', params)
  },
  EditTuCoer(params){
    return fetch('/score/editTuCoer', params)
  },
  GetTuCoer(params){
    return fetch('/score/getTuCoer', params)
  },
  GetAllScore(params){
    return fetch('/score/getAllScore', params)
  },
  EditAllScore(params){
    return fetch('/score/editAllScore', params)
  },
  EditHonor(params){
    return fetch('/prize/editHonor', params)
  },
  ShowHonors(params){
    return fetch('/prize/getHonors', params)
  },
  GetAllPrizes(params){
    return fetch('/prize/getPrizes', params)
  },
  EditPaper(params){
    return fetch('/prize/editPaper', params)
  },
  ShowPapers(params){
    return fetch('/prize/getPapers', params)
  },
  EditPatent(params){
    return fetch('/prize/editPatent', params)
  },
  ShowPatents(params){
    return fetch('/prize/getPatents', params)
  },

  RegisterTeacher(params){
    return fetch('/user/registerTeacher', params)
  },
  LoginTeacher(params){
    return fetch('/user/loginTeacher', params)
  },
  ShowHonorsForTeacher(params){
    return fetch('/admin/showHonorsForTeacher', params)
  },
  ExamHonor(params){
    return fetch('/admin/examHonor', params)
  },
  ShowPapersForTeacher(params){
    return fetch('/admin/showPapersForTeacher', params)
  },
  ExamPaper(params){
    return fetch('/admin/examPaper', params)
  },
  ShowPatentsForTeacher(params){
    return fetch('/admin/showPatentsForTeacher', params)
  },
  ExamPatent(params){
    return fetch('/admin/examPatent', params)
  },
  ShowCompetitionsForTeacher(params){
    return fetch('/admin/showCompetitionsForTeacher', params)
  },
  ExamCompetition(params){
    return fetch('/admin/examCompetition', params)
  },
  ShowEntrProsForTeacher(params){
    return fetch('/admin/showEntrProsForTeacher', params)
  },
  ExamEntrPro(params){
    return fetch('/admin/examEntrPro', params)
  },
  ShowInnoProsForTeacher(params){
    return fetch('/admin/showInnoProsForTeacher', params)
  },
  ExamInnoPro(params){
    return fetch('/admin/examInnoPro', params)
  },
  ShowEngiProsForTeacher(params){
    return fetch('/admin/showEngiProsForTeacher', params)
  },
  ExamEngiPro(params){
    return fetch('/admin/examEngiPro', params)
  },
  ShowAcadExchsForTeacher(params){
    return fetch('/admin/showAcadExchsForTeacher', params)
  },
  ExamAcadExch(params){
    return fetch('/admin/examAcadExch', params)
  },
  ShowMasterPapersForTeacher(params){
    return fetch('/admin/showMasterPapersForTeacher', params)
  },
  ExamMasterPaper(params){
    return fetch('/admin/examMasterPaper', params)
  },
  ShowWorksForTeacher(params){
    return fetch('/admin/showWorksForTeacher', params)
  },
  ExamWork(params){
    return fetch('/admin/examWork', params)
  },
  ShowStusForTeacher(params){
    return fetch('/admin/showStusForTeacher', params)
  }, 
  ShowPrizesForTeacher(params){
    return fetch('/admin/showAllPrizeForTeacher', params)
  },
  ShowScoresForTeacher(params){
    return fetch('/admin/showScoresForTeacher', params)
  },
  DownloadFile(params){
    return fetch('file/downloadFile', params)
  },
  DownStusForTeacher(params){
    return fetch('admin/downStusForTeacher', params)
  },

  ShowProjectsForTeacher(params){
    return fetch('/admin/showProjectsForTeacher', params)
  },
  ExamProject(params){
    return fetch('/admin/examProject', params)
  },
}
