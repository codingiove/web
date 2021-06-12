JavaScript整理



[TOC]

###  数组

|    改变原数组    | push, pop, shift, unshift, sort ,reverse, splice |
| :--------------: | :----------------------------------------------: |
| **不改变原数组** |            **concat,  join,  split**             |



|                          改变原数组                          |
| :----------------------------------------------------------: |
|                   var arr = [1, 2, 3, 5];                    |
|             **arr.push(4); //往数组后面添加 4**              |
|        **arr.pop()   //剪切数组最后一位 ，忽略传参**         |
|          **arr.shift()  //删除数组中的第一个元素**           |
|        **arr.unshift() //跟push一样只不过在前面添加**        |
|                 **arr.reverse() //逆转顺序**                 |
| **arr.splice(0,2,1,) //(从第几位开始 , (截取的长度) , 在截取的位置添加新数据)** |
|         **arr.splice(3,0,4)  //在第三位添加一个 4**          |
|                   ***arr.sort(); //排序***                   |



|                       **不改变原数组**                       |
| :----------------------------------------------------------: |
|     **arr.concat(arr1) //两个数组合并 ，在控制台输入看**     |
| **arr.join("-")  //把数组的每一位以-连接起来（按照参数来连接） ，并返回字符串形式** |
|   **arr.split("-")  //你用什么形式拼接 ，就以什么形式拆**    |



### 数组的方法	

```javascript
 ### map,filter,concat,splice,slice 会形成一个新的数组
    //(回调函数中传递三个参数:)
    // 第一个参数，每一个数组元素
    // 第二个参数，每一个数组元素的索引
    // 第三个参数，数组本身
	(1) filter返回的是满足条件的(只能返回 true/false,并且返回的是一个新数组) 数组过滤 返回满足条件的数组
	 var arr = [1, 2, 3, 8, 9, 6];
     var a = arr.filter(item => {
      //item就是满足条件的 === 8,9,6
      return item > 5;
     }); //.length就是满足条件的长度
     console.log(a);
     var arr2 = [
          { name: "不满足1", age: false },
          { name: "满足1", age: false },
          { name: "不满足2", age: false },
          { name: "不满足3", age: false },
          { name: "满足2", age: false },
          { name: "满足3", age: true }
        ];
        var b = arr2.filter(item => {
          //默认返回的是 true
          return item.age == false; //item.age写法 === item.age = true
        });
        console.log(b);

	(2)every方法做全选就是个很好的例子
    every 如果有一个返回false,则停止遍历,此方法返回false 要求每一项都返回true,最终的结果才返回true
     var b = arr2.every(item => item.age);
     console.log(b);

    (3)some方法
    some 如果有一个返回true,则停止遍历,此方法返回true 要求每一项都返回false,最终的结果才返回false
     var b = arr2.some(item => item.age);
     console.log(b);

    (4)排序
     var arr2 = [5, 2, 11, 3, 4, 1];
     自定义排序规则
     var result = arr2.sort(function(a, b) {
      return a - b; // 升序排列 正
       // return b - a; // 降序排列 反
     });
     console.log(JSON.stringify(result));//解析成字符串格式

    (5)forEach和for循环类似只不过可以遍历索引值和当前数组
    //(回调函数中传递三个参数:)
    // 第一个参数，每一个数组元素
    // 第二个参数，每一个数组元素的索引
    // 第三个参数，数组本身
    var arr = ["王一", "王二", "王三"];
    arr.forEach(function(item, index, obj) {
      console.log("每个数组元素:"+" "+ item);
      console.log("每个数组元素的索引:"+" "+ index);
      console.log("数组本身:"+" "+ obj);
    });
      /*
      每个数组元素: 王一
      每个数组元素的索引: 0
      数组本身: 王一,王二,王三
      ----------
      每个数组元素: 王二
      每个数组元素的索引: 1
      数组本身: 王一,王二,王三
      ----------
      每个数组元素: 王三
      每个数组元素的索引: 2
      数组本身: 王一,王二,王三
      ----------
    */

    (6)map可以对数组进行修改和其他操作
    var arr1 = [1, 3, 6, 2, 5, 6];
    var arr2 = arr1.map(function(item, index) {
      // return item + 10; //让arr1中的每个元素加10
      //可以对数组进行操作
      return item + 10;
    });
    console.log(arr2); //[11, 13, 16, 12, 15, 16]
      const arr1 = [
        { name: '千古壹号', age: '28' },
        { name: '许嵩', age: '32' ,},
    ];
    //将数组 arr1 中的 name、age这两个属性，改一下“键”的名字，存储到 arr2中
    const arr2 = arr1.map(item => ({
        myName: item.name,
        myAge: item.age,
    })); 
    //将数组 arr1 中的 name 属性，存储到 数组 arr2 中
    const arr2 = arr1.map(item => {
      return item.name
    })
    //修改arr1的 name 和 age
    const arr3 = arr1.map(arr1 =>({mingcheng:arr1.name, nn:arr1.age,}))
    console.log('arr2:' + JSON.stringify(arr2));
    console.log('arr3:' + JSON.stringify(arr3));

    (7)reduce 累加器 
    参数解释:
    //previousValue:计算结束后返回的值，或者初始值
    //currentValue:每一个数组元素
    //currentIndex:每一个数组元素的索引
    //array:调用reduce()方法的数组
    //initialValue:初始值（作为第一次调用函数时传给 previousValue 的值
    var arr = [1,1,1,1];
    sumValue = arr.reduce(function(previousValue, item) {
        return previousValue + item;
                 0   +  1 ---- 1
        		 1   +  1 ---- 2
        		 2   +  1 -----3
        		 3   +  1 -----4
        		 返回 4
        //previousValue 计算结束后返回的值  
        //item  每个数组元素
        //index 每个数组元素的索引
    },0);//初始值
    console.log('sumValue:' + sumValue); // 打印结果:4
    
	
    (8)
    //数组的其他方法
    indexOf(value)//从前往后索引，获取 value 在数组中的第一个下标。
    lastIndexOf(value) //从后往前索引，获取 value 在数组中的最后一个下标。
    var arr = ["a","b","c","d","e","d","c"];
    console.log(arr.indexOf("c"));       //从前往后，找第一个"c"在哪个位置 2
    console.log(arr.lastIndexOf("d"));   //从后往前，找第一个"d"在哪个位置 5
 
    var arr = ["29926392220", "29965620629", "28003663436", " ", "28818504366"];
    var str = [
    {name:"smyh", id: "12334"},
    {name:"vae", id: "28818504366"}
    ];
    //先过滤器一遍看看那些满足条件如果不满足条件就 - 1
    str.filter(item => {
    console.log(arr.indexOf(item.id));
    })

    (9)
    find()//找出第一个满足指定条件的元素。
    let arr = [2, 3, 2, 5, 7, 6];
      let result = arr.find(function (item, index) {
          return item > 4; //遍历数组arr，一旦发现有第一个元素大于4，就把这个元素返回
          //备注：一旦找到符合条件的第一个元素，将不再继续往下遍历。
        });
    console.log(result);  //打印结果：5
  
    (10)
    findIndex()//找出第一个满足指定条件的元素的index。
    let arr = [2, 3, 2, 5, 7, 6];
     let result = arr.findIndex(function (item, index) {
      return item > 4; //遍历数组arr，一旦发现有第一个元素大于4，就把这个元素的index返回
    });
    console.log(result); //打印结果：3
```



### Math 

Math属于一个工具类，里面封装了数学运算相关的属性和方法。如下：

| 方法              | 描述                                       | 备注              |
| :---------------- | :----------------------------------------- | :---------------- |
| Math.PI           | 圆周率                                     | Math对象的属性    |
| Math.abs()        | **返回绝对值**                             |                   |
| Math.floor()      | **向下取整**（往小取值）                   |                   |
| Math.ceil()       | **向上取整**（往大取值）                   |                   |
| Math.round()      | 四舍五入取整（正数四舍五入，负数五舍六入） |                   |
| Math.random()     | 生成0-1之间的**随机浮点数**                | 取值范围是 [0，1) |
| Math.max(x, y, z) | 返回多个数中的最大值                       |                   |
| Math.min(x, y, z) | 返回多个数中的最小值                       |                   |
| Math.pow(x,y)     | 返回 x 的 y 次幂                           |                   |
| Math.sqrt()       | 对一个数进行开方运算                       |                   |

**举例**：

```javascript
    var num = -0.6;

    console.log(Math.abs(num));        //取绝对值

    console.log(Math.floor(num));      //向下取整，向小取

    console.log(Math.ceil(num));       //向上取整，向大取

    console.log(Math.round(num));      //四舍五入取整（正数四舍五入，负数五舍六入）

    console.log(Math.random());        //生成0-1之间的随机数
```

运行结果：

```
    0.6

    -1

    -0

    -1

    0.6453756205275165
```



##### Math.random() 方法

方法定义：生成 (0, 1) 之间的**随机浮点数**。

我们来看几个例子。

##### 生成 (0, x) 之间的随机数

```javascript
    Math.round(Math.random()*x)
```


##### 生成 (x, y) 之间的随机数

```javascript
    Math.round(Math.random()*(y-x)+x)
```

##### 【重要】生成 [x, y]之间的随机整数

也就是说：生成两个整数之间的随机整数，**并且要包含这两个整数**。

这个功能很常用，我们可以将其封装成一个方法，代码实现如下：

```javascript
    /*
    * 生成两个整数之间的随机整数，并且要包含这两个整数
    */
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    console.log(getRandom(1, 10));
```



##### 随机点名

根据上面的例子，我们还可以再延伸一下，来看看随机点名的例子。

```javascript
    /*
    * 生成两个整数之间的随机整数，并且要包含这两个整数
    */
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const arr = ['许嵩', '邓紫棋', '毛不易', '解忧邵帅'];
    const index = getRandom(0, arr.length - 1); // 生成随机的index
    console.log(arr[index]); // 随机点名
```



### 对象

```javascript
#遍历对象
var obj = {
        a: "1",
        b: 2,
        c: 3,
        d: 4,
        e:'5', 
        __proto__: {
          laseName: "原型"
        }
      };
      //如果我想访问对象里面的(值) 通过这种方式去访问 obj[key]
      //hasOwnProperty 判断是不是自己的方法
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          //console.log(key); // 这里的 key 是：对象属性的键
          console.log(key + "-" + obj[key]); // 这里的 obj[key] 是：对象属性的值
        }
      }
#对象增删改查
 var duixiang = {
        name: "1",
        age: 18,
        sex: "牛",
        delete:"我被删除了"
      };
      //增加
      //duixiang.bbnb = "哔哔牛逼";

      //查 duixiang.等等（duixiang.name）

      //改
      //duixiang.age = 520

      //删
      //delete duixiang.delete
      console.log(duixiang);
```



### this

```javascript
  this的作用
    this可以帮我们简化很多代码。
    比如xiaoming.name、xiaoming.age可以直接写成this.name、this.age。

    以函数的形式调用时，this永远都是window。比如fun();相当于window.fun();
    以方法的形式调用时，this是调用方法的对象
    以构造函数的形式调用时，this是新创建的那个对象
    使用call和apply调用时，this是指定的那个对象  举个例子 ↓
    Person.call(this, name, age, sex, tel, grade); 
    那个对象 Person
    <!-- js的 this谁调用它,它就指向谁。 箭头函数 this -->
    <!-- 如果没有人调用那么this指向Windows -->
    <script>
       let name = "windon的name";
       let obj = {
        name: "obj的name",
         say: function func() {
           console.log(this.name);//obj的name
         }
       };
       obj.say();
      var num = 5;
      var obj = {
        num: 10,
        a: function() {
          return this.num;
        }
      };
      var fn = obj.a; //记住了这个没有调用a() ,this指向Windows
      console.log(fn()); //5
```



### 闭包

```js
#我个人理解:如果你循环出来不是你想要的结果或者是同一个值 ，那么就出现了闭包
#只要内部把值return或者保持到了外面就会有闭包,而函数执行完会销毁自己的AO 看下面的图片
缺点：函数执行完后, 函数内的局部变量没有释放，占用内存时间会变长，容易造成内存泄露,就是内存不足
#用立即执行函数每循环一次拿到的都是循环一次后面的结果
 function test() {
        var arr = [];i
        for (var i = 0; i < 5; i++) {
          (function(xindeI) {//每次拿到的i都是立即执行函数的 i ，每次拿到都是自己i
            arr[xindeI] = function() {
              console.log(xindeI);
            };
          })(i);//把i传进来
        }
        return arr;
      }
      var myArr = test();
      for (j = 0; j < 5; j++) {
        myArr[j]();
      }
#解决办法 1.把var改成let 2.立即执行函数
```

- **函数B已经拿到函数A里面的内容**

![](C:\Users\14456\OneDrive\桌面\GIT\git笔记\笔记\js笔记全\b.png)

​    **A函数执行完会销毁自己的AO，也就是scope chain 那一条线**

​     **所以你A函数销毁了自己的AO但我函数B还拿着你的AO，这样就行成了闭包**

![](C:\Users\14456\OneDrive\桌面\GIT\git笔记\笔记\js笔记全\a.jpg)

### 访问属性

```js
#最好用 obj["name"]在某些情况下obj.name 访问不到
//普通访问
      var obj = {
        name: "abc"
      };
      console.log(obj.name); //写起方便
      var obj2 = {
        name: "abc"
      };
      console.log(obj["name"]); //运行起来它更快一些
      let obj3 = {
        wife1: { name: "1" },
        wife2: { name: "2" },
        wife3: { name: "3" },
        wife4: { name: "4" },
        sayWife: function(num) {     //字符串加啥都等于字符串
          return this["wife" + num]; //我输入1(它就会拼接成 wife1,就会调用 wife1对象)
        }
      };
```



### 函数

```js
(1)函数的定义/声明
      //(命名函数)
      function fun1() {}
      //函数表达式 (匿名函数)
      var fun2 = function() {};
      //使用构造函数
      var fun3 = new Function('console.log("我是函数内部的内容");');
      fun3();
      // fn()和fn的区别【重要】
      // fn代表的是整个函数，而fn()代表的是返回值
```



### 同时声明多个变量和**变量的声明提前：**（变量提升）

```js
(1)同时声明多个变量
      var name = "千古壹号",
        age = 27,
        number = 100;
      //(2)先声明，再赋值
      var a;
      a = 200;
      console.log(a); // 打印结果：100
      //(3)不声明，只赋值：（正常）
      a = 300;
      console.log(a); 
	  // 打印结果：100 这个a在Windows上所以可以console.log(window.a);也能打印出结果
      //(4)只声明，不赋值：（注意，打印 undefined）
      var a;
      console.log(a); // 打印结果：undefined
      //(5)不声明，不赋值，直接使用：（会报错）
      console.log(a); // 会报错
      //交换两个变量的值,最基础的用一个变量先接收
      var a1 = 100;
      var a2 = 200;
      var temp;
      temp = a1;
      a1 = a2;
      a2 = temp;

#变量提升
使用var关键字声明的变量（ 比如 var a = 1），会在所有的代码执行之前被声明（但是不会赋值）
但是如果声明变量时不是用var关键字（比如直接写a = 1），则变量不会被声明提前。
举例1：
    console.log(a);
    var a = 123;//注意打印结果并没有报错，而是 undefined，说明变量 a 被提前声明了，只是尚未被赋值
举例2：
	console.log(a);
    a = 123;   // 此时a相当于window.a 程序会报错
举例3：
    a = 100
    console.log(a) //100 没有被变量提升
举例4：
foo();
function foo() {
    if (false) {
        var a = 123;
    }
    console.log(a);
}
打印结果：undefined。注意，打印结果并没有报错，而是 undefined。这个例子，再次说明了：变量 a 在函数执行前，就被提前声明了，只是尚未被赋值。
```



### 预编译流程

```js
(1)创建AO对象。AO即 Activation Object 活跃对象，其实就是「执行期上下文」。
(2)找形参和变量声明，将形参名和变量作为 AO 的属性名，值为undefined。
(3)将实参值和形参统一，实参的值赋给形参。
(4)查找函数声明,函数名作为 AO 对象的属性名，值为整个函数体。
    (1)
    AO{
        (2)
        a:undefined
        b:undefined
        (3)
        a:1
        b:undefined
        (4) 
        a:function fn
        b:undefined
    }

  function a(a) {
    //AO a:1 下一步 查找函数声明,函数名作为 AO 对象的属性名，值为整个函数体 AO a:1 ----> fun(){}
    var a = 100 
    //然后在执行第二步 AO a:fun(){}----> a:100
    console.log(a);//100
    function a() {}//AO里面把原有的100改成fun,继续执行
    var a = 200 //AO里面把原有的func该成200,继续执行
    console.log(a);//200

    function b() {}//原有的AO是undefined改成fun,继续执行
    console.log(b);//fun
    var b = 300;
    function b() {}//原有的AO里的fun改成300
    console.log(b);//300
  }
a(1)
```



### 栈内存和堆内存

```text
我们首先记住一句话：JS中,所有的变量都是保存在栈内存中的
然后来看看下面的区别. 基本数据类型:
基本数据类型的值,直接保存在栈内存中.值与值之间是独立存在,修改一个变量不会影响其他的变量

引用数据类型:
对象是保存到堆内存中的.每创建一个新的对象,就会在堆内存中开辟出一个新的空间,而变量保存了对象的内存地址
如果两个变量保存了同一个对象的引用,当一个通过一个变量修改属性时,另一个也会受到影响
```



### 作用域

```js
(1)作用域的访问关系
在内部作用域中可以访问到外部作用域的变量，在外部作用域中无法访问到内部作用域的变量。
 var a = "aaa";
  function foo() {
   var b = "bbb";
   var a = "ccc";
   console.log(a); //如果自己有这个变量就访问自己的没有就访问AO里,也就是全局
 }
foo();
console.log(b);
如果console.log(this.b)打印的就是undefined因为AO里面没有
报错：Uncaught ReferenceError: b is not defined 说明外层作用域无法访问内层作用域里的变量

(2)
任何变量，如果未经声明就赋值，此变量是属于 window 的属性，而且不会做变量提升,注意，无论在哪个作用域内赋值
比如说，如果我们直接在代码里写 console.log(a)，这肯定会报错的，提示找不到 a。
但如果我直接写 a = 100，这就不会报错，此时，这个 a 就是 window.a。
(2.1)变量的声明提前（变量提升）
 使用var关键字声明的变量（ 比如 var a = 1），会在所有的代码执行之前被声明（但是不会赋值）
 但是如果声明变量时不是用var关键字（比如直接写a = 1），则变量不会被声明提前
 console.log(a);
 var a = 123;
打印结果：undefined。注意，打印结果并没有报错，而是 undefined，说明变量 a 被提前声明了，只是尚未被赋值
 console.log(a);
   a = 123; //此时a相当于 window.a , 程序会报错：Uncaught ReferenceError: a is not defined。
   
   a = 123; //此时a相当于window.a
   console.log(a);//打印结果：123。

(3) 函数的声明提前
    函数声明：
    使用函数声明的形式创建的函数function foo(){}，会被声明提前。
    也就是说，整个函数会在所有的代码执行之前就被创建完成。所以，在代码顺序里，我们可以先调用函数，再定义函数。
      代码举例
      fn1(); // 虽然 函数 fn1 的定义是在后面，但是因为被提前声明了， 所以此处可以调用函数
      function fn1() {
      console.log("我是函数 fn1");
      }
	函数表达式：
	使用函数表达式创建的函数var foo = function(){}，不会被声明提前，所以不能在声明前调用。
    很好理解，因为此时foo被声明了（这里只是变量声明），且为undefined，并没有把 function(){} 赋值给 foo
    所以说，下面的例子，会报错：
    
(4)函数作用域
    提醒1：在函数作用域中，也有声明提前的特性：
    函数中，使用var关键字声明的变量，会在函数中所有的代码执行之前被声明。
    函数中，没有var声明的变量都是全局变量，而且并不会提前声明。
    举例：
       var a = 1;
       function foo() {
         console.log(a);
         a = 2; // 此处的a相当于window.a
       }
       foo();
       console.log(a); //打印结果是2
```



### 作用域链

> ```js
> - 当在函数作用域操作一个变量时，它会先在自身作用域中寻找，如果有就直接使用（就近原则）。
> - 如果没有则向上一级作用域中寻找，直到找到全局作用域；
> - 如果全局作用域中依然没有找到，则会报错 ReferenceError。
> # 函数里面的可以访问外面的，但外面的不能访问里面的
> 2.查找变量时就是沿着作用域链来查找的
> 
> ```



### call和apply的作用

```js
方法：改变this指向
  区别：传参列表不同
  1. call  (this,有几个实参就写几个形参)
  2. apply (this,[]要加一个括号)
  3.bind()传参的方式与call()相同
     Person.call(this, name, age, sex, tel, grade);
    这里的this指向Person因为是Person调用的this
    
      function Person(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
      }
      function Student(name, age, sex, tel, grade) {
        Person.call(this, name, age, sex, tel, grade);
        this.tel = tel;
        this.grade = grade;
      }
      var student = new Student("卢本伟", 1.88, 60, "牛逼", 5);
      console.log(JSON.stringify(student));
    //{"name":"卢本伟","age":1.88,"sex":60,"tel":"牛逼","grade":5}
      var persion1 = {
        name: "小王",
        gender: "男",
        age: 24,
        say: function(school, grade) {
		console.log( 
            this.name +" , "
            + this.gender + " ,今年" 
            + this.age + " ,在"
            + school + "上" 
            + grade );
        //小红 ,女 ,今年18 ,在实验小学上六年级
        }
      };
      var persion2 = {
        name: "小红",
        gender: "女",
        age: 18
      };
      persion1.say.call(persion2, "实验小学", "六年级");
      //用 persion1里的方法实现自己跟他一样的功能
```



### ES6

```js
let 和 const 的作用如下：
- 禁止重复声明
- 支持块级作用域
- 控制修改

可以定义常量 
   const e = 27;
    e = 888;
    console.log(e);//报错
       ↓ 不能给常量重新赋值，但如果是引用类型的话可以进行修改
      const e = {
        name: "111"
      };
      e.name = "const的name被该了";
      console.log(e);//{name: "const的name被该了"}

解构赋值
    //   写法1
    let { name, age, sex } = { name: "小煤球", age: 1, sex: "公" };
    // 结果: 小煤球 1 公
    console.log(name, age, sex);

    // 写法2: 解构重命名
    let { name: lkName, age: lkAge, sex: lkSex } = { name: "小煤球",age: 1,sex: "公"};
    console.log(lkName, lkAge, lkSex); // 结果: 小煤球 1 公

    //  写法3: 可以设置默认值
    let { name, age, sex = "公" } = { name: "小煤球", age: 1 };
    console.log(sex);// 公
     
    //  写法4:省略解构
    let [, , sex] = ["小煤球", 1, "公"];
    console.log(sex);//公

延展操作符
   // 延展数组
      let arr1 = ["a", "b", "c"];
      let arr2 = [1, 2, 3];
      let result = [...arr1, ...arr2];
      console.log(result);
       [ "a", "b", "c", 1, 2, 3 ]
   // 延展对象
      let smallDog = { name: "小煤球", age: 1 };
      let bigDog = { name: "Python", age: 2 };
      let dog = { ...smallDog, ...bigDog };
      console.log(dog);
      {name: "Python", age: 2}
      !!!注意: 如果对象中的属性一致, 会被覆
模板字符串
	模板字符串用反引号(//``)包含，变量用${}括起来; 在开发中使用是非常灵活的。
      let name = "小煤球";
      let sex = "公";
      let result = //`我叫 ${name} , 我是 ${sex} 的`; 动态获取参数
      console.log(result);
      我叫 小煤球 ,我是 公 的
      
      var name = 'smyhvae';
      var age = '26';
      console.log('name:'+name+',age:'+age);   //传统写法
      console.log(`name:${name},age:${age}`);  //ES6 写法
      
箭头函数
    function fn1(a, b) {//传统写法
    return a + b;
}
  console.log(fn1(1, 2));  //输出结果：3

    var fn2 = (a, b) => a + b;
	console.log(fn2(1, 2));  //输出结果：3
//1.如果有且仅有1个参数，则`()`可以省略 
//2.如果方法体内有且仅有1条语句，则`{}`可以省略,系统内部会帮我们 return,但前提是,这条语句必须是返回结果

参数默认值
function fn(param = 'hello') {
        console.log(param);
 }
在 ES6 中定义方法时，我们可以给方法里的参数加一个**默认值**（缺省值）
- 方法被调用时，如果没有给参数赋值，那就是用默认值
- 方法被调用时，如果给参数赋值了新的值，那就用新的值

6set
    Set有点像数组，不过跟数组不一样的是，Set里面不能有重复的内容；
    let set = new Set(["张三", "李四", "王五", "张三", "李四"]);
    console.log(set);
```

#### for循环举例【经典案例】

**代码1**、我们先来看看如下代码：（用 var 定义变量 i）

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta />
    <meta />
    <meta />
    <title>Document</title>
  </head>
  <body>
    <input type="button" value="aa" />
    <input type="button" value="bb" />
    <input type="button" value="cc" />
    <input type="button" value="dd" />

    <script>
      var myBtn = document.getElementsByTagName("input");
      for (var i = 0; i < myBtn.length; i++) {
        myBtn[i].onclick = function() {
          alert(i);
        };
      }
    </script>
  </body>
</html>
```

上方代码中的运行效果如下：

![](http://img.smyhvae.com/20190904_1030.gif)

你可能会感到诧异，为何点击任何一个按钮，弹出的内容都是4呢？这是因为，我们用 var 定义的变量 i，是在全局作用域声明的。整个代码中，自始至终只有一个变量。当我们还没点击按钮之前，变量 i 已经循环到4了。

也就是说，上面的 for 循环，相当于如下代码：

```javascript
	var i = 4;
	myBtn[0].onclick = function() {
	alert(i);
	};
	i++;

	myBtn[1].onclick = function() {
	alert(i);
	};
	i++;

	myBtn[2].onclick = function() {
	alert(i);
	};
	i++;

	myBtn[3].onclick = function() {
	alert(i);
	};
	i++;  // 到这里，i 的值已经是4了。因此，当我们点击按钮时，i的值一直都是4
```


**代码2**、上面的代码中，如果我们改为用 let 定义变量 i：

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta />
    <meta />
    <meta />
    <title>Document</title>
  </head>
  <body>
    <input type="button" value="aa" />
    <input type="button" value="bb" />
    <input type="button" value="cc" />
    <input type="button" value="dd" />

    <script>
      var myBtn = document.getElementsByTagName("input");

      for (let i = 0; i < myBtn.length; i++) {
        myBtn[i].onclick = function() {
          alert(i);
        };
      }
    </script>
  </body>
</html>
```

上方代码中的运行效果如下：

![](http://img.smyhvae.com/20190904_1040.gif)

上面这个运行结果，才是我们预期的效果。我们用 let 定义变量 i，在循环的过程中，每执行一次循环体，就会诞生一个新的 i。循环体执行4次，就会有四个 i



### JS数据类型

```html
1.JS 的变量数据类型,是在程序运行的过程中，根据等号右边的值来确定的
2.JS中一共有六种数据类型 基本数据类型（原始值类型） String Number Boolean Null 空值 Undefined 未定义
 引用数据类型(引用类型):Object 对象。
3.注意：内置对象 Function 、Array 、Date 、RegExp 、Error 等都是属于Object类型
  也就是说,(除了那五种基本数据类型之外),其他的,都称之为 Object类型。
4.
    数据类型之间最大的区别:
    基本数据类型：参数赋值的时候，传数值。
    引用数据类型：参数赋值的时候，传地址（修改的同一片内存空间）
```



### string

```js
replace()方法：替换
      var str2 = "Today is fine day,today is fine day !!!";
      console.log(str2);
      console.log(str2.replace("today", "tomorrow")); //只能替换第一个today
      console.log(str2.replace(/today/gi, "tomorrow")); //这里用到了正则，才能替换所有的today

      //去除前后的空格，trim();
      var str1 = "   a   b   c   ";
      console.log(str1);
      console.log(str1.trim());

      var str3 = "abcdEFG";
      //转换成小写
      console.log(str3.toLowerCase());
      //转换成大写
      console.log(str3.toUpperCase());

      //练习1："smyhvaevaesmyh"查找字符串中所有m出现的位置
      var str2 = "abcoefoxyozzopp";
      for (var i = 0; i < str2.length; i++) {
        //如果指定位置的符号=== "o"
        //str2[i]
        if (str2.charAt(i) === "o") {
          console.log(i);
        }
      }
```



### 事件委托

```js
window.onload = function() {
// 获取父节点，并为它绑定click单击事件。 false 表示事件在冒泡阶段触发（默认）
  document.getElementById('parent-list').addEventListener('click', function(event) {
  event = event || window.event;
  // e.target 表示：触发事件的对象
  // 如果触发事件的对象是我们期望的元素，则执行否则不执行
  if (event.target && event.target.className == 'link') {
  // 或者写成 if (event.target && event.target.nodeName.toUpperCase() == 'A') {
   console.log('我是ul的单击响应函数');
        }
     }, false);
  };
<body>
   <ul id="parent-list" style="background-color: #bfa;">
        <li><a href="javascript:;" class="link">超链接一</a></li>
        <li><a href="javascript:;" class="link">超链接二</a></li>
        <li><a href="javascript:;" class="link">超链接三</a></li>
   </ul>
 </body>
上方代码，为父节点注册 click 事件，当子节点被点击的时候，click 事件会从子节点开始向父节点冒泡。
父节点捕获到事件之后，开始执行方法体里的内容：通过判断 event.target 拿到了被点击的子节点<a>。
从而可以获取到相应的信息，并作处理。
换而言之，参数为false，说明事件是在冒泡阶段触发（子元素向父元素传递事件）。
而父节点注册了事件函数，子节点没有注册事件函数，此时，会在父节点中执行函数体里的代码。

总结：事件委托是利用了冒泡机制，减少了事件绑定的次数，减少内存消耗，提高性能。
```



### DOM事件的级别

```js
 <button>按钮</button>
     document.addEventListener("click", function() {
       console.log("11");
		}, false);
      /*参数解释：
        参数1：事件名的字符串(注意，没有on)
        参数2：回调函数：当事件触发时，该函数会被执行
        参数3：true表示捕获阶段触发，false表示冒泡阶段触发（默认）。
        如果不写，则默认为false。【重要】*/
      var btn = document.getElementsByTagName("button")[0];
      // addEventListener: 事件监听器。 原事件被执行的时候，后面绑定的事件照样被执行
      // 这种写法不存在响应函数被覆盖的情况。（更适合团队开发）
      btn.addEventListener("click", fn1);
      btn.addEventListener("click", fn2);

      function fn1() {
        console.log("事件1");
      }

      function fn2() {
        console.log("事件2");
      }
      /*
      我们可以看到，addEventListener()这种绑定事件的方式：
      一个元素的一个事件，可以绑定多个响应函数。不存在响应函数被覆盖的情况。
      执行顺序是：事件被触发时，响应函数会按照函数的绑定顺序执行。
      addEventListener()中的this，是绑定事件的对象。
      */

      /*
事件对象
当事件的响应函数被触发时，会产生一个事件对象event。浏览器每次都会将这个事件event作为实参传进之前的响应函数。
      这个对象中包含了与当前事件相关的一切信息。比如鼠标的坐标、键盘的哪个按键被按下、鼠标滚轮滚动的方向等。
      获取 event 对象（兼容性问题）
      所有浏览器都支持event对象，但支持的方式不同。如下。
      （1）普通浏览器的写法是 event。比如：
      （2）ie 678 的写法是 window.event。此时，事件对象 event 是作为window对象的属性保存的。
      于是，我们可以采取一种兼容性的写法。如下：
      event = event || window.event; // 兼容性写法
      */
      
       //点击页面的任何部分
        document.onclick = function (event) {//event事件对象
        event = event || window.event;//兼容性写法
        console.log(event);
        console.log(event.timeStamp);
        console.log(event.pageX);
        console.log(event.pageY);
        console.log(event.screenX);
        console.log(event.screenY);
        console.log(event.target);
        console.log(event.type);
        console.log(event.clientX);
        console.log(event.clientY);
    }
```

![](http://img.smyhvae.com/20180203_1739.png)

### 原型链

```
原型对象也是对象，所以它也有原型，当我们使用或访问一个对象的属性或方法时：
- 它会先在对象自身中寻找，如果有则直接使用；
- 如果没有则会去原型对象中寻找，如果找到则直接使用；
- 如果没有则去原型的原型中寻找，直到找到Object对象的原型。
- Object对象的原型没有原型，如果在Object原型中依然没有找到，则返回 null
```



### 键值对

```js
- 键：相当于属性名。
- 值：相当于属性值，可以是任意类型的值（数字类型、字符串类型、布尔类型，函数类型等）
```



### 内存溢出和内存泄露

```js
内存溢出：一种程序运行出现的错误。当程序运行需要的内存超过了剩余的内存时, 就出抛出内存溢出的错误
 var obj = {};
    for (var i = 0; i < 10000; i++) {
    obj[i] = new Array(10000000);  //把所有的数组内容都放到obj里保存，导致obj占用了很大的内存空间
    console.log("-----");
   }
内存泄漏：占用的内存没有及时释放(把内存占满了,就像你后台有很多东西运行,没有清理)
常见的内存泄露：
 1.意外的全局变量
 2.没有及时清理的计时器或回调函数
 3.闭包
  // 意外的全局变量
    function fn() {
        a = new Array(10000000);
        console.log(a);
    }

    fn();
 // 没有及时清理的计时器或回调函数
    var intervalId = setInterval(function () { //启动循环定时器后不清理
        console.log('----')
    }, 1000)
 // clearInterval(intervalId);  //清理定时器
    
   function fn1() {
    var a = 4;
    function fn2() {
      console.log(++a)
    }
    return fn2
  }
  fn1()
  // 5-6-7-8 以此类推
  // fn1() = null //让内部函数成为垃圾对象-->回收闭包 
```



### 工厂模式

```js
方式：通过工厂函数动态创建对象并返回。
 -返回一个对象的函数，就是工厂函数。
 -适用场景: 需要创建多个对象。
 -问题: 对象没有一个具体的类型，都是Object类型。
 -由于这个问题的存在，工厂模式用得不多。 
function createPerson(name, age) { //返回一个对象的函数===>工厂函数
        var obj = {
            name: name,
            age: age,
            setName: function (name) {
                this.name = name
            }
        }
        return obj
    }
    // 创建2个人
    var p1 = createPerson('Tom', 12)//{name: "Tom", age: 12, setName: ƒ}
    var p2 = createPerson('Bob', 13)//{name: "Bob", age: 13, setName: ƒ}

```



### Web 存储

##### H5 中有两种存储的方式

1、**`window.sessionStorage` 会话存储：**

- 保存在内存中。

- **生命周期**为关闭浏览器窗口。也就是说，当窗口关闭时数据销毁。

- 在同一个窗口下数据可以共享。

2、**`window.localStorage` 本地存储**：

- 有可能保存在浏览器内存里，有可能在硬盘里。

- 永久生效，除非手动删除（比如清理垃圾的时候）。

- 可以多窗口共享。


##### Web 存储的特性

（1）设置、读取方便。

（2）容量较大，sessionStorage 约5M、localStorage 约20M。

（3）只能存储字符串，可以将对象 JSON.stringify() 编码后存储。

##### 常见 API

设置存储内容：

```javascript
	setItem(key, value);
```

PS：可以新增一个 item，也可以更新一个 item。

读取存储内容：

```javascript
	getItem(key);
```

根据键，删除存储内容：

```javascript
	removeItem(key);
```


清空所有存储内容：

```javascript
	clear();
```

根据索引值来获取存储内容：


```javascript
	key(n);
```

sessionStorage 的 API 举例：

```html
<!DOCTYPE html>
<html>
<head lang="zh">
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<input type="text"/>
<button>sesssionStorage存储</button>
<button>sesssionStorage获取</button>
<button>sesssionStorage更新</button>
<button>sesssionStorage删除</button>
<button>sesssionStorage清除</button>
<script>

    //在h5中提供两种web存储方式

    // sessionStorage  session（会话，会议） 5M  当窗口关闭是数据销毁  内存
    // localStorage    20M 永久生效 ，除非手动删除  清理垃圾  硬盘上

    var txt = document.querySelector('input');

    var btns = document.querySelectorAll('button');
    //        sessionStorage存储数据
    btns[0].onclick = function () {
        window.sessionStorage.setItem('userName', txt.value);
        window.sessionStorage.setItem('pwd', '123456');
        window.sessionStorage.setItem('age', 18);
    }

    //        sessionStorage获取数据
    btns[1].onclick = function () {
        txt.value = window.sessionStorage.getItem('userName');
    }

    //        sessionStorage更新数据
    btns[2].onclick = function () {
        window.sessionStorage.setItem('userName', txt.value);
    }

    //        sessionStorage删除数据
    btns[3].onclick = function () {
        window.sessionStorage.removeItem('userName');
    }

    //        sessionStorage清空数据
    btns[4].onclick = function () {
            window.sessionStorage.clear();
    }
</script>
</body>
</html>
```

##### localStorage 的 API 举例：


```html
<!DOCTYPE html>
<html>
<head lang="zh">
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<input type="text"/>
<button>localStorage存储</button>
<button>localStorage获取</button>
<button>localStorage更新</button>
<button>localStorage删除</button>
<button>localStorage清除</button>

<script>

    /*
    *  localStorage
    *  数据存在硬盘上
    *  永久生效
    *  20M
    * */

    var txt = document.querySelector('input');
    var btns = document.querySelectorAll('button');

    //localStorage存储数据
    btns[0].onclick = function () {
        window.localStorage.setItem('userName', txt.value);
    }

    //localStorage存储数据
    btns[1].onclick = function () {
        txt.value = window.localStorage.getItem('userName');
    }

    //localStorage删除数据
    btns[3].onclick = function () {
        window.localStorage.removeItem('userName');
    }

</script>
</body>
</html>
```

##### 案例：记住用户名和密码

代码：

```html
<!DOCTYPE html>
<html>
<head lang="zh">
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<label for="">
    用户名：<input type="text" class="userName"/>
</label>
<br/><br/>
<label for="">
    密 码：<input type="text" class="pwd"/>
</label>
<br/><br/>
<label for="">
    <input type="checkbox" class="check" id=""/>记住密码
</label>
<br/><br/>
<button>登录</button>

<script>
    var userName = document.querySelector('.userName');
    var pwd = document.querySelector('.pwd');
    var chk = document.querySelector('.check');
    var btn = document.querySelector('button');

    //当点击登录的时候 如果勾选“记住密码”，就存储密码；否则就清除密码
    btn.onclick = function () {
        if (chk.checked) {
		//记住数据
            window.localStorage.setItem('userName', userName.value);
            window.localStorage.setItem('pwd', pwd.value);
        } else {
		//清除数据
            window.localStorage.removeItem('userName');
            window.localStorage.removeItem('pwd');
        }
    }
    //下次登录时，如果记录的有数据，就直接填充
    window.onload = function () {
        userName.value = window.localStorage.getItem('userName');
        pwd.value = window.localStorage.getItem('pwd');

    }
</script>
</body>
</html>
```



### Promise

##### promise对象的3个状态

- 初始化状态（等待状态）：pending
- 成功状态：fullfilled 
- 失败状态：rejected
- 如果请求成功了，请写resolve()，此时，promise的状态会被自动修改为fullfilled。
- 如果请求失败了，请写reject()，此时，promise的状态会被自动修改为rejected



### json

- JSON.parse() ---> json 解析后端传过来的数据
- JSON.stringify()  ----转换成字符串

![image-20200404174058302](C:\Users\14456\AppData\Roaming\Typora\typora-user-images\image-20200404174058302.png)



### for循环的排它思想

- 如果同一组元素，我们想让其中的某一个元素实现某种样式或效果，就可以利用排它思想

  ```js
      <button>按钮</button>
      <button>按钮</button>
      <button>按钮</button>
      <button>按钮</button>
      <button>按钮</button>
        // 先添加点击事件,在清空样式,然后在给当前那个加样式
        // 我点击另外一个按钮就把上一个点击的按钮样式清空
        var btns = document.getElementsByTagName("button");
        for (var i = 0; i < btns.length; i++) {//这层for循环是个每一个btns加点击事件的
          btns[i].onclick = function () {
            for (var i = 0; i < btns.length; i++) {//先清除所有的样式
              btns[i].style.color = "";
            }
            this.style.color = "red";//给当前那个元素加样式
          };
        }
  ```




### 自定义属性

```js
	 /* 
      获取元素属性的两种方法
      element.属性
      element.getAttribute("属性")

      setAttribute能修改自定义属性,也能修改自带的属性
       */
      var div = document.querySelector("div");
      // 1.获取元素属性值
      console.log(div.id); //第一种
      console.log(div.getAttribute("id")); //第二种
      // 2.设置元素属性值
      div.setAttribute("index", 995); //主要针对自定义属性值
      console.log((div.index = 123456));//主要内置属性(也就是自带的属性)
      // 3.删除属性
      // div.removeAttribute('index')

```



### TAB栏切换（排它思想+自定义属性）

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <style>
      * {padding: 0;margin: 0;}
      li {list-style: none;}
      .tab_list {background-color: rgb(141, 136, 136);height: 50px;color: rgb(0, 0, 0);line-height: 50px;font-size: 20px;}
      .tab_list li {width: 100px;display: inline-block;text-align: center;cursor: pointer; }
      .current {background-color: #e40d0d;}
      .tab_con div {display: none;}
      .show { display: block !important;}
    </style>
    <div class="top">
      <div class="tab_list">
        <ul>
          <li class="current">手机</li>
          <li>鞋子</li>
          <li>售后</li>
          <li>水果</li>
          <li>游戏</li>
          <li>游戏</li>
        </ul>
      </div>
      <div class="tab_con">
        <div class="show">1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
      </div>
    </div>
    <script>
      var lis = document.querySelector(".tab_list").querySelectorAll("li");
      var items = document.querySelector(".tab_con").querySelectorAll("div");
      //第二种写法
      /* for (var i = 0; i < lis.length; i++) {
        //创建一个index然后给每一个li设置index而它的值由i来动态的决定,这样创建页面上不显示 index
        lis[i].index = i;
        lis[i].onclick = function () {
          for (var i = 0; i < lis.length; i++) {
            lis[i].className = "";
            items[i].className = "";
          }
          this.className = "current";
          items[this.index].className = "show";
          //把当前点击index给items,这里的this代表当前
        };
      } */
      //第一种写法
      for (var i = 0; i < lis.length; i++) {
        //创建一个 index 然后给每一个 li设置index而它的值由i来动态的决定,这样创建页面上显示 index
        lis[i].setAttribute("index", i);
        lis[i].onclick = function () {
          for (var i = 0; i < lis.length; i++) {
            lis[i].className = "";
            items[i].className = "";
          }
          this.className = "current";
          var index = this.getAttribute("index"); //获取当前点击的 index 值
          items[index].className = "show"; //[index] 这个index是局部的所以可以直接拿到
          //↑ 这里不能写死,当我 index 点了那个就把它的值传给我 items
          //当我点击手机,手机的 index值是0,所以就把 items[0]传给我,这样就可以更上面同步
        };
      }
    </script>
  </body>
</html>	
```