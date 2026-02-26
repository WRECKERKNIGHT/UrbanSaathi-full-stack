# 🚀 UrbanSaathi Free Deployment Guide

This guide will walk you through deploying **UrbanSaathi** completely for free using modern cloud platforms. No credit card is required.

---

## 🛠️ Phase 0: GitHub Repository Setup
Before deploying, your code must be on GitHub. Follow these steps precisely:

1.  **Create Repository on GitHub**:
    - Go to [github.com/new](https://github.com/new).
    - Repository Name: `urbansaathi`.
    - Public/Private: **Public** (recommended for free tier ease).
    - **Do NOT** initialize with README, license, or gitignore (since we already have them).
    - Click **Create repository**.

2.  **Push Local Code to GitHub**:
    Open your terminal in the `kaamsetu` (UrbanSaathi) root folder and run:
    ```bash
    # 1. Initialize git (if not already done)
    git init

    # 2. Add all files to staging
    git add .

    # 3. Commit the changes
    git commit -m "Initial commit: UrbanSaathi platform"

    # 4. Rename main branch
    git branch -M main

    # 5. Link to your GitHub (Replace [USERNAME] with yours)
    git remote add origin https://github.com/[USERNAME]/urbansaathi.git

    # 6. Push to GitHub
    git push -u origin main
    ```

---

## 🏗️ Phase 1: Database Setup (Supabase)
Supabase provides a managed PostgreSQL database.

1.  **Sign Up**: Log in at [supabase.com](https://supabase.com).
2.  **Project Creation**:
    - **Name**: `UrbanSaathi`.
    - **Region**: Choose the one with the lowest latency (e.g., `South Asia (Mumbai)`).
    - **Password**: Use a strong password (no special characters like `@` or `:` to avoid URL encoding issues).
3.  **Critical Database Config**:
    - Go to **SQL Editor** > **New Query**.
    - Run: `CREATE EXTENSION IF NOT EXISTS postgis;` (Required for geo-location features).
4.  **Connection URI**:
    - Go to **Project Settings** > **Database**.
    - Scroll to **Connection string** > **URI**.
    - Use the **Transaction Mode** (Port 6543) for best performance on Render.
    - Example: `postgresql://postgres:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true`

---

## ⚙️ Phase 2: Backend Deployment (Render)
Render hosts your NestJS API.

1.  **New Web Service**: Click **New +** > **Web Service** on [render.com](https://render.com).
2.  **Connect Repo**: Select your `urbansaathi` GitHub repo.
3.  **Build Settings**:
    - **Root Directory**: **Leave this EMPTY** (Delete anything in this box).
    - **Build Command**: `cd backend && npm install && npm run build`
    - **Start Command**: `cd backend && npm run start:prod`
4.  **Environment Variables** (Advanced > Add Environment Variable):
    - `PORT`: `4000`
    - `DATABASE_URL`: *[Your Supabase URI]*
    - `JWT_SECRET`: *[A random string like 'urbansaathi_cyber_2024']*
    - `FRONTEND_URL`: *[Wait for Vercel URL in Phase 3]*
5.  **Note**: The first deployment takes ~3-5 minutes. Render's free tier sleeps after 15m of inactivity.

---

## 🎨 Phase 3: Frontend Deployment (Vercel)
Vercel hosts your Next.js frontend.

1.  **Import**: In [vercel.com](https://vercel.com), click **Add New** > **Project** and import your repo.
2.  **Root Directory**: Set to `frontend`.
3.  **Environment Variables**:
    - `NEXT_PUBLIC_API_URL`: `https://your-backend-name.onrender.com`
4.  **Deploy**: Vercel automatically detects Next.js settings. Click **Deploy**.

---

## 🔍 Phase 4: Troubleshooting & FAQ

| Issue | Solution |
| :--- | :--- |
| **Render 502/Timeout** | This usually means the backend is "waking up". Wait 30 seconds and refresh. |
| **PostGIS Error** | Ensure you ran `CREATE EXTENSION IF NOT EXISTS postgis;` in Supabase SQL editor. |
| **CORS Error** | Ensure `FRONTEND_URL` in Render matches your Vercel URL (including `https://`). |
| **Build Fails** | Ensure you pushed the `package-lock.json` and didn't change the directory structure. |

---

> [!TIP]
> Use **UptimeRobot** (Free) to ping your Render URL every 10 minutes to prevent it from sleeping!

