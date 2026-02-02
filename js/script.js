'use strict';

//今日の日付

const today = new Date();

const year = today.getFullYear();
const month = today.getMonth() + 1; // 0始まりなので +1
const day = today.getDate();

document.getElementById("currentDate").textContent =
  `${year}/${month}/${day}`;