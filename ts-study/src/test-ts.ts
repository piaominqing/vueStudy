/**
 * ts 语法学习
 */

// 原始类型检测
let val1: string;
val1 = 'string'
// val1 = 1 静态检测不通过

// 数组类型检测
let arr: string[];
arr = ['string'];
// arr.push(1) 里面的元素需为string，静态检测不通过

// 任意类型(不建议使用)
let val2: any;
val2 = 1
val2 = 's'

// 函数类型检测
// 必选参
// 默认值
// 可选参 ？写在最后一个
function greet(pram: string, msg = 'default', msg2?: string):string{
  return 'hello,' +pram //返回值类型检测
}
greet('james')
// greet(1) 参数类型检测不通过

// void 类型
function voidF():void{

}

// 对象类型检测
let o: object;
o = {}
// o = 1 类型检测不通过，只要不是原始类型就是object类型

// 正确的姿势
let o2: {prop: string};
o2 = {prop:''}
// o2 = {} 静态检测不通过

// 类型别名 type 自定义类型
type Prop = {prop: string}
let o3: Prop
// o3 = {} 静态检测不通过

// 接口interface
interface Prop2 {
  prop: string,
  obj: object
}
let o4: Prop2;
o4 = {
  prop: '',
  obj: {}
}
// o4 = {} 类型检测不通过

// 类型推论
let val3 = true;
// val2 = '' 经过类型推论出val2为布尔值 所以赋予string类型时，静态检测不通过

// 类型断言
const someValue: any = 'someValue'
const strLen = (someValue as string).length

// 联合类型
let union: string | number;
union =1;
union = ''

// 交叉类型(扩展)
type First = {first:number}
type Second = {second:number}
type FirstAndSecond = First & Second
let val4: FirstAndSecond
val4 = {
  first:1,
  second:2
}
