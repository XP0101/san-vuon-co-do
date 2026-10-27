// Menu mobile + form tư vấn (bản tĩnh, chưa gửi dữ liệu đi đâu).
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const form = document.getElementById("consult-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();

    if (!name || !phone) {
      status.textContent = "Vui lòng nhập họ tên và số điện thoại để chúng tôi liên hệ lại.";
      return;
    }

    status.textContent = `Cảm ơn ${name}! Yêu cầu tư vấn đã được ghi nhận (bản demo). Chúng tôi sẽ liên hệ qua số ${phone}.`;
    form.reset();
  });
}
