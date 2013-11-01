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
});

$.fn.openSideBar = function()
{
	$(this).addClass('pullLeft');
}
$.fn.closeSideBar = function()
{
	$(this).removeClass('pullLeft');
}