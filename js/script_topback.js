document.addEventListener("DOMContentLoaded", () => {
  const pageTop = document.getElementById("page_top");

  if (!pageTop) return; // 要素が無ければ何もしない

  window.addEventListener("scroll", () => {
    pageTop.style.display =
      window.scrollY > 300 ? "block" : "none";
  });

  pageTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});