# UrbanSaathi Full-Stack Platform

Welcome to the **UrbanSaathi** repository. This is a production-ready, full-stack application for hyperlocal skill-verified services connecting customers with verified local professionals.

## ✨ Features

### 🎨 Modern Frontend (Next.js 16)
- **Beautiful UI**: Gradient-based modern design with smooth animations
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Real-time Updates**: Socket.io integration for instant notifications
- **3D Interactive Elements**: Three.js powered visual effects
- **Authentication**: OTP-based phone authentication
- **Job Management**: Create, view, and manage job postings
- **Performance Dashboard**: Real-time statistics and metrics
- **Dark Theme**: Eye-friendly dark mode throughout

### 🔧 Robust Backend (NestJS)
- **REST API**: Comprehensive endpoints for all features
- **CORS Support**: Properly configured for frontend communication
- **Database**: TypeORM with PostgreSQL/PostGIS support
- **Modular Architecture**: Organized module-based structure
- **Authentication**: JWT-based security with phone OTP
- **Real-time Notifications**: WebSocket support via Socket.io

### 📊 Core Modules
- **Auth**: Phone OTP authentication
- **Users**: User profile management
- **Jobs**: Job posting and management
- **Skills**: Professional skills tracking
- **Professions**: Professional categorization
- **Finance**: Payment and transaction management
- **Analytics**: Usage insights and metrics
- **Notifications**: Real-time updates

## 📁 Repository Structure
```
UrbanSaathi-full-stack/
├── frontend/                 # Next.js 16 application
│   ├── src/
│   │   ├── app/             # Pages and layouts
│   │   ├── components/      # Reusable UI components
│   │   ├── lib/             # Utilities and helpers
│   │   └── store/           # Zustand state management
│   └── package.json
├── backend/                  # NestJS API
│   ├── src/
│   │   ├── modules/         # Feature modules
│   │   ├── config/          # Configuration files
│   │   └── main.ts          # Entry point
│   └── package.json
└── deployment_guide.md      # Deployment instructions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm 9+
- PostgreSQL database (or Supabase)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/WRECKERKNIGHT/UrbanSaathi-full-stack.git
   cd UrbanSaathi-full-stack
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

### Local Development

#### Option 1: Using Separate Terminal Windows (Recommended)

**Terminal 1 - Backend Server**
```bash
cd backend
npm run start:dev
```
✅ Backend will be available at: **http://localhost:3000**
- API endpoints at: **http://localhost:3000/api**
- WebSocket connection at: **http://localhost:3000**

**Terminal 2 - Frontend Development Server**
```bash
cd frontend
npm run dev
```
✅ Frontend will be available at: **http://localhost:3001**

#### Option 2: Quick Start Script (One-liner)

Run both servers from the project root:
```bash
# Terminal 1
cd backend && npm run start:dev

# Terminal 2 (in new terminal tab)
cd frontend && npm run dev
```

#### Environment Setup (First Time Only)

Create `.env` files before running the servers:

**Backend setup:**
```bash
cd backend
cp .env.example .env
# Edit .env and update database credentials if needed
```

**Frontend setup:**
```bash
cd frontend
cp .env.example .env.local
# Adjust NEXT_PUBLIC_API_URL if using different ports
```

#### Testing the Setup

- Open **http://localhost:3001** in your browser
- Login page should be visible
- Try the OTP flow (use `123456` as test OTP in development)
- Backend API can be tested at **http://localhost:3000/api**

### Building for Production

```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

## 🌐 Deployment

### Frontend (Vercel)
- Set Root Directory to `frontend`
- Deploy with one click from GitHub

### Backend (Render)
- Set Root Directory to `backend`
- Ensure "Base Directory" is empty
- Use PostgreSQL addon or Supabase

### Database (Supabase/PostgreSQL)
- Create a PostgreSQL database
- Enable PostGIS extension
- Update `.env` with database credentials

## 🔐 Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/urbansaathi
JWT_SECRET=your_jwt_secret_key
PORT=3000
CORS_ORIGIN=http://localhost:3001,https://yourdomain.com
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
```

## 🎯 Key Pages

- `/` - Beautiful homepage with feature showcase
- `/login` - OTP-based authentication
- `/dashboard` - Main user dashboard with stats and job management
- `/post-job` - Create new job postings
- `/history` - View job history
- `/gallery` - Browse available services
- `/portfolio/[id]` - Professional portfolios

## 📱 Recent Improvements

✨ **Latest Update (v2.0)**
- Completely redesigned homepage with modern gradients and animations
- Rebuilt dashboard with improved layouts and real-time stats
- Enhanced backend with CORS and proper configuration
- Fixed React Three Fiber compatibility issues
- Added comprehensive error handling
- Improved responsive design for all screen sizes
- Professional UI components with smooth transitions
- Better state management and authentication flow

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.1.6
- **Styling**: Tailwind CSS v4.2
- **Animations**: Framer Motion
- **State**: Zustand
- **API Client**: Axios
- **Real-time**: Socket.io Client
- **3D Graphics**: Three.js, React Three Fiber
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React

### Backend
- **Framework**: NestJS
- **Database**: TypeORM, PostgreSQL
- **Validation**: Class Validator
- **Authentication**: JWT, Passport
- **Real-time**: Socket.io
- **Deployment**: Render, Vercel

## 📝 API Documentation

Main API endpoints (all prefixed with `/api`):

```
Auth:
  POST   /auth/send-otp        - Send OTP to phone
  POST   /auth/login-otp       - Verify OTP and login

Users:
  GET    /users/:id            - Get user profile
  PUT    /users/:id            - Update profile

Jobs:
  GET    /jobs                 - Get all jobs
  POST   /jobs                 - Create new job
  GET    /jobs/:id             - Get job details
  PUT    /jobs/:id             - Update job
  DELETE /jobs/:id             - Delete job

Skills:
  GET    /skills               - Get all skills
  POST   /skills               - Add skill
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is proprietary. Unauthorized copying or distribution is prohibited.

## 📞 Support

For issues and feature requests, please use the GitHub Issues tracker.

---

**UrbanSaathi** - Connecting local professionals with customers. Fast, reliable, and transparent.

*Built with ❤️ using Next.js, NestJS, and modern web technologies.*
*Last Updated: 2026-07-10*
