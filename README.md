# Express User API

A secure and robust Express.js API for user management with JWT authentication, built with best practices and comprehensive testing.

## Features

- 🔐 JWT-based authentication
- 👤 User registration and login
- 🔒 Password hashing with bcrypt
- 🛡️ Security middleware (Helmet, CORS, Rate limiting)
- 📊 Input validation with Joi
- 🗄️ MongoDB integration with Mongoose
- 🧪 Comprehensive test suite
- 📝 API documentation
- 🎨 Beautiful web dashboard

## Tech Stack

- **Backend**: Express.js, Node.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, Rate limiting
- **Validation**: Joi
- **Testing**: Jest, Supertest
- **Code Quality**: ESLint

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd express-user-api
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start MongoDB (make sure MongoDB is running on your system)

5. Start the development server:
```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/user-api
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile
- `POST /api/auth/logout` - Logout user

### User Management
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin only)
- `GET /api/users/search` - Search users

### System
- `GET /api/health` - Health check

## Usage

### Web Dashboard
Visit `http://localhost:3000` to access the web dashboard for testing the API.

### API Testing with cURL

#### Register a new user:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "TestPass123!"
  }'
```

#### Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123!"
  }'
```

#### Get profile (with token):
```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Code Quality

Run ESLint:
```bash
npm run lint
```

Fix ESLint issues:
```bash
npm run lint:fix
```

## Security Features

- Password hashing with bcrypt (12 salt rounds)
- JWT token authentication
- Rate limiting to prevent abuse
- CORS protection
- Helmet security headers
- Input validation and sanitization
- SQL injection prevention
- XSS protection

## Project Structure

```
express-user-api/
├── config/
│   └── database.js          # Database configuration
├── middleware/
│   └── auth.js              # Authentication middleware
├── models/
│   └── User.js              # User data model
├── routes/
│   ├── auth.js              # Authentication routes
│   └── users.js             # User management routes
├── tests/
│   └── auth.test.js         # Test files
├── utils/
│   └── validation.js        # Input validation utilities
├── public/
│   └── index.html           # Web dashboard
├── server.js                # Main application file
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Run ESLint and fix any issues
7. Submit a pull request

## License

This project is licensed under the MIT License.
