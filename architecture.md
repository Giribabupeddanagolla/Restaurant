# Giri Restaurant Management System - Architecture Document

## System Architecture

``` text
                +----------------------+
                |      Customers       |
                +----------+-----------+
                           |
                     HTTPS / REST
                           |
          +----------------v----------------+
          |       Next.js Frontend          |
          | React + TypeScript + Tailwind   |
          +----------------+----------------+
                           |
                     Axios / Fetch API
                           |
          +----------------v----------------+
          |     Node.js + Express API       |
          +----------------+----------------+
                           |
        +------------------+------------------+
        |                                     |
+-------v--------+                  +---------v---------+
| JWT/Auth       |                  | Socket.io Server  |
| Middleware     |                  | Real-time Events  |
+-------+--------+                  +---------+---------+
        |                                     |
        +------------------+------------------+
                           |
                   Mongoose ODM
                           |
                +----------v----------+
                |   MongoDB Atlas     |
                +----------+----------+
                           |
        +------------------+------------------+
        |                                     |
+-------v--------+                  +---------v---------+
| Cloudinary     |                  | Razorpay / Email  |
| Image Storage  |                  | Notifications     |
+----------------+                  +-------------------+
```

## Frontend Layers

-   Presentation Layer (UI Components)
-   State Management (Redux Toolkit / Context API)
-   API Layer (Axios)
-   Routing (Next.js App Router)
-   Authentication (JWT)

## Backend Layers

-   Routes
-   Middleware
-   Controllers
-   Services
-   Models
-   Database

## Database Collections

-   users
-   roles
-   categories
-   foods
-   orders
-   orderItems
-   reservations
-   tables
-   inventory
-   suppliers
-   employees
-   attendance
-   customers
-   payments
-   notifications
-   reviews
-   settings

## Request Flow

``` text
Browser
   ↓
Next.js
   ↓
Axios
   ↓
Express Route
   ↓
Middleware
   ↓
Controller
   ↓
Service
   ↓
Model
   ↓
MongoDB
   ↑
JSON Response
```

## Deployment

-   Frontend → Vercel
-   Backend → Render / Railway
-   Database → MongoDB Atlas
-   Storage → Cloudinary

## Security

-   HTTPS
-   JWT Authentication
-   Role-Based Access
-   bcrypt Password Hashing
-   Helmet
-   CORS
-   Rate Limiting
-   Input Validation
