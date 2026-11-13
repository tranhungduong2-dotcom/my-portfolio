
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("show");
    });
  }

  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const userName = document.getElementById("name").value;
      formStatus.textContent = "Thank you, " + userName + "! Your message has been sent.";
      contactForm.reset();
    });
  }
});
