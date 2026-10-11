<div align="center">

# 👓 Optic Practice: Luxury Eyewear & Catalog System

**Precision Optical Inventory & Boutique Practice Platform with Next.js 16, Prisma & PostgreSQL**

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3-black.svg?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB.svg?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-7.9-2D3748.svg?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1.svg?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![NextAuth.js v5](https://img.shields.io/badge/NextAuth.js-v5_Beta-purple.svg?logo=next.js&logoColor=white)](https://authjs.dev/)
[![Playwright](https://img.shields.io/badge/Testing-Playwright%20%2B%20Vitest-2EAD33.svg?logo=playwright&logoColor=white)](playwright.config.ts)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

*Architected & Engineered by **[Iliass Wakkar](https://www.wakkar.net)***

---

</div>

## 📌 Executive Summary

While standard e-commerce platforms treat accessories with generic sizing metrics (S, M, L), **eyewear is precision biometric hardware**:

1. **Dimensional Precision**: Eyeglasses require three strict physical metrics:
   - **Lens Width (Caliber)**: (e.g., 48mm – 58mm) determines pupillary distance fit.
   - **Bridge Width**: (e.g., 16mm – 22mm) dictates nose-pad seating and pressure.
   - **Temple Length**: (e.g., 140mm – 150mm) determines cranial ear curvature.
   *A variance of 2mm can lead to optical aberration, temple pressure, or frame slippage.*
2. **Mounting Typology**: Frames are categorized by physical structure:
   - `FULL_RIM`: Standard continuous frame enclosure.
   - `SEMI_RIMLESS`: Nylon thread under-slung suspensions.
   - `RIMLESS`: Titanium drill mounts requiring strict lens refractive index pairing.
3. **Facial Geometry Harmony**: Facial aesthetics dictate frame geometries (Aviator, Browline, Cat-Eye, Geometric, Oval, Rectangle, Round, Square).
4. **Boutique Practice Management**: High-end optical shops manage collections across premier design houses (Moscot, Oliver Peoples, Jacques Marie Mage, Gucci, Persol) requiring real-time SKU tracking, pricing precision, and catalog discovery.

**Optic Practice** is an enterprise-grade digital catalog and practice inventory management platform engineered to satisfy the rigorous data specifications of the modern optical and ophthalmic retail industry.

---

## 🏗️ Relational Architecture (Prisma & PostgreSQL)

Unstructured JSON fields are avoided in favor of strict PostgreSQL schema constraints using **Prisma ORM**:

```prisma
enum Gender {
  MEN
  WOMEN
  UNISEX
  KIDS
}

enum FrameType {
  FULL_RIM
  RIMLESS
  SEMI_RIMLESS
}

enum Shape {
  RECTANGLE
  SQUARE
  ROUND
  OVAL
  CAT_EYE
  AVIATOR
  BROWLINE
}

model Product {
  id            String         @id @default(cuid())
  reference     String         @unique
  name          String
  slug          String         @unique
  description   String?
  price         Decimal?       @db.Decimal(10, 2) // Prevents floating-point rounding errors
  gender        Gender
  frameType     FrameType
  shape         Shape
  material      String?
  color         String?
  lensWidth     Int?           // Millimeter caliber
  bridgeWidth   Int?           // Millimeter nose bridge
  templeLength  Int?           // Millimeter branch length
  brandId       String
  brand         Brand          @relation(fields: [brandId], references: [id])
  categoryId    String
  category      Category       @relation(fields: [categoryId], references: [id])
  images        ProductImage[]
  isActive      Boolean        @default(true)
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
}

model ProductImage {
  id        String  @id @default(cuid())
  url       String
  alt       String?
  sortOrder Int     @default(0)
  productId String
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
}
```

### Relational Safeguards:
- **Financial Accuracy**: Stored via `@db.Decimal(10, 2)` to eliminate floating-point arithmetic errors during tax calculations and invoicing.
- **Cascade Deletion**: Product media galleries cascade on product deletion (`onDelete: Cascade`), precluding orphan assets.
- **SKU & Slug Integrity**: Unique indices on `reference` and `slug` prevent duplicate catalog listings.

---

## 🔍 Faceted Search & Dynamic Query Filtering

Optical practitioners and clients can filter thousands of frame references down to exact anatomical dimensions. Filtering parameters synchronize directly with browser URL query strings, allowing practitioners to share consultation links (e.g., `?shape=AVIATOR&frameType=RIMLESS&minLensWidth=50`):

```typescript
export async function getFilteredProducts(filters: CatalogFilters) {
  const where: Prisma.ProductWhereInput = {
    isActive: true,
    ...(filters.brand && { brand: { slug: filters.brand } }),
    ...(filters.category && { category: { slug: filters.category } }),
    ...(filters.gender && { gender: filters.gender }),
    ...(filters.frameType && { frameType: filters.frameType }),
    ...(filters.shape && { shape: filters.shape }),
    ...(filters.minLensWidth && { lensWidth: { gte: filters.minLensWidth } }),
    ...(filters.maxLensWidth && { lensWidth: { lte: filters.maxLensWidth } }),
  };

  return await prisma.product.findMany({
    where,
    include: {
      brand: true,
      category: true,
      images: { orderBy: { sortOrder: 'asc' } },
    },
    orderBy: { createdAt: 'desc' },
  });
}
```

---

## 🧪 Production Quality Assurance (Playwright & Vitest)

To guarantee that inventory adjustments, brand deletions, and authentication boundaries never regress in production:

```
Testing Pipeline:
├── End-to-End (E2E) Suites (Playwright)
│   ├── auth.spec.ts        : Session guards & credentials login flows
│   ├── catalogue.spec.ts   : Faceted filtering, URL synchronization & search
│   ├── brands.spec.ts      : Brand CRUD & foreign key cascade safeguards
│   └── dashboard.spec.ts   : Inventory KPI metrics & product editing
└── Unit & Integration Suites (Vitest)
    ├── csv.test.ts         : Delimiter, character set & schema validation
    └── seed.test.ts        : Database seeding determinism
```

```bash
# Run End-to-End Tests
npx playwright test

# Run Unit / Integration Tests
npm run test
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or 20+
- PostgreSQL database (Local or Docker)
- pnpm or npm

### Environment Configuration
Create a `.env` file in the project root:
```env
DATABASE_URL="postgresql://user:pass@localhost:5434/optical_catalog"
NEXTAUTH_SECRET="your-secure-secret-key"
NEXTAUTH_URL="http://localhost:3001"
```

### Installation & Launch

1. **Clone repository**:
   ```bash
   git clone https://github.com/iliass-wakkar/optic.git
   cd optic
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Start PostgreSQL via Docker & initialize schema**:
   ```bash
   # Launch Docker container
   npm run db:up

   # Generate Prisma client
   npm run db:generate

   # Apply database migrations
   npm run db:migrate

   # Seed initial brands, categories & frames
   npm run db:seed
   ```

4. **Start Development Server**:
   ```bash
   pnpm dev
   ```

5. **Access Application**:
   - Public Luxury Showroom: `http://localhost:3001`
   - Administrative Management: `http://localhost:3001/admin`

---

## 📂 Repository Structure

```
optique/
├── e2e/                      # Playwright end-to-end test specifications
├── prisma/
│   ├── schema.prisma         # Precision optical domain data model
│   └── seeds/seed.ts         # Database seeder for luxury brands & SKUs
├── src/
│   ├── app/                  # Next.js 16 App Router
│   │   ├── (public)/         # Client-facing catalog & faceted filters
│   │   ├── admin/            # Inventory dashboard, CSV import & brand CRUD
│   │   └── api/              # Secure endpoints, NextAuth & export handlers
│   ├── components/           # Reusable UI widgets & frame cards
│   ├── features/             # Domain vertical slices (products, brands, categories)
│   └── lib/                  # Prisma client singleton & query utilities
├── public/                   # Static assets & frame photography
├── docker-compose.yml        # PostgreSQL container configuration
├── playwright.config.ts      # Automated browser test configuration
├── vitest.config.ts          # Unit test runner settings
├── package.json              # Next.js 16, React 19, Prisma 7, NextAuth v5
└── README.md                 # Production architecture documentation
```

---

## 👤 Author

**Iliass Wakkar**
- Portfolio: [wakkar.net](https://www.wakkar.net)
- GitHub: [@iliass-wakkar](https://github.com/iliass-wakkar)
- LinkedIn: [linkedin.com/in/iliass-wakkar-940233335](https://www.linkedin.com/in/iliass-wakkar-940233335/)
- Case Study: [Optic Practice Platform Case Study](https://www.wakkar.net/projects/optic-practice-catalog-platform)

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
