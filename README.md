# Book Catalogue API

# Base URL - https://book-backend-five.vercel.app/api/v1

This is a RESTful API for managing a book catalogue. It allows you to manage users, categories, books, and orders related to books.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Endpoints](#endpoints)
  - [User](#user)
  - [Category](#category)
  - [Book](#book)
  - [OrderBook](#order)
  - [Order]
- [Usage](#usage)
- [Authentication](#authentication)

## Technologies Used

    Backend: Node.js, Express.js, TypeScript
    Database: PostgreSQL, Prisma ORM
    Deployment: Vercel and Supabase
    Authentication: JWT
    Packages Used: bcrypt, http-errors, http-status-codes, zod

## Features

- Create, read, update, and delete users.
- Manage book categories.
- Add, edit, and delete books in the catalogue.
- Place book orders and track them.

## Endpoints

### User

- **GET https://book-backend-five.vercel.app/api/v1/users**: Get a list of all users.
- **GET https://book-backend-five.vercel.app/api/v1/users/5ba8233c-78dd-44be-a4d9-e729c58e2543**: Get a specific user by ID.
- **POST https://book-backend-five.vercel.app/api/v1/auth/signup**: Create a new user or sign up.
- **POST https://book-backend-five.vercel.app/api/v1/auth/signin**: Sign In user
- **PATCH https://book-backend-five.vercel.app/api/v1/users/a214a633-f669-4d41-b3ad-264a0ab3cac7**: Update an existing user.
- **DELETE https://book-backend-five.vercel.app/api/v1/users/676d5f73-6261-4311-9dc5-487de836c981**: Delete a user.
- **GET https://book-backend-five.vercel.app/api/v1/user/profile**: Get user Profile

### Category

- **GET https://book-backend-five.vercel.app/api/v1/categories/**: Get a list of all book categories.
- **GET https://book-backend-five.vercel.app/api/v1/categories/3dea604c-0bd7-43aa-8849-5a5eed08d95e**: Get a specific category by ID.
- **POST https://book-backend-five.vercel.app/api/v1/categories/create-category**: Create a new category.
- **PATCH http://localhost:5000/api/v1/categories/0ccd1759-54df-4d1b-947c-3f67bc3b7a7e**: Update an existing category.
- **DELETE https://book-backend-five.vercel.app/api/v1/categories/d1040af2-3ded-4644-9b75-b351f833063e**: Delete a category.

### Book

- **GET https://book-backend-five.vercel.app/api/v1/books**: Get a list of all books in the catalogue.
- **GET https://book-backend-five.vercel.app/api/v1/books/c749e97c-f8ec-40ae-95d5-fbccbee28741**: Get a specific book by ID.
- **GET https://book-backend-five.vercel.app/api/v1/books/8e64ce77-269d-48ff-99a1-8b6bbda7aa51/category**: Get a specific book by category id.
- **POST https://book-backend-five.vercel.app/api/v1/books/create-book**: Add a new book to the catalogue.
- **PATCH https://book-backend-five.vercel.app/api/v1/books/c749e97c-f8ec-40ae-95d5-fbccbee28741**: Update an existing book.
- **DELETE https://book-backend-five.vercel.app/api/v1/books/c749e97c-f8ec-40ae-95d5-fbccbee28741**: Delete a book.

### Order Book

- **GET https://book-backend-five.vercel.app/api/v1/orderBook**: Get a list of all book orders.
- **GET https://book-backend-five.vercel.app/api/v1/orderBook/57cc1079-a8a7-4877-91fc-dce6f4f708da**: Get a specific order by ID.
- **POST https://book-backend-five.vercel.app/api/v1/orderBook/create-orderedBook**: Place a new order for books.

### Order 

- **GET https://book-backend-five.vercel.app/api/v1/orders**: Get a list of all book orders.
- **GET https://book-backend-five.vercel.app/api/v1/orders/534cd807-6b7f-41b7-a873-3ff8f892995e**: Get a specific order by Order ID.
- **POST https://book-backend-five.vercel.app/api/v1/orders/create-order**: Place a new order for books.


