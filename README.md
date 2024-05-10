**README.md**

# E-Commerce MERN Project with Razorpay Integration, React Redux, Redux Persist, and S3 Bucket Integration

## Description

This project is an E-Commerce platform built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It offers a comprehensive solution for online shopping, including user authentication, product browsing, cart management, order processing, and an admin panel for managing products, categories, and orders. Additionally, it integrates Razorpay for secure and seamless payment processing, utilizes React Redux for efficient state management with persistence via Redux Persist, and utilizes an S3 bucket for file storage.

## Installation

1. Clone the repository:
git clone <repository_url>

2. Navigate to the project directory:
cd <project_directory>


3. Install dependencies for the client:
cd client
npm install


4. Return to the project root directory:
cd ..


5. Install dependencies for the server:
npm install



6. Set up environment variables:
- Create a `.env` file in the root directory.
- Use the provided `.env.sample` file as a reference to define the required environment variables. (e.g., MongoDB URI, Razorpay API key, S3 bucket credentials, etc.)

## Usage

1. Start the server by using concurrent:
npm run dev


2. Open your web browser and go to `http://localhost:5000` to access the E-Commerce platform.

## User Features

- **Browse Products**: Users can explore a wide range of products.
- **Search Products**: Users can search for specific products using a search box.
- **Filter Products by Category**: Users can browse products based on categories available in the menu bar.
- **Add Products to Cart**: Users can add desired items to their shopping cart.
- **Manage Cart**: Users can view, update, and remove items from their cart.
- **Place Orders**: Users can place orders securely using Razorpay.


## Admin Features

- **Admin Portal**: Accessible at `http://localhost:5000/admin/login`.
- **Admin Authentication**: Admins can log in securely.
- **CRUD Operations on Products**: Admins can add, edit, and delete products.
- **CRUD Operations on Categories**: Admins can manage product categories.
- **View Order List**: Admins can see the list of orders placed by users and manage them.

## Technologies Used

- **MongoDB**: NoSQL database for storing application data.
- **Express.js**: Backend framework for building RESTful APIs.
- **React.js**: Frontend library for building user interfaces.
- **Node.js**: JavaScript runtime environment for server-side code execution.
- **Razorpay**: Payment gateway integration
