# Angular 19 Todos Application

A comprehensive Todos application built with Angular 19, featuring user authentication, task management, drag-and-drop functionality, and state management using NgRx.

## Features

- **User Authentication**: Login with JWT token management
- **Todo Management**: Create, read, update, and delete todos
- **Drag and Drop**: Change todo status by dragging between columns
- **State Management**: NgRx for predictable state management
- **Responsive Design**: Mobile-friendly UI with Angular Material
- **Animations**: Smooth transitions and animations
- **Route Guards**: Protected routes requiring authentication
- **Lazy Loading**: Optimized performance with lazy-loaded modules

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

1. Start the mock API server (json-server):
```bash
npm run server
```

2. In a separate terminal, start the Angular development server:
```bash
npm start
```

Or run both concurrently:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:4200`

## Mock API

The application uses json-server to mock the backend API. The API runs on `http://localhost:3000`.

### Test Credentials

- Username: `john_doe`, Password: `password123`
- Username: `jane_smith`, Password: `password123`

### API Endpoints

- `POST /auth/login` - User login
- `GET /todos/user/:userId` - Get todos for a user
- `GET /todos/:id` - Get a single todo
- `POST /todos` - Create a new todo
- `PATCH /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

## Project Structure

```
src/
├── app/
│   ├── auth/              # Authentication module
│   │   ├── components/     # Login component
│   │   ├── services/       # Auth service
│   │   └── store/          # NgRx store for auth
│   ├── todos/              # Todos module
│   │   ├── components/     # Todo components
│   │   ├── services/       # Todo service
│   │   └── store/          # NgRx store for todos
│   ├── core/               # Core module
│   │   ├── guards/         # Route guards
│   │   ├── interceptors/   # HTTP interceptors
│   │   ├── models/         # Shared models
│   │   └── store/          # Root store configuration
│   └── animations.ts       # Animation definitions
├── assets/                 # Static assets
└── styles.scss            # Global styles
```

## Technologies Used

- **Angular 19**: Latest Angular framework
- **Angular Material**: UI component library
- **Angular CDK**: Drag and drop functionality
- **NgRx**: State management
- **RxJS**: Reactive programming
- **json-server**: Mock REST API
- **TypeScript**: Type-safe JavaScript

## Development

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
```

## Key Features Implementation

### Authentication
- JWT token stored in localStorage
- Route guards protect authenticated routes
- HTTP interceptor adds token to requests

### State Management
- NgRx store with actions, reducers, effects, and selectors
- Separate state slices for auth and todos
- Side effects handled through NgRx effects

### Drag and Drop
- Angular CDK drag-drop module
- Two-column layout (Todo/Completed)
- Status updates on drop

### Responsive Design
- Mobile-first approach
- Angular Material responsive components
- Flexible grid layout

## License

This project is for educational purposes.

