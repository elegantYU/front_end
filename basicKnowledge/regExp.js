// 学习正则
// 定义
var re = new RegExp("a");       // RegExp()对象，参数是指定的规则
var re = /a/;                   // 简写方法 性能更好

//  test() 在字符串中查找符合的正则内容，若查到返回true,否则false
var str = "31564321548";
var re = /\D/;                  // \D代表非数字
if (re.test(str)) {
    console.log("不全是数字");
} else {
    console.log("纯数字");
}

/**
 *  \s 空格         scope
 *  \S 非空格 
 *  \d 数字         digit
 *  \D 非数字
 *  \w 字符 (字母、数字、下划线)        word
 *  \W 非字符串  比如：是否有不是数字的字符
 *  . 点 任意字符
 *  \.  真正的点
 *  \b  独立的部分 （起始 结束 空格）
 *  \B  非独立的部分
 *  \a  表示重复的某个子项  / (a) (b) \1/ 匹配abca
 */

//  search() 在字符串中搜索符合正则的内容，搜索到就返回出现的位置（只返回第一个字符的位置），若是没有返回-1
//  忽略大小写  i == ignore
//  字符串.search(正则)
var str = 'avcvbcvvb';
var re = /B/i;
//  var re = new RegExp('B','i') 等同上面
console.log(str.search(re));   // 4

// match() 在字符串中搜索符合规则的内容，搜索成功返回内容（数组） 失败返回null
//  字符串.match(正则)
//  量词 + 至少出现一次 匹配不确定的次数
//  全局匹配 g == global
var str = "gsdfgsdf3g123486cxbvtfg13g2b1cv56z";
var re = /\d+/g;     // 每次匹配至少一个数字
console.log( str.match(re) );   // ['3','123486','13','2','1','56']

//  replace() 查找符合正则的字符串就替换成对应的字符串 返回替换后的内容 
//  | 或
var str = '我他妈的真的日了狗，操';
var re = /妈的|日|操/g;
console.log(str.replace(re,'喵'));  // 把对应字符串替换成 喵
//  实现几个字对应几个 喵 
var str = '操操操操，妈的，妈的';
var str1 = str.replace(re,function (str) {
                console.log(str);   // 函数第一个参数代表每次搜索到的符合的正则的字符
                var result = '';
                for (var i = 0; i < str.length; i++) {
                    result += '喵';                    
                }
                return result;
            });
console.log(str1);

// () 分组符   子项
var str = '2018-06-25';
var re1 = /\d-+/g;      // 全局匹配数字横杠     8- 6-
var re2= /(\d+)(-)/g;   // 全局匹配至少一个数字 匹配一个横杠 2018- 06-
console.log(str.match(re2));

str = str.replace(re2,function ($0,$1,$2) {
    // 正则中有子项
    // 第一参数 $0 匹配结果 2018- 06-
    // 第二参数 $1 匹配第一分组 2018 06
    // 第三参数 $2 匹配第二分组 - -
    return $1 + '.';
});
console.log(str);   // 2018.06.25

//  match会返回自己的子项 不加 g 才会取到子项的集合
var str = 'abc';
var re = /(a)(b)(c)/;
console.log(str.match(re)); // [ 'abc', 'a', 'b', 'c', index: 0, input: 'abc' ]

// exec() 和match()用法一样 
var test = "new test1321 test12746";
var re = /test(\d+)/;   // 单次匹配
var r = re.exec(test);
console.log(r);         //[ 'test1321', '1321', index: 4, input: 'new test1321 test12746' ]
console.log(r.input);   // 每次匹配成功的字符串
console.log(r.index);   // 匹配成功的字符串的子一个字符串位置

// [] 表示一个集合 比如：[abc]代表一个字符 匹配a b c其中的任何一个 [0-9] 范围必须从小到大
// [^a] 整体代表一个字符 ^写在[]里面 代表排除的意思
var str = '<div class="b">hahaha</div>';
var re1 = /<[^>]+>/g;        // 匹配左括号中间至少一个非右括号的内容 然后匹配右括号
var re2 = /<[\w\W]+>/g;      // 匹配左括号 中间至少一个字符或非字符内容 然后匹配右括号
console.log(str.match(re1));    // 不包括 hahhah
console.log(str.match(re2));    // 包括标签内内容

// 
var re = /one\b/;           // one 后面必须是独立的 起始 结束 空格
var str = "onetwo"; 
console.log(re.test(str));  // false
var str = "one two";
console.log(re.test(str));  // true

/**
 *  量词
 *  {n,m} 至少出现n次 最多m次
 *  {n,} 至少出现n次
 *  * 任意次
 *  ? 零次或一次 等同于 {0,1}
 *  + 一次或任意次 {1,}
 *  {n} 正好 n 次
 *  /^  放在开始位置 表示起始
 *  /$  放在最后位置 表示结束
 */
// 例子 验证qq号
var re = /^[1-9]\d{4,11}$/;     // 限制起始结束都是数字 ^\d$ 首位数字范围是1-9 qq号长度是{4,11}
var str = '111111111111';
console.log(re.test(str));

// 去前后空格
var str = '  asd  asdas ';
function trim(str) {
    var re = /^\s+|\s+$/g;      // 开头结尾匹配空格 +不止一个 g全局匹配 |或者 
    return str.replace(re,'');  // 替换为空
}
console.log(trim(str));

// 一些常用的表单验证
var re = {
    email: /^\w+@[a-z0-9]+(\.[a-z]+){1,3}$/,
    chinese: /[\u4e00-\u9fa5]/,
    trim: /^\s*|\s*$/,
    identify: /[1-9]\d{14}|[1-9]\d{17}|[1-9]\d{16}x/,        //低级验证 不可靠
    // 国内电话 0551-123456 028-1234567
    tel: /(^0[0-9]{3}-[1-9][0-9]{6}$)|(^0[0-9]{2}-[1-9][0-9]{7}$)/
};

