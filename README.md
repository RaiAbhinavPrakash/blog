# Blog App

A simple blog application built using **Node.js**, **Express**, **MongoDB**, and **EJS**. This application allows users to create, read, update, and delete blog posts.

## Features
- Create, edit, and delete blog posts.
- View a list of all blog posts.
- View individual blog post details.
- EJS templating for server-side rendering.
- MongoDB for storing blog data.
- RESTful API structure.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript)
- **Database**: MongoDB (Mongoose for data modeling)

## Prerequisites

Before running the app, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/atlas/database)

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/RaiAbhinavPrakash/blog.git

2. Navigate to the project directory:

   ```bash
   cd blog
   
3. Install the dependencies:

   ```bash
   npm install

4. Set up environment variables:
- Create a .env file in the root of your project.
- Add the following environment variables:

  ```bash
  MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/blogDB?retryWrites=true&w=majority

5. Start the MongoDB server (if running locally) or ensure MongoDB Atlas is set up.
6. Run the application:

   ``` bash
   npm start

  or, for development mode (with automatic reload using nodemon):

      npm run dev

 7. Open your browser and go to:

      ``` bash
      http://localhost:8000

## Usage
- To create a new blog post, navigate to the "Add New" section.
- View all blog posts on the homepage.
- Click on a Read blog to view the post in detail.

## Folder Structure
    .
    ── app.js  # Main server logic (Express + MongoDB)
    ├── middleware/
    │   ├── authenticationCheck.ejs  # Authenticates the user
    ├── models/
    │   ├── blogSchema.ejs  # Schema of blog
    │   └── userSchema.ejs   # Schema of user
    ├── views/
    │   ├── home.ejs  # Home page listing all blogs
    │   ├── blog.ejs   # Individual blog post page
    │   ├── addBlog.ejs   # To add the blog
    │   ├── signin.ejs   # To signin current user
    │   └── signup.ejs   # Create new user
    ├── public/
    │   └── images/       # User profile picture
    │   └── uploads/       # Blog image
    ├── routes/
    │   ├── blogRoutes.ejs  # All the blog routes -> post blog, get blog
    │   └── userRoutes.ejs   # All the user routes -> signin, signup, logout
    ├── .env           # Environment variables
    ├── package.json   # Project dependencies and scripts
    └── README.md      # Project documentation
