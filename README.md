# PhotoHub

## Overview
This project is a software solution that began as an MVP (Minimum Viable Product) and is evolving toward a SaaS (Software as a Service) model. This README documents the current state of the project, its architecture, setup instructions, and future development plans.

## Table of Contents
- [Current Status](#current-status)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Architecture](#architecture)
- [Screen Flow](#screen-flow)
- [Architecture Diagram](#architecture-diagram)
- [API Documentation](#api-documentation)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Current Status
The project is currently in MVP phase with core functionality implemented. We're preparing for the transition to a full SaaS solution with multi-tenancy, subscription management, and enhanced features.

## Features
### MVP Features (Implemented)
- Responsive landing page optimized for all device types
- Professional photography portfolio showcase
- WhatsApp integration for direct contact and quote requests
- Internationalization with full support for English and Portuguese languages
- SEO optimization for better visibility
- Modern and user-friendly interface

### Planned SaaS Features
- User registration and secure authentication system
- Client dashboard for package selection and purchase
- Interactive photo gallery for clients to select pre-edited photos
- Option to choose additional photos beyond package limits
- Shopping cart functionality with specific pricing per additional photo
- Secure payment gateway integration
- High-resolution photo download capability for final deliverables
- Photographer administration area with:
  - Client management system
  - Appointment scheduling
  - Pre-edited photo upload interface
  - Final edited photo delivery system
- Automated workflows for photo approval and delivery
- Usage analytics and reporting
- Multi-tier subscription model

## Technology Stack
- **Frontend**: Next.js, React, Tailwind
- **Backend**: Node.js, Express
- **Database**: Prisma, PostgreSQL
- **Authentication**: NextAuth.js
- **Hosting/Deployment**: Vercel
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites
- Next.js version 15.2.0 or higher
- Tailwind CSS
- Node.js version 18.x or higher
- npm version 9.x or higher
- Express
- Prisma ORM
- PostgreSQL instance (local or cloud)
- NextAuth.js

### Installation
```bash
# Clone the repository
git clone https://github.com/iurylenonalves/photohub.git
cd photohub

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your configuration

# Run the development server
npm run dev
```

## Architecture

The project follows a modern architecture separating frontend and backend concerns while facilitating communication between them.

### Frontend Architecture
The frontend is built with Next.js following the App Router pattern:
```bash
photoapp/
├── public/
│   └── images/
│       ├── en.svg
│       ├── pt.svg
│       └── (other images)
├── src/
│   ├── app/
│   │   │── locales/
│   │   │   ├── en.json
│   │   │   └── pt.json
│   │   │── favivon.ico
│   │   │── global.css
│   │   │── layout.tsx
│   │   └── page.tsx
│   ├── client/
│   │   ├── _components/
│   │   │   ├── About.tsx
│   │   │   ├── aos-init.tsx
│   │   │   ├── CategoryFilter.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Loader.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── Portfolio.tsx
│   │   │   ├── PrivacyPolicyModal.tsx
│   │   │   ├── Testimonial.tsx
│   │   │   └── ToggleLanguageButton.tsx
│   ├── components
│   ├── context/
│   │   └── TranslationContext.tsx
│   ├── lib/
│   ├── styles/
│   │   ├── footer.module.css
│   │   ├── header.module.css
│   │   ├── hero.module.css
│   │   ├── modal.module.css
│   │   ├── privacypolicymodal.module.css
│   │   └── toggleLanguageButton.module.css
├── .gitignore
├── next.config.ts
├── package.json
└── README.md
```

### Backend Architecture
The backend follows a layered architecture pattern:
```bash
photoapp/
├── src/
│   ├── server/
│   │   │── controllers/
│   │   │── middlewares/
│   │   │── model/
│   │   └── routes/
├── .gitignore
```

### Screen Flow
Screen Flow Diagram

### Architecture Diagram
Architecture Diagram


## API Documentation
The API endpoints follow RESTful conventions. Here are the key endpoints:

### Authentication and Users
- `POST /api/auth/register`: Register new user
- `POST /api/auth/login`: Sign in user
- `GET /api/auth/profile`: Get current session

### Photo Packages
- `GET /api/packages`: Get photo Packages

### Bookings
- `POST /api/bookings`: Create booking
- `GET /api/bookings`: Get user bookins

### Photos
- `GET /api/photos/pre-edited/1`: Get pre-edited photos
- `GET /api/photos/select`: Select photos
- `GET /api/photos/final/1/download`: Download final photos

### Payments
- `GET /api/payments`: Make payment


## Roadmap
### Phase 1: MVP (Completed)
- [x] Implement core functionality
- [ ] Basic authentication
- [x] Minimal viable UI/UX
- [x] Initial deployment

### Phase 2: SaaS Transition (In Progress)
- [ ] Refactor for multi-tenancy
- [ ] Authentication
- [ ] Photo Packages
- [ ] Bookings
- [ ] User Admin Photos 
- [ ] Payments
- [ ] Implement subscription management
- [ ] Add usage quotas and rate limiting
- [ ] Enhance security measures

### Phase 3: SaaS Expansion
- [ ] 
- [ ] 
- [ ] 
- [ ] 

## Contributing
We welcome contributions to this project. Please follow these steps:

1. Fork the repository: [Photohub](https://github.com/iurylenonalves/photohub)
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/photohub.git
   cd photohub
   ```
3. Create a feature branch (`git checkout -b feature/amazing-feature`)
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.