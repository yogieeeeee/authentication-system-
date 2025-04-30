# JWT Authentication API 🔒

A secure REST API for user authentication and authorization using JSON Web Tokens (JWT), built with Node.js, MongoDB, and Mongoose. Includes a simple frontend implementation.

## Features ✨
- User registration & login
- JWT token generation and refresh
- Password encryption
- MongoDB data storage
- Simple frontend demo
- Local storage base token storage

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Examples](#examples)
- [Error Handling](#error-handling)
- [Contributing](#contributing)

---

## Installation 🛠️

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas URI)
- npm

### Backend Setup
```bash
# clone repository
git clone https://github.com/yogieeeeee/authentication-system-.git
cd authentication-system-

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

---

## Configuration ⚙️

Update `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/your_database
JWT_SECRET=your_secure_secret_here
REFRESH_KEY=your_refresh_key
```

---

## API Endpoints 📡

### Authentication Routes

| Method | Endpoint          | Description                 |
|--------|-------------------|-----------------------------|
| POST   | /api/register     | Register new user           |
| POST   | /api/login        | User login                  |
| GET    | /api/dashboard    | Get user profile (protected)|

---

## Examples 💡

### User Registration
**Request:**
```bash
POST /api/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### Access Protected Route
```bash
GET /api/dashboard
Authorization: Bearer {accessToken}
```

---

## Error Handling ⚠️

| Code | Message                  | Description                     |
|------|--------------------------|---------------------------------|
| 400  | Bad Request              | Invalid request format          |
| 401  | Unauthorized             | Missing/invalid token           |
| 404  | User not found           | Resource doesn't exist          |
| 500  | Internal Server Error    | Server-side error               |

---

## Contributing 🤝

1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit changes:
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. Push to branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request