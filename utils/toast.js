function toast(title, duration = 3000) {
  uni.showToast({
    title,
    icon: "none",
    duration
  })
}

// 失败
toast.err = function(title, duration = 3000) {
  uni.showToast({
    title,
    icon: "error",
    duration
  })
}
// 成功
toast.success = function(title, duration = 3000) {
  uni.showToast({
    title,
    icon: "success",
    duration
  })
}

export default toast
