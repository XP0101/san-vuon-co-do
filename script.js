// Form tư vấn bản tĩnh: chỉ hiển thị thông báo, chưa gửi dữ liệu đi đâu.
const form = document.getElementById("consult-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    if (!name || !phone) {
      status.textContent = "Vui lòng nhập họ tên và số điện thoại.";
      return;
    }
    status.textContent = `Cảm ơn ${name}! Chúng tôi sẽ liên hệ qua số ${phone}.`;
    form.reset();
  });
}
