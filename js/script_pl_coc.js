const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019];
const root = document.getElementById("tables");

// ================================
// 年ごとのテーブル生成（順序保証）
// ================================
async function renderTables() {
  for (let index = 0; index < years.length; index++) {
    const year = years[index];

    const res = await fetch(`./data/coc_${year}.json`);
    const data = await res.json();

    // ===== 見出し（トリガー）=====
    const h4 = document.createElement("h4");
    h4.classList.add("text-body-emphasis");
    h4.setAttribute("data-bs-toggle", "collapse");
    h4.setAttribute("data-bs-target", `#year-${year}`);
    h4.setAttribute("role", "button");
    h4.setAttribute("aria-expanded", index === 0 ? "true" : "false");
    h4.textContent = `${year}年（${data.length}）`;

    // ===== 折りたたみ本体 =====
    const wrapper = document.createElement("div");
    wrapper.id = `year-${year}`;
    wrapper.classList.add("collapse");
    if (index === 0) {
      wrapper.classList.add("show"); // 最新年は開く
    }

    // ===== table =====
    const table = document.createElement("table");
    table.classList.add("table", "accordion_contents");

    const tbody = document.createElement("tbody");
    tbody.innerHTML = `
      <tr class="table-secondary">
        <th class="scenario" data-sort="scenario">シナリオ名</th>
        <th data-sort="result">結果</th>
        <th data-sort="note">備考</th>
        <th data-sort="cs">CS</th>
      </tr>
    `;

    data.forEach(row => {
      const tr = document.createElement("tr");

      const tdScenario = document.createElement("td");
      tdScenario.textContent = row.scenario;
      if (row.class) tdScenario.classList.add(row.class);
      tr.appendChild(tdScenario);

      ["result", "note", "cs"].forEach(key => {
        const td = document.createElement("td");
        td.textContent = row[key] || "";
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    wrapper.appendChild(table);

    // DOMへ追加（この順番が保証される）
    root.appendChild(h4);
    root.appendChild(wrapper);
  }
}

renderTables();


// ================================
// 検索機能（変更なし）
// ================================
const searchInput = document.getElementById("tableSearch");

searchInput.addEventListener("input", function () {
  const keyword = this.value.toLowerCase();

  document.querySelectorAll(".collapse").forEach(collapseEl => {
    let hasHit = false;

    collapseEl.querySelectorAll("tbody tr").forEach(tr => {
      if (tr.querySelector("th")) return;

      const text = tr.textContent.toLowerCase();
      const match = text.includes(keyword);

      tr.style.display = match ? "" : "none";
      if (match) hasHit = true;
    });

    const collapse = bootstrap.Collapse.getOrCreateInstance(collapseEl, {
      toggle: false
    });

    if (keyword && hasHit) {
      collapse.show();
    } else if (keyword) {
      collapse.hide();
    }
  });
});


// ================================
// ソート機能（変更なし）
// ================================
document.addEventListener("click", e => {
  const th = e.target.closest("th[data-sort]");
  if (!th) return;

  const table = th.closest("table");
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"))
    .filter(tr => !tr.querySelector("th"));

  const index = Array.from(th.parentNode.children).indexOf(th);
  const asc = th.classList.toggle("asc");
  th.classList.toggle("desc", !asc);

  rows.sort((a, b) => {
    const A = a.children[index].textContent;
    const B = b.children[index].textContent;
    return asc
      ? A.localeCompare(B, "ja")
      : B.localeCompare(A, "ja");
  });

  rows.forEach(tr => tbody.appendChild(tr));
});
