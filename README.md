# Sân Vườn Cố Đô

Landing page ít chữ, tông xanh lá nhạt và trắng, hiển thị đẹp trên cả
PC và điện thoại, cho dịch vụ thiết kế, thi công và chăm sóc cảnh quan:
sân vườn biệt thự, hồ cá Koi, vườn Nhật và tiểu cảnh, tường cây, vườn
đứng, giếng trời, sân thượng.

## Tính năng

- Menu mobile, header đổi bóng khi cuộn, nút lên đầu trang
- Thẻ dịch vụ bấm để xem chi tiết trong hộp thoại
- Thư viện dự án lọc theo hạng mục, bấm ảnh để xem lớn
- Công cụ ước tính chi phí theo hạng mục, diện tích và gói thi công
  (khoảng giá tham khảo, báo giá chính xác cần khảo sát thực tế)
- Cảm nhận khách hàng dạng chuyển tay, hỏi đáp dạng accordion
- Bài viết kiến thức sân vườn, form tư vấn theo hạng mục
- Hiệu ứng hiện dần khi cuộn, hero zoom nhẹ, nút ánh sáng quét qua,
  thẻ nâng lên khi hover, hỗ trợ giảm chuyển động

## Chạy thử

Mở `index.html` bằng trình duyệt, hoặc:

```bash
python3 -m http.server 8000
```

Sau đó mở http://localhost:8000

## GitHub Pages

Repo → **Settings** → **Pages** → **Deploy from a branch** → nhánh `main`,
thư mục `/ (root)`. Trang live đã được kiểm chứng trước đây tại
https://xp0101.github.io/san-vuon-co-do/

## Hình ảnh và nội dung mẫu

Các hình minh họa hiện đang dẫn tới ảnh công khai trên web (đã kiểm tra
trả về 200 tại thời điểm build). Các dự án và cảm nhận khách hàng hiện
là khung trình bày mẫu — khi có ảnh công trình và đánh giá thật, hãy
thay vào để trang thuyết phục hơn và tránh phụ thuộc vào nguồn ngoài.

## Lưu ý

Form tư vấn là bản tĩnh, chưa gửi dữ liệu đi đâu. Khi vận hành thật,
hãy nối form với email hoặc hệ thống CRM của bạn.
