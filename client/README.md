# Frontend

## 📚 Table of Contents
- [🖥️ Frontend](#-frontend)
    - [🏠 Landing page](#-landing-page)
    - [🔝 Navigation bar](#-navigation-bar)
    - [📦 Products Page](#-products-page)
    - [🔍 Product Detail](#-product-detail)
    - [🔐 Authentication Page](#-authentication-page)
    - [👤 User Profile](#-user-profile)
    - [🛒 Cart](#-cart)
    - [✅ Confirmation Order](#-confirmation-order)
    - [🏃‍♂️ Running the Frontend](#-running-the-frontend)

## 🖥️ Frontend

Frontend was built with React, TypeScript and Tailwind CSS

### 🏠 Landing page

The landing page contains these elements:

- Navigation bar with links to other pages and Authorization
- Description of the game store

### Image:
![](docs/images/landing.gif)

### 🔝 Navigation bar

- When clicking on the logo, the user is redirected to the landing page
- When clicking on the links, the user is redirected to the corresponding page
- When clicking on the login or register button, the user gets prompted with a modal window to login or register

### 📦 Products Page

- Route: "/products"
- Authentication is required to add to cart or favorites products

![](docs/images/products.gif)


### 🔍 Product Detail

- Route: "/products/:productID"
- The name and full description before it is shown, also here you can add a product to your cart too

![](docs/images/productDetail.gif)


### 🔐 Authentication Page

- Route: "/auth"
- Provides two variants of the form (login and registration)
- Users can change the form by clicking on a button below the header or manually by changing search parameters with `?variant=<"login" or "register">`.
- Performs validation with Zod schema.
- Password length must be more than 5 characters.
- Name must be at least 2 characters

![](docs/images/auth.gif)

### 👤 User Profile

- Route: "/me"
- Authentication Required.
- Allows users to change their name, email and avatar.
- Allows users to add to cart and favorites products

![](docs/images/userProfile.gif)

### 🛒 Cart

- Without route
- Authentication Required
- Allows users to add to cart products

![](docs/images/cart.gif)


### ✅ Confirmation Order

- Without route
- Authentication Required
- Allows users to confirm their order
- After confirmation, order changes status to "confirmed"

![](docs/images/confirmationOrder.gif)



## 🏃‍♂️ Running the Frontend
To run the frontend, first install the necessary dependencies:

```bash
npm install
```

Then, start the server:

```bash
npm start
```

The server will be running at [http://localhost:3000](http://localhost:3000).

## 🌍 Required Environment Variables

- `REACT_APP_API_URL`: The URL of the backend API. Defaults to `http://localhost:7777/api`.
- `REACT_APP_CLOUDINARY_URL`: The URL of the Cloudinary API. Defaults to `https://api.cloudinary.com/v1_1/<cloud_name>/image/upload`.
- `REACT_APP_CLOUDINARY_PRESET`: The upload preset for Cloudinary. Defaults to `ml_default`.
