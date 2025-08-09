# Eventsy Landing Page

## Overview

Eventsy is a modern web application serving as a landing page for an AI-powered event management platform. The application is designed to showcase Eventsy's capabilities as an "AI Copilot for Event Organizers" that automates venue finding, sponsorship management, speaker operations, and event logistics. The landing page is built to convert visitors into beta users and demo requesters through compelling copy and streamlined signup flows.

The application features a single-page React frontend with multiple sections (hero, features, testimonials, etc.) and a minimal backend API for handling beta signups and demo requests. The design emphasizes a professional, tech-focused aesthetic with gradient elements and modern UI components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built using React with TypeScript, following a component-based architecture. Key architectural decisions include:

- **Component Organization**: Features are organized into logical sections (hero, features, built-for, integrations, testimonials, CTA, footer) with each having its own component file
- **State Management**: Uses React's built-in useState for local component state and TanStack Query for server state management
- **Routing**: Implements wouter for lightweight client-side routing (currently just home and 404 pages)
- **UI Components**: Leverages shadcn/ui component library built on Radix UI primitives for consistent, accessible components
- **Styling**: Uses Tailwind CSS with custom CSS variables for theming, supporting both light and dark modes
- **Form Handling**: Implements react-hook-form with Zod validation for type-safe form management

### Backend Architecture
The backend follows a lightweight Express.js REST API pattern:

- **Server Framework**: Express.js with TypeScript for type safety
- **Route Organization**: Centralized route registration with modular route handlers
- **Storage Layer**: Abstracted storage interface with in-memory implementation (easily swappable for database)
- **Data Validation**: Zod schemas shared between frontend and backend for consistent validation
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes

### Build System
The application uses Vite as the build tool with specific configurations:

- **Development**: Hot module replacement with middleware mode integration with Express
- **Production**: Static asset building with proper path resolution
- **TypeScript**: Strict type checking with path aliases for clean imports
- **Asset Handling**: Organized asset structure with alias support

### Database Schema Design
The database schema is defined using Drizzle ORM with PostgreSQL:

- **Users Table**: Basic user authentication structure (id, username, password)
- **Beta Signups Table**: Captures email and event type preferences with timestamps
- **Demo Requests Table**: Extended form data including name, company, event type, and messages
- **Schema Validation**: Drizzle-zod integration provides automatic validation schema generation

The schema supports the landing page's core conversion goals while remaining extensible for future features.

## External Dependencies

### Database and ORM
- **PostgreSQL**: Primary database using Neon serverless PostgreSQL
- **Drizzle ORM**: Type-safe database toolkit with schema migration support
- **Drizzle-kit**: Database migration and schema management tools

### UI and Styling
- **shadcn/ui**: Comprehensive component library built on Radix UI
- **Radix UI**: Accessible, unstyled component primitives
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Modern icon library for consistent iconography

### Form and Data Management
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: TypeScript-first schema validation library
- **TanStack Query**: Server state management and caching

### Development and Build Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Static type checking and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer support

### Authentication and Session Management
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### Utility Libraries
- **date-fns**: Date manipulation and formatting utilities
- **clsx**: Conditional CSS class composition
- **class-variance-authority**: Type-safe CSS class variant management

The architecture prioritizes developer experience, type safety, and conversion optimization while maintaining flexibility for future feature expansion.