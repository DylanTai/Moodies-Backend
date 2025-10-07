# Moodies Backend

![Backend Terminal](https://media.discordapp.net/attachments/1192937757966868612/1423665604702765106/image.png?ex=68e1236a&is=68dfd1ea&hm=ed5908ceb05fdb5e9bd3d024e7766944c0e9b7463fa5b938a9fb670dd1a8396a&=&format=webp&quality=lossless&width=1604&height=625)

This is the backend API for **Moodies**, a full-stack MERN application that allows users to track their moods over time. The backend is built with **Node.js**, **Express**, and **MongoDB**, and provides secure JWT-based authentication, as well as CRUD operations for moods.

The backend serves as the API layer for the [Moodies Frontend Repository](https://github.com/daequansession/Moodies-Front-End).

---

## Features

- User authentication with JWT (sign up and sign in)
- Protected routes requiring authorization headers
- CRUD functionality for moods:
  - Create a new mood
  - Retrieve moods for the logged-in user
  - Retrieve a specific mood
  - Update a mood
  - Delete a mood
- MongoDB with Mongoose for data modeling
- Middleware for request logging and token verification

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (>= 18)
- [MongoDB](https://www.mongodb.com/) running locally or via MongoDB Atlas

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/DylanTai/Moodies-Backend
   cd moodies-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the backend directory with the following values:

   ```env
   MONGODB_URI=your-mongo-db-key
   JWT_SECRET=your-secret-key
   PORT=3000
   ```

4. **Start the development server**

   ```bash
   npm start
   ```

   The API will be available at `http://localhost:3000`.

---

## API Endpoints

### Authentication

- `POST /auth/sign-up` -> Register a new user
- `POST /auth/sign-in` -> Authenticate and return JWT

### Moods

(All endpoints require `Authorization: Bearer <token>` header)

- `GET /moods` -> Get all moods for the logged-in user
- `POST /moods` -> Create a new mood
- `GET /moods/:id` -> Get a specific mood by ID
- `PUT /moods/:id` -> Update a mood by ID
- `DELETE /moods/:id` -> Delete a mood by ID

---

## Technologies Used

- Node.js
- Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Morgan (logging)
- CORS middleware

---

## Attributions

This project uses:

- [Express](https://expressjs.com/) for routing and middleware
- [Mongoose](https://mongoosejs.com/) for MongoDB schema modeling
- [dotenv](https://github.com/motdotla/dotenv) for environment variables
- [Morgan](https://github.com/expressjs/morgan) for logging
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) for authentication

---

## Next Steps

- Expand user model (e.g., profile, password reset)
- Deploy to a production environment

---

## Related Repositories

- [Moodies Frontend Repository](https://github.com/daequansession/Moodies-Front-End)

---

## Contributors

- [Daequan Sessíon](https://github.com/daequansession)
- [Dylan Tai](https://github.com/DylanTai)
- [Sara Mattina](https://github.com/saramattina)
