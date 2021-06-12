var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var n2 = 10;
var x1 = "哈哈哈";
var x2 = [];
// 类
var Animal = /** @class */ (function () {
    function Animal(name) {
        // 属性
        this.name = name;
    }
    Animal.prototype.eat = function () {
        return "吃肉";
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(name) {
        return _super.call(this, name) || this;
    }
    Dog.prototype.say = function () {
        return this.name + " " + this.eat();
    };
    return Dog;
}(Animal));
var dog = new Dog("aaa"); // 实例化
dog.say();
// 直接通过(类名)来调用
var Animal2 = /** @class */ (function () {
    function Animal2() {
    }
    Animal2.eat = function () {
        return "吃肉";
    };
    Animal2.Name = "123";
    return Animal2;
}());
// 原本要通过 let AnimalE = new Animal2() AnimalE.eat()才可以
Animal2.eat(); // 静态方法
Animal2.Name;
// public  可以在任何地方被访问到,默认就是公共的
// protected 自己和子类可以访问
// private 任何人都不能访问(包括子类),只能在自己内部用
var A3 = /** @class */ (function () {
    function A3() {
    }
    A3.eat = function () {
        return "吃肉";
    };
    A3.Name = "123";
    return A3;
}());
A3.Name; // 123
// A3.eat() // 报错
var Yy = /** @class */ (function () {
    function Yy() {
    }
    Yy.prototype.Yeat = function () {
        return "吃肉";
    };
    Yy.prototype.eat2 = function () {
        return "吃鱼";
    };
    return Yy;
}());
var Lwh = /** @class */ (function (_super) {
    __extends(Lwh, _super);
    function Lwh() {
        return _super.call(this) || this;
    }
    Lwh.prototype.fun = function () {
        return this.Yeat();
        //子类的内部是可以访问的
    };
    return Lwh;
}(Yy));
var yy = new Yy();
var lwh = new Lwh();
//lwh.Yeat() 这样访问会报错
lwh.fun();
