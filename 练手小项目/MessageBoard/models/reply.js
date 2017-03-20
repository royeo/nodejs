var Promise = require('bluebird');
var mongodb = Promise.promisifyAll(require('mongodb').MongoClient);
var ObjectId = require('mongodb').ObjectId;
var url = 'mongodb://localhost:27017/blog';

var Reply = function (r) {
    this.id = r.id,
        this.name = r.name,
        this.targetID = r.targetID,
        this.targetName = r.targetName,
        this.content = r.content;
    this.fatherID = r.fatherID;
    this.time = r.time;
};

module.exports = Reply;

//保存1条回复
Reply.prototype.save = function () {
    var reply = new Reply({
        id: this.id,
        name: this.name,
        targetID: this.targetID,
        targetName: this.targetName,
        content: this.content,
        fatherID: this.fatherID,
        time: this.time
    });
    var db;

    return mongodb.connectAsync(url).then(function(_db) {
        db = _db;
        return db.collection("reply");
    }).then(function (collection) {
        return collection.insert(reply, {safe: true});
    }).finally(function() {
        db.close();
    });
}

//获得回复总数
Reply.getNumber = function (id) {
    var db;
    var query = {};

    return mongodb.connectAsync(url).then(function (_db) {
        db = _db;
        return db.collection("reply");
    }).then(function (collection) {
        if (id) {
            query.fatherID = id;
        }
        return collection.count(query);
    }).finally(function () {
        db.close();
    });
}

//获取一条留言的10条回复
Reply.getTen = function (id, page) {
    var db;
    var query = {};

    return mongodb.connectAsync(url).then(function(_db) {
        db = _db;
        return db.collection("reply");
    }).then(function (collection) {
        if (id) {
            query.fatherID = id;
        }
        return collection.find(query, {
            skip: (page - 1) * 10,
            limit: 10
        }).sort({
            time: 1
        }).toArray();
    }).finally(function() {
        db.close();
    });
};

//获取个人有关的10条回复
Reply.getTenOwn = function (id, page) {
    var db;
    var collection;
    var query = {};

    return mongodb.connectAsync(url).then(function(_db) {
        db = _db;
        return db.collection("reply");
    }).then(function (_collection) {
        if (id) {
            query.targetID = id;
        }
        collection = _collection;
        return collection.count(query);
    }).then(function () {
        return collection.find(query, {
            skip: (page - 1) * 10,
            limit: 10
        }).sort({
            time: 1
        }).toArray();
    }).finally(function() {
        db.close();
    });
}

//删除一条留言的回复
Reply.remove = function (id) {
    var db;

    return mongodb.connectAsync(url).then(function (_db) {
        db = _db;
        return db.collection("reply");
    }).then(function (collection) {
        return collection.remove({
            'fatherID': id
        }, {
            w: 1
        });
    }).finally(function () {
        db.close();
    });
};

//单独删除一条回复
Reply.removeOne = function (id) {
    var db;

    return mongodb.connectAsync(url).then(function (_db) {
        db = _db;
        return db.collection("reply");
    }).then(function (collection) {
        return collection.remove({
            _id: ObjectId(id)
        }, {
            w: 1
        });
    }).finally(function () {
        db.close();
    });
}

//更新回复的用户名
Reply.updateName = function (userID, newName) {
    var db;
    var collection;

    return mongodb.connectAsync(url).then(function (_db) {
        db = _db;
        return db.collection("reply");
    }).then(function (_collection) {
        collection = _collection;
        return collection.updateMany({
            id: userID
        }, {
            $set: {
                name: newName
            }
        });
    }).then(function () {
        return collection.updateMany({
            targetID: userID
        }, {
            $set: {
                targetName: newName
            }
        });
    }).finally(function () {
        db.close();
    });
};



// var r = new Reply({
//     id: '1',
//     name: 'myName',
//     targetID: '2',
//     targetName: 'herName',
//     content: 'what the fuck',
//     fatherID: '3',
// });

// r.save().then(function (data) {
//     console.log(data);
// }, function (err) {
//     console.log(err);
// })

// Reply.getTen('3', 1).then(function (docs) {
//     console.log('docs : ', docs);
//     console.log('total : ', docs.length);
// }, function (err) {
//     console.log(err);
// })
//
// Reply.getTenOwn('2', 1).then(function (docs) {
//     console.log('docs : ', docs);
//     console.log('total : ', docs.length);
// }, function (err) {
//     console.log(err);
// })

// Reply.remove('3').then(function (data) {
//     console.log(data);
// }, function (err) {
//     console.log(err);
// })

// Reply.removeOne('5742956d585b38d807360309').then(function (data) {
//     console.log(data);
// }, function (err) {
//     console.log(err);
// })

// Reply.updateName('1', 'newName').then(function (data) {
//     console.log('data : ', data);
// }, function (err) {
//     console.log(err);
// })

// console.log(([] + {}).length);

// Reply.getNumber().then(function (data) {
//     console.log(data);
// }, function (err) {
//     console.log(err);
// })