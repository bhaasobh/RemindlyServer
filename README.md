# Remindly Server

Remindly Server is a Node.js/Express backend for a reminder-driven application. It manages user accounts, time-based reminders, location-based reminders, personal items, and shopping lists. The project also exposes a WebSocket server for real-time notifications.

## Project Purpose

This backend supports a reminder app where users can:

- register and log in securely
- store their profile and address
- create reminders that trigger by time
- create reminders that trigger by location
- track personal items and shopping list entries
- receive push-style notifications through a WebSocket connection

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- WebSocket (ws) for real-time notifications
- dotenv for environment variables

## High-Level Architecture

The application follows a simple layered architecture:

1. Client requests reach the Express app in server.js
2. Route handlers in the routers folder delegate requests to controller logic
3. Controllers interact with MongoDB through Mongoose models
4. WebSocket setup runs on the same HTTP server to push notifications

This keeps the code relatively easy to follow and suitable for an early-stage backend service.

## Folder Structure

```text
RemindlyServer/
├── constants.js
├── db_connection.js
├── index.js
├── package.json
├── server.js
├── websocket.js
├── controllers/
│   ├── personalItemController.js
│   ├── reminderLocationController.js
│   ├── reminderTimeController.js
│   ├── ShoppingListController.js
│   └── userController.js
├── middlewares/
│   └── authMiddleware.js
├── models/
│   ├── addressModel.js
│   ├── personalItemsModels.js
│   ├── reminderLocationModel.js
│   ├── reminderTimeModel.js
│   └── usersModels.js
├── routers/
│   ├── personalItemsRoutes.js
│   ├── reminderLocaionRoutes.js
│   ├── reminderTimeRoutes.js
│   ├── ShoppingListRoutes.js
│   └── userRoutes.js
└── README.md
```

## Core Features

### 1. User Management
The user model stores:

- username
- password (stored as a bcrypt hash)
- address
- gender
- array of time reminders
- array of location reminders
- array of personal items
- shopping list references

This is defined in models/usersModels.js.

### 2. Time Reminders
Each time reminder contains:

- title
- optional address
- create time
- scheduled time
- active status
- optional details
- reminder type set to "Time"

### 3. Location Reminders
Each location reminder contains:

- title
- address object with latitude/longitude/name
- radius
- time
- active status
- details
- reminder type set to "Location"

### 4. Personal Items
Personal items are stored as records with:

- item name
- quantity
- duration/days
- optional address

### 5. Shopping List
The project also supports a shopping list model using the same item structure, but stores those items under a separate array called ShopingList (note the naming style).

### 6. Real-Time Notification Layer
The WebSocket server runs on top of the HTTP server and sends periodic notifications to all connected clients. It is intended to support live reminder updates or push-style messaging.

## Data Model Summary

### User
```js
{
  username: String,
  password: String,
  address: {
    name: String,
    lat: Number,
    lng: Number
  },
  gender: 'male' | 'female' | 'other',
  timeReminders: [ObjectId],
  locationReminders: [ObjectId],
  personalItems: [ObjectId],
  ShopingList: [ObjectId]
}
```

### Reminder Time
```js
{
  reminderType: 'Time',
  title: String,
  address: {
    name: String,
    lat: Number,
    lng: Number
  },
  createTime: Date,
  Time: Date,
  active: Boolean,
  Details: String
}
```

### Reminder Location
```js
{
  reminderType: 'Location',
  title: String,
  address: {
    name: String,
    lat: Number,
    lng: Number
  },
  radius: Number,
  time: Date,
  active: Boolean,
  details: String
}
```

### Personal Item
```js
{
  address: {
    name: String,
    lat: Number,
    lng: Number
  },
  itemName: String,
  qty: Number,
  days: Number
}
```

## API Overview

The project exposes REST APIs under the following base routes:

### Authentication and User APIs

- GET /auth
  - Generates a JWT token for testing/demo use

- POST /api/users/register
  - Register a new user

- POST /api/users/login
  - Login with username and password

- GET /api/users/:id
  - Returns a user and their populated reminder/item data

- GET /api/users/:userId/reminders
  - Returns all time and location reminders for a user

- GET /api/users/:userId/personal-items
  - Returns all personal items for a user

- POST /api/users/:userId/time-reminders
  - Creates and attaches a time reminder to a user

- POST /api/users/:userId/location-reminders
  - Creates and attaches a location reminder to a user

- POST /api/users/:userId/personal-items
  - Creates and attaches a personal item to a user

- DELETE /api/users/:userId
  - Deletes the user and all related reminders/items

### Time Reminder APIs

- GET /api/time-reminders/:id
- PUT /api/time-reminders/:id
- DELETE /api/time-reminders/:id

### Location Reminder APIs

- GET /api/location-reminders/:id
- PUT /api/location-reminders/:id
- DELETE /api/location-reminders/:id

### Personal Item APIs

- GET /api/personal-items/:id
- PUT /api/personal-items/:id
- DELETE /api/personal-items/:id

### Shopping List APIs

- GET /api/shopping-list/alllist/:userId
- GET /api/shopping-list/:userId/:id
- POST /api/shopping-list/:userId
- PUT /api/shopping-list/:itemId
- DELETE /api/shopping-list/:userId/:itemId

## Authentication Flow

The server uses JWT tokens for authenticated access. In the login flow:

1. user submits username and password
2. server finds the user by username
3. password is verified using bcrypt.compare
4. JWT is created with the user id and a secret key
5. the client receives the user record and can continue with protected requests

The secret key is read from the environment variable SECRET_KEY.

## Environment Variables

Create a .env file in the project root with values similar to:

```env
PORT=8080
SECRET_KEY=your_jwt_secret
DB_HOST=mongodb://localhost:27017/remindly
DB_USER=your_db_user
DB_PASSWORD=your_db_password
```

The constants.js file reads these values and provides them to the MongoDB connection layer.

## Setup Instructions

1. Install dependencies

```bash
npm install
```

2. Configure environment variables in a .env file

3. Start the server

```bash
node index.js
```

4. The app runs on the port defined by PORT or defaults to 8080.

## Runtime Behavior

When the app starts:

- dotenv loads environment values
- server.js initializes Express
- database connection is created via db_connection.js
- WebSocket server is attached to the same HTTP server
- the backend starts listening on the configured port

## Observations for Reviewers

This project is a functional prototype for a reminder platform. It demonstrates:

- Express REST API design
- MongoDB document modeling with Mongoose
- relationship tracking between users and reminder records
- JWT-based auth and bcrypt password hashing
- real-time notification capability over WebSockets

At the same time, the codebase shows some early-stage implementation details and naming inconsistencies, including:

- occasional duplicate controller functions
- inconsistent naming such as ShopingList and reminderLocaionRoutes
- a minimal notification service that broadcasts periodic messages rather than event-driven reminder logic
- no automated test suite in the current project

These are common in an initial backend prototype and indicate the app is still evolving toward a more production-ready structure.

## Business Value

This server provides the backend foundation for a reminder application that can help users:

- remember tasks at scheduled times
- get alerts near a specific place
- manage household or daily essentials
- maintain personal shopping lists
- deliver real-time notifications to frontend clients

## Summary

Remindly Server is a lightweight reminder and shopping backend built with Express and MongoDB. It centralizes user, reminder, and item management while also supporting real-time communication through WebSockets. It is a solid foundation for a mobile or web reminder product and demonstrates practical backend patterns relevant to interview discussions.
