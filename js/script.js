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

$(function () {
 $('.accordion_btn').click(function () {
  $(this).next('.accordion_contents').slideToggle(400);
  $(this).toggleClass('active');
 });
});

// jQueryコード
// sample.js
$(function () {
 var topBtn = $('#page_top');
 topBtn.hide();

 //ボタンの表示設定
 $(window).scroll(function () {
  if ($(this).scrollTop() > 80) {
   // 画面を80pxスクロールしたら、ボタンを表示する
   topBtn.fadeIn();
  } else {
   // 画面が80pxより上なら、ボタンを表示しない
   topBtn.fadeOut();
  }
 });

 // ボタンをクリックしたら、スクロールして上に戻る
 topBtn.click(function () {
  $('body,html').animate({
   scrollTop: 0
  }, 500);
  return false;
 });

});


//フィルタ機能
jQuery(function ($) {

 /* 要素を取得(ボタンと要素) */
 var btnList = $('.filterBtnList *'),
  btnAll = $('#filterAll'),
  filterSingle = $('#filterSingle'),
  filterPartner = $('#filterPartner'),
  filterBuddy = $('#filterBuddy'),
  filterTeam = $('#filterTeam'),
  box = $('.pc p');

 /* ボタンのいずれかをクリックした場合 */
 btnList.click(function () {
  if (!($(this).hasClass('active'))) {
   var filterClass = $(this).attr('class');
   btnList.removeClass('active');
   $(this).addClass('active');

   box.each(function () {
    $(this).fadeOut(0);
    if ($(this).hasClass(filterClass)) {
     $(this).stop().fadeIn(300);
    } else if (filterClass === 'all') {
     box.stop().fadeIn(300);
    }
   });
  }
 });

});

// フィルタアコーディオン
$(function () {
 $('.filter-more-button').click(function () {
  $(this).prev('.filter-more').slideToggle();
  $(this).toggleClass("open");
 });
});

//キーワード検索

$(function () {
 var searchWord = function () {

  var searchText = $(this).val().trim().split(/\s+/), // 検索ボックスに入力された値
   targetText;

  $('.pc p').each(function () {
   targetText = $(this).text();

   // 検索対象となるリストに入力された文字列が存在するかどうかを判断
   if (targetText.indexOf(searchText) != -1) {
    $(this).removeClass('hidden');
   } else {
    $(this).addClass('hidden');
   }
  });
 };

 // searchWordの実行
 $('#search-text').on('input', searchWord);
});

$(function () {
 var now = new Date();
 var y = now.getFullYear();
 var m = now.getMonth() + 1;
 var d = now.getDate();
 $('#currentDate').text(y + "/" + m + "/" + d);
 $('#currentDate-2').text(y + "/" + m + "/" + d);
});
