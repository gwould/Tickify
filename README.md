# 🎫 Tickify — Event Ticket System

> Fast, secure, and scalable platform to **create events**, **sell tickets**, and **validate entry**.

![Status](https://img.shields.io/badge/status-Stable-success?style=for-the-badge)
![Backend](https://img.shields.io/badge/Backend-ASP.NET%20Core%208-blue?style=for-the-badge)
![Database](https://img.shields.io/badge/Database-SQL%20Server-lightgrey?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-Next.js%20%7C%20React-yellow?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-black?style=for-the-badge)

---

## 🧭 Table of Contents

1. [Overview](#-overview)
2. [Goals](#-system-goals)
3. [Architecture](#️-architecture-overview)
4. [Tech Stack](#-tech-stack)
5. [Main Features](#-main-features)
6. [System Flows](#-system-flows)
7. [Database Schema](#-database-schema-core)
8. [API Endpoints](#-api-endpoints)
9. [Project Structure](#-project-structure)
10. [Setup & Installation](#-setup--installation)
11. [Configuration](#-configuration-appsettingsjson)
12. [Testing](#-testing)
13. [Security](#-security)
14. [Monitoring & Performance](#-monitoring--performance)
15. [Frontend Options](#-frontend-options)
16. [Roadmap](#-roadmap)
17. [Contributing](#-contributing)
18. [License](#-license)
19. [Example Flow](#-appendix--example-flow-checkout)

---

## 🎯 Overview

**Tickify** is a modern event management and ticketing system built with **ASP.NET Core (C#)** and **SQL Server**. It empowers event organizers to publish and manage events while giving users a fast and intuitive booking experience.

> 🎟️ From event creation → ticket sales → QR check-in — all in one system.

---

## 🧩 System Goals

* ⚡ **Frictionless Checkout:** Simple, fast, and responsive ticket buying experience.
* 🧠 **Smart Management:** Organizers can manage events, tickets, and promotions easily.
* 🔒 **Secure & Reliable:** Prevent double-booking and overselling with transactional safety.
* 📊 **Scalable:** Clean modular architecture to support future features and integrations.
* 🔍 **Transparent:** Clear order history, fees, and refund policies.

---

## 🏗️ Architecture Overview

```
Frontend (Next.js / React SPA)
│
│  HTTPS REST API Calls
▼
Backend (ASP.NET Core 8 Web API)
├── Controllers → Routes
├── Services → Business Logic
├── EF Core → SQL Server
└── Auth → JWT + ASP.NET Identity

Database: SQL Server 2019+
(Phase 2) Redis → seat lock, rate limiting
```

**Layered Design:**

* **Controllers:** REST endpoints.
* **Services:** Business rules (pricing, inventory, payments).
* **Data:** EF Core ORM & migrations.
* **Infrastructure:** Payment, email, and storage adapters.

---

## ⚙️ Tech Stack

| Layer        | Technology                                |
| ------------ | ----------------------------------------- |
| **Backend**  | ASP.NET Core 8, C#, EF Core               |
| **Database** | Microsoft SQL Server                      |
| **Frontend** | Next.js / React + TailwindCSS + shadcn/ui |
| **Auth**     | JWT + ASP.NET Identity                    |
| **Payments** | Stripe API (modular)                      |
| **Docs**     | Swagger / OpenAPI 3.1                     |
| **DevOps**   | Docker + GitHub Actions                   |

---

## 🔑 Main Features

### 👥 Roles

* **Buyer:** Browse, purchase, and view tickets.
* **Organizer:** Create and manage events, pricing, and promotions.
* **Door Staff:** Validate QR codes and manage entry (Phase 2).
* **Admin:** Manage users, roles, and audit logs.

### 🛒 Buyer Experience

* Explore events with smart filters (date, city, category).
* Transparent pricing and fee breakdown.
* Instant confirmation & downloadable ticket (QR/PDF).
* Order history and e-wallet integration (Phase 2).

### 🏢 Organizer Tools

* Event creation wizard (title → tickets → policies → publish).
* Ticket type management (GA, VIP, Sectioned).
* Dashboard with analytics (sales, attendees, revenue).
* Promotion codes & early-bird pricing.

### ⚙️ Admin Features

* User & event moderation.
* System-level reports and metrics.
* Role-based access control.

---

## 🔄 System Flows

### 🛍️ Checkout Flow

1. User selects tickets.
2. System locks inventory (TTL ~10min).
3. Create pending order + Stripe payment intent.
4. Payment success → confirm webhook → mint QR tickets.
5. Order marked `paid` → email confirmation.

### 🎫 Ticket Validation Flow

* QR scanned → API verifies validity.
* `active` → mark as `used`.
* Response: `valid | used | invalid`.

### 📅 Event Creation Flow

1. Organizer inputs details.
2. Adds schedule, ticket tiers, and refund rules.
3. Preview → Publish → Goes live.

---

## 🧠 Database Schema (Core)

```sql
Users(id, email, password_hash, role, status, created_at)
Organizers(id, user_id, legal_name, kyc_status)
Venues(id, name, address, city, country, capacity)
Events(id, organizer_id, venue_id, slug, title, starts_at, ends_at, status)
TicketTypes(id, event_id, name, price_cents, capacity, sales_start, sales_end)
Inventory(id, event_id, ticket_type_id, status, lock_expires_at)
Orders(id, user_id, event_id, status, total_cents, currency)
OrderItems(id, order_id, ticket_type_id, quantity, price_cents)
Tickets(id, order_item_id, qr_payload, status, used_at)
Promotions(id, event_id, code, type, value, max_uses, used)
AuditLogs(id, actor_id, action, target_type, metadata_json, created_at)
```

---

## 📡 API Endpoints

| Category      | Endpoint                               | Description        |
| ------------- | -------------------------------------- | ------------------ |
| **Public**    | `GET /events`                          | Browse events      |
|               | `GET /events/{id}`                     | Event details      |
|               | `GET /events/{id}/ticket-types`        | Ticket list        |
|               | `POST /cart`                           | Create/update cart |
|               | `POST /inventory/lock`                 | Reserve tickets    |
|               | `POST /checkout/start`                 | Begin checkout     |
|               | `POST /checkout/webhook/stripe`        | Stripe webhook     |
|               | `GET /me/orders`                       | View user orders   |
| **Organizer** | `POST /organizers/events`              | Create draft event |
|               | `PUT /organizers/events/{id}`          | Update event       |
|               | `POST /organizers/events/{id}/publish` | Publish event      |
|               | `GET /organizers/events/{id}/orders`   | Sales data         |
| **Admin**     | `GET /admin/users`                     | Manage users       |
|               | `GET /admin/audit-logs`                | View logs          |

---

## 🧱 Project Structure

```
Tickify/
├── src/
│   ├── Tickify.Api/              # ASP.NET Core Backend
│   │   ├── Controllers/
│   │   ├── Data/ (DbContext, Entities)
│   │   ├── Dtos/
│   │   ├── Services/
│   │   ├── Infrastructure/ (Payments, QR, Email)
│   │   └── Program.cs
│   ├── Tickify.Frontend/         # Next.js / React frontend
│   └── Tickify.Tests/            # Unit & integration tests
├── docs/
├── docker-compose.yml
└── .github/workflows/ci.yml
```

---

## ⚙️ Setup & Installation

### 🧰 Requirements

* .NET 8 SDK
* SQL Server 2019+
* Node.js 20+ (if using frontend)

### 🚀 Backend Setup

```bash
cd src/Tickify.Api
dotnet restore
dotnet ef database update
dotnet run
```

API: [https://localhost:5001/swagger](https://localhost:5001/swagger)

### 💻 Frontend Setup

```bash
cd src/Tickify.Frontend
npm install
npm run dev
```

Frontend: `http://localhost:3000`

---

## ⚙️ Configuration (appsettings.json)

```json
{
  "ConnectionStrings": {
    "Default": "Server=localhost;Database=Tickify;Trusted_Connection=True;TrustServerCertificate=True"
  },
  "Jwt": {
    "SigningKey": "CHANGE_THIS_SECRET_KEY"
  },
  "Stripe": {
    "PublishableKey": "pk_test_...",
    "SecretKey": "sk_test_...",
    "WebhookSecret": "whsec_..."
  }
}
```

---

## 🧪 Testing

```bash
cd src/Tickify.Tests
dotnet test
```

✅ Unit: pricing, inventory, promotions.
✅ Integration: checkout & webhooks.
✅ E2E (optional): Playwright for full buyer flow.

---

## 🔐 Security

* HTTPS enforced (HSTS).
* JWT tokens (access + refresh).
* Role-based access (Buyer, Organizer, Admin).
* Inventory locking to prevent overselling.
* Input validation via FluentValidation.
* Encrypted secrets and audit logging.

---

## 📈 Monitoring & Performance

* Logging via **Serilog**.
* Metrics via **OpenTelemetry (Prometheus)**.
* Query profiling with **EF Core logs**.
* CDN + caching for static assets (frontend).

---

## 💡 Frontend Options

###  Next.js 

* Server-side rendering for SEO.
* Tailwind + shadcn/ui design system.
* React Query for caching.



---

## 🧭 Roadmap

**Phase 1 (MVP)**

* Event management, checkout, payments, QR generation.
* Organizer dashboard.

**Phase 2**

* Reserved seating map.
* Ticket transfer & resale.
* Box office & offline validation.
* Advanced analytics + payouts.

---

## 🤝 Contributing

1. Fork repo & clone locally.
2. Create feature branch:

   ```bash
   git checkout -b feature/new-feature
   ```
3. Commit and push:

   ```bash
   git commit -m "Add new feature"
   git push origin feature/new-feature
   ```
4. Create Pull Request.

---

## 📜 License

Licensed under the **MIT License** — use freely for personal or commercial purposes.

---

## 🧠 Appendix — Example Checkout Flow

```
User → Web: select 2 tickets
Web → API(/inventory/lock): lock tickets
Web → API(/cart): price breakdown
Web → API(/checkout/start): create order + payment intent
Stripe → API(webhook): payment_succeeded
API → allocate tickets + send confirmation
User → Web: shows confirmation + QR code
```

---

> 🚀 Built with ❤️ by the **Tickify Team**
