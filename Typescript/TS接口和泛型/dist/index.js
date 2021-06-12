// fun1 的参数必须满足 OBJ 接口的规范
function fun1(arg) {
    console.log(arg);
}
fun1({ age: 18, name: "张三" }); // 顺序不正确是可以的
// 泛型
// 是指在定义函数、接口或类时候,不先指定具体的类型,而在使用时再指定它的类型
// <T> T表示泛型变量  表示任何类型
// <S> 这样也可以,不一定要用 T <这里里面值表示任何类型>
function hello(name) {
    //函数、参数、返回的结果都不确定是什么类型
    // hello函数是泛型
    return name;
}
hello("6666"); //类型推断,编译器会根据传入的参数来自动的判断T的类型(也就是传的是什么,就是什么类型)
hello(81); //指定类型
function hello2(name) {
    // 约束你传的参数内部属性必须有 length 属性
}
hello2("123");
hello2([123]);
//指定泛型
function yy(name, age) {
    console.log(name);
    console.log(age);
}
yy("张三", 55);
// age 被值定位 number 类型了
// 因为 age 加了泛型 , yy<number>()指定是数值类型
// 泛型在类中运用
var A3 = /** @class */ (function () {
    function A3(num) {
        this.n = num;
    }
    A3.prototype.add = function (x) {
        return x;
    };
    return A3;
}());
var a3 = new A3(1);
