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


// 类访问修饰符
class Person {
  private name: string = ''  //私有属性
  protected idCard: number = 0 //子类访问
  constructor(public age= '18'){
    // public age 公共属性
  }
}

/**
 * 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定 类型的一种特性。以此增加代码通用性。
 * 泛型优点：
 * 函数和类可以支持多种类型，更加通用 
 * 不必编写多条重载，冗长联合类型，可读性好 
 * 灵活控制类型约束
 */

// 不用泛型 
// interface Result { 
//   ok: 0 | 1; 
//   data: Feature[]; 
// }
// 使用泛型 
interface Result<T> {  
  ok: 0 | 1;  
  data: T; 
}
// 泛型方法 
function getResult<T>(data: T): Result<T> {  
  return {ok:1, data};
} 
// 用尖括号方式指定T为string 
getResult<string>('hello') 
// 用类型推断指定T为number 
getResult(1)

// 装饰器

// 类装饰器
// sayMake运行时会被调用
// target 类的构造函数
// 类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数
function sayMake(target: Function){
  console.log(target)
  target.prototype.sayMake = function (){
    console.log('im a '+this.make + 'car')
  }
}
//方法装饰器
// 这里通过修改descriptor.value扩展了bar方法
function log(target: any, name:string, descriptor: any){
  console.log(target, name, descriptor)
  const oldFn = descriptor.value
  descriptor.value = function (val: string){
    console.log('set make:'+val)
    oldFn.call(this, val)
  }
}
// 属性装饰器
function defaultMake (defaultValue:string){
  return function (target:any, name:string){
    target[name] = defaultValue
  }
}
@sayMake
class Car {
  @defaultMake('Audi')
  make!:string
  @log
  setMake(val: string){
    this.make = val
  }
}
const car = new Car()
console.log(car.make)
// @ts-ignore
car.sayMake()
car.setMake('jieda')
