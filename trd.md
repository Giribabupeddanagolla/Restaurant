# Technical Requirements Document (TRD)

# Giri Restaurant Management System (GRMS)

**Version:** 1.0

## Technology Stack

### Frontend

-   Next.js 15
-   React 19
-   TypeScript
-   Tailwind CSS
-   Redux Toolkit
-   Axios
-   React Hook Form
-   Zod

### Backend

-   Node.js
-   Express.js
-   JWT
-   bcrypt
-   Multer
-   Cloudinary
-   Socket.io

### Database

-   MongoDB Atlas
-   Mongoose

## Architecture

Customer → Next.js Frontend → REST API → Node.js/Express → MongoDB Atlas

## Frontend Structure

``` text
app/
components/
features/
hooks/
services/
store/
types/
public/
middleware.ts
```

## Backend Structure

``` text
controllers/
models/
routes/
middlewares/
services/
config/
utils/
validators/
uploads/
socket/
server.js
```

## Modules

-   Authentication
-   Dashboard
-   Menu Management
-   Orders
-   Reservations
-   Tables
-   Kitchen Display System
-   Billing & POS
-   Inventory
-   Employees
-   Customers
-   Reports
-   Settings

## REST APIs

-   POST /api/auth/login
-   POST /api/auth/register
-   GET /api/menu
-   POST /api/menu
-   GET /api/orders
-   POST /api/orders
-   GET /api/reservations
-   POST /api/reservations
-   GET /api/inventory
-   POST /api/payments

## MongoDB Collections

-   users
-   roles
-   categories
-   foods
-   orders
-   orderItems
-   tables
-   reservations
-   customers
-   inventory
-   suppliers
-   employees
-   attendance
-   payments
-   reviews
-   notifications
-   settings

## Security

-   JWT Authentication
-   Role-Based Access Control
-   HTTPS
-   Helmet
-   CORS
-   Rate Limiting
-   Input Validation
-   Password Hashing (bcrypt)

## Deployment

-   Frontend: Vercel
-   Backend: Render/Railway
-   Database: MongoDB Atlas
-   Images: Cloudinary

## Environment Variables

### Frontend (.env.local)

``` env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=Giri Restaurant
```

### Backend (.env)

``` env
PORT=5000
MONGO_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Future Enhancements

-   QR Menu
-   Mobile App
-   Multi-Branch
-   AI Recommendations
-   WhatsApp Ordering
-   Loyalty Program
