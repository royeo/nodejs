var cardTypeEle = $('#cardType');
var aCardTypes = $('a[CardType]');
var buyCountEle = $('.fn-left');
var btnAdd = $('.btn-amount-add');
var btnSub = $('.btn-amount-sub');
var btnBuy = $('.btn-buy');
// 修复购买数量
function fixCount(){
	var count = buyCountEle.val();
	try{
		count = parseInt(count);
		if(count < 1 || isNaN(count)){
			count = 1;
		}
	} catch(e) {
		count = 1;
	}
	buyCountEle.val(count);
} 

// 重新计算价钱
function recalPrice() {
	var price = parseFloat($('.current').attr('displayvalue'));
	var count = parseInt(buyCountEle.val());
	var total = isNaN(count) ? 0.00 : price * count;
	$('.price dd').text('$' + total.toFixed(2) + ' USD');
	if (userEmail == undefined || userEmail == null || userEmail == "") {
	    setReturnUrl();
	}
}

function setReturnUrl() {
    //cardType ,buyCount ,alipayAccount
    var count = parseInt(buyCountEle.val());
    var cardType = $('.current').attr('CardType');
    var alipayAccount = $('#input-alipay').val();
    var alipayName = $('#input-alipay-name').val();
    if (alipayAccount == undefined)
        alipayAccount = '';
    if (alipayName == undefined)
        alipayName = '';
    var returnUrl = '/order/confirm?cardType=' + cardType + '&buyCount=' + count + '&alipayAccount=' + alipayAccount + '&alipayName=' + alipayName;
    $('#ReturnUrl').val(returnUrl);
}

$(function () {
    API_CheckLogin();
	aCardTypes.click(function () {
		var $this = $(this);
		var cardType = $this.attr('CardType');
		aCardTypes.removeClass('current');
		$this.addClass('current');                
		cardTypeEle.val(cardType);
		recalPrice();
	});

	var selectedType = getKeys('type');
	if(selectedType != '')
	    $('a[CardType="' + selectedType + '"]').trigger('click');
	else
	    aCardTypes.eq(0).trigger('click');

	// 根据数量实时改变价格
    buyCountEle.keyup(function(){
	    buyCountEle = $(this);
        recalPrice();
    });

	buyCountEle.blur(function (e) {
		buyCountEle = $(this);
		fixCount();	
		recalPrice();			
	});

	btnAdd.click(function (e) {
		btnAdd = $(this);
		fixCount();
		var count = parseInt(buyCountEle.val()) + 1;
		buyCountEle.val(count);
		recalPrice();
	});

	btnSub.click(function (e) { 
		btnSub = $(this);
		fixCount();
		var count = parseInt(buyCountEle.val()) - 1;
		if (count > 0) {
			buyCountEle.val(count);
		}
		recalPrice();
	});

	btnBuy.click(function () {
	    btnBuy = $(this);
	    recalPrice();

	    var cardType = $('.current').attr('CardType');

		// 如果是支付宝，需要输入支付宝账号
	    if (cardType.indexOf('alipay') >= 0)
        {
	        var alipayAccount = $('#input-alipay').val();
	        var alipayAccountConfirm = $('#input-confirm-alipay').val();
			if (alipayAccount == '' || alipayAccount == undefined){
				return false;
			}
			else if (alipayAccount != alipayAccountConfirm && alipayAccountConfirm != undefined){
				return false;
			}
		}
		else if (cardType == "dg1" || cardType == "wfdk") {
		    var link = $('#link').val();
		    if (link == '' || link == undefined) {
		        $('#dg-error').removeClass('hidden-error');
		        return false;
		    }
		    else {
		        $('#dg-error').addClass('hidden-error');
		    }
		}

	    if (userEmail == "" || userEmail == undefined) {
	        var popup = $('.login');
	        showPopup(popup);
	        return false;
	    }
	});

	recalPrice();
});