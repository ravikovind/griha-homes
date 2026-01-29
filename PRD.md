# GrihaHomes

Find Your Home!

## Features (MVP)

- List properties (rent/sale)
- Search/filter properties by location, price, rooms
- User authentication (phone-based OTP)
- Property management for owners
- Inquiry system (users raise query → agents follow up)

---

# 👥 User Roles & Permissions

| Role | Can Do |
|------|--------|
| **User** | Browse, search, filter, raise inquiry |
| **Owner** | All user permissions + List/update/delete/unlist own properties |
| **Admin** | Manage all users, properties, inquiries |

**Flows:**

```
OWNER FLOW:
Register → List Property → Manage (update/unlist/delete) → Get leads from admin

USER FLOW:
Browse → Search/Filter → View Property → Raise Inquiry → Agent contacts later

ADMIN FLOW:
View all inquiries → Contact users → Connect with owners → Manage platform
```

---

# 🛠 Tech Stack

## Backend
- **Framework:** NestJS (TypeScript)
- **ORM:** Prisma
- **Database:** PostgreSQL + PostGIS
- **Validation:** class-validator

## Frontend
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **State:** React Query / Zustand
- **Maps:** Leaflet / Google Maps

## Auth
- **Provider:** Firebase Auth (Phone OTP)
- **Token:** Firebase ID Token → Verify on backend → Issue app JWT
- **Why:** No DLT registration needed, 10k free/month

## Infrastructure
- **Database:** Supabase / Neon / Railway
- **Backend Hosting:** Railway / Render / VPS
- **Frontend Hosting:** Vercel
- **Images:** Cloudinary

---

# 🔐 Authentication (OTP + Password)

Firebase OTP for registration only. Password for daily logins. **Saves 90%+ auth costs.**

## Flows

**1. Registration (First Time) - Uses OTP**
```
Phone → Firebase OTP → Verify → Set Password → Account Created
```

**2. Login (Daily) - No OTP Cost**
```
Phone + Password → Backend Verifies → JWT Issued
```

**3. Forgot Password (Rare) - Uses OTP**
```
Phone → Firebase OTP → Verify → Set New Password
```

## API Endpoints

```
POST /auth/send-otp        - Send OTP via Firebase (register/forgot)
POST /auth/verify-otp      - Verify OTP, return temp token
POST /auth/register        - Set password (requires temp token)
POST /auth/login           - Phone + password login
POST /auth/reset-password  - Set new password (requires temp token)
POST /auth/refresh         - Refresh JWT
```

## Backend Implementation

```typescript
// Send OTP (registration or forgot password)
async sendOTP(phone: string, purpose: 'register' | 'forgot') {
  const user = await this.userRepo.findOne({ where: { phone } });

  if (purpose === 'register' && user) {
    throw new ConflictException('Phone already registered');
  }
  if (purpose === 'forgot' && !user) {
    throw new NotFoundException('Phone not found');
  }

  // Firebase handles OTP sending on frontend
  return { message: 'OTP sent' };
}

// Verify OTP & issue temp token
async verifyOTP(idToken: string) {
  const decoded = await admin.auth().verifyIdToken(idToken);
  const phone = decoded.phone_number;

  // Issue short-lived temp token for password setup
  return this.jwtService.sign(
    { phone, purpose: 'setup' },
    { expiresIn: '10m' }
  );
}

// Register (set password)
async register(tempToken: string, password: string) {
  const { phone } = this.jwtService.verify(tempToken);
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await this.userRepo.save({
    phone,
    password: hashedPassword,
    role: 'user',
  });

  return this.issueTokens(user);
}

// Login (phone + password)
async login(phone: string, password: string) {
  const user = await this.userRepo.findOne({ where: { phone } });
  if (!user || !await bcrypt.compare(password, user.password)) {
    throw new UnauthorizedException('Invalid credentials');
  }

  return this.issueTokens(user);
}
```

## Cost Savings

| Users | Old (OTP every login) | New (OTP once) |
|-------|----------------------|----------------|
| 1,000 users × 10 logins | 10,000 OTPs | 1,000 OTPs |
| 10,000 users | Exceeds free tier | Still free |

**Firebase Free Tier:** 10,000 OTPs/month — now lasts 10x longer.

---

# 📷 Image Storage (Cloudinary)

Property images stored on Cloudinary with on-the-fly transforms.

**Why Cloudinary:**
- Auto WebP/AVIF optimization
- CDN built-in (fast in India)
- URL-based transforms (resize, crop, watermark)
- 25GB free tier

**URL Transform Examples:**
```
# Original
https://res.cloudinary.com/griha/image/upload/v1/properties/abc123.jpg

# 400x300 thumbnail
https://res.cloudinary.com/griha/image/upload/w_400,h_300,c_fill/v1/properties/abc123.jpg

# Blur placeholder (LQIP)
https://res.cloudinary.com/griha/image/upload/w_50,q_30,e_blur:500/v1/properties/abc123.jpg
```

**Folder Structure:**
```
griha/
├── users/          # Profile photos
├── properties/     # Property images
└── misc/           # Other assets
```

**DB Storage:** Only store the public_id (e.g., `properties/abc123`), construct full URL in backend/frontend.

---

# 🏠 Database Schema (PostgreSQL + PostGIS)

MVP schema - 4 tables, no over-engineering.

---

## 1. Extensions

```sql
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

---

## 2. ENUM Types

```sql
CREATE TYPE user_role AS ENUM ('user', 'owner', 'admin');

CREATE TYPE property_type AS ENUM ('flat', 'house', 'villa', 'commercial');

CREATE TYPE property_for AS ENUM ('rent', 'sale');

CREATE TYPE furnishing_type AS ENUM ('furnished', 'semi_furnished', 'unfurnished');

CREATE TYPE parking_type AS ENUM ('none', 'open', 'covered');
```

---

## 3. Users

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone TEXT NOT NULL,
  name TEXT DEFAULT 'GrihaHomes User',
  email TEXT,
  password TEXT,
  photo TEXT,
  role user_role DEFAULT 'user',
  status BOOLEAN DEFAULT TRUE,
  failed_login_attempts INTEGER DEFAULT 0,
  locked_until TIMESTAMP,
  deleted_at TIMESTAMP,  -- Soft delete
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_users_phone ON users(phone) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX idx_users_email ON users(email) WHERE email IS NOT NULL AND deleted_at IS NULL;
```

---

## 4. Devices

```sql
CREATE TABLE devices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token TEXT,
  platform TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_devices_user ON devices(user_id);
```

---

## 5. Properties

```sql
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES users(id),

  -- Type
  property_type property_type NOT NULL,
  property_for property_for NOT NULL,

  -- Details
  title TEXT,
  description TEXT,
  rooms INTEGER CHECK (rooms >= 0),
  bathrooms INTEGER CHECK (bathrooms >= 0),
  size_sqft INTEGER CHECK (size_sqft > 0),
  floor INTEGER CHECK (floor >= 0),

  -- Pricing
  price INTEGER CHECK (price >= 0),
  deposit INTEGER CHECK (deposit >= 0),
  maintenance INTEGER CHECK (maintenance >= 0),

  -- Features
  furnishing furnishing_type,
  parking parking_type,
  amenities TEXT[] DEFAULT '{}',

  -- Address
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT,

  -- Location (PostGIS)
  location GEOGRAPHY(Point, 4326),

  -- Status
  status BOOLEAN DEFAULT TRUE,
  available_from DATE,
  expires_at TIMESTAMP,  -- Auto-unlist after this date
  deleted_at TIMESTAMP,  -- Soft delete

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes (exclude deleted)
CREATE INDEX idx_properties_owner ON properties(owner_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_properties_city ON properties(city) WHERE deleted_at IS NULL;
CREATE INDEX idx_properties_location ON properties USING GIST (location) WHERE deleted_at IS NULL;
CREATE INDEX idx_properties_amenities ON properties USING GIN (amenities) WHERE deleted_at IS NULL;
CREATE INDEX idx_properties_filters ON properties(property_type, property_for, status, price) WHERE deleted_at IS NULL;
CREATE INDEX idx_properties_expiry ON properties(expires_at) WHERE deleted_at IS NULL AND status = TRUE;
```

**Limits:**
- Max 10 properties per owner (free tier)
- Max 10 images per property
- Auto-expires after 90 days (owner can renew)

---

## 6. Property Media

```sql
CREATE TABLE property_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  public_id TEXT NOT NULL,  -- Cloudinary public_id (e.g., 'properties/abc123')
  type TEXT DEFAULT 'image' CHECK (type IN ('image', 'video')),
  position INTEGER DEFAULT 0,  -- Display order
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_media_property ON property_media(property_id);
```

**Note:** Store only `public_id`, construct full Cloudinary URL in code.

---

## 7. Inquiries

```sql
CREATE TYPE inquiry_status AS ENUM ('pending', 'contacted', 'closed');

CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message TEXT,
  status inquiry_status DEFAULT 'pending',
  admin_notes TEXT,  -- Internal notes by admin/agent
  contacted_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_inquiries_property ON inquiries(property_id);
CREATE INDEX idx_inquiries_user ON inquiries(user_id);
CREATE INDEX idx_inquiries_status ON inquiries(status);
```

**Flow:** User raises inquiry → Admin sees in dashboard → Contacts user → Updates status

---

## 8. Example Queries

**Search properties near location:**
```sql
SELECT p.*, ST_Distance(p.location, ST_MakePoint(77.7064, 12.9539)::geography) AS distance
FROM properties p
WHERE p.property_for = 'rent'
  AND p.city = 'Bangalore'
  AND p.rooms >= 2
  AND p.price BETWEEN 15000 AND 30000
  AND p.status = TRUE
  AND ST_DWithin(p.location, ST_MakePoint(77.7064, 12.9539)::geography, 5000)
ORDER BY distance
LIMIT 20;
```

**Filter by amenities:**
```sql
SELECT * FROM properties
WHERE amenities @> ARRAY['gym', 'parking'] AND status = TRUE;
```

---

## 9. Amenities (Reference)

Available values for `amenities` array:

`gym`, `swimming_pool`, `parking`, `lift`, `security`, `cctv`, `power_backup`, `water_supply`, `gas_pipeline`, `wifi`, `ac`, `geyser`, `washing_machine`, `refrigerator`, `tv`, `modular_kitchen`, `water_purifier`, `garden`, `clubhouse`, `play_area`

---

## Summary

| Table | Purpose |
|-------|---------|
| `users` | User accounts (phone-based auth) |
| `devices` | Push notification tokens |
| `properties` | Listings with address + geo |
| `property_media` | Images/videos |
| `inquiries` | User queries for properties |

**5 tables. Ship it.**

---

# ⚠️ Business Rules & Edge Cases

## Auth Rules
| Rule | Implementation |
|------|----------------|
| OTP rate limit | 3 OTP requests/phone/hour |
| Login attempts | Lock account after 5 failed attempts for 30 min |
| JWT tokens | Access: 15 min, Refresh: 7 days |
| Session | Allow multiple devices |
| Account deletion | Soft delete, hard delete after 30 days |
| Phone change | Requires OTP verification on new number |

## Property Rules
| Rule | Implementation |
|------|----------------|
| Listing limit | 10 properties/owner (free) |
| Image limit | 10 images/property |
| Auto-expiry | 90 days, notify owner 7 days before |
| Moderation | Properties go live immediately (add report system) |
| Owner deletion | Soft delete owner, mark properties inactive |
| Required fields | type, for, price, address, city, state, rooms |

## Inquiry Rules
| Rule | Implementation |
|------|----------------|
| Duplicate prevention | 1 inquiry/user/property/24 hours |
| Rate limit | 10 inquiries/user/day |
| Admin response | Track `contacted_at`, remind if pending > 24h |

## API Rate Limits
| Role | Limit |
|------|-------|
| Guest | 30 req/min |
| User | 100 req/min |
| Owner | 100 req/min |
| Admin | 1000 req/min |

## Data Retention
| Data | Retention |
|------|-----------|
| Soft deleted users | 30 days → hard delete |
| Soft deleted properties | 30 days → hard delete |
| Closed inquiries | 1 year |
| Backups | 30 days rolling |

---

# 🔌 API Endpoints

## Auth
```
POST /auth/send-otp        - Send OTP (register/forgot)
POST /auth/verify-otp      - Verify OTP, get temp token
POST /auth/register        - Set password, create account
POST /auth/login           - Phone + password login
POST /auth/reset-password  - Set new password
POST /auth/refresh         - Refresh JWT
GET  /auth/me              - Get current user
```

## Users
```
GET   /users/me            - Get current user profile
PATCH /users/me            - Update profile (name, email, photo)
```

## Properties
```
GET    /properties                       - List (with filters, pagination)
GET    /properties/:property_id          - Get single property
POST   /properties                       - Create (owner only)
PATCH  /properties/:property_id          - Update (owner only, own property)
DELETE /properties/:property_id          - Delete (owner only, own property)
PATCH  /properties/:property_id/status   - List/Unlist (owner only)
```

## Media
```
POST   /properties/:property_id/media    - Upload images (owner only)
DELETE /media/:media_id                  - Delete image (owner only)
```

## Inquiries
```
POST   /inquiries                        - Raise inquiry (user)
GET    /inquiries                        - List inquiries (admin: all, user: own)
GET    /inquiries/:inquiry_id            - Get single inquiry
PATCH  /inquiries/:inquiry_id            - Update status (admin only)
```

## Admin
```
GET    /admin/users                      - List all users
GET    /admin/users/:user_id             - Get user details
GET    /admin/properties                 - List all properties
PATCH  /admin/properties/:property_id    - Update any property
DELETE /admin/properties/:property_id    - Delete any property
```

---

## Future Migrations (Post-MVP)

**Features:**
- `favorites` - saved properties
- `reviews` - property/owner ratings
- Push notifications
- Agent role & assignment
- Chat system

**Scale Additions:**
- Redis caching (property listings)
- Bull queue (background jobs)
- PgBouncer (connection pooling)
- Meilisearch (full-text search)
- Read replicas (high traffic)

---

# 🚀 Infrastructure (OCI + Cloudflare)

## Single VM Setup (4 OCPU, 24GB RAM)

```yaml
# docker-compose.yml
services:
  cloudflared:
    image: cloudflare/cloudflared:latest
    command: tunnel run
    environment:
      - TUNNEL_TOKEN=${CF_TUNNEL_TOKEN}
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - api
      - web
    restart: unless-stopped

  api:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:${DB_PASS}@db:5432/griha
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=${JWT_SECRET}
      - FIREBASE_PROJECT_ID=${FIREBASE_PROJECT_ID}
    depends_on:
      - db
      - redis
    restart: unless-stopped

  web:
    build: ./frontend
    ports:
      - "4000:4000"
    environment:
      - NEXT_PUBLIC_API_URL=https://api.grihahomes.com
      - NEXT_PUBLIC_FIREBASE_CONFIG=${FIREBASE_CONFIG}
    restart: unless-stopped

  db:
    image: postgis/postgis:16-3.4-alpine
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=griha
      - POSTGRES_PASSWORD=${DB_PASS}
    restart: unless-stopped

  redis:
    image: redis:alpine
    volumes:
      - redisdata:/data
    command: redis-server --appendonly yes
    restart: unless-stopped

volumes:
  pgdata:
  redisdata:
```

## Cloudflare DNS

```
grihahomes.com       → Tunnel → nginx → web
api.grihahomes.com   → Tunnel → nginx → api
```

## Backup Strategy

```bash
# Daily backup to OCI Object Storage
0 2 * * * pg_dump -U postgres griha | gzip | oci os object put -bn griha-backups --file -
```

## Migration Path

Docker-based = portable anywhere. To migrate:
1. `pg_dump` database
2. `docker save` images
3. Move to new server
4. Update Cloudflare tunnel
5. Done

**Zero vendor lock-in.**
