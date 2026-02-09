# Step-by-step: S3 bucket setup (replacing Cloudinary)

Follow these steps in order to use AWS S3 for image uploads.

---

## Step 1: Create an AWS account (if you don’t have one)

1. Go to [https://aws.amazon.com](https://aws.amazon.com).
2. Click **Create an AWS Account** and complete sign-up.

---

## Step 2: Create an S3 bucket

1. Sign in to the [AWS Console](https://console.aws.amazon.com).
2. Open **S3** (search “S3” in the top search bar).
3. Click **Create bucket**.
4. **Bucket name:** choose a unique name (e.g. `vinicius-web-uploads`). Note it; you’ll use it as `S3_BUCKET`.
5. **AWS Region:** choose a region (e.g. `us-east-1`). Note it; you’ll use it as `AWS_REGION`.
6. Leave **Block all public access** **checked** for now (we’ll allow access in the next step).
7. Click **Create bucket**.

---

## Step 3: Allow public read for uploaded images

You have two options. Use **one** of them.

### Option A: Use object ACLs (simplest)

1. In S3, open your bucket.
2. Go to the **Permissions** tab.
3. Under **Block public access (bucket settings)**, click **Edit**.
4. **Uncheck** “Block public access to buckets and objects granted through new access control lists (ACLs)”.
5. Save. Confirm by typing `confirm`.
6. The app will set `ACL: public-read` on each uploaded object so it can be viewed by URL.

### Option B: Use a bucket policy (no ACLs)

1. In S3, open your bucket → **Permissions** tab.
2. Under **Bucket policy**, click **Edit**.
3. Paste a policy like this (replace `YOUR-BUCKET-NAME` with your bucket name):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/vini-web-app/*"
    }
  ]
}
```

4. Save.
5. If you use Option B, you can remove `ACL: "public-read"` from `app/api/upload/route.ts` (PutObjectCommand) so the bucket policy alone controls access.

---

## Step 4: Create IAM credentials (access key)

1. In the AWS Console, open **IAM** (search “IAM”).
2. In the left menu, click **Users** → **Create user**.
3. **User name:** e.g. `vinicius-s3-uploader`.
4. Click **Next**.
5. Choose **Attach policies directly** and click **Create policy** (opens a new tab).
6. In the policy editor:
   - **Service:** S3.
   - **Actions:** under “Write”, select `PutObject`; if you use ACLs (Option A), also select `PutObjectAcl`.
   - **Resources:** choose “Bucket” and your bucket; then “Object” and add `arn:aws:s3:::YOUR-BUCKET-NAME/vini-web-app/*`.
7. Click **Next** → name the policy (e.g. `ViniciusS3Upload`) → **Create policy**.
8. Go back to the “Create user” tab, refresh the policy list, select `ViniciusS3Upload`, then **Next** → **Create user**.
9. Click the new user → **Security credentials** tab → **Create access key**.
10. Choose **Application running outside AWS** → **Next** → **Create access key**.
11. Copy the **Access key ID** and **Secret access key** and store them safely (you’ll use them as `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`). You won’t see the secret again.

---

## Step 5: Set environment variables locally

1. In your project root, open or create `.env.local` (it’s gitignored).
2. Add (replace with your real values):

```env
# S3 (required for image uploads)
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
S3_BUCKET=vinicius-web-uploads
```

3. Optional – if you use a custom URL for images (e.g. CloudFront):

```env
S3_PUBLIC_BASE_URL=https://your-cloudfront-domain.cloudfront.net
```

4. Optional – for Next.js `<Image>` optimization (use your bucket host or CloudFront domain):

```env
S3_IMAGE_HOSTNAME=vinicius-web-uploads.s3.us-east-1.amazonaws.com
```

5. Save the file.

**Using MinIO or another S3-compatible endpoint:** Set `S3_URL` to your endpoint (e.g. `https://minio.example.com`). The app will use path-style URLs and this endpoint for uploads. Set `S3_PUBLIC_BASE_URL` to the public URL where objects are readable (e.g. the same MinIO URL or a reverse proxy). `AWS_REGION` can be any value (e.g. `us-east-1`) when using a custom endpoint.

---

## Step 6: Set environment variables on Vercel (if you deploy there)

1. Open your project on [Vercel](https://vercel.com) → **Settings** → **Environment Variables**.
2. Add the same variables as in Step 5:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`
   - `S3_BUCKET`
   - Optionally: `S3_PUBLIC_BASE_URL`, `S3_IMAGE_HOSTNAME`
3. Select the environments (Production, Preview, Development) where you want them.
4. Save. Redeploy the project so the new env vars are applied.

---

## Step 7: Test the upload

1. From the project root, run:

```bash
npm run dev
```

2. Open [http://localhost:3000/admin](http://localhost:3000/admin) and log in.
3. Go to **News** or **Gallery** or **Divisions** and create/edit an item with an image upload.
4. Upload an image. If it succeeds, the image URL should point to your S3 bucket (e.g. `https://your-bucket.s3.region.amazonaws.com/vini-web-app/news/...`).
5. Open that URL in a browser; the image should load. If it doesn’t, double-check Step 3 (public read) and Step 4 (IAM permissions).

---

## Quick checklist

- [ ] Step 1: AWS account
- [ ] Step 2: S3 bucket created (name + region noted)
- [ ] Step 3: Public read enabled (Option A or B)
- [ ] Step 4: IAM user + access key created and saved
- [ ] Step 5: `.env.local` filled with AWS + S3 variables
- [ ] Step 6: Vercel env vars set (if you use Vercel)
- [ ] Step 7: Upload tested in admin

---

## Troubleshooting

| Problem | What to check |
|--------|----------------|
| “S3 is not configured” | Set `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `S3_BUCKET`. For AWS S3 also set `AWS_REGION`. For MinIO set `S3_URL`. Restart `npm run dev` after changing `.env.local`. |
| “Access Denied” on upload | IAM user has `PutObject` (and `PutObjectAcl` if using ACLs) on the bucket/prefix `vini-web-app/*`. |
| Image URL returns 403 | Public read: either ACL `public-read` (Option A) or bucket policy (Option B) for `vini-web-app/*`. |
| Next.js Image broken for S3 URLs | Set `S3_IMAGE_HOSTNAME` to your bucket host (e.g. `bucket.s3.region.amazonaws.com`) or CloudFront domain, and redeploy. |
