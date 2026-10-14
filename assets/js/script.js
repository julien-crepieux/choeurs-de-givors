(function () {
  "use strict";

  var MONTHS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
  var MONTHS_LONG = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  var DAYS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  var TYPES = {
    concert: "Concert",
    opera: "Opéra",
    recital: "Récital",
    festif: "Anniversaire"
  };

  var ICON_PIN = '<svg viewBox="0 0 24 24"><path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>';
  var ICON_CLOCK = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
  var ICON_TICKET = '<svg viewBox="0 0 24 24"><path d="M3 8a2 2 0 002-2h14a2 2 0 002 2v2a2 2 0 000 4v2a2 2 0 00-2 2H5a2 2 0 00-2-2v-2a2 2 0 000-4z"/></svg>';

  function parseDate(s) {
    var p = s.split("-");
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function today() {
    var d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  var events = (window.CHOEURS_EVENTS || []).map(function (e, i) {
    var start = parseDate(e.date);
    var end = e.endDate ? parseDate(e.endDate) : start;
    return Object.assign({}, e, { id: i, start: start, end: end, past: end < today() });
  });

  function location(e) {
    return [e.place, e.city].filter(Boolean).join(", ");
  }

  function longDate(e) {
    var s = e.start, en = e.end;
    if (e.monthOnly) return MONTHS_LONG[s.getMonth()] + " " + s.getFullYear();
    if (+s === +en) {
      return DAYS[s.getDay()] + " " + s.getDate() + " " + MONTHS_LONG[s.getMonth()] + " " + s.getFullYear();
    }
    return "du " + s.getDate() + " au " + en.getDate() + " " + MONTHS_LONG[en.getMonth()] + " " + en.getFullYear();
  }

  /* Illustration générée pour chaque type d'événement */
  function art(e) {
    var seed = e.start.getDate() * 7 + e.start.getMonth() * 13;
    var shapes = "";
    if (e.type === "opera") {
      // rideau de théâtre
      shapes =
        '<path d="M0 0 H400 V30 Q300 60 200 30 Q100 60 0 30Z" fill="#000" opacity=".18"/>' +
        '<path d="M0 0 Q40 120 10 200 H0Z M400 0 Q360 120 390 200 H400Z" fill="#000" opacity=".2"/>' +
        '<circle cx="290" cy="80" r="60" fill="#fff" opacity=".12"/>' +
        '<path d="M250 140 l40 -70 l40 70" fill="none" stroke="#fff" stroke-width="3" opacity=".35"/>';
    } else if (e.type === "recital") {
      // touches de piano
      for (var k = 0; k < 14; k++) {
        shapes += '<rect x="' + (160 + k * 18) + '" y="40" width="16" height="140" rx="2" fill="#fff" opacity=".22"/>';
        if ([0, 1, 3, 4, 5].indexOf(k % 7) > -1 && k < 13) {
          shapes += '<rect x="' + (171 + k * 18) + '" y="40" width="10" height="85" rx="2" fill="#000" opacity=".25"/>';
        }
      }
    } else if (e.type === "festif") {
      // confettis / étoiles
      for (var c = 0; c < 22; c++) {
        var x = (seed * (c + 3) * 37) % 400;
        var y = (seed * (c + 5) * 53) % 190;
        var r = 3 + (c % 4) * 2;
        shapes += '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#fff" opacity="' + (0.15 + (c % 3) * 0.1) + '"/>';
      }
      shapes += '<text x="380" y="110" text-anchor="end" font-family="Playfair Display, serif" font-weight="900" font-size="96" fill="#fff" opacity=".22">50</text>';
    } else {
      // portée et notes
      for (var l = 0; l < 5; l++) {
        shapes += '<line x1="0" x2="400" y1="' + (50 + l * 14) + '" y2="' + (50 + l * 14) + '" stroke="#fff" stroke-width="1.5" opacity=".25"/>';
      }
      for (var n = 0; n < 5; n++) {
        var nx = 170 + n * 45, ny = 64 + ((seed + n * 3) % 5) * 7;
        shapes += '<ellipse cx="' + nx + '" cy="' + ny + '" rx="8" ry="6" transform="rotate(-20 ' + nx + ' ' + ny + ')" fill="#fff" opacity=".45"/>' +
          '<line x1="' + (nx + 7) + '" x2="' + (nx + 7) + '" y1="' + ny + '" y2="' + (ny - 40) + '" stroke="#fff" stroke-width="2" opacity=".45"/>';
      }
    }
    return '<svg class="event__art" viewBox="0 0 400 190" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<defs><linearGradient id="g' + e.id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></linearGradient></defs>' +
      '<rect width="400" height="190" fill="url(#g' + e.id + ')"/>' + shapes + "</svg>";
  }

  function card(e) {
    var type = TYPES[e.type] ? e.type : "concert";
    var poster = e.image
      ? '<img src="' + escapeHtml(e.image) + '" alt="' + escapeHtml(e.title) + '" loading="lazy">'
      : art(e);
    var range = +e.start !== +e.end ? "–" + e.end.getDate() : "";
    var dayHtml = e.monthOnly
      ? '<span class="event__day event__day--month">' + MONTHS_LONG[e.start.getMonth()] + "</span>"
      : '<span class="event__day">' + e.start.getDate() + range + "</span>";
    var html =
      '<article class="event event--' + type + (e.past ? " is-past" : "") + '">' +
        '<div class="event__poster' + (e.image ? " has-photo" : "") + '">' + poster +
          '<span class="event__type">' + TYPES[type] + "</span>" +
          (e.past ? '<span class="event__past">Passé</span>' : "") +
          '<div class="event__date">' + dayHtml +
          '<span class="event__month">' + (e.monthOnly ? "" : MONTHS[e.end.getMonth()]) + "<small>" + e.end.getFullYear() + "</small></span></div>" +
        "</div>" +
        '<div class="event__body">' +
          '<h3 class="event__title">' + escapeHtml(e.title) + "</h3>" +
          '<div class="event__meta">' +
            (location(e) ? "<span>" + ICON_PIN + escapeHtml(location(e)) + "</span>" : "") +
            (e.time ? "<span>" + ICON_CLOCK + escapeHtml(e.time) + "</span>" : "") +
            (e.price ? "<span>" + ICON_TICKET + escapeHtml(e.price) + "</span>" : "") +
          "</div>" +
          (e.text ? '<p class="event__text">' + escapeHtml(e.text) + "</p>" : "") +
          (e.toConfirm ? '<p class="event__confirm">Informations à confirmer</p>' : "") +
          '<div class="event__actions">' +
            (e.link ? '<a class="event__btn" href="' + escapeHtml(e.link) + '" target="_blank" rel="noopener">' + escapeHtml(e.linkLabel || "Infos et billets") + "</a>" : "") +
            (!e.past && !e.monthOnly ? '<button class="event__btn" type="button" data-ics="' + e.id + '">+ Ajouter à mon agenda</button>' : "") +
          "</div>" +
        "</div>" +
      "</article>";
    return html;
  }

  var list = document.getElementById("events");

  function render(filter) {
    var items = events.filter(function (e) {
      return filter === "all" || (filter === "past" ? e.past : !e.past);
    });
    items.sort(function (a, b) {
      // à venir : du plus proche au plus lointain ; passés : du plus récent au plus ancien
      return filter === "upcoming" ? a.start - b.start : b.start - a.start;
    });
    if (!items.length) {
      list.innerHTML = filter === "upcoming"
        ? '<div class="events__empty"><strong>Nouvelles dates bientôt annoncées</strong>' +
          'Le chœur prépare sa prochaine saison. Suivez-nous sur <a href="https://www.facebook.com/choeursdegivors/" target="_blank" rel="noopener">Facebook</a> ' +
          'ou <a href="#" data-filter-link="past">revivez nos derniers concerts</a>.</div>'
        : '<div class="events__empty"><strong>Aucun événement</strong></div>';
      return;
    }
    list.innerHTML = items.map(card).join("");
  }

  function setFilter(filter) {
    document.querySelectorAll(".tab").forEach(function (t) {
      var on = t.dataset.filter === filter;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", on);
    });
    render(filter);
  }

  document.querySelectorAll(".tab").forEach(function (t) {
    t.addEventListener("click", function () { setFilter(t.dataset.filter); });
  });

  list.addEventListener("click", function (ev) {
    var link = ev.target.closest("[data-filter-link]");
    if (link) { ev.preventDefault(); setFilter(link.dataset.filterLink); return; }
    var btn = ev.target.closest("[data-ics]");
    if (btn) downloadIcs(events[+btn.dataset.ics]);
  });

  /* Fichier .ics pour ajouter un événement à son agenda */
  function ymd(d) {
    return d.getFullYear() + String(d.getMonth() + 1).padStart(2, "0") + String(d.getDate()).padStart(2, "0");
  }
  function downloadIcs(e) {
    var endPlusOne = new Date(e.end); endPlusOne.setDate(endPlusOne.getDate() + 1);
    var dtStart = "DTSTART;VALUE=DATE:" + ymd(e.start);
    var dtEnd = "DTEND;VALUE=DATE:" + ymd(endPlusOne);
    var m = e.time && /^(\d{1,2})h(\d{2})?$/.exec(e.time.trim());
    if (m && +e.start === +e.end) {
      var hh = String(m[1]).padStart(2, "0"), mm = m[2] || "00";
      dtStart = "DTSTART;TZID=Europe/Paris:" + ymd(e.start) + "T" + hh + mm + "00";
      dtEnd = "DTEND;TZID=Europe/Paris:" + ymd(e.start) + "T" + String(+m[1] + 2).padStart(2, "0") + mm + "00";
    }
    var clean = function (s) { return String(s || "").replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n"); };
    var ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Choeurs de Givors//Agenda//FR",
      "BEGIN:VEVENT",
      "UID:" + ymd(e.start) + "-" + e.id + "@choeursdegivors.fr",
      "DTSTAMP:" + ymd(new Date()) + "T000000Z",
      dtStart, dtEnd,
      "SUMMARY:" + clean("Chœurs de Givors — " + e.title),
      "LOCATION:" + clean(location(e)),
      "DESCRIPTION:" + clean(e.text),
      "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    a.download = "choeurs-de-givors-" + ymd(e.start) + ".ics";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  }

  /* Prochain événement dans le bandeau d'accueil */
  var next = events.filter(function (e) { return !e.past; }).sort(function (a, b) { return a.start - b.start; })[0];
  var nextBox = document.getElementById("next-event");
  if (next) {
    nextBox.innerHTML =
      '<span class="next__label">Prochain rendez-vous</span>' +
      '<p class="next__title">' + escapeHtml(next.title) + "</p>" +
      '<p class="next__meta">' + longDate(next) + (next.time ? " · " + escapeHtml(next.time) : "") +
      (location(next) ? "<br>" + escapeHtml(location(next)) : "") + "</p>" +
      '<a href="#agenda">Tout l\'agenda →</a>';
  } else {
    var last = events.slice().sort(function (a, b) { return b.start - a.start; })[0];
    if (last) {
      nextBox.innerHTML =
        '<span class="next__label">Dernier concert</span>' +
        '<p class="next__title">' + escapeHtml(last.title) + "</p>" +
        '<p class="next__meta">' + longDate(last) + (location(last) ? "<br>" + escapeHtml(location(last)) : "") + "</p>" +
        '<a href="#agenda">Voir l\'agenda →</a>';
    }
  }

  setFilter(next ? "upcoming" : "past");

  /* Navigation */
  var nav = document.getElementById("nav");
  var toggle = nav.querySelector(".nav__toggle");
  function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });
  nav.querySelectorAll(".nav__menu a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", false);
    });
  });

  /* Lien actif + apparitions au défilement */
  if ("IntersectionObserver" in window) {
    var links = {};
    nav.querySelectorAll(".nav__menu a").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && links[en.target.id]) {
          Object.keys(links).forEach(function (k) { links[k].classList.remove("is-current"); });
          links[en.target.id].classList.add("is-current");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("section[id]").forEach(function (s) { spy.observe(s); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Galerie photo + visionneuse */
  var photos = window.CHOEURS_PHOTOS || [];
  var gallery = document.getElementById("gallery");
  var shown = [];
  function renderGallery(tag) {
    shown = photos.filter(function (p) { return tag === "all" || p.tag === tag; });
    gallery.innerHTML = shown.map(function (p, i) {
      return '<button type="button" class="gallery__item' + (p.wide && tag === "all" ? " gallery__item--wide" : "") + '" data-i="' + i + '">' +
        '<img src="' + escapeHtml(p.src) + '" alt="' + escapeHtml(p.caption) + '" loading="lazy">' +
        "<span>" + escapeHtml(p.caption) + "</span></button>";
    }).join("");
  }
  if (gallery) {
    renderGallery("all");
    document.querySelectorAll(".chip").forEach(function (c) {
      c.addEventListener("click", function () {
        document.querySelectorAll(".chip").forEach(function (o) { o.classList.toggle("is-active", o === c); });
        renderGallery(c.dataset.tag);
      });
    });
    var lb = document.getElementById("lightbox");
    var lbImg = lb.querySelector("img");
    var lbCap = lb.querySelector("figcaption");
    var current = 0, lastFocus = null;
    var show = function (i) {
      current = (i + shown.length) % shown.length;
      lbImg.src = shown[current].src;
      lbImg.alt = shown[current].caption;
      lbCap.textContent = shown[current].caption;
    };
    var close = function () { lb.hidden = true; document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); };
    gallery.addEventListener("click", function (ev) {
      var it = ev.target.closest(".gallery__item");
      if (!it) return;
      lastFocus = it;
      show(+it.dataset.i);
      lb.hidden = false;
      document.body.style.overflow = "hidden";
      lb.querySelector(".lightbox__close").focus();
    });
    lb.querySelector(".lightbox__close").addEventListener("click", close);
    lb.querySelector(".lightbox__prev").addEventListener("click", function () { show(current - 1); });
    lb.querySelector(".lightbox__next").addEventListener("click", function () { show(current + 1); });
    lb.addEventListener("click", function (ev) { if (ev.target === lb) close(); });
    document.addEventListener("keydown", function (ev) {
      if (lb.hidden) return;
      if (ev.key === "Escape") close();
      if (ev.key === "ArrowLeft") show(current - 1);
      if (ev.key === "ArrowRight") show(current + 1);
    });
  }

  /* Lecteurs audio */
  function fmt(t) {
    if (!isFinite(t)) return "--:--";
    var m = Math.floor(t / 60), s = Math.floor(t % 60);
    return m + ":" + String(s).padStart(2, "0");
  }
  var tracks = Array.prototype.slice.call(document.querySelectorAll(".track"));
  tracks.forEach(function (tr) {
    var audio = tr.querySelector("audio");
    var bar = tr.querySelector(".track__bar span");
    var time = tr.querySelector(".track__time");
    tr.querySelector(".track__play").addEventListener("click", function () {
      if (audio.paused) {
        tracks.forEach(function (o) { if (o !== tr) o.querySelector("audio").pause(); });
        audio.play();
      } else {
        audio.pause();
      }
    });
    audio.addEventListener("play", function () { tr.classList.add("is-playing"); });
    audio.addEventListener("pause", function () { tr.classList.remove("is-playing"); });
    audio.addEventListener("ended", function () { tr.classList.remove("is-playing"); });
    audio.addEventListener("loadedmetadata", function () { time.textContent = fmt(audio.duration); });
    if (audio.readyState >= 1) time.textContent = fmt(audio.duration);
    audio.addEventListener("timeupdate", function () {
      bar.style.width = (audio.currentTime / audio.duration * 100 || 0) + "%";
      time.textContent = fmt(audio.currentTime);
    });
    tr.querySelector(".track__bar").addEventListener("click", function (ev) {
      if (!isFinite(audio.duration)) return;
      var r = this.getBoundingClientRect();
      audio.currentTime = (ev.clientX - r.left) / r.width * audio.duration;
    });
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
