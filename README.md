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
- **AWS_ACCESS_KEY_ID**, **AWS_SECRET_ACCESS_KEY**, **AWS_REGION**, **S3_BUCKET** – AWS credentials and S3 bucket for image uploads. Required for admin image uploads; without them, uploads will fail (e.g. on Vercel or in production).
- **S3_PUBLIC_BASE_URL** (optional) – Public base URL for uploaded images, e.g. `https://your-bucket.s3.region.amazonaws.com` or your CloudFront URL. If omitted, URLs are built as `https://{S3_BUCKET}.s3.{AWS_REGION}.amazonaws.com/{key}`.
- **S3_IMAGE_HOSTNAME** (optional) – Hostname for Next.js Image optimization, e.g. `your-bucket.s3.us-east-1.amazonaws.com` or your CloudFront domain. Set this in Vercel (and locally for `next build`) so `next/image` can load S3 images.

  **S3 bucket setup:** Create an S3 bucket, enable “Block public access” settings so that you can use object ACLs, then either set a bucket policy that allows public `GetObject`, or upload objects with ACL `public-read` (the app uses `public-read` on uploads).
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
