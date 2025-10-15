# API Documentation - Bus Management System

## Base URL

```
http://localhost:3000/api
```

## Authentication

Hệ thống sử dụng JWT-based authentication. Một số endpoints yêu cầu authentication header:

```
Authorization: Bearer <access_token>
```

---

## 🔐 Authentication APIs

### 1. User Registration

**POST** `/api/auth/register`

**Request Body:**

```json
{
  "username": "string",
  "password": "string",
  "email": "string (email format)"
}
```

**Response:**

```json
{
  "id": "uuid",
  "username": "string",
  "email": "string",
  "roles": ["string"]
}
```

### 2. User Login

**POST** `/api/auth/login`

**Request Body:**

```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "id": "string",
  "username": "string",
  "email": "string",
  "roles": ["string"],
  "accessToken": "string",
  "refreshToken": "string"
}
```

### 3. Refresh Token

**POST** `/api/auth/refresh`

**Request Body:**

```json
{
  "refreshToken": "string"
}
```

**Response:**

```json
{
  "accessToken": "string"
}
```

### 4. Get User Profile

**GET** `/api/auth/profile`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response:**

```json
{
  // TODO: Implementation pending
}
```

---

## 🚌 Bus Management APIs

### 1. Get All Buses

**GET** `/api/buses/`

**Query Parameters:**

- `page` (number, default: 1): Page number
- `limit` (number, default: 10, max: 100): Items per page
- `search` (string, optional): Search term for name, model, or license plate

**Response:**

```json
{
  "data": [
    {
      "id": "uuid",
      "licensePlate": "string",
      "capacity": "number",
      "metadata": {}
    }
  ],
  "meta": {
    "total": "number",
    "page": "number",
    "limit": "number",
    "totalPages": "number"
  }
}
```

### 2. Get Bus by ID

**GET** `/api/buses/:id`

**Path Parameters:**

- `id` (string): Bus UUID

**Response:**

```json
{
  "id": "uuid",
  "licensePlate": "string",
  "capacity": "number",
  "metadata": {},
  "test": "string"
}
```

### 3. Create Bus

**POST** `/api/buses/`

**Request Body:**

```json
{
  "licensePlate": "string",
  "capacity": "number",
  "metadata": {}
}
```

**Response:**

```json
{
  "id": "uuid",
  "licensePlate": "string",
  "capacity": "number",
  "metadata": {}
}
```

### 4. Delete Bus

**DELETE** `/api/buses/:id`

**Path Parameters:**

- `id` (string): Bus UUID

**Response:**

```json
{}
```

---

## 🛣️ Route Management APIs

### 1. Get All Routes

**GET** `/api/routes/`

**Query Parameters:**

- `page` (number, default: 1): Page number
- `limit` (number, default: 10, max: 100): Items per page
- `search` (string, optional): Search term for name or ID

**Response:**

```json
{
  "data": [
    {
      "id": "uuid",
      "name": "string",
      "startLocation": {
        "latitude": "number",
        "longitude": "number"
      },
      "endLocation": {
        "latitude": "number",
        "longitude": "number"
      },
      "metadata": {}
    }
  ],
  "meta": {
    "total": "number",
    "page": "number",
    "limit": "number",
    "totalPages": "number"
  }
}
```

### 2. Get Route by ID

**GET** `/api/routes/:id`

**Path Parameters:**

- `id` (string): Route UUID

**Response:**

```json
{
  "id": "uuid",
  "name": "string",
  "startLocation": {
    "latitude": "number",
    "longitude": "number"
  },
  "endLocation": {
    "latitude": "number",
    "longitude": "number"
  },
  "metadata": {},
  "createdAt": "string (ISO datetime)",
  "stopPoints": [
    {
      "id": "uuid",
      "name": "string",
      "location": {
        "latitude": "number",
        "longitude": "number"
      },
      "sequence": "number",
      "meta": {}
    }
  ]
}
```

### 3. Create Route

**POST** `/api/routes/`

**Request Body:**

```json
{
  "name": "string",
  "startLocation": {
    "latitude": "number",
    "longitude": "number"
  },
  "endLocation": {
    "latitude": "number",
    "longitude": "number"
  },
  "meta": {},
  "stopPointIds": ["uuid"]
}
```

**Response:**

```json
{
  "id": "uuid",
  "name": "string",
  "stopPoints": [
    {
      "id": "uuid",
      "name": "string",
      "location": {
        "latitude": "number",
        "longitude": "number"
      },
      "sequence": "number",
      "meta": {}
    }
  ],
  "createdAt": "string (ISO datetime)"
}
```

### 4. Update Route

**PUT** `/api/routes/:id`

**Path Parameters:**

- `id` (string): Route UUID

**Request Body:**

```json
{
  "name": "string",
  "meta": {},
  "stopPointIds": ["uuid"]
}
```

**Response:**

```json
{
  "id": "uuid",
  "name": "string",
  "updatedAt": "string (ISO datetime)"
}
```

### 5. Delete Route

**DELETE** `/api/routes/:id`

**Path Parameters:**

- `id` (string): Route UUID

**Response:**

```json
{}
```

---

## 📅 Schedule Management APIs

### 1. Get All Schedules

**GET** `/api/schedules/`

**Query Parameters:**

- `page` (number, default: 1): Page number
- `limit` (number, default: 10, max: 100): Items per page
- `search` (string, optional): Search term

**Response:**

```json
{
  "data": [
    {
      "id": "uuid",
      "bus": {
        "id": "uuid",
        "licensePlate": "string",
        "capacity": "number",
        "metadata": {}
      },
      "times": [
        {
          "dayOfWeek": "string",
          "departureTime": "string"
        }
      ],
      "route": {
        "id": "uuid",
        "name": "string",
        "startLocation": {
          "latitude": "number",
          "longitude": "number"
        },
        "endLocation": {
          "latitude": "number",
          "longitude": "number"
        },
        "metadata": {}
      },
      "meta": {},
      "startDate": "string (ISO datetime)",
      "endDate": "string (ISO datetime)",
      "startTime": "string (ISO time)",
      "type": "MORNING" | "AFTERNOON"
    }
  ],
  "meta": {
    "total": "number",
    "page": "number",
    "limit": "number",
    "totalPages": "number"
  }
}
```

### 2. Get Schedule by ID

**GET** `/api/schedules/:id`

**Path Parameters:**

- `id` (string): Schedule UUID

**Response:**

```json
{
  "id": "uuid",
  "bus": {
    "id": "uuid",
    "licensePlate": "string",
    "capacity": "number",
    "metadata": {}
  },
  "times": [
    {
      "dayOfWeek": "string",
      "departureTime": "string"
    }
  ],
  "route": {
    "id": "uuid",
    "name": "string",
    "startLocation": {
      "latitude": "number",
      "longitude": "number"
    },
    "endLocation": {
      "latitude": "number",
      "longitude": "number"
    },
    "metadata": {}
  },
  "meta": {},
  "startDate": "string (ISO datetime)",
  "endDate": "string (ISO datetime)",
  "startTime": "string (ISO time)",
  "type": "MORNING" | "AFTERNOON"
}
```

### 3. Create Schedule

**POST** `/api/schedules/`

**Request Body:**

```json
{
  "busId": "uuid",
  "routeId": "uuid",
  "driverId": "uuid",
  "times": [
    {
      "dayOfWeek": "string",
      "departureTime": "string"
    }
  ],
  "meta": {},
  "startDate": "string (ISO datetime)",
  "endDate": "string (ISO datetime)",
  "startTime": "string (ISO time)",
  "type": "MORNING" | "AFTERNOON"
}
```

**Response:**

```json
{
  "id": "uuid",
  "bus": {
    "id": "uuid",
    "licensePlate": "string",
    "capacity": "number",
    "metadata": {}
  },
  "times": [
    {
      "dayOfWeek": "string",
      "departureTime": "string"
    }
  ],
  "route": {
    "id": "uuid",
    "name": "string",
    "startLocation": {
      "latitude": "number",
      "longitude": "number"
    },
    "endLocation": {
      "latitude": "number",
      "longitude": "number"
    },
    "metadata": {}
  },
  "meta": {},
  "startDate": "string (ISO datetime)",
  "endDate": "string (ISO datetime)",
  "startTime": "string (ISO time)",
  "type": "MORNING" | "AFTERNOON"
}
```

### 4. Update Schedule

**PUT** `/api/schedules/:id`

**Path Parameters:**

- `id` (string): Schedule UUID

**Request Body:**

```json
{
  "busId": "uuid",
  "routeId": "uuid",
  "driverId": "uuid",
  "times": [
    {
      "dayOfWeek": "string",
      "departureTime": "string"
    }
  ],
  "meta": {},
  "startDate": "string (ISO datetime)",
  "endDate": "string (ISO datetime)",
  "startTime": "string (ISO time)",
  "type": "MORNING" | "AFTERNOON"
}
```

**Response:**

```json
{
  "id": "uuid",
  "bus": {
    "id": "uuid",
    "licensePlate": "string",
    "capacity": "number",
    "metadata": {}
  },
  "times": [
    {
      "dayOfWeek": "string",
      "departureTime": "string"
    }
  ],
  "route": {
    "id": "uuid",
    "name": "string",
    "startLocation": {
      "latitude": "number",
      "longitude": "number"
    },
    "endLocation": {
      "latitude": "number",
      "longitude": "number"
    },
    "metadata": {}
  },
  "meta": {},
  "startDate": "string (ISO datetime)",
  "endDate": "string (ISO datetime)",
  "startTime": "string (ISO time)",
  "type": "MORNING" | "AFTERNOON"
}
```

### 5. Delete Schedule

**DELETE** `/api/schedules/:id`

**Path Parameters:**

- `id` (string): Schedule UUID

**Response:**

```json
{}
```

---

## 🚗 Driver APIs

### 1. Get Today's Schedules

**GET** `/api/drivers/schedules/today`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response:**

```json
{
  "data": [
    {
      "id": "uuid",
      "route": {
        "id": "uuid",
        "name": "string",
        "startLocation": {
          "latitude": "number",
          "longitude": "number"
        },
        "endLocation": {
          "latitude": "number",
          "longitude": "number"
        },
        "metadata": {}
      },
      "bus": {
        "id": "uuid",
        "licensePlate": "string",
        "capacity": "number",
        "metadata": {}
      },
      "students": [
        {
          "id": "uuid",
          "name": "string",
          "stopPoint": {
            "id": "uuid",
            "name": "string",
            "location": {
              "latitude": "number",
              "longitude": "number"
            },
            "sequence": "number",
            "meta": {}
          }
        }
      ]
    }
  ],
  "total": "number"
}
```

---

## 👨‍👩‍👧‍👦 Parent APIs

### 1. Get Students

**GET** `/api/parents/getStudents`

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response:**

```json
{
  "data": [
    {
      "id": "uuid",
      "name": "string",
      "stopPoint": {
        "id": "uuid",
        "name": "string",
        "location": {
          "latitude": "number",
          "longitude": "number"
        },
        "meta": {}
      } | null,
      "status": "PENDING"
    }
  ],
  "total": "number"
}
```

---

## 🚏 Stop Points APIs

### 1. Get All Stop Points

**GET** `/api/stoppoints/stoppoints`

**Response:**

```json
{
  "data": [
    {
      "id": "uuid",
      "name": "string",
      "location": {
        "latitude": "number",
        "longitude": "number"
      },
      "meta": {}
    }
  ],
  "total": "number"
}
```

### 2. Get Stop Point by ID

**GET** `/api/stoppoints/stoppoints/:id`

**Path Parameters:**

- `id` (string): Stop Point UUID

**Response:**

```json
{
  "id": "uuid",
  "name": "string",
  "location": {
    "latitude": "number",
    "longitude": "number"
  },
  "createdAt": "string (ISO datetime)",
  "updatedAt": "string (ISO datetime)"
}
```

### 3. Create Stop Point

**POST** `/api/stoppoints/stoppoints`

**Request Body:**

```json
{
  "name": "string",
  "location": {
    "latitude": "number",
    "longitude": "number"
  },
  "sequence": "number"
}
```

**Response:**

```json
{
  "id": "uuid",
  "name": "string",
  "location": {
    "latitude": "number",
    "longitude": "number"
  }
}
```

### 4. Update Stop Point

**PUT** `/api/stoppoints/stoppoints/:id`

**Path Parameters:**

- `id` (string): Stop Point UUID

**Request Body:**

```json
{
  "name": "string",
  "location": {
    "latitude": "number",
    "longitude": "number"
  },
  "meta": {}
}
```

**Response:**

```json
{
  "id": "uuid",
  "name": "string",
  "location": {
    "latitude": "number",
    "longitude": "number"
  },
  "meta": {},
  "createdAt": "string (ISO datetime)",
  "updatedAt": "string (ISO datetime)"
}
```

### 5. Delete Stop Point

**DELETE** `/api/stoppoints/stoppoints/:id`

**Path Parameters:**

- `id` (string): Stop Point UUID

**Response:**

```json
{}
```

---

## 🏥 Health Check

### Health Check

**GET** `/api/health`

**Response:**

```json
{
  "status": "ok"
}
```

---

## 📚 API Documentation

### Swagger Documentation

**GET** `/docs`

Truy cập Swagger UI để xem tài liệu API tương tác tại: `http://localhost:3000/docs`

---

## 🔧 Common Data Types

### GeoLocation

```json
{
  "latitude": "number (-90 to 90)",
  "longitude": "number (-180 to 180)"
}
```

### PaginationMetaData

```json
{
  "total": "number",
  "page": "number",
  "limit": "number",
  "totalPages": "number"
}
```

### TimeTable

```json
{
  "dayOfWeek": "string",
  "departureTime": "string"
}
```

---

## ⚠️ Error Responses

Tất cả các lỗi đều trả về format chuẩn:

```json
{
  "code": "number",
  "message": "string",
  "name": "string"
}
```

**Common Error Codes:**

- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict
- `500`: Internal Server Error

---

## 🔐 Authentication Notes

- Một số endpoints yêu cầu JWT token trong header `Authorization: Bearer <token>`
- Token được tạo khi login thành công
- Sử dụng refresh token để lấy access token mới
- Token có thời hạn và cần được refresh định kỳ

---

## 📝 Notes

- Tất cả timestamps đều sử dụng ISO format
- UUID được sử dụng cho tất cả ID
- Pagination mặc định: page=1, limit=10
- Search không phân biệt hoa thường
- Metadata fields có thể chứa bất kỳ object JSON nào
