var currentListPosition;

$(document).ready(function(){
	$('.pint-job-item-selector').click(function(){
		currentListPosition = $(document).scrollTop();

		$('.pint-ui-frame').openSideBar();
		$(document).scrollTop(0);
	});
	$('.back-to-list').click(function(){
		$('.pint-ui-frame').closeSideBar();
		
		$(document).scrollTop( currentListPosition );
	});
	$(window).scroll(function(){
		if($(document).scrollTop()>50){
			$('.back-to-list').css('margin-top', $(document).scrollTop() - 50 );
		}else{
			$('.back-to-list').css('margin-top', $(document).scrollTop());
		}
	});
	$("#btn-expand-search-options").click(function(){
		
		currentListPosition = $(document).scrollTop();

		$('.pint-ui-view-top').addClass('expanded animated fadeInDownBig');
	});
	$("#btn-collapse-search-options").click(function(){

		$('.pint-ui-view-top').removeClass('expanded animated fadeInDownBig');

		$(document).scrollTop( currentListPosition );
	});
});

$.fn.openTopBar = function() {
	$(this).addClass();
}

$.fn.openSideBar = function() {
	$(this).addClass('pullLeft');
	return $(this);
}
$.fn.closeSideBar = function() {
	$(this).removeClass('pullLeft');
	return $(this);
}