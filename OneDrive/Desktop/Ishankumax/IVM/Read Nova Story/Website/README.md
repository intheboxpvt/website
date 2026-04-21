# Read Nova Story (Full-Stack eCommerce)

Modern comic book eCommerce platform:

- Customer storefront (Next.js / React)
- Admin dashboard (JWT admin login)
- Backend API (Express + MongoDB)
- Amazon order intake endpoint (Zapier-ready)

## Folder Structure

- `apps/web` Next.js customer site + admin UI
- `apps/api` Express API + MongoDB models
- `packages/shared` reserved for shared code/types (optional)

## Setup (Local)

### 1) Prereqs

- Node.js 20+
- MongoDB running locally (or a MongoDB Atlas URI)

### 2) Configure env files

Copy examples:

- `apps/api/.env.example` -> `apps/api/.env`
- `apps/web/.env.example` -> `apps/web/.env`

Update `apps/api/.env`:

- `MONGODB_URI`
- `JWT_SECRET`
- `ADMIN_EMAIL`, `ADMIN_PASSWORD` (seeded on first API boot)
- `CORS_ORIGIN` (default `http://localhost:3000`)

### 3) Install dependencies

From repo root:

```powershell
npm install
```

### 4) Run (web + api)

```powershell
npm run dev
```

- Web: http://localhost:3000
- API: http://localhost:4000/health

## Key Endpoints

- `GET /api/products` list + filters (`q`, `category`, `minPrice`, `maxPrice`, `sort`)
- `GET /api/products/featured`
- `GET /api/products/:slug`
- `POST /api/orders` create website order (checkout)
- `GET /api/orders` admin list
- `PATCH /api/orders/:id/status` admin update status
- `POST /api/auth/admin/login` admin JWT login
- `GET /api/admin/overview` admin metrics

### Amazon Intake (Automation)

`POST /api/amazon-orders`

```json
{
  "orderId": "AMZ-123",
  "productName": "Nova Eclipse: Issue #1",
  "customerName": "Jane Doe",
  "address": "221B Baker Street",
  "status": "Pending",
  "source": "amazon"
}
```

## Sample Data

The API seeds a few sample products automatically if the `products` collection is empty.

## Deployment Notes

- Web: deploy `apps/web` to Vercel, set `NEXT_PUBLIC_API_URL` to your API URL.
- API: deploy `apps/api` to Render/Railway/Fly.io; set env vars and allow CORS from your web domain.
- MongoDB: use MongoDB Atlas for production.

