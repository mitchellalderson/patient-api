# Patient API

A secure RESTful API for managing patient data and user authentication built with Express, TypeScript, and Prisma ORM.

## Features

- User authentication and authorization with role-based access control
- Patient data management with secure encryption for sensitive information
- RESTful API design following best practices
- PostgreSQL database integration via Prisma ORM
- Containerized with Docker for easy deployment

## Tech Stack

- **Runtime**: Node.js v22.16
- **Framework**: Express 5.1.0
- **Language**: TypeScript 5.8.3
- **ORM**: Prisma 6.8.2
- **Database**: PostgreSQL
- **Authentication**: Custom implementation with SHA-256 hashing

## Prerequisites

- Node.js (v22+)
- npm (v11+)
- PostgreSQL database
- Docker (optional, for containerized deployment)

## Getting Started

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/patient_db
```

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:gen

# Run database migrations
npm run db:migrate

# Build the application
npm run build
```

### Development

```bash
# Start development server with hot-reload
npm run dev
```

### Production

```bash
# Build and start production server
npm run build
npm start
```

## Docker Deployment

The application can be containerized and deployed using Docker:

```bash
# Build the Docker image
docker build -t patient-api .

# Run the container
docker run -p 3000:3000 --env-file .env patient-api
```

## API Endpoints

The API is accessible at `/api/` and includes the following endpoints:

- User authentication and management
- Patient data CRUD operations

Detailed API documentation is available upon server startup.

## Database Schema

The application uses the following main data models:

- **User**: Authentication and authorization with role-based access (Admin, Provider, Billing)
- **Patient**: Patient demographic and identification information with encryption for sensitive data

## Scripts

- `npm run build` - Compiles TypeScript to JavaScript
- `npm start` - Starts the production server
- `npm run dev` - Starts the development server with hot-reload
- `npm run lint` - Lints the source code
- `npm run db:gen` - Generates Prisma client
- `npm run db:migrate` - Runs database migrations

## License

Private - All rights reserved
