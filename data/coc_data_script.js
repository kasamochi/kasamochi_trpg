// URLのクエリパラメータを取得する関数
function getParameterByName(name) {
 // 現在のページのURLを取得し、URLオブジェクトを作成
 const url = new URL(window.location.href);
 // 指定されたパラメータ名に対応する値を返す
 return url.searchParams.get(name);
}

// パラメータからIDを取得
const id = getParameterByName('id');

// JSONデータからIDに基づいてデータを取得し、HTMLに出力
$(document).ready(function () {
 if (id) {
  // 指定されたIDに基づいてデータを検索
  const data = jsonData.find(item => item.id === id);

  if (data) {
   // データが見つかった場合、HTMLに出力
   //titleタグ
   document.title = data.name + ('｜探索者一覧');
   // 画像のsrcにJSONデータのimage URLをセット
   $('#image').attr('src', data.image);
   
   $('#name').text(data.name);
   $('#name_read').text(data.name_read);
   $('#sex').text(data.sex);
   $('#age').text(data.age);
   $('#job').text(data.job);
   $('#features').text(data.features);
   $('#personality').text(data.personality);
   $('#text').text(data.text);
   $('#family').text(data.family);
   $('#progress').text(data.progress);
   
   // 改行文字 (\n) を <br> タグに変換してから textとprogress に出力
   const formattedText = data.text.replace(/\n/g, '<br>');
   const formattedProgress = data.progress.replace(/\n/g, '<br>');

   
   // .html()を使うことで、<br>タグをHTMLとして認識させる
   $('#text').html(formattedText); 
   $('#progress').html(formattedProgress);
   
   // #text内のHTMLをそのまま挿入
    $('#text').html(formattedDescription); // HTMLとして挿入   
   
  } else {
   // データが見つからない場合のエラーメッセージ
   $('#content').html('<p>データが見つかりません。</p>');
  }
 } else {
  // IDが指定されていない場合のメッセージ
  $('#content').html('<p>IDパラメータが指定されていません。</p>');
 }
});
