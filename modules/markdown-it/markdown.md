# 模块机制
#### Node.js模块的实现

在Node中引入模块，过程分为3个步骤：

https://www.npmjs.com/package/markdown-it#install
    
#### 模块编译

编译和执行是引入文件模块的最后一个阶段，定位到具体的文件后，Node会新建一个模块对象，然后根据路径载入并编译，对于不同的文件扩展名，其载入方法也不同，如下：

- `.js`文件：通过fs模块同步读取文件后编译执行
 
- `.node`文件：这是用C/C++编写的扩展模块，通过`dlopen()`方法加载最后编译生成的文件
 
- `.json`文件：通过fs模块同步读取文件后，用`JSON.parse()`解析返回结果
 
- 其余扩展文件：被当作`.js`文件载入

> 在核心模块中，有些模块全部由 *C/C++* 编写，有些模块则由 *C/C++* 完成核心部分，其他部分由javascirpt实现包装或向外导出，纯 *C/C++* 编写的部分统一称为内建模块

# 异步编程的优势与难点

#### 偏函数

通过指定部分参数来产生一个新的定制函数的形式就是偏函数，如下：

    var isType = function(type) {
        return function(obj) {
            return toString.call(obj) == '[object ' + type + ']'
        }
    }

    var isString = isType('String');
    var isFunction = isType('Function');

# 内存控制

#### V8的内存限制

在Node中通过javascirpt只能使用部分内存（64位系统下约为1.4GB，32位系统下约为0.7GB），这个限制会导致Node无法直接操作大内存对象，计算机的内存资源无法得到充足的使用。

> 在启动时添加 --trace_gc 参数，可以查看垃圾回收日志

    
