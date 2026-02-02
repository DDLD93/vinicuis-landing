# Vinicius International - Next.js Application

This is a [Next.js](https://nextjs.org/) project for Vinicius International, a trusted African enterprise delivering world-class solutions.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `src/components/` - React components
- `src/data/` - Data files and constants
- `public/` - Static assets (images, etc.)

## Build

To build the application for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Environment Variables

Copy `.env.example` to `.env` and fill in:

- **MONGODB_URI** – MongoDB Atlas connection string.
- **CLOUDINARY_CLOUD_NAME**, **CLOUDINARY_API_KEY**, **CLOUDINARY_API_SECRET** – From [Cloudinary Console](https://console.cloudinary.com/) (Dashboard). Required for image uploads; without them, uploads will fail (e.g. on Vercel or in production).
- **ADMIN_EMAIL**, **ADMIN_PASSWORD** – Credentials for admin dashboard login.
- **JWT_SECRET** – Secret for signing session JWTs (min 32 characters). Required for dashboard auth.

On Vercel, set these in **Project → Settings → Environment Variables**.

## Technologies

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Radix UI
- Lucide Icons
