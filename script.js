document.addEventListener("DOMContentLoaded", function () {

  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("show");
    });
  }

  const playChordBtn = document.getElementById("play-chord-btn");
  const chordText = document.getElementById("chord-text");

  if (playChordBtn) {
    playChordBtn.addEventListener("click", function () {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();

      const frequencies = [293.66, 369.99, 440.00, 523.25];
      const now = ctx.currentTime;

      frequencies.forEach(function (freq, index) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + index * 0.08);

        gain.gain.setValueAtTime(0.001, now + index * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.12, now + index * 0.08 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + index * 0.08);
        osc.stop(now + 1.7);
      });

      chordText.textContent = "Playing D7...";
      setTimeout(function () {
        chordText.textContent = "Play D7 Chord";
      }, 1600);
    });
  }

  const filterButtons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".card[data-category]");

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      cards.forEach(function (card) {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const userName = document.getElementById("name").value;
      const topic = document.getElementById("topic").value;
      formStatus.textContent = "Thanks " + userName + "! Your " + topic + " message has been received by D7.";
      contactForm.reset();
    });
  }
});
