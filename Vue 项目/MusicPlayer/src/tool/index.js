// 时间格式化 !
export function Time(time) {
  let old = new Date(time); // 根据传进来的时间进行处理
  let h = old.getHours(); //小时
  let m = old.getMinutes(); //分钟
  let Y = old.getFullYear(); //年份
  let M = old.getMonth() + 1; //月份
  let D = old.getDate(); //日期
  // 处理时间
  M < 10 ? (M = "0" + M) : M; // 月份
  D < 10 ? (D = "0" + D) : D; // 日期
  h < 10 ? (h = "0" + h) : h; // 小时
  m < 10 ? (m = "0" + m) : m; // 分钟
  return Y + "-" + M + "-" + D + " " + h + ":" + m; // 返回年月日,时间
}
// 播放时间 !
export function PlayTime(time) {
  // 微妙 / 1000 = 毫秒
  // 毫秒 / 60 = 分钟
  // 分
  let min = Math.floor(time / 1000 / 60);
  min = min < 10 ? "0" + min : min;
  // 秒
  let sec = Math.floor((time / 1000) % 60);
  sec = sec < 10 ? "0" + sec : sec;
  return min + ":" + sec;
}
// 播放量  !
export function PlayVolume(count) {
  // 90000 / 10000  = 9万
  // 3000000 / 10000 = 300万
  // 30000000 / 10000 = 3000万
  let num = count / 10000;

  if (count <= 10000) {
    return count;
  } else if (num <= 10) {
    // 处理小于 10万的
    return parseInt(num) + "万";
  } else if (num >= 10 && num <= 9999) {
    // 处理大于 10万 小于 9千万的
    return parseInt(num) + "万";
  } else {
    // 处理小于10亿的
    return parseInt(count / 100000000) + "亿";
  }
}
// 获取对应图片
export function GetCorrespondImg(imgUrl, size) {
  return `${imgUrl}?param=${size}x${size}`;
}
