/**
 * Created by gaodong on 2016/8/11.
 */
'use strict';
const fs = require('fs');
const Promise = require('bluebird');
const request = require('request');
const cheerio = require('cheerio');
const requestAsync = Promise.promisifyAll(request);

const loginUrl      = 'https://www.appannie.com/account/login/?_ref=header';
const loginPostUrl  = 'https://www.appannie.com/account/login/';
const rankUrlIos    = 'https://www.appannie.com/apps/ios/top-chart/?device=iphone';
const rankUrlIosAll = 'https://www.appannie.com/apps/ios/top-table/20160823-US-36-iphone/?p=2-&h=0&iap=';

let jar = request.jar();

let freeRanksIphone = [];
let paidRanksIphone = [];
let saleRanksIphone = [];

let freeRanksIpad = [];
let paidRanksIpad = [];
let saleRanksIpad = [];

let freeRanksAndroid = [];
let paidRanksAndroid = [];
let saleRanksAndroid = [];

function loginPage(jar) {
  return requestAsync.getAsync({
    url: loginUrl,
    headers: {
      'Cookie': 'optimizelyEndUserId=oeu1471845477887r0.44326286441250584; __distillery=2746461_b9ace265-c3d4-4992-9971-d6a3db053bd4-a988a3d57-6d5b8dbf891c-3dd1; km_lv=x; selection_key=c463e79bdd66f0e12777efd2f13f0d19; welcome_carousel=1; _mkto_trk=id:071-QED-284&token:_mch-appannie.com-1471916488571-66380; AWSELB=331D994D065BEC88E895FA13AE39AE5499DD2921C4E0B78BC066222257B153E8FBBB4C44664BECC9C93D6E5EF7093C5CC0B18150D2D236C7AE700261BFFC60B5E6E5DDF0D5; _gat_UA-2339266-6=1; __atuvc=19%7C34; __atuvs=57bbf5c05c18a773004; km_ai=13255268323%40163.com; km_ni=13255268323%40163.com; csrftoken=tNCMyi9Y2aUj6pkks0icmWW3gqKQhAd6; sessionId=".eJxrYKotZAwVSMxJLSqJT85ITc6OL8nMTS1kSk5JLEkFMbngjELmUC72TYyMDGCQXFBZUsUVHxrizFXIohlUyNoWVMhWrAcAOU0YWw:1bc6QT:q3UPc6CYFU4M5kw90JZRfTYBJgE"; aa_language=en; optimizelySegments=%7B%222069170486%22%3A%22false%22%2C%222083860069%22%3A%22gc%22%2C%222083940003%22%3A%22direct%22%2C%223519320656%22%3A%22none%22%7D; optimizelyBuckets=%7B%7D; _ga=GA1.2.614046806.1471845483; _hp2_ses_props.3646280627=%7B%22r%22%3A%22https%3A%2F%2Fwww.appannie.com%2Faccount%2Flogin%2F%3F_ref%3Dheader%22%2C%22ts%22%3A1471930291683%2C%22d%22%3A%22www.appannie.com%22%2C%22h%22%3A%22%2Fdashboard%2Fhome%2F%22%7D; _hp2_id.3646280627=5757342250072147.7059591408443089.2338722534349533; _ceg.s=occqys; _ceg.u=occqys; _bizo_bzid=a52ab274-14ac-4b93-96ea-ab4b802a99a5; _bizo_cksm=FCE52007BB8FD729; _bizo_np_stats=6256%3D133%2C14%3D255%2C; kvcd=1471938437066; km_vs=1; km_uq=; optimizelyPendingLogEvents=%5B%5D',
    }
  }).then(function (res) {
    let body = res.body;
    let $ = cheerio.load(body);
    let token = $('form#login-form > div:first-child > input').eq(0).val();
    return token;
  }).catch(function (err) {
    console.log('getCookiesErr', err);
    throw err;
  });
}

function loginWeb(jar, token) {
  return request.postAsync({
    url: loginPostUrl,
    form: {
      csrfmiddlewaretoken: token,
      username: '13255268323@163.com',
      password: 'ljnmm6176'
    },
    headers: {
      'Cookie': 'optimizelyEndUserId=oeu1471845477887r0.44326286441250584; __distillery=2746461_b9ace265-c3d4-4992-9971-d6a3db053bd4-a988a3d57-6d5b8dbf891c-3dd1; km_lv=x; selection_key=c463e79bdd66f0e12777efd2f13f0d19; welcome_carousel=1; _mkto_trk=id:071-QED-284&token:_mch-appannie.com-1471916488571-66380; AWSELB=331D994D065BEC88E895FA13AE39AE5499DD2921C4E0B78BC066222257B153E8FBBB4C44664BECC9C93D6E5EF7093C5CC0B18150D2D236C7AE700261BFFC60B5E6E5DDF0D5; _gat_UA-2339266-6=1; __atuvc=19%7C34; __atuvs=57bbf5c05c18a773004; km_ai=13255268323%40163.com; km_ni=13255268323%40163.com; csrftoken=tNCMyi9Y2aUj6pkks0icmWW3gqKQhAd6; sessionId=".eJxrYKotZAwVSMxJLSqJT85ITc6OL8nMTS1kSk5JLEkFMbngjELmUC72TYyMDGCQXFBZUsUVHxrizFXIohlUyNoWVMhWrAcAOU0YWw:1bc6QT:q3UPc6CYFU4M5kw90JZRfTYBJgE"; aa_language=en; optimizelySegments=%7B%222069170486%22%3A%22false%22%2C%222083860069%22%3A%22gc%22%2C%222083940003%22%3A%22direct%22%2C%223519320656%22%3A%22none%22%7D; optimizelyBuckets=%7B%7D; _ga=GA1.2.614046806.1471845483; _hp2_ses_props.3646280627=%7B%22r%22%3A%22https%3A%2F%2Fwww.appannie.com%2Faccount%2Flogin%2F%3F_ref%3Dheader%22%2C%22ts%22%3A1471930291683%2C%22d%22%3A%22www.appannie.com%22%2C%22h%22%3A%22%2Fdashboard%2Fhome%2F%22%7D; _hp2_id.3646280627=5757342250072147.7059591408443089.2338722534349533; _ceg.s=occqys; _ceg.u=occqys; _bizo_bzid=a52ab274-14ac-4b93-96ea-ab4b802a99a5; _bizo_cksm=FCE52007BB8FD729; _bizo_np_stats=6256%3D133%2C14%3D255%2C; kvcd=1471938437066; km_vs=1; km_uq=; optimizelyPendingLogEvents=%5B%5D',
    }
  }).then(function (res) {
      let cookies = res.headers['set-cookie'] || [];
      for (let i = 0, len = cookies.length; i < len; i++) {
        jar.setCookie(cookies[i], 'https://www.appannie.com/');
      }
      return null;
    }
  ).catch(function (err) {
    console.log('loginErr', err);
    throw err;
  });
}

function getRankPage(jar, url) {
  return requestAsync.getAsync({
    url: url,
    headers : {
      'Referer'           : 'https://www.appannie.com/apps/ios/top-chart/?device=iphone',
      'X-Requested-With'  : 'XMLHttpRequest',
      'User-Agent'        : 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
    },
    jar: jar
  }).then(function (res) {
    return res.body;
  }).catch(function (err) {
    console.log('getCookiesErr', err);
    throw err;
  });
}

function getRankInfo(body, freeRanks, paidRanks, saleRanks, flag){
  let selector;

  let $ = cheerio.load(body, {
    normalizeWhitespace: false,
    xmlMode            : false,
    decodeEntities     : false
  });

  if (flag) {
    selector = 'tr';
  } else {
    selector = '#storestats-top-table > tr';
  }

  $(selector).each(function (i, e) {
    let appName     = $(e).find('td').eq(0).find('span.oneline-info.title-info').attr('title');
    let companyName = $(e).find('td').eq(0).find('span.oneline-info.add-info').attr('title');
    let icon        = $(e).find('td').eq(0).find('img.app-icon').attr('src');
    let appLink     = $(e).find('td').eq(0).find('a.icon-link').attr('href');

    freeRanks.push({
      icon        : icon,
      appName     : appName,
      companyName : companyName,
      appLink     : appLink
    });

    appName     = $(e).find('td').eq(1).find('span.oneline-info.title-info').attr('title');
    companyName = $(e).find('td').eq(1).find('span.oneline-info.add-info').attr('title');
    icon        = $(e).find('td').eq(1).find('img.app-icon').attr('src');
    appLink     = $(e).find('td').eq(1).find('a.icon-link').attr('href');

    paidRanks.push({
      icon        : icon,
      appName     : appName,
      companyName : companyName,
      appLink     : appLink
    });

    appName     = $(e).find('td').eq(2).find('span.oneline-info.title-info').attr('title');
    companyName = $(e).find('td').eq(2).find('span.oneline-info.add-info').attr('title');
    icon        = $(e).find('td').eq(2).find('img.app-icon').attr('src');
    appLink     = $(e).find('td').eq(2).find('a.icon-link').attr('href');

    saleRanks.push({
      icon        : icon,
      appName     : appName,
      companyName : companyName,
      appLink     : appLink
    });
  });

  console.log(freeRanks.length);
  console.log(paidRanks.length);
  console.log(saleRanks.length);

  // console.log('----------免费榜----------')
  // console.log(freeRanks);
  // console.log('----------付费榜----------')
  // console.log(paidRanks);
  // console.log('----------畅销榜----------')
  // console.log(saleRanks);
}

Promise.resolve().then(function () {
  return loginPage(jar);
}).then(function (token) {
  return loginWeb(jar, token);
}).then(function () {
  return getRankPage(jar,rankUrlIos);
}).then(function (body) {
  getRankInfo(body, freeRanksIphone, paidRanksIphone, saleRanksIphone, false);
  return getRankPage(jar,rankUrlIosAll);
}).then(function (body) {
  getRankInfo(body, freeRanksIphone, paidRanksIphone, saleRanksIphone, true);
  console.log('ok')
}).catch(function (err) {
  console.log(err);
});
