// Hiệu ứng khi cuộn + form tư vấn bản tĩnh.
const header = document.getElementById("site-header");
if (header) {
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 12);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// Hiện dần các khối khi cuộn tới. Nếu trình duyệt không hỗ trợ,
// hiện luôn để không bị mất nội dung.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  revealItems.forEach((el) => observer.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add("in-view"));
}

// Form tư vấn bản tĩnh: chỉ hiển thị thông báo, chưa gửi dữ liệu đi đâu.
const form = document.getElementById("consult-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    if (!name || !phone) {
      status.textContent = "Vui lòng nhập họ và tên và số điện thoại.";
      return;
    }
    status.textContent = `Cảm ơn ${name}! Chúng tôi sẽ liên hệ qua số ${phone}.`;
    form.reset();
  });
}
