# TaskFlow - Scalable Todo App with Authentication

A modern, full-stack task management application built with React (Next.js), Express.js, and MongoDB. Features advanced task management with priorities, categories, due dates, search/filtering, and a beautiful responsive UI.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure registration and login with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **Advanced Filtering**: Search by title/description, filter by category, priority, and status
- **Task Priorities**: High, Medium, Low with color-coded badges
- **Categories**: Work, Personal, Shopping, Health, Education, Other
- **Due Dates**: Optional due date tracking
- **Statistics Dashboard**: Total tasks, completed tasks, completion rate
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### Technical Features
- **RESTful API**: Well-structured backend with proper error handling
- **Password Hashing**: Secure bcrypt password storage
- **Input Validation**: Server-side validation with express-validator
- **CORS Support**: Cross-origin resource sharing enabled
- **Environment Configuration**: Secure environment variable management
- **Modular Architecture**: Clean separation of concerns

## 🛠️ Tech Stack

### Frontend
- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: Modern state management

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **express-validator**: Input validation

### Development Tools
- **Nodemon**: Auto-restart for backend development
- **ESLint**: Code linting
- **Git**: Version control

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   (Next.js)     │◄──►│   (Express.js)  │◄──►│   (MongoDB)     │
│                 │    │                 │    │                 │
│ • React Components│   │ • Routes        │    │ • Users        │
│ • Pages          │   │ • Middleware    │    │ • Tasks         │
│ • API Calls      │   │ • Controllers   │    │ • Sessions      │
│ • State Mgmt     │   │ • Models        │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Browser  │    │   HTTP/HTTPS    │    │   MongoDB       │
│   (Chrome/Firefox)│   │   Requests      │    │   Connection    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Data Flow
1. **User Interaction** → Frontend Components
2. **API Requests** → Express Routes
3. **Authentication** → JWT Middleware
4. **Data Processing** → Controllers & Models
5. **Database Operations** → MongoDB via Mongoose
6. **Response** → JSON back to Frontend

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Backend Setup
```bash
cd web-app/backend
npm install
```

Create a `.env` file in the backend directory:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
```

Start the backend server:
```bash
npm run dev
```

### Frontend Setup
```bash
cd web-app/frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

### Database Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Update `MONGO_URI` in `.env` file
3. The app will automatically create collections on first use

## 🚀 Usage

### Development
1. Start MongoDB service
2. Start backend: `cd backend && npm run dev`
3. Start frontend: `cd frontend && npm run dev`
4. Open http://localhost:3001 in your browser

### Production
```bash
# Backend
cd backend
npm start

# Frontend (build and serve)
cd frontend
npm run build
npm start
```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Task Endpoints (Protected)

#### Get All Tasks
```http
GET /api/tasks
Authorization: Bearer <jwt_token>
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the Q1 project proposal",
  "priority": "high",
  "category": "Work",
  "dueDate": "2024-01-15"
}
```

#### Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Updated task title",
  "completed": true
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer <jwt_token>
```

### Profile Endpoints (Protected)

#### Get Profile
```http
GET /api/profile
Authorization: Bearer <jwt_token>
```

#### Update Profile
```http
PUT /api/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "newemail@example.com"
}
```

## 🔧 Configuration

### Environment Variables
- `NODE_ENV`: Environment mode (development/production)
- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing
- `JWT_EXPIRE`: JWT expiration time

### Database Models

#### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date
}
```

#### Task Model
```javascript
{
  user: ObjectId (ref: User),
  title: String (required),
  description: String,
  completed: Boolean (default: false),
  priority: String (enum: ['low', 'medium', 'high']),
  category: String,
  dueDate: Date,
  createdAt: Date
}
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Task CRUD operations
- [ ] Search and filtering
- [ ] Dark mode toggle
- [ ] Responsive design on mobile
- [ ] API error handling
- [ ] JWT token validation

### API Testing with cURL
```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

### Development Guidelines
- Follow ESLint configuration
- Write clear commit messages
- Test API endpoints thoroughly
- Maintain consistent code style
- Update documentation for new features

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing React framework
- Express.js community for the robust web framework
- MongoDB for the flexible NoSQL database
- Tailwind CSS for the utility-first styling approach

## 📞 Support

For support, email support@taskflow.com or create an issue in the GitHub repository.

---

**TaskFlow** - Making task management simple and beautiful! 🎯
