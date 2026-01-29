# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Project**: **GrihaHomes** • **Property Listing Platform** • **Find Your Home!**

---

## 🏠 Overview

GrihaHomes is a property listing platform for rent/sale in India. Built with NestJS (backend) and Next.js (frontend), it provides geo-search, property management, and inquiry system for connecting property seekers with owners.

### Why GrihaHomes?

- **💰 Zero Cost:** Runs on OCI free tier
- **🔒 Privacy First:** Self-hosted, you own your data
- **📍 Geo Search:** PostGIS powered location-based search
- **📱 Mobile Ready:** Responsive design, PWA capable
- **🔐 Cost-Optimized Auth:** OTP once, password daily
- **⚡ Scalable:** Modular monolith, can scale to 50k+ users

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | NestJS + Prisma + PostgreSQL + PostGIS |
| Frontend | Next.js 14 (App Router) + Tailwind CSS |
| Auth | Firebase OTP + JWT + bcrypt |
| Images | Cloudinary |
| Cache | Redis |
| Infra | OCI ARM + Docker + Cloudflare Tunnel |

---

## 📁 Project Structure

```
griha-homes/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/        # Firebase OTP + JWT
│   │   │   ├── users/       # User CRUD
│   │   │   ├── properties/  # Property CRUD + search
│   │   │   ├── media/       # Cloudinary uploads
│   │   │   └── inquiries/   # User inquiries
│   │   ├── common/          # Guards, filters, decorators
│   │   ├── config/          # Environment config
│   │   └── main.ts
│   ├── prisma/
│   │   └── schema.prisma
│   └── Dockerfile
├── frontend/                # Next.js App
│   ├── app/
│   │   ├── (auth)/          # Login, register
│   │   ├── (main)/          # Home, search, property
│   │   └── dashboard/       # Owner/admin panels
│   ├── components/
│   ├── lib/
│   └── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── PRD.md                   # Technical specification
├── PLAN.md                  # Implementation checklist
└── CLAUDE.md                # This file
```

---

## 🎨 Code Style Guide

### Core Principles

* **Readability over cleverness.** Clear code > smart code.
* **Small, focused changes.** One concern per PR.
* **Types first.** TypeScript everywhere, no `any`.
* **Fail fast.** Lint, format, test in CI.

---

### Naming Conventions

| Item | Convention | Example |
|------|------------|---------|
| Files | `kebab-case` | `property-search.service.ts` |
| Functions | `camelCase` | `findByLocation()` |
| Classes | `PascalCase` | `PropertyService` |
| Interfaces | `PascalCase` (no I prefix) | `Property`, `CreatePropertyDTO` |
| Constants | `UPPER_SNAKE_CASE` | `MAX_PROPERTIES_PER_OWNER` |
| Env vars | `GRIHA_<SERVICE>_<NAME>` | `GRIHA_DB_URL` |
| DB columns | `snake_case` | `created_at`, `owner_id` |

### URL & ID Conventions

```
# Routes: plural nouns, resource-specific param names
/properties/:property_id
/properties/:property_id/media
/properties/:property_id/media/:media_id
/users/:user_id
/inquiries/:inquiry_id

# Always use resource name in param (NOT generic :id)
✅ /properties/:property_id
✅ /users/:user_id
❌ /properties/:id
❌ /users/:id

# Variable naming
✅ propertyID, userID, mediaID
✅ property_id, user_id (in URLs/DB)
❌ propertyId, userId (no camelCase IDs)
```

### API Response Format

```typescript
// Success
{
  "success": true,
  "data": { ... },
  "meta": { "page": 1, "total": 100 }
}

// Error
{
  "success": false,
  "error": {
    "code": "PROPERTY_NOT_FOUND",
    "message": "Property does not exist"
  }
}
```

---

### TypeScript Rules

```typescript
// ✅ Good
interface CreatePropertyDTO {
  title: string;
  price: number;
  location: { lat: number; lng: number };
}

async function createProperty(dto: CreatePropertyDTO): Promise<Property> {
  // ...
}

// ❌ Bad
async function createProperty(data: any): Promise<any> {
  // ...
}
```

**ESLint Config:**
```json
{
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "eqeqeq": ["error", "always"]
  }
}
```

**Prettier Config:**
```json
{
  "printWidth": 100,
  "tabWidth": 2,
  "singleQuote": true,
  "trailingComma": "all"
}
```

---

### NestJS Conventions

```typescript
// Module structure
@Module({
  imports: [PrismaModule, RedisModule],
  controllers: [PropertiesController],
  providers: [PropertiesService],
  exports: [PropertiesService],
})
export class PropertiesModule {}

// Service methods
class PropertiesService {
  findAll(filters: PropertyFilters): Promise<Property[]>
  findByID(propertyID: string): Promise<Property>
  create(ownerID: string, dto: CreatePropertyDTO): Promise<Property>
  update(propertyID: string, dto: UpdatePropertyDTO): Promise<Property>
  delete(propertyID: string): Promise<void>
}

// Controller routes - use resource-specific param names
@Controller('properties')
class PropertiesController {
  @Get()                      // GET /properties
  @Get(':property_id')        // GET /properties/:property_id
  @Post()                     // POST /properties
  @Patch(':property_id')      // PATCH /properties/:property_id
  @Delete(':property_id')     // DELETE /properties/:property_id
}
```

---

### Next.js Conventions

```
app/
├── (auth)/
│   ├── login/page.tsx
│   └── register/page.tsx
├── (main)/
│   ├── page.tsx              # Home
│   ├── search/page.tsx       # Search results
│   └── property/[id]/page.tsx
├── dashboard/
│   ├── owner/
│   └── admin/
└── layout.tsx
```

**Component Pattern:**
```typescript
// components/property-card.tsx
interface PropertyCardProps {
  property: Property;
  onInquiry?: (id: string) => void;
}

export function PropertyCard({ property, onInquiry }: PropertyCardProps) {
  // ...
}
```

---

## 🔐 Security Rules

* **Never commit secrets.** Use `.env` locally, secrets manager in prod.
* **Validate all input.** Use `class-validator` in NestJS.
* **Sanitize output.** Prevent XSS in frontend.
* **Rate limit everything.** Especially auth endpoints.
* **Log without PII.** Mask phone numbers, emails in logs.

---

## 📝 Commit Conventions

Use **Conventional Commits**:

```
feat(properties): add geo search with PostGIS
fix(auth): handle expired OTP gracefully
docs(readme): update setup instructions
chore(deps): upgrade prisma to 5.x
refactor(users): extract validation logic
test(inquiries): add unit tests for rate limiting
```

**PR Template:**
```markdown
### Summary
Brief description of changes

### Changes
- Added X
- Updated Y
- Fixed Z

### How to Test
1. Step one
2. Step two

### Checklist
- [ ] Lint & format passing
- [ ] Tests added/updated
- [ ] CI passing
- [ ] No secrets in code
```

---

## 🗄 Database Rules

* **Soft delete everything.** Use `deleted_at` column.
* **UUID for IDs.** Never auto-increment for public IDs.
* **Timestamps always.** `created_at`, `updated_at` on every table.
* **Index strategically.** Partial indexes for soft-deleted records.
* **Migrations are immutable.** Never edit, only add new ones.

---

## 🚀 Ports & Services

| Service | Port |
|---------|------|
| Backend (NestJS) | 3000 |
| Frontend (Next.js) | 4000 |
| PostgreSQL | 5432 |
| Redis | 6379 |

---

## 📋 Quick Reference

### Business Rules
- Max 10 properties per owner
- Max 10 images per property
- Properties expire after 90 days
- 1 inquiry per user per property per 24 hours
- Lock account after 5 failed logins

### User Roles
- `user` → Browse, search, inquire
- `owner` → + Create/manage own properties
- `admin` → Manage everything

---

## 🤝 We Are Buddies

**Buddy Interaction Rules** - we are friends

We operate as straightforward, brutally honest friends. You can ask me to run commands, test things, or perform tasks just like you'd ask a teammate sitting beside you. I'll call out mistakes immediately, disagree without hesitation, and push you when your logic is off. You're expected to do the same.

This section exists to enforce efficient collaboration:

- No sugarcoating.
- No ego protection.
- No vague statements.
- Direct challenges welcome.
- Fast corrections > perfect grammar.
- Clarity and correctness override tone.

If something is wrong, I will say it bluntly. If something is unclear, you should demand precision. Our goal is to move fast with zero bullshit.

---

## 📚 Key Files

| File | Purpose |
|------|---------|
| `PRD.md` | Full technical specification |
| `PLAN.md` | Implementation checklist |
| `CLAUDE.md` | This file - AI guidance |
| `docker-compose.yml` | Local development setup |
| `prisma/schema.prisma` | Database schema |

---

## 🔧 Common Commands

```bash
# Backend
cd backend && npm run start:dev    # Development
cd backend && npm run build        # Build
cd backend && npx prisma migrate dev  # Run migrations
cd backend && npx prisma studio    # DB GUI

# Frontend
cd frontend && npm run dev         # Development
cd frontend && npm run build       # Build

# Docker
docker-compose up -d               # Start all services
docker-compose logs -f api         # View logs
docker-compose down                # Stop all
```

---

*Last updated: Jan 25, 2026*
