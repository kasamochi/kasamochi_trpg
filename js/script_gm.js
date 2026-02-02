let tableData = [];
let currentSort = {
  key: null,
  asc: true
};

// ===== JSON 読み込み =====
fetch("./data/coc_kp_list.json")
  .then(res => res.json())
  .then(data => {
    tableData = data;
    renderTable(tableData);
  });

// ===== テーブル描画 =====
function renderTable(data) {
  const tbody = document.getElementById("scenarioTableBody");

  // ヘッダー以外を削除
  tbody.querySelectorAll("tr:not(:first-child)").forEach(tr => tr.remove());

  data.forEach(row => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${row.scenario}</td>
      <td>${row.last}</td>
      <td>${row.count}</td>
    `;

    tbody.appendChild(tr);
  });
}

// ===== 検索 =====
document.getElementById("tableSearch").addEventListener("input", function () {
  const keyword = this.value.toLowerCase();

  const filtered = tableData.filter(row =>
    Object.values(row).some(value =>
      String(value).toLowerCase().includes(keyword)
    )
  );

  renderTable(filtered);
});

// ===== ソート =====
document.querySelectorAll("th[data-sort]").forEach(th => {
  th.addEventListener("click", () => {
    const key = th.dataset.sort;

    // 昇順・降順切り替え
    if (currentSort.key === key) {
      currentSort.asc = !currentSort.asc;
    } else {
      currentSort.key = key;
      currentSort.asc = true;
    }

    // 表示用ソート
    const sorted = [...tableData].sort((a, b) => {
      if (typeof a[key] === "number") {
        return currentSort.asc
          ? a[key] - b[key]
          : b[key] - a[key];
      }
      return currentSort.asc
        ? String(a[key]).localeCompare(String(b[key]), "ja")
        : String(b[key]).localeCompare(String(a[key]), "ja");
    });

    renderTable(sorted);
    updateSortIcon(th);
  });
});

// ===== ソートアイコン更新 =====
function updateSortIcon(activeTh) {
  document.querySelectorAll("th[data-sort]").forEach(th => {
    th.classList.remove("asc", "desc");
  });

  activeTh.classList.add(currentSort.asc ? "asc" : "desc");
}
