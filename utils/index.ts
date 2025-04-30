// 拼接url
const parseParam = function (url, data) {
  url += (!url.includes('?') ? '?' : '&') + param(data)
  // console.log("url1:",url)
  return url
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
export default { parseParam }
