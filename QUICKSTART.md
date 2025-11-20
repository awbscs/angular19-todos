# Quick Start Guide

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Mock API Server**
   ```bash
   npm run server
   ```
   This will start json-server on `http://localhost:3000`

3. **Start the Angular Application** (in a new terminal)
   ```bash
   npm start
   ```
   This will start the Angular dev server on `http://localhost:4200`

   **OR** run both concurrently:
   ```bash
   npm run dev
   ```

## Login Credentials

Use these credentials to log in:
- **Username:** `john_doe` | **Password:** `password123`
- **Username:** `jane_smith` | **Password:** `password123`

## Features to Test

1. **Authentication**
   - Login with the credentials above
   - JWT token is stored in localStorage
   - Protected routes require authentication

2. **Todo Management**
   - View todos in two columns (Todo/Completed)
   - Create new todos
   - Edit existing todos
   - Delete todos
   - View todo details

3. **Drag and Drop**
   - Drag todos between columns to change status
   - Status updates automatically

4. **State Management**
   - All state is managed through NgRx
   - Check Redux DevTools for state changes

## Running Tests

```bash
npm test
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/angular19-todos` directory.

