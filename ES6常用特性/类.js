// 类中的方法名也不需要加function关键字
class base {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    getInfo() {
        console.log(`name is ${this.name}, age is ${this.age}`);
    }
}

let test = new base('Jack', 22);
test.getInfo();