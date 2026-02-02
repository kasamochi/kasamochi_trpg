const IMAGE_PATH = "./images/pc_coc/";

// ==============================
// URLパラメータ
// ==============================
const params = new URLSearchParams(location.search);
const charId = params.get("id");

// ==============================
// DOM取得
// ==============================
const charImage = document.getElementById("charImage");
const charName = document.getElementById("charName");
const charKana = document.getElementById("charKana");

const charGender = document.getElementById("charGender");
const charAge = document.getElementById("charAge");
const charJob = document.getElementById("charJob");

const charTraits = document.getElementById("charTraits");
const charPersonality = document.getElementById("charPersonality");

const charColors = document.getElementById("charColors");
const charDescription = document.getElementById("charDescription");
const charHistory = document.getElementById("charHistory");
const novelArea = document.getElementById("novelArea");

// ==============================
// データ取得
// ==============================
fetch("data/coc_pc_list.json")
  .then(res => res.json())
  .then(data => {
    const char = data.find(c => c.id === charId);

    if (!char) {
      document.body.innerHTML = "<p>キャラクターが見つかりません。</p>";
      return;
    }

    renderDetail(char);
    renderParams(char);
  });

// ==============================
// 基本情報描画
// ==============================
function renderDetail(char) {
  // 画像
  charImage.src = IMAGE_PATH + char.image;
  charImage.alt = char.name || "";

  // 名前
  charName.textContent = char.name || "";
  charKana.textContent = char.name_kana || "";

  // 基本情報
  charGender.textContent = char.gender || "不明";
  charAge.textContent = char.age ? `${char.age}歳` : "";
  charJob.textContent = char.job || "";

  // 特徴（features）
  charTraits.textContent = Array.isArray(char.features)
    ? char.features.join(" / ")
    : char.features || "";

  // 性格・紹介文
  charPersonality.textContent = char.personality || "";
  charDescription.textContent = char.description || "";

  // ==========================
  // イメージカラー（colors）
  // ==========================
  charColors.innerHTML = "";

  if (char.colors) {
    const colors = Array.isArray(char.colors)
      ? char.colors
      : [char.colors];

    colors.forEach(color => {
      const span = document.createElement("span");
      span.className = "color-dot";
      span.style.backgroundColor = color;
      span.title = color;
      charColors.appendChild(span);
    });
  }

  // ==========================
  // 経歴
  // ==========================
  charHistory.innerHTML = "";

  if (Array.isArray(char.history)) {
    char.history.forEach(text => {
      const li = document.createElement("li");
      li.textContent = text;
      charHistory.appendChild(li);
    });
  }

  // ==========================
  // 小説リンク
  // ==========================
  novelArea.innerHTML = "";

  if (char.novel_url) {
    novelArea.innerHTML = `
      <a href="${char.novel_url}" target="_blank"
         class="btn btn-outline-secondary btn-sm">
        小説を読む
      </a>
    `;
  }
}

// ==============================
// 能力値（params → 横棒グラフ）
// ==============================
function renderParams(char) {
  if (!char.params) return;

  const ctx = document.getElementById("statusChart");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["STR", "CON", "POW", "DEX", "APP", "SIZ", "INT", "EDU"],
      datasets: [{
        data: [
          char.params.STR,
          char.params.CON,
          char.params.POW,
          char.params.DEX,
          char.params.APP,
          char.params.SIZ,
          char.params.INT,
          char.params.EDU
        ],
        backgroundColor: char.colors?.[0] || "#6c757d",
        barThickness: 10,
        maxBarThickness: 12
      }]
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,

      scales: {
        x: {
          beginAtZero: true,
          max: 20,
          ticks: { font: { size: 10 } }
        },
        y: {
          ticks: { font: { size: 10 }, padding: 4 }
        }
      },

      plugins: {
        legend: { display: false }
      }
    }
  });
}
