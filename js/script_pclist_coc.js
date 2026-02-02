const IMAGE_PATH = "./images/pc_coc/";

let characters = [];

// ===== DOM =====
const container = document.getElementById("characterList");
const searchInput = document.getElementById("searchInput");

const originFilter = document.getElementById("originFilter");
const ageFilter = document.getElementById("ageFilter");
const lastActiveFilter = document.getElementById("lastActiveFilter");
const firstActiveFilter = document.getElementById("firstActiveFilter");
const familyFilter = document.getElementById("familyFilter");
const orgFilter = document.getElementById("orgFilter");
const statusFilter = document.getElementById("statusFilter");
const genderFilter = document.getElementById("genderFilter");
const mythFilter = document.getElementById("mythFilter");

// ===== データ取得 =====
fetch("data/coc_pc_list.json")
  .then(res => res.json())
  .then(data => {
    characters = data;
    initFilters();
    renderList(characters);
  });

// ===== 描画 =====
function renderList(list) {
  container.innerHTML = "";

  list.forEach(char => {
    const a = document.createElement("a");
    a.href = `./pc_data_coc.html?id=${char.id}`;
    a.className = "text-decoration-none text-center";
    // a.style.width = "100px";

    if (char.status === "ロスト") a.classList.add("pc-lost");
    if (char.status === "引退") a.classList.add("pc-retired");

    a.innerHTML = `
      <div class="img-wrap">
        <img
          src="${IMAGE_PATH}${char.image}"
          width="105"
          height="60"
          class="rounded"
          alt="${char.name}"
        >
      </div>
      <div class="small">${char.name}</div>
    `;

    container.appendChild(a);
  });
}

// ===== フィルタ初期化 =====
function initFilters() {
  const originSet = new Set();
  const ageSet = new Set();
  const yearSet = new Set();
  const familySet = new Set();
  const orgSet = new Set();
  const firstActiveSet = new Set();

  characters.forEach(c => {
    addToSet(originSet, c.origin);
    addToSet(ageSet, c.age);
    addToSet(yearSet, c.last_active);
    addToSet(familySet, c.family);
    addToSet(orgSet, c.organization);
    addToSet(firstActiveSet, c.first_active);
  });

  fillSelect(originFilter, originSet);
  fillSelect(ageFilter, [...ageSet].sort((a, b) => a - b), "歳");
  fillSelect(lastActiveFilter, yearSet);
  fillSelect(familyFilter, familySet);
  fillSelect(orgFilter, orgSet);
  fillSelect(firstActiveFilter, firstActiveSet);
}

// ===== select生成 =====
function fillSelect(select, values, suffix = "") {
  [...values].sort().forEach(v => {
    const option = document.createElement("option");
    option.value = v;
    option.textContent = `${v}${suffix}`;
    select.appendChild(option);
  });
}

// ===== フィルタ & 検索 =====
function applyFilters() {
  const keyword = searchInput.value.toLowerCase();

  const origin = originFilter.value;
  const age = ageFilter.value;
  const last = lastActiveFilter.value;
  const first = firstActiveFilter?.value;
  const family = familyFilter.value;
  const org = orgFilter.value;
  const status = statusFilter.value;
  const gender = genderFilter.value;
  const mythChecked = mythFilter.checked;

  const checkedRelations = [...document.querySelectorAll(
    "#relationFilter input:checked"
  )].map(cb => cb.value);

  const filtered = characters.filter(c => {

    // ===== 検索（name / traits）=====
    if (keyword) {
      const nameMatch = c.name?.toLowerCase().includes(keyword);

      const traitText = Array.isArray(c.traits)
        ? c.traits.join(" ").toLowerCase()
        : (c.traits || "").toLowerCase();

      if (!nameMatch && !traitText.includes(keyword)) return false;
    }

    if (origin && c.origin !== origin) return false;
    if (age && String(c.age) !== age) return false;
    if (last && String(c.last_active) !== last) return false;

    // first_active（配列 / 単一）
    if (first) {
      const fa = c.first_active;
      if (Array.isArray(fa)) {
        if (!fa.includes(first)) return false;
      } else if (fa !== first) {
        return false;
      }
    }

    // family（配列 / 単一）
    if (family) {
      const f = c.family;
      if (Array.isArray(f)) {
        if (!f.includes(family)) return false;
      } else if (f !== family) {
        return false;
      }
    }

    // organization（配列 / 単一）
    if (org) {
      const o = c.organization;
      if (Array.isArray(o)) {
        if (!o.includes(org)) return false;
      } else if (o !== org) {
        return false;
      }
    }

    if (status && c.status !== status) return false;
    if (gender && c.gender !== gender) return false;
    if (mythChecked && c.myth !== true) return false;

    if (checkedRelations.length > 0) {
      return checkedRelations.every(r => c.relations?.[r]);
    }

    return true;
  });

  renderList(filtered);
}

// ===== イベント =====
document.addEventListener("input", applyFilters);
document.addEventListener("change", applyFilters);

// ===== Set補助（配列 / 単一 両対応）=====
function addToSet(set, value) {
  if (!value) return;

  if (Array.isArray(value)) {
    value.forEach(v => v && set.add(v));
  } else {
    set.add(value);
  }
}
