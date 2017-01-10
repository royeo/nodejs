/**
 * Created by gaodong on 2016/8/11.
 */
'use strict';
const fs      = require('fs');
const Promise      = require('bluebird');
const request      = require('request');
const cheerio      = require('cheerio');
const requestAsync = Promise.promisifyAll(request);

const indexUrl     = 'https://www.appannie.com/cn/';
const loginUrl     = 'https://www.appannie.com/account/login/?_ref=header';
const rankUrlIos = 'https://www.appannie.com/apps/ios/top-chart/?_ref=header&device=iphone';


let jar = request.jar();

function indexPage(jar){
  return requestAsync.getAsync({
    url: indexUrl,
    jar: jar
  }).then(function (res) {
    let body    = res.body;

    let cookies = res.headers['set-cookie'] || [];

    for (let i = 0, len = cookies.length; i < len; i++) {
      jar.setCookie(cookies[i], indexUrl);
    }

    return null;
  }).catch(function (err) {
    console.log('getCookiesErr', err);
    throw err;
  });
}

function loginPage(jar) {
  return requestAsync.getAsync({
    url: loginUrl,
    headers: {
      'Accept'                   : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language'          : 'zh-CN,zh;q=0.8',
      'Connection'               : 'keep-alive',
      'Cookie'                   : 'optimizelyEndUserId=oeu1470915456933r0.9912456954312034; _gat_UA-2339266-6=1; km_ai=NjX3Z7p7jDJpShtqonn1BRUk%2FmA%3D; aa_language=cn; django_language=zh-cn; csrftoken=Qr1JzJVYHbMvuHO0FH3n9qhM3JiXqCDq; sessionId=".eJxrYKotZNQI5S9OLS7OzM-LT81LTMpJTfFmChVIzEktKolPzkhNzo4vycxNLWRKTkksSQUxueCMQuZQLvYHHNzcGiwc4VeSCypLqrjiQ0OcuQpZNIMKWduCCtlCOXIS89JLE9NTI5gYGBiS80K5S_KL40sLQIakFLJ3luoBANLTK9Y:1bXoLE:h1Ej2Il_u8Ox81Ad9cbF81CA6rY"; optimizelySegments=%7B%222069170486%22%3A%22false%22%2C%222083860069%22%3A%22gc%22%2C%222083940003%22%3A%22direct%22%2C%223519320656%22%3A%22none%22%7D; optimizelyBuckets=%7B%7D; __distillery=def37f1_becfe158-138f-4979-9c87-8feb214f3284-b16c29d29-9c2b77c8c0ca-f890; _ga=GA1.2.1772572531.1470915463; _hp2_ses_props.3646280627=%7B%22ts%22%3A1470915462951%2C%22d%22%3A%22www.appannie.com%22%2C%22h%22%3A%22%2Fcn%2F%22%7D; _hp2_id.3646280627=1173532345869260.1401162136224264.6513090264643015; _ceg.s=obqtr1; _ceg.u=obqtr1; _bizo_bzid=b794edc1-91c9-415b-b299-4e56aa5010f0; _bizo_cksm=6B0F882AC38F8D4A; kvcd=1470915614241; km_vs=1; km_lv=1470915614; km_uq=; _bizo_np_stats=6256%3D470%2C14%3D1214%2C; optimizelyPendingLogEvents=%5B%5D',
      'Host'                     : 'www.appannie.com',
      'Referer'                  : 'https://www.appannie.com/cn/',
      'Upgrade-Insecure-Requests': 1,
      'User-Agent'               : 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
    },
  }).then(function (res) {
    let body    = res.body;
    let $ = cheerio.load(body, {
      normalizeWhitespace: false,
      xmlMode            : false,
      decodeEntities     : false
    });

    let token = $('form#login-form > div:first-child > input').eq(0).val();
    return token;
  }).catch(function (err) {
    console.log('getCookiesErr', err);
    throw err;
  });
}

function loginWeb(jar,token) {
  return request.postAsync({
    url    : loginUrl,
    form   : {
      csrfmiddlewaretoken: token,
      next               : 'apps/ios/top-chart/?_ref=header&device=iphone',
      username           : '13255268323@163.com',
      password           : 'ljnmm6176'
    },
    headers: {
      'Accept'                   : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language'          : 'zh-CN,zh;q=0.8',
      'Connection'               : 'keep-alive',
      'Host'                     : 'www.appannie.com',
      'Cookie'                   : 'optimizelyEndUserId=oeu1470915456933r0.9912456954312034; _gat_UA-2339266-6=1; km_ai=NjX3Z7p7jDJpShtqonn1BRUk%2FmA%3D; aa_language=cn; django_language=zh-cn; csrftoken=Qr1JzJVYHbMvuHO0FH3n9qhM3JiXqCDq; sessionId=".eJxrYKotZNQI5S9OLS7OzM-LT81LTMpJTfFmChVIzEktKolPzkhNzo4vycxNLWRKTkksSQUxueCMQuZQLvYHHNzcGiwc4VeSCypLqrjiQ0OcuQpZNIMKWduCCtlCOXIS89JLE9NTI5gYGBiS80K5S_KL40sLQIakFLJ3luoBANLTK9Y:1bXoLE:h1Ej2Il_u8Ox81Ad9cbF81CA6rY"; optimizelySegments=%7B%222069170486%22%3A%22false%22%2C%222083860069%22%3A%22gc%22%2C%222083940003%22%3A%22direct%22%2C%223519320656%22%3A%22none%22%7D; optimizelyBuckets=%7B%7D; __distillery=def37f1_becfe158-138f-4979-9c87-8feb214f3284-b16c29d29-9c2b77c8c0ca-f890; _ga=GA1.2.1772572531.1470915463; _hp2_ses_props.3646280627=%7B%22ts%22%3A1470915462951%2C%22d%22%3A%22www.appannie.com%22%2C%22h%22%3A%22%2Fcn%2F%22%7D; _hp2_id.3646280627=1173532345869260.1401162136224264.6513090264643015; _ceg.s=obqtr1; _ceg.u=obqtr1; _bizo_bzid=b794edc1-91c9-415b-b299-4e56aa5010f0; _bizo_cksm=6B0F882AC38F8D4A; kvcd=1470915614241; km_vs=1; km_lv=1470915614; km_uq=; _bizo_np_stats=6256%3D470%2C14%3D1214%2C; optimizelyPendingLogEvents=%5B%5D',
      'Referer'                  : 'https://www.appannie.com/cn/',
      'Upgrade-Insecure-Requests': 1,
      'User-Agent'               : 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
    },
    method : 'POST',
  }).then(function (res) {
      let cookies = res.headers['set-cookie'] || [];
      for (let i = 0, len = cookies.length; i < len; i++) {
        jar.setCookie(cookies[i], 'https://www.appannie.com/');
      }
      return null;
    }
  ).catch(function (err) {
    console.log('loginErr', err);
  });
}

function rankPage(jar,url){
  return requestAsync.getAsync({
    url: url,
    headers: {
      'Accept'                   : '*/*',
      'Accept-Language'          : 'zh-CN,zh;q=0.8',
      'Connection'               : 'keep-alive',
      'Host'                     : 'www.appannie.com',
      'Referer'                  : 'https://www.appannie.com/apps/ios/top-chart/',
      'X-NewRelic-ID':'VwcPUFJXGwEBUlJSDgc=',
      'X-Requested-With':'XMLHttpRequest',
      'User-Agent'               : 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
    },
    jar: jar
  }).then(function (res) {
    let body    = res.body;
    body = '<!DOCTYPE html> <html> <head lang="en"> <meta charset="UTF-8"> <title></title> </head> <body>'+body+ '</body> </html>';
    return body;
  }).catch(function (err) {
    console.log('getCookiesErr', err);
    throw err;
  });
}

function getRankData(body){
  let $ = cheerio.load(body, {
    normalizeWhitespace: false,
    xmlMode            : false,
    decodeEntities     : false
  });

  let freeRanks = [];
  let paidRanks = [];
  let saleRanks = [];

  $('tr').each(function (i, e) {
    let appName = $(e).find('td').eq(0).find('span.oneline-info.title-info').attr('title');
    let companyName = $(e).find('td').eq(0).find('span.oneline-info.add-info').attr('title');

    freeRanks.push({
      appName:appName,
      companyName:companyName
    });

    appName = $(e).find('td').eq(1).find('span.oneline-info.title-info').attr('title');
    companyName = $(e).find('td').eq(1).find('span.oneline-info.add-info').attr('title');

    paidRanks.push({
      appName:appName,
      companyName:companyName
    });

    appName = $(e).find('td').eq(2).find('span.oneline-info.title-info').attr('title');
    companyName = $(e).find('td').eq(2).find('span.oneline-info.add-info').attr('title');

    saleRanks.push({
      appName:appName,
      companyName:companyName
    });
  });
}

Promise.resolve().then(function () {
  return loginPage(jar);
}).then(function (token) {
  return loginWeb(jar, token);
}).then(function () {
  return rankPage(jar,rankUrlIos);
}).then(function (body) {
  console.log(body);
});