// 类型别名 type
type num = number; // num 等于 number
let n2: num = 10;

// 联合类型别名
type multi = string | number[];
let x1: multi = "哈哈哈";
let x2: multi = [];

// 类
class Animal {
  // 类的名字为 Animal
  name: string;
  constructor(name) {
    // 属性
    this.name = name;
  }
  eat() {
    return "吃肉";
  }
}
class Dog extends Animal {
  constructor(name) {
    super(name); // 传到父类里
  }
  say() {
    return this.name + " " + this.eat();
  }
}
let dog = new Dog("aaa"); // 实例化
dog.say();

// 直接通过(类名)来调用
class Animal2 {
  static eat() {
    return "吃肉";
  }
  static Name: string = "123";
}
// 原本要通过 let AnimalE = new Animal2() AnimalE.eat()才可以
Animal2.eat(); // 静态方法
Animal2.Name;

// public  可以在任何地方被访问到,默认就是公共的
// protected 自己和子类可以访问
// private 任何人都不能访问(包括子类),只能在自己内部用
class A3 {
  public static Name = "123";

  private static eat() {
    return "吃肉";
  }
}
A3.Name; // 123
// A3.eat() // 报错

class Yy {
  protected Yeat() {
    return "吃肉";
  }
  eat2() {
    return "吃鱼";
  }
}
class Lwh extends Yy {
  constructor() {
    super();
  }
  fun() {
    return this.Yeat();
    //子类的内部是可以访问的
  }
}
let yy = new Yy();
let lwh = new Lwh();
//lwh.Yeat() 这样访问会报错
lwh.fun();
