var currentPopup = null;
var btnSub = $('#btn-amount-sub');

function getKeys(k) {
    var keys = k || 'page_id', args = location.search, keyk = keys.split(',');
    for (var i in keyk) {
        var reg = new RegExp('[\?&]?' + keyk[i] + '=([^&]*)[&$]?', 'gi');
        var chk = args.match(reg), rtn = chk === null ? '' : RegExp.$1;
        if (rtn != '' && rtn != 'compatible') break;
    }
    return rtn == 'compatible' ? '' : rtn;
};

$(function () {

    $(".placeholder").inFieldLabels();
    $(".placeholder").click(function (event) {
      $(event.target).prev().focus();
    })

    $('#searchOrder').keypress(function (e) {
        var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if (keyCode == 13) {
            $('.btn-search-order').trigger('click');
        }
    });

    $('.btnlogin').click(function () {
      $('#ReturnUrl').val(window.location.href);
      var popup = $('.login');
        showPopup(popup);
    });

    $('.btn-search-order').click(function () {
        var order = $('#searchOrder').val();
        if (order.length < 12) {
            alert('订单号输入错误，请检查.');
            return;
        }
        API_QueryOrder(order, function (result) {
            if (result.Code == 1) {
                alert('无法找到该订单');
                return;
            }
            $('.em-orderid').html(order);  
            $('.em-time').html(result.Data.OrderTime);
            $('.em-money').html(result.Data.Money);
            $('.em-orderstate').html(result.Data.PayStateInfo);
            var popup = $('.popuporder');
            showPopup(popup);
        });
    });


    $('.close').click(function () {
        $('.popbg').addClass('fn-hide');
        if (currentPopup && currentPopup.addClass)
            currentPopup.addClass('fn-hide');
    });

    $('.btn-go-pay').click(function () {
        $('form').submit();
        return true;
        var popupRealName = $('.popupRealName');
        if (popupRealName.length == 0) {
            $('form').submit();
            return true;
        } else {
            showPopup(popupRealName);
            return false;
        }

    });

    var showSetPassTips = getKeys('setpass') == '1';
    if (showSetPassTips) showTips();
});


function showPopup(popup) {
    popup.removeClass('fn-hide').css('top', '200px').css('left', '40%').css('z-index', 99);
    $('.popbg').removeClass('fn-hide');
    currentPopup = popup;// $('.login');
};
//修改密码提示
function showTips(){
	$(".success").show(150,function(){
		var intervalId = setInterval(function(){
			$(".success").hide();
			clearInterval(intervalId);
		},5000);
	});
};

// 标记错误
function setFormItemError(item, msg){
	item = $(item);
	item.addClass('ui-form-item-error');
	item.find('.ui-form-other-error').remove();
	item.find('.ui-form-other-done').remove();
	item.find('.ui-form-other').remove();
	if(msg){
		item.append('<span class="ui-form-other-error"><em>' + msg + '</em></span>');
	}
};

// 标记正确
function setFormItemPass(item){
	item = $(item);
	item.removeClass('ui-form-item-error');
	item.find('.ui-form-other-error').remove();
	item.find('.ui-form-other-done').remove();
	item.find('.ui-form-other').remove();
	item.append('<span class="ui-form-other-done">完成</span>');
};

function execute(act, dict, onsuccess, onerr, async, retType) {
    if (retType == undefined)
        retType = 'text';
    if (async == undefined)
        async = true;
    if (onerr == undefined)
        onerr = null;
    $.ajax(
        {
            url: '/WebApi/'+ act,
            async: async,
            type: 'POST',
            dataType: retType,
            error: onerr,
            success: function (data) {
                var result = $.parseJSON(data);
                if (result.Code == -1) {
                    alert(result.Message);
                    return;
                }
                onsuccess(result);
            },
            data: dict
        }
    );
}

function API_QueryOrder(orderId,callback) {
    execute('QueryOrder', { 'orderId': orderId }, callback);
}
//检查密码
function API_CheckPass(password,callback) {
    execute('CheckPass', { 'password': password }, callback);
}
//删除订单
function API_DeleteOrder(orderId,callback) {
	execute('DeleteOrder', { 'orderId': orderId }, callback);
}

function API_CheckLogin(callback) {
    execute('CheckLogin', {}, function (result) {
        userEmail = result.Message;
        if (callback) callback(result);
    });
}

//删除订单提示
function showDialogTips(result){
	var msg = "";
	switch(result.Code){
		case 0 : msg = '删除成功';
			break;
		case 30 : msg = '用户未登录';
			break;
		case 31 : msg = '该订单不是自己的，不能删除';
			break;
		case 32 : msg = '订单已付款，不能删除';
			break;
		case 33 : msg = '未找到订单';
			break;
	};
	var d = dialog({
		content: msg
	});
	d.show();
	setTimeout(function () {
		d.close().remove();
		if(result.Code === 0){
			location.reload(true);
		}
	}, 2000);
}

//返回顶部
    var $layout = $('.layout');
    var $newGoTop = $('.j-new-retop')
    var hidden2 = true;
    $(window).scroll(function () {
        var scrollHeight = $(window).scrollTop();
        var pageHeight = $(window).height();
        var pageWidth = $(window).width();
        var mainWidth = $layout.width();
        var leftWidth = (pageWidth - mainWidth) / 2;
        if (hidden2 && scrollHeight > pageHeight - 800) {
            $newGoTop.fadeIn(100);
            hidden2 = false;
            return true;
        }
        if (!hidden2 && scrollHeight < pageHeight - 800) {
            $newGoTop.fadeOut(100);
            hidden2 = true;
            return true;
        }
    });

$newGoTop.click(function(){
    $("html,body").animate({'scrollTop':0},500)
 })