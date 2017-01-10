var Promise = require('bluebird');
var mongodb = Promise.promisifyAll(require('mongodb').MongoClient);
var url = 'mongodb://localhost:27017/blog';

function User(user) {
    this.id = user.id,
    this.name = user.name,
    this.password = user.password,
    this.head = user.head,
    this.introduction = user.introduction
}

module.exports = User;

//存储用户信息
User.prototype.save = function () {
    var user = {
        id : this.id,
        name: this.name,
        password: this.password,
        head : this.head,
        introduction : this.introduction
    };
    var db;

    return mongodb.connectAsync(url).then(function (_db) {
        db = _db;
        return db.collection("users");
    }).then(function (collection) {
        return collection.insert(user, {
            safe: true
        });
    }).finally(function () {
        db.close();
    });
};

//读取用户信息
User.check = function (name) {
    var db;

    return mongodb.connectAsync(url).then(function (_db) {
        db = _db;
        return db.collection("users");
    }).then(function (collection) {
        return collection.findOne({
            name: name
        });
    }).finally(function () {
        db.close();
    })
};

//更新用户名
User.updateName = function (userName, newName) {
    var db;
    var collection;

    return mongodb.connectAsync(url).then(function (_db) {
        db = _db;
        return db.collection("users");
    }).then(function (_collection) {
        collection = _collection;
        return collection.findOne({
            name: newName
        });
    }).then(function (user) {
        if(user) {
            return user;
        }

        return collection.update({
            name : userName
        }, {
            $set: {
                name : newName
            }
        });
    }).finally(function () {
        db.close();
    });
}

//更新头像
User.updateHead = function (userName, newHead) {
    var db;

    return mongodb.connectAsync(url).then(function (_db) {
        db = _db;
        return db.collection("users");
    }).then(function (collection) {
        return collection.update({
            name : userName
        }, {
            $set: {
                head : newHead
            }
        });
    }).finally(function () {
        db.close();
    });
}

//更新个人简介
User.updateIntroduction = function (userName, newIntroduction) {
    var db;

    return mongodb.connectAsync(url).then(function (_db) {
        db = _db;
        return db.collection("users");
    }).then(function (collection) {
        return collection.update({
            name : userName
        }, {
            $set: {
                introduction : newIntroduction
            }
        });
    }).finally(function () {
        db.close();
    });
}

// var u = new User({
//     name: 'xxx',
//     password: 'xxx',
// });

// u.save().then(function (user) {
//     console.log(user);
// }, function (err) {
//     console.log(err);
// });

// User.check(u.name).then(function (data) {
//     console.log(data);
// }, function (err) {
//     console.log(err);
// });


// User.updateName('xxx', 'yyy').then(function (data) {
//     console.log(data);
// }, function (err) {
//    console.log(err);
// });

// User.updateIntroduction('xxx', '哈哈哈').then(function (data) {
//     console.log(data);
// }, function (err) {
//    console.log(err);
// });

