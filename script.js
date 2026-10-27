// Sân Vườn Cố Đô — tương tác trang tĩnh (không gửi dữ liệu đi đâu ngoài form demo).
const header = document.getElementById("site-header");
if (header) {
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 12);
    document.getElementById("to-top")?.classList.toggle("show", window.scrollY > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
document.getElementById("to-top")?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Menu mobile
const menuBtn = document.querySelector(".menu-btn");
const mainNav = document.getElementById("main-nav");
if (menuBtn && mainNav) {
  menuBtn.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  mainNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }));
}

// Hiện dần khi cuộn tới
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("in-view"); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  revealItems.forEach((el) => observer.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add("in-view"));
}

// Hộp thoại dùng chung
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalMeta = document.getElementById("modal-meta");
function openModal({ title, desc, meta, img }) {
  if (!modal) return;
  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  modalMeta.textContent = meta || "";
  if (img) { modalImg.src = img; modalImg.alt = title; modalImg.hidden = false; }
  else { modalImg.hidden = true; }
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeModal() {
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = "";
}
modal?.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", closeModal));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

// Chi tiết dịch vụ (nội dung gốc, tóm tắt)
const SERVICE_DETAILS = {
  "biet-thu": { title: "Sân vườn biệt thự", desc: "Khảo sát, thiết kế tổng thể, thi công thảm cỏ, cây bóng mát, lối đi, hệ thống tưới và ánh sáng sân vườn.", meta: "Thời gian tham khảo: 3–6 tuần · Bảo hành 12 tháng" },
  "koi": { title: "Hồ cá Koi", desc: "Thiết kế hồ đúng kỹ thuật: lọc, bơm, oxy, thác nước và đá tự nhiên. Bàn giao kèm hướng dẫn vận hành và lịch vệ sinh.", meta: "Thời gian tham khảo: 2–4 tuần · Bảo hành hệ thống 12 tháng" },
  "nhat": { title: "Vườn Nhật & tiểu cảnh", desc: "Đá, sỏi, đèn đá, cây tỉa gọn và điểm nhấn nước. Phù hợp góc sân, giếng trời và lối vào.", meta: "Thời gian tham khảo: 1–3 tuần" },
  "tuong-cay": { title: "Tường cây & vườn đứng", desc: "Khung, giá thể, cây và hệ thống tưới tự động cho mặt tiền, ban công và không gian hẹp.", meta: "Thời gian tham khảo: 1–2 tuần · Có gói chăm sóc định kỳ" },
  "nha-pho": { title: "Nhà phố & sân thượng", desc: "Chống thấm, thoát nước, cây chịu nắng gió, giếng trời và sân thượng thành nơi thư giãn.", meta: "Thời gian tham khảo: 1–4 tuần tùy diện tích" },
  "cham-soc": { title: "Chăm sóc định kỳ", desc: "Cắt tỉa, bón phân, kiểm tra tưới, vệ sinh hồ Koi theo lịch hàng tháng hoặc hàng quý.", meta: "Gói theo tháng · Có thể hủy bất cứ lúc nào" },
};
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("click", () => {
    const detail = SERVICE_DETAILS[card.dataset.service];
    if (detail) openModal({ ...detail, img: card.querySelector("img")?.src });
  });
});

// Lọc dự án + xem ảnh lớn
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".gallery-item").forEach((item) => {
      item.classList.toggle("hidden", filter !== "all" && item.dataset.category !== filter);
    });
  });
});
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => openModal({
    title: item.dataset.title,
    desc: item.dataset.desc,
    meta: item.querySelector("figcaption span")?.textContent || "",
    img: item.querySelector("img")?.src,
  }));
});

// Ước tính chi phí — khoảng giá tham khảo, không phải báo giá chính thức.
// Đơn giá (triệu đồng / m²): thiết kế thấp hơn thi công; gói cao cấp cao hơn.
const RATES = {
  "biet-thu": { "thiet-ke": [0.25, 0.4], "tron-goi": [1.2, 1.8], "cao-cap": [2.0, 3.0] },
  "koi": { "thiet-ke": [0.3, 0.5], "tron-goi": [1.8, 2.8], "cao-cap": [3.0, 4.5] },
  "nhat": { "thiet-ke": [0.25, 0.4], "tron-goi": [1.0, 1.6], "cao-cap": [1.8, 2.6] },
  "nha-pho": { "thiet-ke": [0.2, 0.35], "tron-goi": [0.9, 1.5], "cao-cap": [1.6, 2.4] },
};
const estForm = document.getElementById("estimator-form");
const estResult = document.getElementById("est-result");
function updateEstimate() {
  if (!estForm || !estResult) return;
  const service = document.getElementById("est-service").value;
  const pkg = document.getElementById("est-package").value;
  const area = Math.max(10, Math.min(2000, Number(document.getElementById("est-area").value) || 100));
  const [low, high] = RATES[service][pkg];
  const fmt = (n) => new Intl.NumberFormat("vi-VN").format(Math.round(n));
  estResult.textContent = `${fmt(low * area)} – ${fmt(high * area)} triệu đồng`;
}
estForm?.addEventListener("input", updateEstimate);
updateEstimate();

// Cảm nhận: chuyển thủ công
const testimonials = document.querySelectorAll(".testimonial");
let testiIndex = 0;
function showTestimonial(i) {
  if (!testimonials.length) return;
  testiIndex = (i + testimonials.length) % testimonials.length;
  testimonials.forEach((t, idx) => t.classList.toggle("active", idx === testiIndex));
}
document.getElementById("testi-prev")?.addEventListener("click", () => showTestimonial(testiIndex - 1));
document.getElementById("testi-next")?.addEventListener("click", () => showTestimonial(testiIndex + 1));

// Form tư vấn bản tĩnh
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
    status.textContent = `Cảm ơn ${name}! Chúng tôi sẽ liên hệ qua số ${phone} để hẹn khảo sát.`;
    form.reset();
  });
}
