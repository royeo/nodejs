var ObjectId = require('mongodb').ObjectId;
var Promise = require('bluebird');
var mongodb = Promise.promisifyAll(require('mongodb').MongoClient);
var url = 'mongodb://localhost:27017/blog';

function Message(msg) {
    this.id = msg.id;
    this.name = msg.name;
    this.content = msg.content;
    this.time = msg.time
}

module.exports = Message;

//存储1条留言
Message.prototype.save = function () {
    var msg = new Message({
        id: this.id,
        name: this.name,
        content: this.content,
        time: this.time
    });
    var db;

    return mongodb.connectAsync(url).then(function(_db) {
        db = _db;
        return db.collection("messages");
    }).then(function (collection) {
        return collection.insert(msg, {safe: true});
    }).finally(function() {
        db.close();
    });
}

//获取留言总数
Message.getNumber = function (id) {
    var db;
    var query = {};

    return mongodb.connectAsync(url).then(function (_db) {
        db = _db;
        return db.collection("messages");
    }).then(function (collection) {
        if (id) {
            query.id = id;
        }
        return collection.count(query);
    }).finally(function () {
        db.close();
    });
}

//获取10条留言
Message.getTen = function (id, page) {
    var db;
    var collection;
    var query = {};

    return mongodb.connectAsync(url).then(function (_db) {
        db = _db;
        return db.collection("messages");
    }).then(function (_collection) {
        collection = _collection;
        if (id) {
            query.id = id;
        }
        return collection.count(query);
    }).then(function () {
        return collection.find(query, {
            skip: (page - 1) * 10,
            limit: 10
        }).sort({
            time: -1
        }).toArray();
    }).finally(function () {
        db.close();
    });
}

//删除1条留言
Message.remove = function (id) {
    var db;

    return mongodb.connectAsync(url).then(function (_db) {
        db = _db;
        return db.collection("messages");
    }).then(function (collection) {
        return collection.remove({
            '_id': ObjectId(id)
        }, {
            w: 1
        });
    }).finally(function () {
        db.close();
    });
}

//修改留言人的用户名
Message.updateName = function (userID, newName) {
    var db;

    return mongodb.connectAsync(url).then(function (_db) {
        db = _db;
        return db.collection("messages");
    }).then(function (collection) {
        return  collection.updateMany({
            id: userID
        }, {
            $set: {
                name: newName
            }
        });
    }).finally(function () {
        db.close();
    });
};

// var msg = new Message({
//     name: '1',
//     content: '11111',
// });

// msg.save(function (err, data) {
//     if(err) {
//         return console.log(err);
//     }
//
//     console.log('save ok');
// });

// Message.getTen('1', 1).then(function(docs){
//     console.log('OK : ', docs);
// }, function (err) {
//     console.log('ERR : ', err);
// });


// Message.updateName(926735992, '2').then(function (data) {
//     console.log('OK');
// }, function (err) {
//     console.log(err);
// })

// Message.getNumber(598747350).then(function (data) {
//     console.log(data);
// }, function (err) {
//     console.log(err);
// })