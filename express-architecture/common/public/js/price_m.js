var cardTypeEle = $('#cardtype');
var aCardTypes = $('li[CardType]');
var buyCountEle = $('.buyCount');
var btnAdd = $('#btn-add');
var btnSub = $('#btn-sub');
var btnBuy = $('#buyNow');
var buyMoney = $('#spmoney,.goodsprice');
var totalprice = $('.totalprice');
var rate = $('.rate');
var orderNow = $('.price-item li');
var userName = $('#username');
var webLink = $('#website');
// 修复购买数量
function fixCount(){
	var count = buyCountEle.val();
	try{
		count = parseInt(count);
		if(count < 1){
			count = 1;
		}
	} catch(e) {
		count = 1;
	}
	buyCountEle.val(count);
} 

// 重新计算价钱
function recalPrice() {
    var price = parseFloat($('.active-btn').attr('displayvalue'));
	var count = parseInt(buyCountEle.val());
	var total = price * count;
	buyMoney.html('$' + total.toFixed(2) + ' USD')
	if (rate.length > 0 && totalprice.length > 0) {
	    var paypalrate = parseFloat(rate.attr('rate'));
	    var rateprice = total * paypalrate;
	    totalprice.html('$' + (total + rateprice).toFixed(2) + ' USD');
	    rate.html('$' + rateprice.toFixed(2) + ' USD');
	}
}
function getKeys(k) {
    var keys = k || 'page_id', args = location.search, keyk = keys.split(',');
    for (var i in keyk) {
        var reg = new RegExp('[\?&]?' + keyk[i] + '=([^&]*)[&$]?', 'gi');
        var chk = args.match(reg), rtn = chk === null ? '' : RegExp.$1;
        if (rtn != '' && rtn != 'compatible') break;
    }
    return rtn == 'compatible' ? '' : rtn;
};

var preCardType = null;
$(function () {
    API_CheckLogin();
	aCardTypes.click(function () {
	    var $this = $(this);
	    if ($this.attr('class') == 'off-btn') {
	        return;
	    }
	    var cardType = $this.attr('CardType');
	    if (preCardType != null) {
	        preCardType.removeClass('active-btn');
	        preCardType.addClass('a-btn');
	    }

		// 一键下单的价格选择
		orderNow.removeClass('active-btn');
        orderNow.addClass('a-btn');

	    $this.addClass('active-btn');
	    $this.removeClass('a-btn');

	    preCardType = $this;
		cardTypeEle.val(cardType);
		recalPrice();
	});

	var selectedType = getKeys('cardtype');
	if(selectedType != '')
	    $('li[cardtype="' + selectedType + '"]').trigger('click');
	else
	    aCardTypes.eq(0).trigger('click');

	buyCountEle.blur(function (e) {
		fixCount();	
		recalPrice();			
	});

	btnAdd.click(function (e) {
		fixCount();
		var count = parseInt(buyCountEle.val()) + 1;
		buyCountEle.val(count);
		recalPrice();
	});

	btnSub.click(function (e) { 
		fixCount();
		var count = parseInt(buyCountEle.val()) - 1;
		if (count > 0) {
			buyCountEle.val(count);
		}
		recalPrice();
	});

	//支付宝账号框输入响应
	userName.on('input',function(){
		if (userName.val().length > 0) {
			userName.parent().removeClass("error");
			userName.css("border", "", "backgroundColor", "white");
		}
	});

    //网站链接输入响应
	webLink.on('input', function () {
	    if (webLink.val().length > 0) {
	        webLink.removeClass("error");
	        webLink.css("border", "", "backgroundColor", "white");
	    }
	});

	btnBuy.click(function (e) {  
		if($('#cardtype').val().indexOf('alipay') >= 0) {
			var alipayAccount = userName.val();
			if (alipayAccount.length <= 0) {
				userName.parent().addClass("error");
				userName.css("border", "1px solid #f00");
				return;
			}
		}
		else if ($('#cardtype').val() == 'dg1' || $('#cardtype').val() == 'wfdk') {
		    var link = webLink.val();
		    if (link.length <= 0) {
		        webLink.addClass("error");
		        webLink.css("border", "1px solid #f00");
		        return;
		    }
		}

	    $('form').submit();
	});

	recalPrice();
});