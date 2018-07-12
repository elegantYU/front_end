// 字符串的基本操作方法
//  charAt() 返回给定位置的字符
//  charCodeAt() 返回给定位置字符的字符编码
var str = 'hello world!!';

console.log(str.charAt(0));      // "h"
console.log(str.charCodeAt(0));  // "104"
console.log(str[0]);             // "h"

// concat() 接收任意多参数拼接字符串 （一般使用 +）
console.log(str.concat("&&??")); // "hello world!!&&??"

// slice()  第一个参数指定字符串开始位置，第二个参数指定字符串结束位置，返回截取的内容
console.log(str.slice(0,13));   // "hello world!!"

//  substring() 基本作用等同于slice
console.log(str.substring(3,6)); // "lo"

//  substr()第一个参数指定该字符串开始位置，第二个参数表示截取长度
console.log(str.substr(3,6));    // "lo wor"

// indexOf()和lastIndexOf()都是搜索给定的自定的字符串 若无结果返回 -1 有结果返回索引
// 两个参数 查找的字符串和查找的位置
console.log(str.indexOf("o"));   // 4
console.log(str.lastIndexOf("o")); // 7
console.log(str.indexOf("o",6));    //7
console.log(str.lastIndexOf("o",1)); // -1

// trim() 删除字符串的前后空格
var str = "  hello world    ";
console.log(str.trim());     // hello world

// toLowerCase()字符串转小写 toUpperCase()字符串转大写
console.log(str.toUpperCase());
console.log(str.toLowerCase());

// 字符串模式匹配方法
// match方法 只接受一个参数，由字符串或RegExp对象指定的一个正则表达式
// search方法 只接受一个参数，由字符串或RegExp对象指定的一个正则表达式
// 返回字符串中第一个匹配项的索引 如果没有匹配项 返回 -1
var str ="cat,bat,sat,fat";
var pattern = /.at/;
var matches = str.match(pattern);
console.log(matches.index);      // 0
console.log(matches[0]);         // cat
console.log(pattern.lastIndex);  // 0
var pos = str.search(/at/);
console.log(pos);           // 1 1表示at字符串在原来字符串中第一次出现的位置

// replace() 第一个参数为字符串 只会替换第一个匹配字符 第一个参数为正则表达式 会替换所有匹配字符串
console.log(str.replace("at","hahaha")); // chahaha,bat,sat,fat
var a = str.replace(/at/g,"one");
console.log(a);   // cone,bone,sone,fone

// split() 基于指定的字符，将字符串分割成字符串数组 当指定的字符为空字符串时，将会分割整个字符串
var str = "red,blue,green,yellow";
console.log(str.split(",", 2));  // dier 

//  字符串去重 返回新字符串
var str = "aasdasdadasdaszczxcxzc";
function unique(str) {
    var arr = [];
    str = str.split("");
    for (var i = 0; i < str.length; i++) {
        if (arr.indexOf(str[i]) == -1) {
            arr.push(str[i]);
        }
    }
    arr = arr.join("");
    return arr;
}
console.log(unique(str));      // 'asdzcx'