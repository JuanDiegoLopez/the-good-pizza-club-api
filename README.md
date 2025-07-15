# The Good Pizza Club API

A comprehensive NestJS-based REST API for a pizza ordering and delivery system. This application provides complete functionality for managing a pizza restaurant's operations including user authentication, product catalog, promotional offers, customization options, and secure payment processing.

## 🍕 Overview

The Good Pizza Club API is designed to power a modern pizza delivery application with features for both customers and administrators. The system supports user registration, menu browsing, order customization, promotional campaigns, and secure payment processing with session-based authentication.

## ✨ Features

### 🔐 Authentication & Authorization
- **Secure Registration**: Email-based registration with encrypted password storage using scrypt hashing
- **Session-based Authentication**: Persistent login sessions using express-session
- **Role-based Access Control**: User and Admin roles with proper authorization guards
- **Password Security**: Salt-based password hashing to prevent rainbow table attacks

### 🍕 Product Management
- **Pizza Menu**: Complete CRUD operations for pizza products
- **Rich Product Information**: Name, description, pricing, images, nutritional data
- **Visual Customization**: Color themes and high-quality product images
- **Admin Controls**: Product management restricted to administrators

### 🎯 Promotional System
- **Special Offers**: Create and manage promotional campaigns
- **Discount Management**: Percentage-based discounts on products
- **Product-Size Combinations**: Promotions tied to specific products and sizes
- **Visual Marketing**: Promotional banners and images

### 🛠️ Pizza Customization
- **Size Options**: Small, medium, large, and custom sizes
- **Toppings & Add-ons**: Comprehensive topping selection
- **Sauce Varieties**: Multiple sauce options
- **Pricing Flexibility**: Individual pricing for each customization option

### 👤 User Profile Management
- **Address Management**: Multiple delivery addresses with GPS coordinates
- **Payment Methods**: Secure credit/debit card storage with automatic masking
- **Personal Information**: User profiles with contact details
- **Default Settings**: Default address and payment method selection

### 💳 Secure Payment Processing
- **Card Validation**: Support for major card companies (Visa, Mastercard, AMEX, Discover, Diners)
- **Data Security**: Automatic card number and CVV masking
- **Multiple Payment Methods**: Users can store multiple payment methods
- **Card Company Detection**: Automatic detection of card brand from BIN ranges

## 🛠️ Technology Stack

- **Framework**: [NestJS](https://nestjs.com/) - Progressive Node.js framework
- **Database**: [SQLite](https://sqlite.org/) with [TypeORM](https://typeorm.io/)
- **Authentication**: Session-based with express-session
- **Validation**: class-validator and class-transformer
- **Security**: bcrypt-style password hashing with scrypt
- **API Documentation**: RESTful endpoints with comprehensive JSDoc documentation

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd the-good-pizza-club-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create environment files for different stages:
   
   **development.env**
   ```env
   DB_NAME=pizza_club_dev.db
   COOKIE_SECRET=your-secret-key-for-sessions
   PORT=3000
   ```

   **production.env**
   ```env
   DB_NAME=pizza_club_prod.db
   COOKIE_SECRET=your-production-secret-key
   PORT=3000
   ```

4. **Database Setup**
   
   The application uses TypeORM with automatic synchronization enabled for development:
   ```bash
   # Database will be created automatically on first run
   npm run start:dev
   ```

5. **Seed Database (Optional)**
   ```bash
   npm run db:seed
   ```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
npm run build
npm run start:prod
```

### Debug Mode
```bash
npm run start:debug
```

The API will be available at `http://localhost:3000/api`

## 📚 API Documentation

### Base URL
All API endpoints are prefixed with `/api`

### Authentication Endpoints

#### POST /api/auth/register
Register a new user account
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe",
  "phone": "+1234567890",
  "role": "user" // optional, defaults to "user"
}
```

#### POST /api/auth/login
Authenticate user credentials
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

#### POST /api/auth/logout
End user session

#### GET /api/auth/whoami
Get current user information (requires authentication)

### Product Endpoints

#### GET /api/products
Retrieve all products (requires authentication)

#### GET /api/products/:id
Get specific product by ID (requires authentication)

#### POST /api/products
Create new product (requires admin role)
```json
{
  "name": "Margherita Pizza",
  "description": "Fresh tomatoes, mozzarella, and basil",
  "price": 12.99,
  "image": "margherita.jpg",
  "color": "#ff6b6b",
  "weight": 350,
  "calories": 280
}
```

#### PATCH /api/products/:id
Update existing product (requires admin role)

#### DELETE /api/products/:id
Remove product (requires admin role)

### Promotion Endpoints

#### GET /api/promotions
Get all promotions (requires authentication)

#### GET /api/promotions/:id
Get specific promotion (requires authentication)

#### POST /api/promotions
Create promotion (requires admin role)
```json
{
  "name": "Large Pizza Special",
  "description": "20% off all large pizzas",
  "image": "large-special.jpg",
  "discount": 0.20,
  "productId": 1,
  "sizeId": 3
}
```

#### PATCH /api/promotions/:id
Update promotion (requires admin role)

#### DELETE /api/promotions/:id
Remove promotion (requires admin role)

### Customization Records Endpoints

#### GET /api/records
Get all customization options (requires admin role)

#### GET /api/records/:id
Get specific record (requires admin role)

#### POST /api/records
Create customization option (requires admin role)
```json
{
  "name": "Large",
  "type": "size",
  "price": 3.00
}
```

#### PATCH /api/records/:id
Update record (requires admin role)

#### DELETE /api/records/:id
Remove record (requires admin role)

### User Profile Endpoints

#### Address Management

##### GET /api/users/address
Get user's addresses (requires authentication)

##### POST /api/users/address
Add new address (requires authentication)
```json
{
  "name": "Home",
  "description": "123 Main St, Apt 4B, Springfield, IL 62701",
  "lat": 39.7817,
  "lng": -89.6501
}
```

##### DELETE /api/users/address/:id
Remove address (requires authentication)

#### Payment Method Management

##### GET /api/users/payment
Get user's payment methods (requires authentication)

##### POST /api/users/payment
Add payment method (requires authentication)
```json
{
  "type": "credit",
  "number": "4111111111111111",
  "name": "John Doe",
  "expiration": "12/25",
  "securityCode": "123"
}
```

##### DELETE /api/users/payment/:id
Remove payment method (requires authentication)

## 🗄️ Database Schema

### Entities Overview

#### User Entity
- **id**: Primary key
- **email**: Unique login identifier
- **name**: Full name
- **phone**: Contact number
- **role**: User role (user/admin)
- **password**: Encrypted password
- **addresses**: Related addresses
- **payments**: Related payment methods

#### Product Entity
- **id**: Primary key
- **name**: Product name
- **description**: Detailed description
- **price**: Base price
- **image**: Image file path
- **color**: UI color theme
- **weight**: Weight in grams
- **calories**: Caloric content
- **promotions**: Related promotions

#### Record Entity (Customization Options)
- **id**: Primary key
- **name**: Option name
- **type**: Category (size, topping, sauce, etc.)
- **price**: Additional price
- **promotions**: Related promotions

#### Promotion Entity
- **id**: Primary key
- **name**: Promotion name
- **description**: Promotion details
- **image**: Promotional image
- **discount**: Discount percentage (0-1)
- **product**: Associated product
- **size**: Associated size/record

#### Address Entity
- **id**: Primary key
- **name**: Address nickname
- **description**: Full address
- **lat**: Latitude coordinate
- **lng**: Longitude coordinate
- **isDefault**: Default address flag
- **user**: Associated user

#### Payment Entity
- **id**: Primary key
- **type**: Card type (credit/debit)
- **number**: Masked card number
- **name**: Cardholder name
- **expiration**: Expiration date
- **securityCode**: Masked security code
- **company**: Auto-detected card company
- **user**: Associated user

## 🔒 Security Features

### Password Security
- **Scrypt Hashing**: Industry-standard password hashing
- **Salt Generation**: Random salt for each password
- **Format**: Stored as "salt.hash" for verification

### Data Protection
- **Card Masking**: Automatic masking of sensitive card data
- **Serialization**: Automatic exclusion of sensitive fields
- **Session Security**: Secure session management

### Access Control
- **Authentication Guards**: Protect all user endpoints
- **Authorization Guards**: Admin-only endpoint protection
- **Session Validation**: Persistent login state management

## 🧪 Testing

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

## 🔧 Development Scripts

```bash
# Development with hot reload
npm run start:dev

# Build for production
npm run build

# Format code
npm run format

# Lint code
npm run lint

# Database seeding
npm run db:seed
```

## 📁 Project Structure

```
src/
├── api/                    # API controllers organized by feature
│   ├── auth/              # Authentication endpoints
│   ├── products/          # Product management
│   ├── promotions/        # Promotional offers
│   ├── records/           # Customization options
│   └── users/             # User profile management
├── constants/             # Global constants and enums
├── dtos/                  # Data Transfer Objects for validation
├── entities/              # TypeORM entity definitions
├── guards/                # Authentication and authorization guards
├── services/              # Business logic services
├── utils/                 # Utility functions
├── app.module.ts          # Main application module
└── main.ts               # Application bootstrap
```

## 🚀 Deployment

### Production Considerations

1. **Environment Variables**: Ensure secure cookie secrets and proper database configuration
2. **Database Synchronization**: Disable TypeORM sync in production
3. **HTTPS**: Use HTTPS in production for secure session handling
4. **Session Storage**: Consider Redis for session storage in production
5. **File Uploads**: Configure proper file storage for product images

### Docker Deployment (Optional)

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the UNLICENSED License - see the LICENSE file for details.

## 👥 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Review the comprehensive JSDoc documentation in the codebase

## 🔄 API Status Codes

| Code | Description |
|------|-------------|
| 200  | Success |
| 201  | Created |
| 400  | Bad Request (validation error) |
| 401  | Unauthorized (authentication required) |
| 403  | Forbidden (insufficient permissions) |
| 404  | Not Found |
| 500  | Internal Server Error |

---

Built with ❤️ using [NestJS](https://nestjs.com/) framework
