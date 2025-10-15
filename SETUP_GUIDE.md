# 🚀 Hướng Dẫn Chạy Dự Án Backend - Bus Management System

## 📋 Yêu Cầu Hệ Thống

- **Node.js**: >= v16.0.0 ([Tải tại đây](https://nodejs.org/))
- **MySQL**: >= v8.0 ([Tải tại đây](https://dev.mysql.com/downloads/mysql/))
- **npm** hoặc **yarn**

## 🔧 Các Bước Cài Đặt

### Bước 1: Cài Đặt Dependencies

```bash
npm install
```

### Bước 2: Cấu Hình MySQL Database

1. **Mở MySQL và tạo database:**

```sql
CREATE DATABASE software_engineering;
```

2. **Tạo user và grant permissions (tuỳ chọn):**

```sql
CREATE USER 'root'@'localhost' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON software_engineering.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

### Bước 3: Cấu Hình File .env

File `.env` đã được tạo sẵn với cấu hình mặc định. **QUAN TRỌNG**: Bạn cần kiểm tra và chỉnh sửa các thông số sau:

```env
# Chỉnh sửa theo thông tin MySQL của bạn
DATABASE_URL="mysql://root:root@localhost:3306/software_engineering"
#                    ^^^^:^^^^
#                    user:password - Thay đổi nếu khác

# Các thông số khác đã được cấu hình sẵn và có thể dùng ngay
```

**Chi tiết các biến môi trường:**

| Biến                       | Mô Tả                         | Giá Trị Mặc Định                           |
| -------------------------- | ----------------------------- | ------------------------------------------ |
| `DATABASE_URL`             | Kết nối MySQL                 | `mysql://user:password@host:port/database` |
| `PORT`                     | Port server                   | `3000`                                     |
| `NODE_ENV`                 | Môi trường                    | `development`                              |
| `JWT_SECRET`               | Secret key cho JWT            | Đã cấu hình sẵn                            |
| `JWT_EXPIRATION`           | Thời hạn access token         | `1d`                                       |
| `REFRESH_TOKEN_EXPIRATION` | Thời hạn refresh token        | `1y`                                       |
| `TWO_FACTOR_SECRET`        | Secret cho 2FA                | Đã cấu hình sẵn                            |
| `EMAIL_SECRET`             | Secret cho email verification | Đã cấu hình sẵn                            |
| `CLOUDINARY_*`             | Cấu hình upload file          | Giá trị demo (chưa hoạt động)              |

### Bước 4: Setup Database Schema với Prisma

```bash
# Generate Prisma Client
npx prisma generate

# Tạo database schema
npx prisma db push

# Xem database trong Prisma Studio (tuỳ chọn)
npx prisma studio
```

**Lưu ý:** Nếu gặp lỗi khi chạy `npx prisma db push`, kiểm tra:

- MySQL server đã chạy chưa
- Thông tin kết nối trong `DATABASE_URL` có đúng không
- Database `software_engineering` đã được tạo chưa

### Bước 5: Seed Database (Tuỳ Chọn)

Nếu có sẵn file seed trong thư mục `db/`:

```bash
# Import schema
mysql -u root -p software_engineering < db/schema.sql

# Import seed data
mysql -u root -p software_engineering < db/seed.sql
```

### Bước 6: Chạy Development Server

```bash
npm run dev
```

Server sẽ chạy tại: **http://localhost:3000**

## ✅ Kiểm Tra Server Hoạt Động

### 1. Health Check

```bash
curl http://localhost:3000/health
```

Hoặc mở trình duyệt: http://localhost:3000/health

**Response mong đợi:**

```json
{
  "status": "ok"
}
```

### 2. API Documentation

Mở trình duyệt: **http://localhost:3000/docs**

### 3. Test API đầu tiên - Register User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123",
    "email": "admin@example.com"
  }'
```

## 🐛 Xử Lý Lỗi Thường Gặp

### Lỗi: "Environment variable validation failed"

**Nguyên nhân:** Thiếu hoặc sai giá trị trong file `.env`

**Giải pháp:**

1. Kiểm tra tất cả các biến bắt buộc đã có trong `.env`
2. So sánh với file `.env.example`
3. Không có khoảng trắng thừa, dùng dấu ngoặc kép cho giá trị có ký tự đặc biệt

### Lỗi: "Can't reach database server"

**Nguyên nhân:** MySQL server chưa chạy hoặc cấu hình sai

**Giải pháp:**

1. Kiểm tra MySQL service đã chạy:
   - Windows: Mở Services → tìm MySQL → Start
   - Mac/Linux: `sudo systemctl start mysql`
2. Kiểm tra `DATABASE_URL` có đúng user/password/port không
3. Test kết nối: `mysql -u root -p`

### Lỗi: "Port 3000 is already in use"

**Giải pháp:**

1. Thay đổi `PORT` trong file `.env` thành port khác (vd: 3001)
2. Hoặc kill process đang dùng port 3000:

   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F

   # Mac/Linux
   lsof -ti:3000 | xargs kill
   ```

### Lỗi: Prisma không generate được

**Giải pháp:**

```bash
# Xóa cache
rm -rf node_modules/.prisma
rm -rf prisma/generated

# Generate lại
npx prisma generate
```

## 📦 Scripts Có Sẵn

```bash
# Development (watch mode với auto-reload)
npm run dev

# Build cho production
npm run build

# Watch files changes
npm run watch

# Thêm endpoint mới
npm run add_endpoint

# Tạo module mới
npm run add_module
```

## 🔐 Cloudinary Setup (Tuỳ Chọn - Cho File Upload)

Nếu cần tính năng upload file/ảnh:

1. Đăng ký tài khoản miễn phí tại: https://cloudinary.com/
2. Lấy thông tin từ Dashboard:
   - Cloud Name
   - API Key
   - API Secret
3. Cập nhật vào file `.env`:

```env
CLOUDINARY_CLOUD_NAME="your-actual-cloud-name"
CLOUDINARY_API_KEY="your-actual-api-key"
CLOUDINARY_API_SECRET="your-actual-api-secret"
```

## 🐳 Chạy Với Docker (Alternative)

Nếu muốn chạy với Docker:

```bash
# Build và start containers
docker-compose up -d

# Xem logs
docker-compose logs -f

# Stop containers
docker-compose down
```

## 📚 Tài Liệu Tham Khảo

- **API Documentation:** http://localhost:3000/docs
- **API Endpoints:** Xem file `API_DOCUMENTATION.md`
- **Prisma Schema:** `prisma/schema.prisma`
- **Database Diagram:** Sử dụng Prisma Studio để xem

## 🎯 Next Steps

Sau khi server chạy thành công:

1. ✅ Test các API endpoints (xem `API_DOCUMENTATION.md`)
2. ✅ Tạo user đầu tiên qua `/api/auth/register`
3. ✅ Login và lấy access token
4. ✅ Test các protected endpoints với token
5. ✅ Tạo dữ liệu mẫu (buses, routes, schedules...)

## 💡 Tips

- Sử dụng **Postman** hoặc **Thunder Client** để test API
- Mở **Prisma Studio** (`npx prisma studio`) để xem/sửa database
- Check logs trong terminal để debug
- Đọc file `API_DOCUMENTATION.md` để hiểu các endpoints

## 🆘 Cần Hỗ Trợ?

Nếu gặp vấn đề:

1. Kiểm tra logs trong terminal
2. Verify file `.env` có đầy đủ và đúng format
3. Test kết nối MySQL
4. Xem lại các bước setup

---

**Chúc bạn code vui vẻ! 🚀**
