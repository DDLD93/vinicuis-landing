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
- **AWS_ACCESS_KEY_ID**, **AWS_SECRET_ACCESS_KEY**, **S3_BUCKET** – S3 credentials and bucket for image uploads (required for admin uploads). Use **AWS_REGION** (e.g. `us-east-1`) for AWS S3.
- **S3_URL** (optional) – Custom S3-compatible endpoint (e.g. MinIO). When set, uploads use this endpoint with path-style URLs.
- **S3_PUBLIC_BASE_URL** (optional) – Public base URL for uploaded images. If omitted, URLs are built from your bucket/region or from S3_URL when using MinIO.
- **S3_IMAGE_HOSTNAME** (optional) – Hostname for Next.js Image optimization. Set in Vercel so `next/image` can load S3 images.

  **S3 bucket setup:** See **[docs/S3-SETUP.md](docs/S3-SETUP.md)** for a step-by-step guide (create bucket, permissions, IAM, env vars, testing). “Block public access” settings so that you can use object ACLs, then either set a bucket policy that allows public `GetObject`, or upload objects with ACL `public-read` (the app uses `public-read` on uploads).
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
