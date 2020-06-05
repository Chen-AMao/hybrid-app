import Vue from 'vue'

/**
 * 金额数据处理
 * @param value 调用过滤器时，调用的文本
 */
Vue.filter('priceValue', function (value) {
  // 如果文本不存在，返回空字符
  if (!value) {
    return ''
  }

  // 文本转化为float
  const result = parseFloat(value)
  // 整数
  if (Number.isInteger(result)) {
    return result
  }
  // 否则包含小数
  return result.toFixed(2)
})

/**
 * 时间过滤器
 */
Vue.filter('filterTime', function (value) {
  if (!value) return ''

  // 时间不是时间格式 时:分:秒
  if (value.indexOf(':') === -1) return value

  let result = ''
  // arr[0] 小时
  // arr[1] 分钟
  // arr[2] 秒数
  const arr = value.split(':')
  result = (parseInt(arr[0]) < 10) ? ('0' + arr[0]) : arr[0]
  result += (parseInt(arr[1]) < 10) ? (':0' + arr[1]) : (':' + arr[1])
  result += (parseInt(arr[2]) < 10) ? (':0' + arr[2]) : (':' + arr[2])
  return result
})
