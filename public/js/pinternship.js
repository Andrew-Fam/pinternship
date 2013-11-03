var currentListPosition;

$(document).ready(function(){
	$('.pint-job-item-selector').click(function(){
		currentListPosition = $('html, body').scrollTop();

		$('.pint-ui-frame').openSideBar();
		$('html, body').scrollTop(0);
	});
	$('.back-to-list').click(function(){
		$('.pint-ui-frame').closeSideBar();
		
		$('html, body').scrollTop( currentListPosition );
	});
	$(window).scroll(function(){
		if($('html, body').scrollTop()>50){
			$('.back-to-list').css('margin-top', $('html, body').scrollTop() - 50 );
		}else{
			$('.back-to-list').css('margin-top', $('html, body').scrollTop());
		}
	});
	$("#btn-expand-search-options").click(function(){
		$('.pint-ui-view-top').addClass('expanded animated fadeInDownBig');
	});
	$("#btn-collapse-search-options").click(function(){
		$('.pint-ui-view-top').removeClass('expanded animated fadeInDownBig');
	});
});

$.fn.openSideBar = function()
{
	$(this).addClass('pullLeft');
}
$.fn.closeSideBar = function()
{
	$(this).removeClass('pullLeft');
}