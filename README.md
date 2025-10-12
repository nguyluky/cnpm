# Bus Management System

A comprehensive bus management system built with Node.js, TypeScript, Express.js, and Socket.IO. This system provides real-time bus tracking, schedule management, and user authentication with role-based access control.

## 🚌 Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Admin, Driver, Student)
  - User registration and profile management

- **Bus Management**
  - Add, update, and delete buses
  - Real-time bus tracking
  - Driver assignment

- **Route Management**
  - Create and manage bus routes
  - Stop point management
  - Route optimization

- **Schedule Management**
  - Create and manage bus schedules
  - Share schedules with users
  - Real-time updates

- **Real-time Features**
  - Live bus location tracking
  - Real-time notifications
  - Socket.IO integration

- **API Documentation**
  - Swagger/OpenAPI documentation
  - Interactive API explorer

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MySQL with Prisma ORM
- **Real-time**: Socket.IO
- **Authentication**: JWT, bcryptjs
- **File Upload**: Multer, Cloudinary
- **API Documentation**: Swagger/OpenAPI
- **Email**: Nodemailer
- **Validation**: Zod
- **Development**: Nodemon, Concurrently

## 📋 Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- Docker (optional)

## 🚀 Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd se
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/software_engineering"
   JWT_SECRET="your-jwt-secret"
   NODE_ENV="development"
   PORT=3000
   
   # Cloudinary (for file uploads)
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   
   # Email configuration
   EMAIL_HOST="smtp.gmail.com"
   EMAIL_PORT=587
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASS="your-app-password"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   
   # Seed the database (optional)
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

### Docker Development

1. **Using Docker Compose**
   ```bash
   docker-compose up -d
   ```

   This will start both the application and MySQL database in containers.

## 📚 API Documentation

Once the server is running, you can access the API documentation at:

**StopLight API Docs**: `http://localhost:3000/docs`

## 🏗️ Project Structure

```
src/
├── config/          # Configuration files
├── middleware/      # Express middleware
├── module/          # Feature modules
│   ├── auth/        # Authentication
│   ├── buses/       # Bus management
│   ├── drivers/     # Driver management
│   ├── routes/      # Route management
│   ├── schedules/   # Schedule management
│   └── stoppoints/  # Stop point management
├── socket/          # Socket.IO handlers
├── types/           # TypeScript type definitions
└── utils/           # Utility functions

lib/                 # Custom libraries
├── BaseAuth.ts      # Base authentication
├── swagget.ts       # Swagger generation
└── socket_*.ts      # Socket decorators

prisma/              # Database schema and migrations
scripts/             # Build and development scripts
```

## 🛡️ Authentication

The system uses JWT-based authentication with role-based access control:

- **Admin**: Full system access
- **Driver**: Access to schedules and routes
- **Student**: View schedules and track buses

### API Endpoints

```bash
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
POST /api/auth/refresh     # Refresh token
GET  /api/auth/profile     # Get user profile
```

## 🚌 Main Features

### Bus Management
- Create, read, update, delete buses
- Assign drivers to buses
- Track bus locations in real-time

### Schedule Management
- Create bus schedules
- Share schedules with users
- Real-time schedule updates

### Route Management
- Define bus routes with stop points
- Optimize routes for efficiency
- Manage stop point locations

## 🔧 Development Scripts

```bash
npm run build        # Build for production
npm run watch        # Watch for file changes and run
npm add_endpoint     # Generate new API endpoint
npm add_module       # Generate new module
```

## 🐳 Docker Support

The project includes Docker support for easy deployment:

```bash
# Build and run with Docker Compose
docker-compose up -d

# Build Docker image
docker build -t bus-management-system .

# Run container
docker run -p 3000:3000 bus-management-system
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | MySQL database connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `NODE_ENV` | Environment (development/production) | Yes |
| `PORT` | Server port (default: 3000) | No |
| `CLOUDINARY_*` | Cloudinary configuration for file uploads | No |
| `EMAIL_*` | Email service configuration | No |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [Your GitHub](https://github.com/yourusername)

## 🆘 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

## 🔮 Future Enhancements

- [ ] Mobile application
- [ ] Advanced analytics dashboard
- [ ] GPS integration for real-time tracking
- [ ] Payment integration
- [ ] Multi-language support
- [ ] Progressive Web App (PWA) features
