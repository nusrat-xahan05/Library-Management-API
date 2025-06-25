# 📚 Library Management API

A RESTful Library Management API for managing books and borrowing records in a library system. Built with **Node.js**, **Express**, **TypeScript**, **MongoDB**, **Mongoose**, and **Zod** for robust validation and modular code architecture.

---

## 🚀 Features

- **Book Management**: Create, retrieve, update, and delete books.
- **Borrow Management**: Borrow books using bookId, with quantity and due date.
- **Filtering & Sorting**: Filter books by genre, sorting and limit option available.
- **Aggregation**: Aggregated summary of borrowed books using MongoDB aggregation pipeline
- **Validation**: Strong schema validation using (Zod and Mongoose).
- **Custom Error Response**: Custom formatted Middleware-based error handling and request validation using (Zod and Mongoose).
- **Mongoose Middleware & Methods**: Uses both Mongoose `instance methods` and `middleware (pre/post) for updating book availability`

---

## ✅ Technologies Used

- **Express.js**
- **TypeScript**
- **MongoDB + Mongoose**
- **Zod** (for strong schema validation)
- **Dotenv**
- **ts-node-dev**

---

## 📁 Folder Structure

```
src/
├── app.ts
├── server.ts
├── config/
│   └── index.ts
├── modules/
│   ├── book/
│   │   ├── book.controller.ts
│   │   ├── book.model.ts
│   │   ├── book.route.ts
│   │   ├── book.validation.ts
│   │   └── book.interface.ts
│   └── borrow/
│       ├── borrow.controller.ts
│       ├── borrow.model.ts
│       ├── borrow.route.ts
│       ├── borrow.validation.ts
│       └── borrow.interface.ts
├── routes/
│   └── index.ts
├── middlewares/
│   ├── errorHandler.middleware.ts
├── .env
├── .gitignore
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🛠️ Setup Instructions

### 📦 Prerequisites

- Node.js & npm installed
- MongoDB Atlas URI (or local MongoDB)

### 1. Clone the Repository

```bash
git clone https://github.com/nusrat-xahan05/Library-Management-API.git
cd Library-Management-API
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```
PORT = PORT Number
MONGO_URI = Database URL with Username & Password
```

### 4. Run the Project

```bash
# Start in dev mode
npm run dev

# Or build and start
npm run build
npm start
```

---

## 📮 API Endpoints

### 📘 Book

- `POST api/books` - Create a book
- `GET api/books` - Get all books (with filter, sort, limit)
- `GET api/books/:bookId` - Get a book by ID
- `PUT api/books/:bookId` - Update book
- `DELETE api/books/:bookId` - Delete book

### 📕 Borrow

- `POST api/borrow` - Borrow a book (checks book stocks)
- `GET api/borrow` - Get summary of borrowed books (aggregation)

---

## 🔄 Response Format

Success:
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": { ... }
}
```

Error:
```json
{
  "success": false,
  "message": "Book creation successfully",
  "error": { ... }
}
