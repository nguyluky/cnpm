# Auth

| Method | Endpoint                  | Description                           |
| ------ | ------------------------- | ------------------------------------- |
| `POST` | `/api/auth/login`         | Đăng nhập (username/email + password) |
| `POST` | `/api/auth/register`      | Đăng ký người dùng mới                |
| `POST` | `/api/auth/logout`        | Đăng xuất                             |
| `POST` | `/api/auth/refresh-token` | Làm mới token                         |
| `GET`  | `/api/auth/profile`       | Lấy thông tin người dùng hiện tại     |



# Users
| Method   | Endpoint          | Description          |
| -------- | ----------------- | -------------------- |
| `GET`    | `/api/users`      | Danh sách người dùng |
| `GET`    | `/api/users/{id}` | Chi tiết người dùng  |
| `POST`   | `/api/users`      | Tạo người dùng       |
| `PUT`    | `/api/users/{id}` | Cập nhật người dùng  | 
| `DELETE` | `/api/users/{id}` | Xóa người dùng       |


# ROLES & PERMISSIONS                   V
| Method   | Endpoint                      | Description                     |
| -------- | ----------------------------- | ------------------------------- |
| `GET`    | `/api/roles`                  | Danh sách vai trò               |
| `GET`    | `/api/roles/{id}`             | Chi tiết vai trò                |
| `POST`   | `/api/roles`                  | Tạo vai trò                     |
| `PUT`    | `/api/roles/{id}`             | Cập nhật vai trò                |
| `DELETE` | `/api/roles/{id}`             | Xóa vai trò                     |
| `GET`    | `/api/roles/{id}/permissions` | Lấy danh sách quyền của vai trò |
| `POST`   | `/api/roles/{id}/permissions` | Gán quyền cho vai trò           |

# Permission
| Method   | Endpoint                | Description     |
| -------- | ----------------------- | --------------- |
| `GET`    | `/api/permissions`      | Danh sách quyền |
| `POST`   | `/api/permissions`      | Tạo quyền       |
| `DELETE` | `/api/permissions/{id}` | Xóa quyền       |

# BUS MANAGEMENT
| Method   | Endpoint                   | Description                    |
| -------- | -------------------------- | ------------------------------ |
| `GET`    | `/api/buses`               | Danh sách xe buýt              |
| `GET`    | `/api/buses/{id}`          | Chi tiết xe buýt               |
| `POST`   | `/api/buses`               | Thêm xe buýt mới               |
| `PUT`    | `/api/buses/{id}`          | Cập nhật thông tin xe buýt     |
| `DELETE` | `/api/buses/{id}`          | Xóa xe buýt                    |
| `GET`    | `/api/buses/{id}/schedule` | Lấy các lịch trình của xe buýt |


# ROUTE & STOP POINTS
| Method   | Endpoint                 | Description                       |
| -------- | ------------------------ | --------------------------------- |
| `GET`    | `/api/routes`            | Danh sách tuyến đường             |
| `GET`    | `/api/routes/{id}`       | Chi tiết tuyến đường              |
| `POST`   | `/api/routes`            | Tạo tuyến đường                   |
| `PUT`    | `/api/routes/{id}`       | Cập nhật tuyến đường              |
| `DELETE` | `/api/routes/{id}`       | Xóa tuyến đường                   |
| `GET`    | `/api/routes/{id}/stops` | Lấy các điểm dừng của tuyến       |
| `POST`   | `/api/routes/{id}/stops` | Gán danh sách điểm dừng vào tuyến |

# StopPoint
| Method   | Endpoint               | Description         |
| -------- | ---------------------- | ------------------- |
| `GET`    | `/api/stoppoints`      | Danh sách điểm dừng |
| `GET`    | `/api/stoppoints/{id}` | Chi tiết điểm dừng  |
| `POST`   | `/api/stoppoints`      | Tạo điểm dừng       |
| `PUT`    | `/api/stoppoints/{id}` | Cập nhật điểm dừng  |
| `DELETE` | `/api/stoppoints/{id}` | Xóa điểm dừng       |


# SCHEDULE MANAGEMENT
| Method   | Endpoint                       | Description                                 |
| -------- | ------------------------------ | ------------------------------------------- |
| `GET`    | `/api/schedules`               | Danh sách lịch trình                        |
| `GET`    | `/api/schedules/{id}`          | Chi tiết lịch trình                         |
| `POST`   | `/api/schedules`               | Tạo lịch trình (bus + route + driver)       |
| `PUT`    | `/api/schedules/{id}`          | Cập nhật lịch trình                         |
| `DELETE` | `/api/schedules/{id}`          | Xóa lịch trình                              |
| `GET`    | `/api/schedules/{id}/students` | Danh sách học sinh trong lịch trình         |
| `POST`   | `/api/schedules/{id}/students` | Gán học sinh vào lịch trình (qua StopPoint) |

# STUDENT SCHEDULE MAPPING
| Method   | Endpoint                                         | Description                         |
| -------- | ------------------------------------------------ | ----------------------------------- |
| `GET`    | `/api/student-schedule`                          | Danh sách gán học sinh – lịch trình |
| `POST`   | `/api/student-schedule`                          | Gán học sinh vào điểm dừng cụ thể   |
| `DELETE` | `/api/student-schedule/{studentId}/{scheduleId}` | Gỡ học sinh khỏi lịch trình         |


# ATTENDANCE TRACKING
| Method | Endpoint                                | Description                     |
| ------ | --------------------------------------- | ------------------------------- |
| `GET`  | `/api/attendance`                       | Lấy danh sách điểm danh         |
| `GET`  | `/api/attendance/{id}`                  | Chi tiết điểm danh              |
| `POST` | `/api/attendance`                       | Ghi nhận trạng thái đón/trả     |
| `GET`  | `/api/attendance/student/{studentId}`   | Lịch sử điểm danh theo học sinh |
| `GET`  | `/api/attendance/schedule/{scheduleId}` | Lịch sử điểm danh theo chuyến   |


# TRACKING BUS LOCATION
| Method           | Endpoint                              | Description                             |
| ---------------- | ------------------------------------- | --------------------------------------- |
| `POST`           | `/api/tracking/update`                | Driver cập nhật vị trí xe buýt (mỗi 3s) |
| `GET`            | `/api/tracking/schedule/{scheduleId}` | Lấy toàn bộ vị trí theo chuyến          |
| `GET`            | `/api/tracking/bus/{busId}/latest`    | Lấy vị trí hiện tại của xe buýt         |
| `WS` / `SignalR` | `/hubs/tracking`                      | Stream vị trí realtime cho phụ huynh    |

# REPORT MANAGEMENT
| Method   | Endpoint                             | Description                          |
| -------- | ------------------------------------ | ------------------------------------ |
| `GET`    | `/api/reports`                       | Danh sách báo cáo                    |
| `GET`    | `/api/reports/{id}`                  | Chi tiết báo cáo                     |
| `POST`   | `/api/reports`                       | Tạo báo cáo (incident / maintenance) |
| `DELETE` | `/api/reports/{id}`                  | Xóa báo cáo                          |
| `GET`    | `/api/reports/schedule/{scheduleId}` | Lấy báo cáo theo chuyến              |

# DASHBOARD / ANALYTICS
| Method | Endpoint                    | Description                                    |
| ------ | --------------------------- | ---------------------------------------------- |
| `GET`  | `/api/dashboard/overview`   | Tổng quan số lượng bus, student, route, driver |
| `GET`  | `/api/dashboard/reports`    | Thống kê báo cáo sự cố                         |
| `GET`  | `/api/dashboard/attendance` | Tỉ lệ điểm danh                                |

# NOTIFICATION (OPTIONAL)
| Method   | Endpoint                  | Description                           |
| -------- | ------------------------- | ------------------------------------- |
| `GET`    | `/api/notifications`      | Lấy danh sách thông báo               |
| `POST`   | `/api/notifications`      | Gửi thông báo (admin → driver/parent) |
| `GET`    | `/api/notifications/{id}` | Chi tiết thông báo                    |
| `DELETE` | `/api/notifications/{id}` | Xóa thông báo                         |

