# Deployment Guide

This guide walks through deploying the Samarth OS portfolio to Vercel with a production PostgreSQL database and Vercel Blob storage.

## 1. Prepare Environment Variables

Before deploying, you must generate a secure `AUTH_SECRET` for session encryption. Run the following command in your terminal:

```bash
npx auth secret
```

Save the generated token securely.

## 2. Deploy to Vercel

1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and click **Add New...** > **Project**.
3. Import your GitHub repository.
4. Expand the **Environment Variables** section and add the following:
   - `AUTH_SECRET` (the token you just generated)
   - Do NOT add `DATABASE_URL` or `BLOB_READ_WRITE_TOKEN` yet; we will provision these via Vercel Integrations.

Click **Deploy**. The build will likely fail because the database is not yet connected—this is expected.

## 3. Provision PostgreSQL

1. Go to your Vercel project dashboard.
2. Navigate to the **Storage** tab.
3. Click **Create Database** and select **PostgreSQL**.
4. Follow the prompts to create the database and link it to your project. Vercel will automatically inject `DATABASE_URL` into your environment variables.

## 4. Provision Vercel Blob

1. In the **Storage** tab, click **Create Database** again.
2. Select **Vercel Blob**.
3. Follow the prompts to create the store and link it. Vercel will automatically inject `BLOB_READ_WRITE_TOKEN`.

## 5. Initialize the Database

Now that the environment is set up, you must run the database migrations and seed the initial admin user.

1. Go to the **Deployments** tab in Vercel and trigger a **Redeploy**.
2. Once the build finishes successfully, we need to push the schema. You can do this by running a custom build command temporarily or pulling the Vercel env locally:
   ```bash
   vercel env pull .env.production
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

## 6. Configure Domains

1. Go to **Settings** > **Domains**.
2. Add your custom domain (e.g., `samarth.dev`).
3. Set the `www.` subdomain to redirect to the apex domain.
4. Ensure SSL certificates generate successfully (Vercel handles this automatically).

## 7. Troubleshooting & Rollbacks

### White Screen / Client Errors

- Check the **Vercel Runtime Logs** in the project dashboard.
- Ensure all environment variables are correctly populated.

### Stale Content

- If public pages do not reflect updates made in the CMS, log in to the admin dashboard and navigate to **Operations** > **Clear Global Cache**.
- This flushes the Next.js App Router cache.

### Rollback

If a deployment breaks the site:

1. Go to the **Deployments** tab in Vercel.
2. Find the last stable deployment.
3. Click the three dots on the right and select **Promote to Production**. This rollback is instantaneous.
