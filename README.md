# Catalogue Optique

Application Next.js pour la gestion et la consultation d'un catalogue de montures optiques.

## Stack technique

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- NextAuth v5 (authentification admin)
- next-intl (i18n français)
- react-hook-form + Zod (formulaires)
- papaparse (import/export CSV)

## Prérequis

- Node.js >= 18
- PostgreSQL (local ou Docker)
- pnpm ou npm

## Installation

```bash
pnpm install
```

## Variables d'environnement

Copier `.env.example` vers `.env` et adapter :

```env
DATABASE_URL="postgresql://user:pass@localhost:5434/optical_catalog"
NEXTAUTH_SECRET="votre-secret"
NEXTAUTH_URL="http://localhost:3001"
```

## Base de données

```bash
# Démarrer PostgreSQL (Docker)
npm run db:up

# Générer le client Prisma
npm run db:generate

# Lancer les migrations
npm run db:migrate

# Peupler la base
npm run db:seed
```

## Développement

```bash
pnpm dev
```

L'application est disponible sur `http://localhost:3001`.

## Compte admin par défaut

- Email : `admin@example.com`
- Mot de passe : `admin123`

## Build production

```bash
pnpm build
pnpm start
```

## Déploiement Vercel

1. Pousser le repo sur GitHub
2. Créer un projet Vercel lié au repo
3. Ajouter les variables d'environnement dans Vercel
4. Déployer

## Scripts disponibles

| Script | Description |
|--------|-------------|
| `pnpm dev` | Démarre le serveur de développement |
| `pnpm build` | Build de production |
| `pnpm start` | Démarre le serveur de production |
| `pnpm lint` | Lint ESLint |
| `pnpm db:generate` | Génère le client Prisma |
| `pnpm db:migrate` | Applique les migrations |
| `pnpm db:seed` | Peuple la base de données |
| `pnpm db:studio` | Ouvre Prisma Studio |
