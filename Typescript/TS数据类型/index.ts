// 数据类型
let str: string = "10";
let num: number = 10;
let nul: null = null;
let unde: undefined = undefined;
let bool: boolean = true;

// 任意类型
let anys: any = "10";
anys = 10;
anys = true;
anys = null;

// 定义数组
let arr: number[] = [1, 2, 3, 4];
let arr2: string[] = ["1", "2", "3"];
let arr3: any[] = ["1", 1, true, [66]];

// 元组 指定数组中元素的类型
let tuple: [number, string, boolean] = [100, "200", true];

// 枚举,表示 (200和 500) 代表什么意思，给这个值做一个标记
enum LWH {
  success = 200,
  fail = 500,
}

// 联合类型,多个类型
let more: number | string;
more = 10;
more = "哈哈哈哈";

// 函数类型   传的必须是数字类型  返回值必须是字符串
function fun(x: number, y: number): string {
  return "88888";
}

fun(1, 2);

// void 没有返回值 (?) 表示可有可无
function fun2(x: number = 30, y?: number): void {
  console.log(x, y);
}
fun2();
