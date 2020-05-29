// 定义最大的fontSize
const MAX_FONT_SIZE = 42

// 监听html文档呗解析的时间
document.addEventListener('DOMContentLoaded', () => {
  // 获取html标签
  const html = document.querySelector('html')
  // 获取根元素fontSize的表述
  let fontSize = window.innerWidth / 10
  // 获取到的fontSize不许超过最大范围
  fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
  // 定义根元素（html）fontSize的大小（rem）
  html.style.fontSize = fontSize + 'px'
})
