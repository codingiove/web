import moment from "moment";
// 手动引入中文
import "moment/locale/zh-cn";
// 设置中文
moment.locale("zh-cn");

let timer = moment().endOf("day").fromNow();
console.log(timer);
