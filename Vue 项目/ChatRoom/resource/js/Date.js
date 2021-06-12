export default {
  // 时间处理
  dateTime(Time) {
    return this.SameLogic(Time);
  },
  // 间隔时间差
  Interval_time(old, now) {
    // old = new Date(old);
    // now = new Date(now);
    let told = new Date(old).getTime(); // 之前输入的时间
    let tnow = new Date(now).getTime(); // 当前时间
    // 当前时间 >= 之前输入的时间
    return tnow >= told + 1000 * 60 * 5 ? now : "";
  },
  // 时间段
  TimeSlot(Hours, Minute) {
    let Str;
    if (Hours >= 6 && Hours <= 8) {
      Str = "早上";
    } else if (Hours > 8 && Hours <= 11) {
      Str = "上午";
    } else if (Hours >= 12 && Hours <= 13) {
      Str = "中午";
    } else if (Hours > 13 && Hours <= 18) {
      Str = "下午";
    } else if (Hours >= 19 && Hours <= 23) {
      Str = "晚上";
    } else if (Hours >= 0 && Hours <= 5) {
      Str = "凌晨";
    }
    return `${Str}${Hours}:${Minute}`;
  },
  // 年月日处理
  check(item, type) {
    item = new Date(item);
    const Year = item.getFullYear();
    const Month = item.getMonth() + 1;
    const Day = item.getDate();
    if (type) {
      return `${Year}${type}${Month}${type}${Day}`;
    } else {
      return `${Year}年${Month}月${Day}日`;
    }
  },
  // 聊天时间处理
  ChatTimeProcessing(Time) {
    return this.SameLogic(Time, "Chat");
  },
  // 相同逻辑
  SameLogic(Time, type) {
    let old = new Date(Time);
    let h = old.getHours();
    let m = old.getMinutes();
    let Y = old.getFullYear();
    let M = old.getMonth() + 1;
    let D = old.getDate();

    let now = new Date();
    let nY = now.getFullYear();
    let nM = now.getMonth() + 1;
    let nD = now.getDate();
    h < 10 && (h = "0" + h);
    m < 10 && (m = "0" + m);
    const TIme = M === nM && Y === nY;
    // 处理今天时间
    if (D === nD && TIme) return this.TimeSlot(h, m);
    // 处理昨天时间
    if (D + 1 === nD && TIme) {
      return type == "Chat" ? `昨天 ${this.TimeSlot(h, m)}` : `昨天`;
    }
    // 处理这周时间
    let ThisMonday = new Date(now - (now.getDay() - 1) * 86400000); // 本周一
    let LastDay = new Date((ThisMonday / 1000 + 6 * 86400) * 1000); // 本周最后一天

    const BeforeTime = this.check(old);
    ThisMonday = this.check(ThisMonday);
    LastDay = this.check(LastDay);
    //  判断是不是这周
    if (BeforeTime >= ThisMonday && BeforeTime <= LastDay) {
      let weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][
        old.getDay()
      ];
      return type == "Chat" ? `${weekDay} ${h}:${m}` : `${weekDay}`;
    } else {
      if (type == "Chat") {
        // 不是今年
        if (Y !== nY) return `${Y}年${M}月${D}日 ${this.TimeSlot(h, m)}`;
        // 是今年,但不是这周
        return `${M}月${D}日 ${this.TimeSlot(h, m)}`;
      } else {
        return `${M}月${D}日`;
      }
    }
  },
};
// 时间间隔
// TimeInterval(startTime) {
//   // 1天 = 86400 秒
//   // 1小时 = 3600 秒
//   // 1秒 = 1000 毫秒
//   let endTime = new Date().getTime();
//   startTime = new Date(startTime).getTime();
//   let runTime = parseInt((endTime - startTime) / 1000);
//   let year = Math.floor(runTime / 86400 / 365);
//   runTime = runTime % (86400 * 365);
//   let month = Math.floor(runTime / 86400 / 30);
//   runTime = runTime % (86400 * 30);
//   let day = Math.floor(runTime / 86400);
//   runTime = runTime % 86400;
//   let hour = Math.floor(runTime / 3600);
//   runTime = runTime % 3600;
//   let minute = Math.floor(runTime / 60);
//   runTime = runTime % 60;
//   let second = runTime;
//   let str = "";
//   if (year > 0) {
//     str = year + "年";
//   }
//   if (year <= 0 && month > 0) {
//     str = month + "月";
//   }
//   if (year <= 0 && month <= 0 && day > 0) {
//     str = day + "天";
//   }
//   if (year <= 0 && month <= 0 && day <= 0 && hour > 0) {
//     str = hour + "小时";
//   }
//   if (year <= 0 && month <= 0 && day <= 0 && hour <= 0 && minute > 0) {
//     str = minute + "分钟";
//   }
//   if (
//     year <= 0 &&
//     month <= 0 &&
//     day <= 0 &&
//     hour <= 0 &&
//     minute <= 0 &&
//     second > 0
//   ) {
//     str += second + "秒";
//   }
//   str += "前";
//   return str;
// }
