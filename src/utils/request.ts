import { useUserStore } from '../store/user'

// const appGlobalData = getApp().globalData
// const baseUrl = "https://meilin.cinlet.cn/"
const baseUrl = 'https://www.xianxiangshikong.cn/api'
//  const baseUrl =  "http://10.34.209.100:19204";	// 顾问端生产环境
// const baseUrl =  "http://10.34.203.133:19098/";	// 顾问端生产环境
const tokenKey = 'accessToken'

// 添加拦截器
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 1. 非 http 开头需拼接地址
    if (!options.url.startsWith('http')) options.url = baseUrl + options.url

    // 2. 请求超时, 默认 60s
    options.timeout = 10000
    // 3. 添加小程序端请求头标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    // 4. 添加 token 请求头标识
    // const memberStore = useMemberStore()
    const token = useUserStore().getToken()
    if (token) options.header.Authorization = token
  },
}

// 添加拦截器
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

interface Data<T> {
  code: number
  msg: string
  data: T
}

function request<T>(options: UniApp.RequestOptions) {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 响应成功
      success(res) {
        // 状态码 2xx， axios 就是这样设计的
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 2.1 提取核心数据 res.data
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          // 401错误  -> 清理用户信息，跳转到登录页
          // const memberStore = useMemberStore()
          // memberStore.clearProfile()
          // uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          // 其他错误 -> 根据后端错误信息轻提示
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求错误',
          })
          reject(res)
        }
      },
      // 响应失败
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
  })
}

interface uploadResp {
  fileSize: number
  fileType: string
  fileWebUrl: string
  finalFilePath: string
  realFileName: string
  srcFileName: string
}
function uploadFile<T>(options: UniApp.UploadFileOption): Promise<Data<T>> {
  uni.showLoading({ title: '上传中...' })
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      ...options,
      success(res) {
        const data = JSON.parse(res.data) as Data<T>
        if (data.code !== 0) {
          uni.showModal({
            title: '提示',
            showCancel: false,
            confirmColor: 'rgb(251,93,93)',
            content: '上传失败，请稍后再试',
          })
          reject(false) // 失败回调
          return
        }

        resolve(data.data as Data<T>)
      },
      fail(err) {
        uni.showModal({
          title: '错误',
          showCancel: false,
          confirmColor: 'rgb(251,93,93)',
          content: err.errMsg,
        })
        reject(false)
      },
      complete() {
        uni.hideLoading()
        uni.stopPullDownRefresh()
      },
    })
  })
}

const http = {
  get<T = any>(url: string, params: object, conifg?: UniApp.RequestOptions): Promise<Data<T>> {
    return request<T>({ url, data: params, ...conifg, method: 'GET' })
  },
  post<T = any>(url: string, data: object, conifg?: UniApp.RequestOptions): Promise<Data<T>> {
    return request<T>({ url, data, ...conifg, method: 'POST' })
  },
  upload<T = uploadResp[]>(url: string, data: Partial<UniApp.UploadFileOption>): Promise<Data<T>> {
    return uploadFile<T>({ url, ...data })
  },
}
export default http
// async function http<>({
// 	api,
// 	loading=false,
// 	header={'content-type': 'application/json'},
// 	params=null,
// 	data={},
// 	method="POST"

// }){
// 	// 转换大写
// 	method = method.toUpperCase()

// 	if(loading){
// 		uni.showLoading({
// 			title: '加载中...'
// 		});
// 	}

// 	// 有params拼接api作为query
// 	if(params && method == "POST"){
// 		api = util.parseParam(api, params)

// 	}
// }
