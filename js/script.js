// JavaScript Document
//$(function(){
//	
//	$('#tabMenu li').click(function(){
//		var href = $(this).children('a').attr("href");
//		if($(href).length > 0){
//			if($(href).hasClass('active') == false){
//				$('#tabMenu .select').removeClass('select');
//				$(this).addClass('select');
//				$('#tabContents .active').removeClass('active');
//				$(href).addClass('active');
//			}
//		}
//		return false;
//	});
//	});

$(function(){
	$('.accordion_btn').click(function(){
		$(this).next('.accordion_contents').slideToggle(400);
		$(this).toggleClass('active');
	});
});

// jQueryコード
// sample.js
$(function(){
  var topBtn=$('#page_top');
  topBtn.hide();
    
  //ボタンの表示設定
  $(window).scroll(function(){
    if($(this).scrollTop()>80){
      // 画面を80pxスクロールしたら、ボタンを表示する
      topBtn.fadeIn();
    }else{
      // 画面が80pxより上なら、ボタンを表示しない
      topBtn.fadeOut();
    }
  });
  
  // ボタンをクリックしたら、スクロールして上に戻る
  topBtn.click(function(){
    $('body,html').animate({
    scrollTop: 0},500);
    return false;
  });
  
  });