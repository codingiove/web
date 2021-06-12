// 数据类型
var str = "10";
var num = 10;
var nul = null;
var unde = undefined;
var bool = true;
// 任意类型
var anys = "10";
anys = 10;
anys = true;
anys = null;
// 定义数组
var arr = [1, 2, 3, 4];
var arr2 = ["1", "2", "3"];
var arr3 = ["1", 1, true, [66]];
// 元组 指定数组中元素的类型
var tuple = [100, "200", true];
// 枚举,表示 (200和 500) 代表什么意思，给这个值做一个标记
var LWH;
(function (LWH) {
    LWH[LWH["success"] = 200] = "success";
    LWH[LWH["fail"] = 500] = "fail";
})(LWH || (LWH = {}));
// 联合类型,多个类型
var more;
more = 10;
more = "哈哈哈哈";
// 函数类型   传的必须是数字类型  返回值必须是字符串
function fun(x, y) {
    return "88888";
}
fun(1, 2);
// void 没有返回值 (?) 表示可有可无
function fun2(x, y) {
    if (x === void 0) { x = 30; }
    console.log(x, y);
}
fun2();
