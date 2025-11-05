# Overview

This is a full-stack web application featuring a personal portfolio website with an integrated SQL translator tool. The application showcases a developer's professional profile while providing a practical AI-powered feature that converts natural language queries into SQL statements. Built with modern web technologies, it serves as both a professional showcase and a functional tool for database query assistance.

## Recent Changes (November 2025)
- **Email Update**: Updated contact email from tbustard@unb.ca to tyler@tylerbustard.net across all pages
- **73 Strings Employment**: Updated Key Achievements and Core Competencies for current role at 73 Strings
  - Key Achievements: NAV monitoring, reconciliation workflows, and operations coordination
  - Core Competencies: Monitoring Controls, Reconciliation, NAV Validation, SQL, Excel
- **Fiscal.ai Experience**: Added Equity Analyst position (2023-Nov 2025) under 73 Strings on both main and resume pages
  - Key Achievements: Analyzed financial statements (13% turnaround reduction), collaborated on AI-driven features (12% adoption boost)
  - Core Competencies: Financial Analysis, AI Integration, Data Analytics, Python, SQL
- **Finance Certifications**: McGill University logo included in finance certifications section
- **PDF Download**: Implemented dynamic PDF generation using html2canvas + jsPDF that captures the resume content and creates a single continuous-page PDF with exact dimensions (8.5" width × content height) and custom filename "Tyler Bustard - Resume.pdf" - eliminates trailing white space

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The application uses a React-based single-page application (SPA) built with TypeScript and Vite for development tooling. The frontend follows a component-based architecture with:

- **UI Framework**: Radix UI components with shadcn/ui for consistent, accessible design system
- **Styling**: Tailwind CSS with CSS variables for theming and responsive design
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and API interactions
- **Form Handling**: React Hook Form with Zod validation schemas

The frontend is structured with modular components for different sections (hero, about, skills, experience, portfolio, contact) and a dedicated SQL translator component that interfaces with the OpenAI API.

## Backend Architecture
The backend is built with Express.js using TypeScript and follows a RESTful API design:

- **Server Framework**: Express.js with TypeScript for type safety
- **Database ORM**: Drizzle ORM with PostgreSQL as the primary database
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development
- **API Design**: RESTful endpoints for SQL translation and contact form submissions

The server implements middleware for logging, error handling, and development-specific features like Vite integration for hot module replacement.

## Data Storage Solutions
The application uses a comprehensive storage approach:

- **Production Database**: PostgreSQL via Neon Database with Drizzle ORM for schema management
- **Development Storage**: In-memory storage implementation for rapid development and testing
- **Database Schema**: Includes tables for SQL queries, contact messages, and user data with proper relationships and constraints
- **Object Storage**: Replit Object Storage (Google Cloud Storage backend) for persistent file uploads (PDFs, videos) in production deployments
- **File Uploads**: Hybrid approach - uses Object Storage in production for persistence, falls back to filesystem in development

## Authentication and Authorization
Currently, the application doesn't implement user authentication as it's designed as a portfolio showcase. The storage interface includes user-related methods for future authentication implementation.

## AI Integration
The SQL translator feature integrates with OpenAI's GPT-4o model:

- **Natural Language Processing**: Converts user input into SQL queries using a predefined database schema
- **Response Format**: Structured JSON responses with both SQL query and explanation
- **Error Handling**: Comprehensive error handling for API failures and invalid responses

# External Dependencies

## Core Framework Dependencies
- **React 18**: Frontend framework with modern hooks and concurrent features
- **Express.js**: Backend web application framework
- **TypeScript**: Type safety across the entire stack
- **Vite**: Build tool and development server with hot module replacement

## UI and Styling
- **Radix UI**: Accessible, unstyled UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **shadcn/ui**: Pre-built component library based on Radix UI

## Database and ORM
- **Drizzle ORM**: Type-safe SQL ORM with excellent TypeScript integration
- **Neon Database**: Serverless PostgreSQL database provider
- **Drizzle Kit**: Database migration and schema management tools

## External APIs
- **OpenAI API**: GPT-4o model for natural language to SQL translation
- **Unsplash**: External image hosting for portfolio and profile images

## Development and Build Tools
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer
- **Replit Integration**: Development environment with runtime error handling and cartographer support
- **jsPDF**: PDF generation library for client-side PDF creation
- **html2canvas**: HTML to canvas conversion for PDF generation from web content

## State Management and Data Fetching
- **TanStack Query**: Server state management, caching, and synchronization
- **React Hook Form**: Form state management and validation
- **Zod**: Runtime type validation and schema definition

## Session and Storage
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **Crypto**: Built-in Node.js module for generating UUIDs