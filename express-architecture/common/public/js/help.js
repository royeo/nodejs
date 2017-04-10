$(function(){
	var $alink = $(".help-sub,.footer-bd,.copyright").find("a");
	$(".help-main-wrap").addClass("fn-hide").eq(0).removeClass("fn-hide")
	$alink.click(function () { 
		var pnum = $(this).attr("num")
		$alink.removeClass("current");
		$(this).addClass("current");
		$(".help-main-wrap").addClass("fn-hide");
		$(".help-main-wrap[num=" + pnum + "]").removeClass("fn-hide");

	});
	var hash = window.location.hash;
	if (hash != '') {
		hash = hash.substr(1);
		if ($('.help-sub').find('a[num="' + hash + '"]').length > 0) {
			$('.help-sub').find('a[num="' + hash + '"]').trigger('click');
		}
	}
});