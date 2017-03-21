//抓取口袋巴士的ios游戏排行榜

var http = require('http');
var cheerio = require('cheerio');
var request = require('request');

function download(url, callback) {
  request.get({url: url, gzip: true}, function (err, res, data) {
    if (err || !data || res.statusCode !== 200) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
}

var url = 'http://www.ptbus.com/';

download(url, function (err, data) {
  if (err) {
    return console.log('Error');
  }

  if (data) {
    // console.log(data)

    var $ = cheerio.load(data, {
      normalizeWhitespace: false,
      xmlMode: false,
      decodeEntities: false
    });

    $('div.ph_panes.ph_panes1.marL20.borderL > ul > li').each(function (i, e) {
      // var name = $(e).find('div.ph_b').find('h3').find('a').text();
      // var link = $(e).find('div.ph_b').find('h3').find('a').attr('href');

      var name = $(e).find('div.ph_b').find('h3 > a').text();
      var link = $(e).find('div.ph_b').find('h3 > a').attr('href');

      // var name = $(e).find('div.ph_b > h3 > a').text();
      // var link = $(e).find('div.ph_b > h3 > a').attr('href');

      console.log('[' + name + ']' + link);
    })

    // $('ul.u980 > li').each(function (i, e) {
    //   var link = $(e).find('a').attr('href');
    //   var name = $(e).find('a').attr('title');
    //
    //   console.log('[' + name + ']' + link);
    // })
  }
});