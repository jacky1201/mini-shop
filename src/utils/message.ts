const msg = (
  title: string,
  duration = 1500,
  mask = false,
  icon: 'none' | 'success' | 'loading' | 'error' | 'fail' | 'exception' | undefined = 'none'
) => {
  // 统一提示方便全局修改
  if (Boolean(title) === false) {
    return
  }
  uni.showToast({
    title,
    duration,
    mask,
    icon,
  })
}

const success = (title: string, duration = 1500) => {
  // 统一提示方便全局修改
  if (Boolean(title) === false) {
    return
  }
  const mask = false
  const icon = 'success'
  uni.showToast({
    title,
    duration,
    mask,
    icon,
  })
}

const error = (title: string, duration = 1500) => {
  // 统一提示方便全局修改
  if (Boolean(title) === false) {
    return
  }
  const mask = false
  const icon = 'error'
  uni.showToast({
    title,
    duration,
    mask,
    icon,
  })
}

export { msg, success, error }
