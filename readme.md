# Multisite Application — Next.js + Express.js + GraphQL + MongoDB

> A multisite application (Headless concept) with a clean **client / server split**.
> Frontend: **Next.js 16** · Backend: **Express.js + TypeScript** · API: **GraphQL + Apollo server** · Database: **MongoDB + Mongoose**

---

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB running locally (`mongod`) **or** a MongoDB Atlas connection string

### 1 — Install dependencies

```bash
# From the root of the monorepo
npm install    # For root install

npm run install:all  # For sub branch install

# Or separately:
cd backend  && npm install
cd frontend && npm install
```

### 2 — Seeding data in DB

```bash
# From the root of the monorepo
npm run seed    # For seeding data

# Or separately:
cd backend  && npm run seed
```

### 3 — Start both servers

```bash
# From root — starts both concurrently
npm run dev

# Separately:
cd backend  && npm run dev   # → http://localhost:7000 & GraphQL → http://localhost:7100 
cd frontend && npm run dev   # → http://localhost:3000
```

---

## Project Structure

```
next-with-graphQL-app/               ← Monorepo root
├── package.json                     ← Root scripts (dev, install:all)
│
├── backend/                         ← Express.js API
│   ├── src/
│   │   ├── server.ts                ← Entry point 
│   │   ├── app.ts                   ← Express app
│   │   │
│   │   ├── config/
│   │   │   ├── env.ts               ← Typed environment variables
│   │   │   └── db.ts                ← MongoDB connection
│   │   │   └── graphQL.ts           ← GraphQL connection
│   │   │
│   │   ├── models/                  ← Mongoose schemas + instance methods
│   │   │   ├── Site.model.ts
│   │   │
│   │   ├── controllers/             ← HTTP layer — parse request, call service, send response
│   │   │   ├── site.controller.ts
│   │   │
│   │   ├── routes/                  ← Route definitions
│   │   │   ├── site.routes.ts
│   │   │
│   │   └── utils/
│   │       └── seed.ts              ← Database seeder
│   │
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/                        ← Next.js 16 App Router
    ├── app/                         ← Pages (App Router)
    │   │   ├── layout.tsx           ← Root layout
    │   │   ├── page.tsx             ← Home feed 
    │   │
    │   ├── components/
    │   │   ├── navbar/
    │   │   │   └── navBar.tsx       ← Navbar UI
    │   │   │   └── navBar.css       ← Navbar styles
    │   │   ├── mainContent/
    │   │   │   └── mainContent.tsx       ← main Content UI
    │   │   │   └── mainContent.css       ← main Content styles
    │   │   ├── footer/
    │   │   │   └── footer.tsx       ← footer UI
    │   │   │   └── footer.css       ← footer styles
    │   │   ├── contact/
    │   │   │   └── contact.tsx      ← contact UI
    │   │   │   └── contact.css      ← contact styles
    │   │
    │   ├── lib/
    │   │   │   ├── api-client.ts    ← Fetch wrapper and logic
    │   ├── api/
    │   |   |── services/
    │   │   │   ├── siteService.ts   ← All API endpoints 
    │   |── utils/                   ← Cutsom hooks and its providers for global content management
    │
    ├── .env.example
    ├── next.config.js
    ├── tailwind.config.ts
    └── tsconfig.json
```
---

## Database Design

### Collections

#### `sites`

```typescript

SiteTypes extends Document {
    siteId: string,
    brandName: string,
    languages: ContentTypes
}

ContentTypes extends Document {
    nav: string,
    component_1: string,
    component_2: string,
    component_3: string,
    footer: string,
}

LinkTypes extends Document {
    link: string,
    name: string,
}

LinkSchema {
    link: { type: String },
    name: { type: String }
}

LanguageContentSchema {
  nav: {
      links: [LinkSchema]
  },
  component_1: {
      headline: String,
      body: String
  },
  component_2: {
      headline: String,
      button: LinkSchema
  },
  component_3: {
      headline: String,
      body: String,
      tags: [String]
  },
  footer: {
      footer: String
  }
}

SiteSchema {
  siteId: {
      type: String,
      unique: true,
      index: true,
      required: [true, "SiteId is required"]
  }, brandName: {
      type: String,
      required: [true, "Brabd name is required"]
  }, languages: {
      type: Map,
      of: LanguageContentSchema
  }
}
```
---

## API Reference

### Base URL

```
http://localhost:7000/api
```

### GraphQL URL

```
http://localhost:7100
```
---
## Endpoints

#### Site

```
POST   /site             Create site data
GET    /site/:id         Get site data by id
GET    /site             Get all site data
```
---
## Tech Stack

### Backend

| Category | Technology | Purpose |
|---|---|---|
| Runtime | Node.js 18+ | JavaScript server runtime |
| Framework | Express.js 4 | HTTP server, routing, middleware |
| Language | TypeScript 5 | Type safety across the entire codebase |
| Database | MongoDB | Document database |
| ODM | Mongoose 8 | Schema, validation, hooks, queries |
| API | GraphQL | Flexible data-fetching language |
| Server | Apollo | For API testing with sandbox |
| Security | helmet | HTTP security headers |
| CORS | cors | Cross-origin request handling |
| Rate limiting | express-rate-limit | Brute force protection |
| Logging | morgan | HTTP request logging |
| Compression | compression | gzip response compression |
| Env | dotenv | Environment variable loading |

### Frontend

| Category | Technology | Purpose |
|---|---|---|
| Framework | Next.js 16 (App Router) | React framework with routing |
| Language | TypeScript 5 | Type safety |
| Styling | Tailwind CSS | Utility-first CSS |
| State | React Context | Global auth state |
| HTTP | Native fetch | API calls with token management |
| Server | Apollo client | For API data layer for getting data directly form GraphQL |
| Classnames | clsx | Conditional CSS class utility |

---

*Built with intention. Every layer has a reason. Every pattern solves a real problem.*
*Read the code, understand the why, then make it your own.*
