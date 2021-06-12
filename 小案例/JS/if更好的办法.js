const actions = {
  1: ["processing", "IndexPage"],
  2: ["fail", "FailPage"],
  3: ["fail", "FailPage"],
  4: ["success", "SuccessPage"],
  5: ["cancel", "CancelPage"],
  default: ["other", "Index"],
};
const onButtonClick = (status) => {
  let action = actions[status] || actions["default"];
  console.log(action);
};
onButtonClick(6);
// 将判断条件作为对象的属性名，将处理逻辑作为对象的属性值，
// 在按钮点击的时候，通过对象属性查找的方式来进行逻辑判断，这种写法特别适合一元条件判断的情况



const actions = new Map([
  [1, ["1", "IndexPage"]],
  [2, ["2", "FailPage"]],
  [3, ["3", "FailPage"]],
  [4, ["4", "SuccessPage"]],
  [5, ["5", "CancelPage"]],
  ["default", ["000", "Index"]],
]);
const onButtonClick = (status) => {
  let action = actions.get(status) || actions.get("default");
  console.log(action);
};
onButtonClick(4)
// Map的键可以是任意值



const actions = new Map([
  ['guest_1', ()=>{ console.log("牛逼")}],
  ['guest_2', ()=>{/*do sth*/}],
  ['guest_3', ()=>{/*do sth*/}],
  ['guest_4', ()=>{/*do sth*/}],
  ['guest_5', ()=>{/*do sth*/}],
  ['master_1', ()=>{/*do sth*/}],
  ['master_2', ()=>{/*do sth*/}],
  ['master_3', ()=>{/*do sth*/}],
  ['master_4', ()=>{/*do sth*/}],
  ['master_5', ()=>{/*do sth*/}],
  ['default', "是是是"],
])
const onButtonClick = (identity)=>{
  let action = actions.get(identity) || actions.get('default')
  console.log(action);
}
onButtonClick("0")


// 假如 guest 情况下， status1-4 的处理逻辑都一样怎么办，最差的情况是这样：
const actions = new Map([
  [{identity:'guest',status:1},()=>{/* functionA */}],
  [{identity:'guest',status:2},()=>{/* functionA */}],
  [{identity:'guest',status:3},()=>{/* functionA */}],
  [{identity:'guest',status:4},()=>{/* functionA */}],
  [{identity:'guest',status:5},()=>{/* functionB */}],
])
const actions = ()=> {
  const functionA = ()=>{/*do sth*/}
  const functionB = ()=>{/*do sth*/}
  return new Map([
    [/^guest_[1-4]$/,functionA],
    [/^guest_5$/,functionB],
  ])
}

const onButtonClick = (identity,status)=>{
  let action = [...actions()].filter(([key,value])=>(key.test(`${identity}_${status}`)))
  action.forEach(([key,value])=>value.call(this))
}

