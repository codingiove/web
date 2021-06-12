// 接口,简称约束
interface OBJ {
  name: string;
  age: number;
}
// fun1 的参数必须满足 OBJ 接口的规范
function fun1(arg: OBJ) {
  console.log(arg);
}
fun1({ age: 18, name: "张三" }); // 顺序不正确是可以的

// 泛型
// 是指在定义函数、接口或类时候,不先指定具体的类型,而在使用时再指定它的类型
// <T> T表示泛型变量  表示任何类型
// <S> 这样也可以,不一定要用 T <这里里面值表示任何类型>
function hello<T>(name: T): T {
  //函数、参数、返回的结果都不确定是什么类型
  // hello函数是泛型
  return name;
}
hello("6666"); //类型推断,编译器会根据传入的参数来自动的判断T的类型(也就是传的是什么,就是什么类型)
hello<number>(81); //指定类型

// 泛型的约束 extends
interface Length {
  length: number;
}
function hello2<S extends Length>(name: S) {
  // 约束你传的参数内部属性必须有 length 属性
}
hello2("123");
hello2([123]);

//指定泛型
function yy<T>(name, age: T) {
  console.log(name);
  console.log(age);
}
yy<number>("张三", 55);
// age 被值定位 number 类型了
// 因为 age 加了泛型 , yy<number>()指定是数值类型

// 泛型在类中运用
class A3<T> {
  n: T;
  constructor(num: T) {
    this.n = num;
  }
  add(x: T): T {
    return x;
  }
}
let a3 = new A3(1);
