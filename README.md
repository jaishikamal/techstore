# TechStore Admin Panel

This project consists of a backend API and an admin panel for managing the TechStore e-commerce platform.

## Project Structure

- `backend/`: Express.js backend API
- `admin/`: Next.js admin panel
- `frontend/`: React frontend (not part of this connection)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm run install:all
   ```
3. Create an admin user:
   ```
   npm run create-admin
   ```

## Running the Project

### Development Mode

Run both the backend and admin panel:
```
npm run dev
```

This will start:
- Backend API on http://localhost:5000
- Admin Panel on http://localhost:3001

### Running Separately

Run the backend only:
```
npm run backend
```

Run the admin panel only:
```
npm run admin
```

## Admin Panel Login

- Email: admin@example.com
- Password: admin123

## API Endpoints

### Authentication
- `POST /api/auth/login`: Login user
- `POST /api/auth/logout`: Logout user
- `GET /api/auth/me`: Get current user

### Users
- `GET /api/admin/users`: Get all users
- `GET /api/admin/users/:id`: Get user by ID
- `POST /api/admin/users`: Create user
- `PUT /api/admin/users/:id`: Update user
- `DELETE /api/admin/users/:id`: Delete user

### Dashboard
- `GET /api/admin/dashboard/stats`: Get dashboard statistics
- `GET /api/admin/dashboard/chart-data`: Get chart data

### Settings
- `GET /api/admin/settings`: Get settings
- `PUT /api/admin/settings`: Update settings #   t e c h s t o r e  
 #   t e c h s t o r e  
 