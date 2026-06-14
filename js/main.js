/* ============================================================
   A. S. ASSOCIATES — site behaviour
   ============================================================ */
   (function () {
    var STORAGE_KEY = "as-associates-lang";
    var supported = ["en", "hi", "mr"];
  
    function getStoredLang() {
      try {
        var l = window.localStorage.getItem(STORAGE_KEY);
        return supported.indexOf(l) > -1 ? l : "en";
      } catch (e) {
        return "en";
      }
    }
  
    function applyLanguage(lang) {
      if (supported.indexOf(lang) === -1) lang = "en";
      var dict = window.I18N && window.I18N[lang] ? window.I18N[lang] : {};
  
      document.documentElement.setAttribute("lang", lang === "en" ? "en" : lang);
  
      document.querySelectorAll("[data-i18n]").forEach(function (el) {
        var key = el.getAttribute("data-i18n");
        if (dict[key]) {
          el.textContent = dict[key];
        }
      });
  
      document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
        var isActive = btn.getAttribute("data-lang") === lang;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
  
      try {
        window.localStorage.setItem(STORAGE_KEY, lang);
      } catch (e) {
        /* storage unavailable — ignore */
      }
    }
  
    function initLangToggle() {
      var current = getStoredLang();
      applyLanguage(current);
  
      document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
        btn.addEventListener("click", function () {
          applyLanguage(btn.getAttribute("data-lang"));
        });
      });
    }
  
    function initMobileNav() {
      var toggle = document.querySelector(".nav-toggle");
      var nav = document.querySelector(".main-nav");
      if (!toggle || !nav) return;
  
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
  
      nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          nav.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  
    function initYear() {
      document.querySelectorAll("[data-year]").forEach(function (el) {
        el.textContent = new Date().getFullYear();
      });
    }
  
    document.addEventListener("DOMContentLoaded", function () {
      initLangToggle();
      initMobileNav();
      initYear();
    });
  })();