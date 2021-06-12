// 歌单播放量格式化
export function getCount(count) {
  let num = count / 10000;
  if (count <= 10000) {
    return count;
  } else if (num <= 10) {
    // 处理小于 10万的
    return Math.floor(num) + "万";
  } else if (num >= 10 && num <= 9999) {
    // 处理大于 10万 小于 9千万的
    return Math.floor(num) + "万";
  } else {
    // 处理上亿的
    return Math.floor(count / 100000000) + "亿";
  }
}
// 设置小图,节约性能
export function getSizeImage(imgUrl, size) {
  return `${imgUrl}?param=${size}x${size}`;
}
// 时间格式化函数
export function formatDate(time, fmt) {
  let date = new Date(time);

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}
// 月日格式化
export function formatMonthDay(time) {
  return formatDate(time, "MM月dd日");
}
// 分秒格式化
export function formatMinuteSecond(time) {
  return formatDate(time, "mm:ss");
}

// 获取歌曲链接
export function getPlaySong(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}
