function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

function mobileScreen(mobile) {
  // var tel = "18827768782";
  const reg = /^(\d{3})\d{4}(\d{4})$/
  const tel = mobile.replace(reg, '$1****$2')
  return tel
}

const getQueryString = function (url, name) {
  // console.log("url = " + url)
  // console.log("name = " + name)
  // =([^&|/?]*)(&|/?|$)
  const reg = new RegExp(`(^|&|/?)${name}=([^&/?]*)(&|/?|$)`, 'i')
  const r = url.substr(1).match(reg)
  if (r !== null) {
    // console.log("r = " + r)
    // console.log("r[2] = " + r[2])
    return r[2]
  }
  return null
}

function param(data) {
  let url = ''
  for (const k in data) {
    const value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  // console.log("url:",url)
  // 去除第一个&
  return url ? url.substring(1) : ''
}

// 拼接url
const parseParam = function (url, data) {
  url += (!url.includes('?') ? '?' : '&') + param(data)
  // console.log("url1:",url)
  return url
}

/**
 * 货币格式化
 * @param price
 * @returns {string}
 */
function formatPrice(price) {
  if (typeof price === 'undefined')
    return '--'
  if (typeof price !== 'number')
    return price
  return String(Number(price).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

//  支付后回调拉起支付
// @payData = 支付平台后端返回的data
// @backPath = 查看订单返回的地址
// function payCallBack(payData, backPath) {
//   const { sysPayInfo, redirectUrl } = payData
//   return new Promise((resolve, reject) => {
//     // 余额支付，直接跳走成功
//     if (sysPayInfo.reqModType == 'direct') {
//       resolve(true)
//       return false
//     }
//     else if (sysPayInfo.reqModType == 'wakeup') {
//       if (!payData.payInfo) {
//         uni.showToast({
//           title: '支付失败,请稍后重试',
//           icon: 'none',
//         })
//         reject(false)
//         return false
//       }

//       // 微信支付
//       const payInfo = JSON.parse(payData.payInfo)
//       uni.requestPayment({
//         timeStamp: payInfo.timeStamp,
//         nonceStr: payInfo.nonceStr,
//         package: payInfo.package,
//         signType: payInfo.signType,
//         paySign: payInfo.paySign,
//         success(res) {
//           resolve(true)
//         },
//         fail(res) {
//           // 微信支付取消回调只能使用这里
//           let url = '/pages/order/payResult?type=error&title=支付取消'
//           if (backPath)
//             url += `&path=${encodeURIComponent(backPath)}`

//           uni.redirectTo({
//             url,
//           })
//           reject(false)
//         },

//       })
//     }
//     else if (sysPayInfo.reqModType == 'jump') {
//       const url = `https://meilin.cinlet.cn/meilin-otherpay/#/?url=${encodeURIComponent(redirectUrl)}&params=ceshi`
//       uni.redirectTo({
//         url: `/pages/webview/webview?url=${encodeURIComponent(url)}`,
//       })
//       resolve(true)
//     }
//     else if (sysPayInfo.reqModType == 'coupon') {
//       resolve(true)
//     }
//     else {
//       reject(false)
//     }
//   })
// }

/**
 * 处理富文本里的图片宽度自适应
 * 1.去掉img标签里的style、width、height属性
 * 2.img标签添加style属性：max-width:100%;height:auto
 * 3.修改所有style里的width属性为max-width:100%
 * 4.去掉<br/>标签
 * @param html
 * @returns {void|string|*}
 */
function formatRichText(html) {
  let newContent = html.replace(/<img[^>]*>/gi, (match) => {
    match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '').replace(/style=""/gi, '').replace(/style=''/gi, '')
    match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '').replace(/width=""/gi, '').replace(/width=''/gi, '')
    match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '').replace(/height=""/gi, '').replace(/height=''/gi, '')

    return match
  })
  newContent = newContent.replace(/style="[^"]+"/gi, (match) => {
    match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;')
    return match
  })
  newContent = newContent.replace(/<br[^>]*\/>/gi, '')
  newContent = newContent.replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"')
  return newContent
}

function getAddr(StorageKey = 'ADDRESS') {
  const address = JSON.parse(uni.getStorageSync(StorageKey) || '[]')
  let addressInfo = null
  if (address.length === 0)
    return null

  for (let i = 0; i < address.length; i++) {
    if (address[i].chose) {
      addressInfo = address[i]
      break
    }
  }
  if (!addressInfo)
    addressInfo = address[0]

  return addressInfo
}

function getLocation() {
  return new Promise((resolve, reject) => {
    uni.getSetting({
      success: (res) => {
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] !== undefined && res.authSetting['scope.userLocation'] !== true) {
          uni.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success(res) {
              if (res.cancel) {
                uni.getLocation({
                  type: 'gcj02',
                  success(res) {
                    resolve(res)
                  },
                  fail(res) {
                    reject(res)
                  },
                })
              }
              else if (res.confirm) {
                uni.openSetting({
                  success(dataAu) {
                    if (dataAu.authSetting['scope.userLocation'] === true) {
                      uni.getLocation({
                        type: 'gcj02',
                        success(res) {
                          resolve(res)
                        },
                        fail(res) {
                          reject(res)
                        },
                      })
                      // 再次授权，调用wx.getLocation的API
                      // that.getLocation();
                    }
                    else {
                      uni.getLocation({
                        type: 'gcj02',
                        success(res) {
                          resolve(res)
                        },
                        fail(res) {
                          reject(res)
                        },
                      })
                    }
                  },
                })
              }
            },
          })
        }
        else if (res.authSetting['scope.userLocation'] === undefined) {
          // 调用wx.getLocation的API
          uni.getLocation({
            type: 'gcj02',
            success(res) {
              resolve(res)
            },
            fail(res) {
              reject(res)
            },
          })
        }
        else {
          uni.getLocation({
            type: 'gcj02',
            success(res) {
              resolve(res)
            },
            fail(res) {
              reject(res)
            },
          })
        }
      },
    })
  })
}

export {
  formatTime,
  mobileScreen,
  getQueryString,
  parseParam,
  formatPrice,
  // payCallBack,
  formatRichText,
  getAddr,
  getLocation,
}
