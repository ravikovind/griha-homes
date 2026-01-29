# GrihaHomes - Implementation Plan

> Property listing platform for rent/sale in India

---

## Quick Summary

| Item | Decision |
|------|----------|
| Backend | NestJS + Prisma |
| Frontend | Next.js 14 (App Router) |
| Database | PostgreSQL + PostGIS |
| Auth | Firebase OTP (once) + Password (daily) |
| Images | Cloudinary |
| Hosting | OCI Free Tier (4 OCPU, 24GB RAM) |
| Proxy/CDN | Cloudflare Tunnel |
| Cost | ₹0/month |

---

## User Roles

| Role | Permissions |
|------|-------------|
| **User** | Browse, search, filter, raise inquiry |
| **Owner** | + List/update/delete/unlist own properties (max 10) |
| **Admin** | Manage all users, properties, inquiries |

---

## Core Flows

### Owner Flow
```
Register (OTP) → Set Password → List Property → Manage → Get leads from admin
```

### User Flow
```
Browse → Search/Filter → View Property → Raise Inquiry → Agent contacts later
```

### Auth Flow (Cost Optimized)
```
Registration: Phone → OTP (Firebase) → Set Password → Done
Login:        Phone + Password → JWT (No OTP cost!)
Forgot:       Phone → OTP → Reset Password
```

---

## Database Tables (5)

| Table | Purpose |
|-------|---------|
| `users` | Accounts with phone, password, role |
| `devices` | Push notification tokens |
| `properties` | Listings with address, location, amenities |
| `property_media` | Cloudinary image references |
| `inquiries` | User queries, admin tracks status |

---

## API Endpoints (~20 routes)

### Auth
- `POST /auth/send-otp` - Send OTP
- `POST /auth/verify-otp` - Verify, get temp token
- `POST /auth/register` - Set password
- `POST /auth/login` - Phone + password
- `POST /auth/reset-password` - New password
- `POST /auth/refresh` - Refresh JWT
- `GET /auth/me` - Current user

### Users
- `GET /users/me` - Get profile
- `PATCH /users/me` - Update profile

### Properties
- `GET /properties` - List with filters
- `GET /properties/:property_id` - Single property
- `POST /properties` - Create (owner)
- `PATCH /properties/:property_id` - Update (owner)
- `DELETE /properties/:property_id` - Delete (owner)
- `PATCH /properties/:property_id/status` - List/unlist

### Media
- `POST /properties/:property_id/media` - Upload
- `DELETE /media/:media_id` - Delete

### Inquiries
- `POST /inquiries` - Raise inquiry
- `GET /inquiries` - List (admin: all, user: own)
- `GET /inquiries/:inquiry_id` - Single inquiry
- `PATCH /inquiries/:inquiry_id` - Update status (admin)

### Admin
- `GET /admin/users` - All users
- `GET /admin/users/:user_id` - User details
- `GET /admin/properties` - All properties
- `PATCH /admin/properties/:property_id` - Update any
- `DELETE /admin/properties/:property_id` - Delete any

---

## Business Rules

### Limits
- 10 properties per owner
- 10 images per property
- 90 days auto-expiry (renewable)

### Rate Limits
- OTP: 3 requests/phone/hour
- Login: Lock after 5 failed attempts (30 min)
- API: 100 req/min (user), 1000 req/min (admin)

### Inquiries
- 1 inquiry/user/property/24 hours
- 10 inquiries/user/day

---

## Infrastructure

### Single OCI VM (Free Tier)
```
4 OCPU ARM, 24GB RAM, 200GB Storage
├── Docker Compose
│   ├── cloudflared (Cloudflare Tunnel)
│   ├── nginx (reverse proxy)
│   ├── nestjs-api (:3000)
│   ├── nextjs-web (:4000)
│   ├── postgresql + postgis (:5432)
│   └── redis (:6379)
```

### Ports
| Service | Port |
|---------|------|
| Backend (NestJS) | 3000 |
| Frontend (Next.js) | 4000 |
| PostgreSQL | 5432 |
| Redis | 6379 |

### Cloudflare
```
grihahomes.com      → web (Next.js)
api.grihahomes.com  → api (NestJS)
```

### Backups
- Daily pg_dump to OCI Object Storage
- 30 days rolling retention

---

## Project Structure

```
griha-homes/
├── backend/           # NestJS
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── properties/
│   │   │   ├── media/
│   │   │   └── inquiries/
│   │   ├── common/    # Guards, filters, utils
│   │   └── main.ts
│   ├── prisma/
│   │   └── schema.prisma
│   └── Dockerfile
├── frontend/          # Next.js
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (main)/
│   │   └── dashboard/
│   ├── components/
│   ├── lib/
│   └── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── PRD.md
└── PLAN.md
```

---

## Tech Stack Details

### Backend
- **NestJS** - Modular monolith
- **Prisma** - ORM with PostgreSQL
- **PostGIS** - Geo queries
- **Redis** - Cache, rate limiting
- **class-validator** - Input validation
- **bcrypt** - Password hashing
- **@nestjs/jwt** - Token management
- **firebase-admin** - OTP verification

### Frontend
- **Next.js 14** - App Router, SSR
- **Tailwind CSS** - Styling
- **React Query** - Server state
- **Zustand** - Client state
- **Firebase SDK** - OTP on client
- **Leaflet/Google Maps** - Property maps

### External Services
- **Firebase Auth** - Phone OTP (10k free/month)
- **Cloudinary** - Images (25GB free)
- **Cloudflare** - CDN, SSL, tunnel (free)

---

## Implementation Order

### Phase 1: Backend Foundation
1. [ ] NestJS project setup
2. [ ] Prisma schema + migrations
3. [ ] Auth module (Firebase + JWT)
4. [ ] Users module
5. [ ] Docker + PostgreSQL local

### Phase 2: Core Features
6. [ ] Properties module (CRUD)
7. [ ] Media module (Cloudinary)
8. [ ] Geo search (PostGIS)
9. [ ] Inquiries module

### Phase 3: Frontend
10. [ ] Next.js project setup
11. [ ] Auth pages (login, register)
12. [ ] Property listing page
13. [ ] Property detail page
14. [ ] Owner dashboard
15. [ ] Admin dashboard

### Phase 4: Deployment
16. [ ] Docker compose (all services)
17. [ ] OCI VM setup
18. [ ] Cloudflare tunnel
19. [ ] Domain configuration
20. [ ] Backup script

---

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://postgres:password@db:5432/griha
REDIS_URL=redis://redis:6379
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
FIREBASE_PROJECT_ID=griha-homes
FIREBASE_PRIVATE_KEY=...
CLOUDINARY_CLOUD_NAME=griha
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://api.grihahomes.com
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=griha
```

---

## Scale Path

| Stage | Users | Properties | Action |
|-------|-------|------------|--------|
| MVP | 0-1k | 0-5k | Current setup |
| Growth | 1k-10k | 5k-20k | Add PgBouncer, Bull queue |
| Scale | 10k-50k | 20k-100k | Add read replica, Meilisearch |
| Enterprise | 50k+ | 100k+ | Managed DB, Kubernetes |

---

## Migration Path

Docker-based = Zero vendor lock-in

```bash
# Move to any cloud
pg_dump griha > backup.sql
docker save images > images.tar.gz
# ... deploy on new server
# Update Cloudflare tunnel
```

---

## Domains

- **grihahomes.com** - Active (expires Jan 2027)
- **grihahomes.in** - Active (expires Jan 2027)

---

## Next Steps

1. Review this plan
2. Update requirements if needed
3. Say "let's build" when ready

---

*Last updated: Jan 25, 2026*
