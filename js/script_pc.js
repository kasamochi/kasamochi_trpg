// JavaScript Document
$(function(){
	
	$('#tabMenu li').click(function(){
		var href = $(this).children('a').attr("href");
		if($(href).length > 0){
			if($(href).hasClass('active') == false){
				$('#tabMenu .select').removeClass('select');
				$(this).addClass('select');
				$('#tabContents .active').removeClass('active');
				$(href).addClass('active');
			}
		}
		return false;
	});
	});

$(function(){
	$('.accordion_btn').click(function(){
		$(this).next('.accordion_contents').slideToggle(400);
		$(this).toggleClass('active');
		if($(this).hasClass('active')){
			$(this).css('font-weight','bold');
		}else{
			$(this).css('font-weight','normal');
		}
	});
});
