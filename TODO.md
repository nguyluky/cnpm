Tốt lắm 😎 — nếu `Route.path` đã được lưu trong `meta` (rất hợp lý để linh hoạt sau này), thì ta có thể giữ schema như cũ và tập trung vào **API thực tế đầy đủ**, bám đúng **database** mà bạn đang dùng.

Dưới đây là danh sách **API endpoints thực tế** được thiết kế chuẩn REST, chia theo vai trò:

---

# 🧩 **Smart School Bus API – SSB 1.0**

## **Auth & User**

| Method | Endpoint         | Description                               | body                                                                                                                                                         | response                                                                                                                                                                          |
| ------ | ---------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/auth/register` | Đăng ký tài khoản (Parent, Driver, Admin) | <pre><code>interface RegisterRequest {<br>username: string;<br>email: string;<br>password: string;<br>role: 'ADMIN' | 'DRIVER' | 'PARENT';<br>}</code></pre> | <pre><code>interface RegisterResponse {<br>accessToken: string;<br>refreshToken: string;<br>user: { id: string; username: string; email: string; role: string }<br>}</code></pre> |
| `POST` | `/auth/login`    | Đăng nhập                                 | <pre><code>interface LoginRequest {<br>email: string;<br>password: string;<br>}</code></pre>                                                                 | <pre><code>interface LoginResponse {<br>accessToken: string;<br>refreshToken: string;<br>user: {...}<br>}</code></pre>                                                            |
| `POST` | `/auth/refresh`  | Làm mới token                             | <pre><code>{ refreshToken: string }</code></pre>                                                                                                             | <pre><code>{ accessToken: string }</code></pre>                                                                                                                                   |
| `GET`  | `/auth/profile`  | Lấy thông tin người dùng hiện tại         | -                                                                                                                                                            | <pre><code>{ id, username, email, roles: ['DRIVER'] }</code></pre>                                                                                                                |

---

## **Bus Management (Admin)**

| Method   | Endpoint     | Description                  | body                                                                           | response                                                          |
| -------- | ------------ | ---------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `GET`    | `/buses`     | Lấy danh sách tất cả xe buýt | -                                                                              | <pre><code>[{ id, licensePlate, capacity, meta }]</code></pre>    |
| `POST`   | `/buses`     | Thêm xe buýt mới             | <pre><code>{ licensePlate: string; capacity: number; meta?: any }</code></pre> | <pre><code>{ id, licensePlate, capacity }</code></pre>            |
| `PUT`    | `/buses/:id` | Cập nhật thông tin xe        | <pre><code>{ capacity?: number; meta?: any }</code></pre>                      | <pre><code>{ id, licensePlate, capacity, updatedAt }</code></pre> |
| `DELETE` | `/buses/:id` | Xóa xe buýt                  | -                                                                              | <pre><code>{ success: true }</code></pre>                         |

---

## **Route Management (Admin)**

| Method   | Endpoint      | Description                                   | body                                                                                                               | response                                                                                  |
| -------- | ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| `GET`    | `/routes`     | Lấy danh sách tuyến đường                     | -                                                                                                                  | <pre><code>[{ id, name, startLocation, endLocation, meta }]</code></pre>                  |
| `GET`    | `/routes/:id` | Lấy chi tiết tuyến đường (bao gồm StopPoints) | -                                                                                                                  | <pre><code>{ id, name, startLocation, endLocation, meta, stopPoints: [...] }</code></pre> |
| `POST`   | `/routes`     | Tạo tuyến đường mới                           | <pre><code>{ name: string; startLocation: any; endLocation: any; meta?: any; stopPointIds: string[] }</code></pre> | <pre><code>{ id, name, stopPoints: [...] }</code></pre>                                   |
| `PUT`    | `/routes/:id` | Cập nhật tuyến đường                          | <pre><code>{ name?: string; meta?: any; stopPointIds?: string[] }</code></pre>                                     | <pre><code>{ id, name, updatedAt }</code></pre>                                           |
| `DELETE` | `/routes/:id` | Xóa tuyến đường                               | -                                                                                                                  | <pre><code>{ success: true }</code></pre>                                                 |

---

## **StopPoint Management**

| Method   | Endpoint          | Description             | body                                                                                           | response                                                         |
| -------- | ----------------- | ----------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `GET`    | `/stoppoints`     | Lấy danh sách điểm dừng | -                                                                                              | <pre><code>[{ id, name, location, sequence, meta }]</code></pre> |
| `POST`   | `/stoppoints`     | Tạo điểm dừng mới       | <pre><code>{ name: string; location: {lat:number; lng:number}; sequence: number }</code></pre> | <pre><code>{ id, name, location }</code></pre>                   |
| `PUT`    | `/stoppoints/:id` | Cập nhật điểm dừng      | <pre><code>{ name?: string; location?: any; sequence?: number }</code></pre>                   | <pre><code>{ id, updatedAt }</code></pre>                        |
| `DELETE` | `/stoppoints/:id` | Xóa điểm dừng           | -                                                                                              | <pre><code>{ success: true }</code></pre>                        |

---

## **Schedule (Quản lý lịch trình)**

| Method   | Endpoint         | Description              | body                                                                                                                                            | response                                                                                      |
| -------- | ---------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `GET`    | `/schedules`     | Lấy danh sách lịch trình | -                                                                                                                                               | <pre><code>[{ id, bus, route, driver, meta }]</code></pre>                                    |
| `GET`    | `/schedules/:id` | Lấy chi tiết lịch trình  | -                                                                                                                                               | <pre><code>{ id, bus, route, driver, times: [{dayOfWeek, departureTime}], meta }</code></pre> |
| `POST`   | `/schedules`     | Tạo lịch trình mới       | <pre><code>{ busId: string; routeId: string; driverId: string; times: [{ dayOfWeek: number; departureTime: string }]; meta?: any }</code></pre> | <pre><code>{ id, busId, routeId, driverId, times: [...] }</code></pre>                        |
| `PUT`    | `/schedules/:id` | Cập nhật lịch trình      | <pre><code>{ busId?: string; driverId?: string; meta?: any }</code></pre>                                                                       | <pre><code>{ id, updatedAt }</code></pre>                                                     |
| `DELETE` | `/schedules/:id` | Xóa lịch trình           | -                                                                                                                                               | <pre><code>{ success: true }</code></pre>                                                     |

---

## **Driver APIs**

| Method | Endpoint                  | Description                            | body                                                                                                              | response                                                                  |
| ------ | ------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `GET`  | `/driver/schedules/today` | Xem lịch trình hôm nay                 | -                                                                                                                 | <pre><code>{ id, route: {...}, bus: {...}, students: [...] }</code></pre> |
| `POST` | `/driver/tracking`        | Cập nhật vị trí xe theo thời gian thực | <pre><code>{ scheduleId: string; location: {lat, lng}; timestamp: string }</code></pre>                           | <pre><code>{ success: true }</code></pre>                                 |
| `POST` | `/driver/report`          | Gửi báo cáo sự cố                      | <pre><code>{ scheduleId?: string; reportType: string; description: string; }</code></pre>                         | <pre><code>{ id, createdAt }</code></pre>                                 |
| `POST` | `/driver/attendance`      | Cập nhật trạng thái đón/trả học sinh   | <pre><code>{ studentId: string; scheduleId: string; status: 'picked_up' \| 'dropped_off' \| 'missed' }</code></pre> | <pre><code>{ id, status, updatedAt }</code></pre>                         |

---

## **Parent APIs**

| Method | Endpoint                         | Description                          | body                                            | response                                                                    |
| ------ | -------------------------------- | ------------------------------------ | ----------------------------------------------- | --------------------------------------------------------------------------- |
| `GET`  | `/parent/students`               | Lấy danh sách con của phụ huynh      | -                                               | <pre><code>[{ id, name, stopPoint, attendanceStatus }]</code></pre>         |
| `GET`  | `/parent/students/:id/track`     | Theo dõi xe buýt con đang đi         | -                                               | <pre><code>{ studentId, busLocation: {lat, lng}, eta: number }</code></pre> |
| `GET`  | `/parent/notifications`          | Lấy thông báo về xe đến gần hoặc trễ | -                                               | <pre><code>[{ type, message, timestamp }]</code></pre>                      |
| `PUT`  | `/parent/students/:id/stoppoint` | Thay đổi điểm đón/trả cho học sinh   | <pre><code>{ stopPointId: string }</code></pre> | <pre><code>{ success: true }</code></pre>                                   |

---

## **Report Management (Admin)**

| Method | Endpoint       | Description           | body | response                                                                                  |
| ------ | -------------- | --------------------- | ---- | ----------------------------------------------------------------------------------------- |
| `GET`  | `/reports`     | Lấy danh sách báo cáo | -    | <pre><code>[{ id, reportType, description, reporter, scheduleId }]</code></pre>           |
| `GET`  | `/reports/:id` | Xem chi tiết báo cáo  | -    | <pre><code>{ id, reportType, description, reporter: {...}, schedule: {...} }</code></pre> |

---

## **Tracking & History**

| Method | Endpoint                | Description                        | body | response                                                      |
| ------ | ----------------------- | ---------------------------------- | ---- | ------------------------------------------------------------- |
| `GET`  | `/tracking/:scheduleId` | Lấy lịch sử vị trí xe trong chuyến | -    | <pre><code>[{ timestamp, location: {lat, lng} }]</code></pre> |

---

Tổng cộng ~ **25 endpoint chính**, đủ cho hệ thống vận hành thật:

* Admin quản lý toàn bộ
* Driver cập nhật tracking và báo cáo
* Phụ huynh xem theo dõi & thông báo

---

Bạn có muốn tôi tạo **OpenAPI 3.0 (Swagger YAML)** từ danh sách này luôn không?
→ Sẽ tiện để import vào Swagger UI / Postman.

