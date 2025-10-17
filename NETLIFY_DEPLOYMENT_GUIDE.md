# 🚀 Netlify Deployment Guide - Prototype Maker Studio

## Quick Start Deployment

### 1️⃣ Prepare Your Repository
```bash
# Make sure you're in the project directory
cd /path/to/AdvantaCustomPrototypes

# Add netlify.toml (already created for you!)
git add netlify.toml
git commit -m "Add Netlify configuration"
git push
```

### 2️⃣ Connect to Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Choose your Git provider (GitHub/GitLab/Bitbucket)
4. Select your repository
5. Netlify will auto-detect Next.js settings

### 3️⃣ Configure Build Settings

Netlify should auto-detect these from `netlify.toml`:
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: 18

### 4️⃣ Set Environment Variables

**CRITICAL**: Go to Site Settings → Environment Variables and add:

```
NEXT_PUBLIC_SUPABASE_URL=https://zpybskouzotcqfzjofjx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpweWJza291em90Y3FmempvZmp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5NzAyOTIsImV4cCI6MjA3NTU0NjI5Mn0.Mr5PMvsdN3tSzc7UMCMavdVO89J3zRxK7e8ssc8zcls
```

### 5️⃣ Deploy!

Click "Deploy site" and Netlify will:
- ✅ Install dependencies
- ✅ Build your Next.js app
- ✅ Deploy to CDN
- ✅ Generate a unique URL

---

## 🔍 Post-Deployment Checks

### Test These URLs:

1. **Homepage**: `https://your-site.netlify.app/`
2. **Portal**: `https://your-site.netlify.app/portal`
3. **Demo**: `https://your-site.netlify.app/demo/demo-001`
4. **Configure**: `https://your-site.netlify.app/portal/client/demo-001/configure`

### Expected Results:
- ✅ All pages load without errors
- ✅ Portal shows list of clients
- ✅ Demo mode shows prototype
- ✅ Configuration page works
- ✅ Navigation buttons work
- ✅ Database connection successful

---

## 🚨 Troubleshooting

### Build Fails
**Check**: 
- Environment variables are set
- Node version is 18+
- Build logs in Netlify dashboard

### "Client Not Found"
**Fix**: 
- Run SQL script in Supabase (`FIX_CALENDAR_CORRECT.sql`)
- Verify database has clients

### Navigation Not Working
**Fix**: 
- Run SQL navigation fix
- Check browser console for errors
- Verify screen IDs match

### Supabase Connection Error
**Fix**: 
- Verify environment variables
- Check Supabase project is active
- Verify API keys are correct

---

## 📊 Performance Optimization

Netlify automatically handles:
- ✅ CDN distribution
- ✅ Asset optimization
- ✅ Gzip compression
- ✅ HTTP/2
- ✅ Automatic SSL

---

## 🔄 Continuous Deployment

Every push to your main branch will trigger:
1. Automatic build
2. Run tests (if configured)
3. Deploy to production
4. Update your live site

---

## 🎯 Custom Domain (Optional)

1. Go to Domain settings
2. Add your custom domain
3. Update DNS records
4. SSL certificate auto-generated

---

## 📈 Monitoring

In Netlify Dashboard you can:
- View deploy logs
- Check build times
- Monitor traffic
- Review errors
- Track performance

---

## 🎉 You're Live!

Your Prototype Maker Studio is now deployed and accessible worldwide!

Share your URL with your team and start creating amazing prototypes! 🚀

