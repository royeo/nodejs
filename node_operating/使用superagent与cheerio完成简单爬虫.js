var express    = require('express');
var superagent = require('superagent');
var cheerio    = require('cheerio');
var eventproxy = require('eventproxy');
var url        = require('url');

var app = express();
var cnodeUrl = 'https://cnodejs.org/';

// 获取cnode首页帖子的标题、链接、回复数、阅读数
app.get('/', function(req, res, next) {
    superagent.get(cnodeUrl)
    .end(function(err, htmlData) {
        if(err) {
            return console.error(err);
        }
        var $ = cheerio.load(htmlData.text);
        var items = [];
        $('#topic_list .cell').each(function(idx, element) {
            var repliesCount = $(element).find('.count_of_replies');
            var visitsCount = $(element).find('.count_of_visits');
            var topicTitle = $(element).find('.topic_title');
            items.push({
                title: topicTitle.attr('title'),
                href: topicTitle.attr('href'),
                repliesCount: repliesCount.text().split('\n')[1].trim(),
                visitsCount: visitsCount.text().split('\n')[1].trim(),
            });
        });
        res.send({
            items: items,
            length: items.length
        });
    })
});

// 获取cnode首页四十个帖子的第一条回复
app.get('/more', function(req, res, next) {
    superagent.get(cnodeUrl)
    .end(function (err, data) {
        if (err) {
            return console.error(err);
        }
        var topicUrls = [];
        var $ = cheerio.load(data.text);

        // 获取帖子的链接
        $('#topic_list .topic_title').each(function (idx, element) {
            var $element = $(element);
            // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
            // 我们用 url.resolve 来自动推断出完整 url，变成
            // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
            // 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
            var href = url.resolve(cnodeUrl, $element.attr('href'));
            topicUrls.push(href);
        });

        var ep = new eventproxy();

        topicUrls.forEach(function (topicUrl) {
            superagent.get(topicUrl)
            .end(function (err, res) {
                if (err) {
                    console.log('fetch ' + topicUrl + ' error');
                }
                console.log('fetch ' + topicUrl + ' successful');
                ep.emit('topic_html', [topicUrl, res.text]);
            });
        });   

        // 命令 ep 重复监听 topicUrls.length 次（在这里也就是 40 次） `topic_html` 事件再行动
        // API学习：https://github.com/JacksonTian/eventproxy#%E9%87%8D%E5%A4%8D%E5%BC%82%E6%AD%A5%E5%8D%8F%E4%BD%9C
        var comments = [];
        ep.after('topic_html', topicUrls.length, function (topics) {
            topics = topics.map(function (topicPair) {
                var topicUrl = topicPair[0];
                var topicHtml = topicPair[1];
                var $ = cheerio.load(topicHtml);
                comments.push({
                    title: $('.topic_full_title').text().trim(),
                    href: topicUrl,
                    comment1: $('.reply_content').eq(0).text().trim(),
                });
            });

            console.log('final:');
            console.log(topics);

            res.send(comments);
        });       
    });
});

app.listen(8888, function () {
  console.log('app is listening at port 8888');
});