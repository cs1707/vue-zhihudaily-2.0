export function date (val) {
  if (!val) {
    return ''
  }
  val = val.toString()
  let y = val.slice(0, 4)
  let m = val.slice(4, 6)
  let d = val.slice(6)
  let date = new Date(y, m - 1, d)
  let arr = ['日', '一', '二', '三', '四', '五', '六']
  return `${y}年${m}月${d}日 星期${arr[date.getDay()]}`
}
