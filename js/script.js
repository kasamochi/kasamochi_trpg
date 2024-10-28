'use strict';

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
 //クラス「accordion_btn」クリックで発生
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


// フィルタアコーディオン
$(function () {
 $('.filter-more-button').click(function () {
  $(this).prev('.filter-more').slideToggle();
  $(this).toggleClass("open");
 });
});

//キーワード検索
$(function () {
 searchWord = function () {
  var searchText = $(this).val(), // 検索ボックスに入力された値
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

//プルダウンで検索
$(function() {
    var lists = $('.pc p');
    $(document).on('change', '.serchBox select', function() {
        lists.show();
        for (var i = 0; i < $('.serchBox select').length; i++) {
            // 絞り込みの項目を取得
            var item = $('.serchBox select').eq(i).attr('name');
            // 絞り込みの対象を取得
            var target = $('.serchBox select').eq(i).val();
 
            if(target != '') {
                for (var j = 0; j < lists.length; j++) {
                    // 絞り込み対象でない場合は非表示
                    if(!lists.eq(j).hasClass(target)) {
                        lists.eq(j).hide();
                    }
                };
            }
        };
    });
});

//今日の日付
$(function () {
 var now = new Date();
 var y = now.getFullYear();
 var m = now.getMonth() + 1;
 var d = now.getDate();
 $('#currentDate').text(y + "/" + m + "/" + d);
 $('#currentDate-2').text(y + "/" + m + "/" + d);
});


window.addEventListener('load', function () {
	let column_no = 0; //今回クリックされた列番号
	let column_no_prev = 0; //前回クリックされた列番号
	document.querySelectorAll('#sort_table_1 th,#sort_table_2 th,#sort_table_8 th,#sort_table_9 th,#sort_table_10 th,#sort_table_11 th,#sort_table_12 th,#sort_table_13 th,#sort_table_14 th,#sort_table_15 th,#sort_table_16 th').forEach(elm => {
		elm.onclick = function () {
			column_no = this.cellIndex; //クリックされた列番号
			let table = this.parentNode.parentNode.parentNode;
			let sortType = 0; //0:数値 1:文字
			let sortArray = new Array; //クリックした列のデータを全て格納する配列
			for (let r = 1; r < table.rows.length; r++) {
				//行番号と値を配列に格納
				let column = new Object;
				column.row = table.rows[r];
				column.value = table.rows[r].cells[column_no].textContent;
				sortArray.push(column);
				//数値判定
				if (isNaN(Number(column.value))) {
					sortType = 1; //値が数値変換できなかった場合は文字列ソート
				}
			}
			if (sortType == 0) { //数値ソート
				if (column_no_prev == column_no) { //同じ列が2回クリックされた場合は降順ソート
					sortArray.sort(compareNumberDesc);
				} else {
					sortArray.sort(compareNumber);
				}
			} else { //文字列ソート
				if (column_no_prev == column_no) { //同じ列が2回クリックされた場合は降順ソート
					sortArray.sort(compareStringDesc);
				} else {
					sortArray.sort(compareString);
				}
			}
			//ソート後のTRオブジェクトを順番にtbodyへ追加（移動）
			let tbody = this.parentNode.parentNode;
			for (let i = 0; i < sortArray.length; i++) {
				tbody.appendChild(sortArray[i].row);
			}
			//昇順／降順ソート切り替えのために列番号を保存
			if (column_no_prev == column_no) {
				column_no_prev = -1; //降順ソート
			} else {
				column_no_prev = column_no;
			}
		};
	});
});
//数値ソート（昇順）
function compareNumber(a, b)
{
	return a.value - b.value;
}
//数値ソート（降順）
function compareNumberDesc(a, b)
{
	return b.value - a.value;
}
//文字列ソート（昇順）
function compareString(a, b) {
	if (a.value < b.value) {
		return -1;
	} else {
		return 1;
	}
	return 0;
}
//文字列ソート（降順）
function compareStringDesc(a, b) {
	if (a.value > b.value) {
		return -1;
	} else {
		return 1;
	}
	return 0;
}
