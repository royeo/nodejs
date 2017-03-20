var fs = require('fs');
var text1 = 'hello world';
var text2 = ' goodbye world';

//写文件
fs.writeFile('msg.txt', text1, function(err) {
	if(err) throw err;
	console.log('Write : ' + text1);
});

//读文件
fs.readFile('msg.txt', 'utf-8', function(err, data) {	//读取文件一定要设置编码，否则默认“buffer”形式
	if(err) throw err;
	console.log('Read : ' + data);
});

//追加
fs.appendFile('msg.txt', text2, function (err) {
	if (err) throw err;
	console.log('Append :' + text2);
});

//修改文件名
fs.rename('msg.txt', 'msg.txt', function (err, stat) {
	if(err) throw err;
	console.log('Rename success');
});

//删除文件
fs.unlink('msg.txt', function () {
	console.log('Delete success');
});

//查看文件状态
fs.stat('msg.txt', function (err, stat) {
	console.log(stat);
});

//判断文件是否存在
fs.exists('msg.txt', function( exists ){
	console.log( exists ) ;
});