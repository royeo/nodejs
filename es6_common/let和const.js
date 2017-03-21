// var定义的变量没有块作用域，只有函数作用域而let有块级作用域
// const用来定义变量，也有块级作用域
function test1() {
    var a = 1;
    if(true) {
        var a = 2;
    }
    console.log(a);
}
test1();

function test2() {
    var a = 1;
    if(true) {
        let a = 2;
    }
    console.log(a);
}
test2();

function test3() {
    var a = 1;
    if(true) {
        const a = 2;
    }
    console.log(a);
}
test3();