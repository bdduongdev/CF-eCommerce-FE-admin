# Debug Authentication Issues

## Các lỗi thường gặp:

### 1. 401 Unauthorized
- **Nguyên nhân**: Token không hợp lệ hoặc đã hết hạn
- **Giải pháp**: 
  - Kiểm tra token trong localStorage
  - Đăng nhập lại
  - Kiểm tra refresh token logic

### 2. 403 Forbidden
- **Nguyên nhân**: Token hợp lệ nhưng không có quyền truy cập
- **Giải pháp**:
  - Kiểm tra role của user có phải là 'admin' không
  - Kiểm tra API endpoint có đúng không
  - **QUAN TRỌNG**: Một số API cần sử dụng `/admin/` prefix

### 3. 429 Rate Limiting
- **Nguyên nhân**: Gọi API quá nhiều lần
- **Giải pháp**: Đợi một lúc rồi thử lại

## Vấn đề đã phát hiện:

### Orders API 403 Forbidden
- **Vấn đề**: API `/orders` trả về 403 nhưng `/users`, `/banners`, `/categories`, `/products` hoạt động bình thường
- **Nguyên nhân**: Orders API cần sử dụng endpoint `/admin/orders` thay vì `/orders`
- **Đã sửa**: Cập nhật `orderService.ts` để sử dụng `/admin/orders` cho tất cả operations

## Cách debug:

### 1. Sử dụng Debug Components
- **Token Debug** (🔧): Click vào nút ở góc dưới bên phải
- **API Test** (📡): Click vào nút ở góc dưới bên trái để test tất cả endpoints

### 2. Kiểm tra Console
- Mở Developer Tools (F12)
- Xem tab Console để đọc log
- Các log quan trọng:
  - `Request:` - Thông tin request
  - `Response:` - Thông tin response
  - `Auth check:` - Trạng thái authentication
  - `Token refreshed successfully` - Refresh token thành công

### 3. Kiểm tra LocalStorage
```javascript
// Trong console browser
console.log('Access Token:', localStorage.getItem('accessToken'))
console.log('Refresh Token:', localStorage.getItem('refreshToken'))
console.log('User:', localStorage.getItem('user'))
```

### 4. Test API trực tiếp
```javascript
// Test API với token
const token = localStorage.getItem('accessToken')

// Test orders API (cũ)
fetch('http://localhost:8888/api/orders?page=1&limit=5', {
  headers: { 'Authorization': `Bearer ${token}` }
}).then(res => res.json()).then(console.log)

// Test orders API (mới - admin)
fetch('http://localhost:8888/api/admin/orders?page=1&limit=5', {
  headers: { 'Authorization': `Bearer ${token}` }
}).then(res => res.json()).then(console.log)
```

## Các bước khắc phục:

### 1. Clear Authentication Data
- Click "Clear All & Reload" trong debug component
- Hoặc xóa localStorage thủ công:
```javascript
localStorage.clear()
window.location.reload()
```

### 2. Đăng nhập lại
- Đảm bảo sử dụng tài khoản admin
- Kiểm tra email và password đúng

### 3. Kiểm tra Server
- Đảm bảo server đang chạy ở port 8888
- Kiểm tra API endpoints có hoạt động không

### 4. Kiểm tra CORS
- Đảm bảo server cho phép CORS từ localhost:5173

## API Endpoints cần lưu ý:

### Hoạt động bình thường:
- `/users` - Quản lý users
- `/banners` - Quản lý banners  
- `/categories` - Quản lý categories
- `/products` - Quản lý products

### Cần admin prefix:
- `/admin/orders` - Quản lý orders (thay vì `/orders`)
- `/admin/orders/{id}` - Chi tiết order
- `/admin/orders/{id}/status` - Cập nhật status
- `/admin/orders/{id}/cancel` - Hủy order

## Cấu trúc Token:

JWT token có 3 phần:
1. Header (thông tin về thuật toán)
2. Payload (thông tin user, thời gian hết hạn)
3. Signature (chữ ký)

Để decode payload:
```javascript
const token = localStorage.getItem('accessToken')
const payload = JSON.parse(atob(token.split('.')[1]))
console.log('Token payload:', payload)
```

## Logs quan trọng:

- `Request: GET /api/orders` - API call
- `Response: 200 /api/orders` - API response thành công
- `Response error: 401 /api/orders` - API response lỗi
- `Response error: 403 /api/orders` - API forbidden (cần admin endpoint)
- `Attempting to refresh token...` - Đang refresh token
- `Token refreshed successfully` - Refresh token thành công
- `Auth check:` - Kiểm tra authentication
- `RequireAuth - Redirecting to login` - Redirect do không authenticated 