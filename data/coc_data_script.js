// URLのクエリパラメータを取得する関数
function getParameterByName(name) {
 const url = new URL(window.location.href);
 return url.searchParams.get(name);
}

// パラメータからIDを取得
const id = getParameterByName('id');

// JSONファイルを読み込み、表示
$(document).ready(function () {
 // data.jsonを取得
 $.getJSON('coc_data.json', function (jsonData) {
  if (id) {
   // 指定されたIDに基づいてデータを検索
   const data = jsonData.find(item => item.id === id);

   if (data) {
    // データが見つかった場合、HTMLに出力
    $('#title').text(data.title);
    $('#description').text(data.progress);
    //Title変更
    document.title = data.title;
   } else {
    // データが見つからない場合のエラーメッセージ
    $('#content').html('<p>データが見つかりません。</p>');
   }
  } else {
   // IDが指定されていない場合のメッセージ
   $('#content').html('<p>IDパラメータが指定されていません。</p>');
  }
 });
});
