# Overview

This is a full-stack notes management application with a React frontend and Express.js backend. The application allows users to create, view, and manage notes with importance flags. The frontend is built with React and Vite for development tooling, while the backend provides a REST API for note operations. The project demonstrates a typical client-server architecture with API communication between frontend and backend components.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 19 with Vite as the build tool and development server
- **Styling**: CSS modules with custom styling for notes, errors, and layout
- **HTTP Client**: Axios for API communication with the backend
- **Development Setup**: ESLint for code quality with React-specific rules and hot module replacement for fast development

## Backend Architecture
- **Framework**: Express.js with Node.js
- **Data Storage**: In-memory array storage (temporary/development solution)
- **API Design**: RESTful endpoints for CRUD operations on notes
- **Middleware**: CORS enabled for cross-origin requests, JSON body parsing
- **Endpoints**: 
  - GET / (health check)
  - GET /api/notes (fetch all notes)
  - GET /api/notes/:id (fetch single note)
  - DELETE /api/notes/:id (delete note)

## Data Structure
Notes contain three properties:
- `id`: Unique identifier (string)
- `content`: Note text content
- `important`: Boolean flag for note priority

## Development Setup
- **Proxy Configuration**: Vite development server proxies `/api` requests to backend running on port 3001
- **Alternative Backend**: JSON Server configured as alternative backend for development testing
- **Hot Reload**: Backend uses Node.js watch mode for development

# External Dependencies

## Frontend Dependencies
- **React**: UI framework (v19.1.0)
- **React DOM**: React rendering library
- **Axios**: HTTP client for API requests
- **Vite**: Build tool and development server
- **ESLint**: Code linting with React-specific plugins

## Backend Dependencies
- **Express**: Web framework (v5.1.0)
- **CORS**: Cross-origin resource sharing middleware

## Development Tools
- **JSON Server**: Alternative mock backend for testing (v1.0.0-beta.3)
- **Vite Dev Server**: Development environment with proxy configuration
- **Node.js Watch Mode**: Auto-restart backend during development

## Integration Points
- Frontend communicates with backend via `/api/notes` endpoints
- Vite proxy redirects API calls from frontend (port 5000) to backend (port 3001)
- CORS middleware enables cross-origin requests between frontend and backend