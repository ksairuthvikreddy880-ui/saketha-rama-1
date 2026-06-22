# MongoDB Setup Guide for SRI Website

This application uses **MongoDB** as its database instead of Supabase.

## 📋 What's Included

### Database Models:
- **User** - User authentication (name, email, password)
- **Blog** - Blog posts (title, slug, content, status, etc.)
- **Contact** - Contact form submissions
- **Newsletter** - Email subscribers

### Connection:
- `lib/mongodb.ts` - MongoDB connection utility with caching
- All models in `models/` folder

---

## 🚀 Setup Options

### Option 1: Local MongoDB (Development)

1. **Install MongoDB locally:**
   - Download from: https://www.mongodb.com/try/download/community
   - Install and start MongoDB service

2. **Update `.env.local`:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/sri_website
   ```

3. **That's it!** The app will automatically connect to your local MongoDB.

---

### Option 2: MongoDB Atlas (Cloud - Recommended for Production)

1. **Create Free MongoDB Atlas Account:**
   - Go to: https://cloud.mongodb.com
   - Sign up for free

2. **Create a Cluster:**
   - Click "Build a Database"
   - Choose **FREE** (M0) tier
   - Select a region (closest to your users)
   - Click "Create Cluster"

3. **Create Database User:**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `admin` (or any name you want)
   - Password: Generate a secure password (save it!)
   - Database User Privileges: "Atlas Admin"
   - Click "Add User"

4. **Whitelist Your IP:**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access From Anywhere" (for development)
   - Or add your specific IP address
   - Click "Confirm"

5. **Get Connection String:**
   - Go back to "Database" (Clusters)
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/`

6. **Update `.env.local`:**
   ```env
   MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/sri_website
   ```
   - Replace `YOUR_PASSWORD` with your actual database user password
   - Add `/sri_website` at the end for the database name

---

## ✅ Verify Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Check the console - you should see no MongoDB connection errors

3. Test features:
   - Sign up a user at `/auth`
   - Submit contact form
   - Subscribe to newsletter
   - Create a blog post in admin panel

---

## 📊 View Your Data

### Local MongoDB:
- Use **MongoDB Compass** (GUI): https://www.mongodb.com/products/compass
- Connect to: `mongodb://localhost:27017`

### MongoDB Atlas:
- Use the Atlas web interface
- Go to "Browse Collections" in your cluster

---

## 🔧 Current Authentication

**Note:** User authentication currently uses **localStorage** (browser storage) for simplicity.

To switch to MongoDB-based authentication:
- Update `/auth` sign-in/sign-up forms to call API routes
- Hash passwords with bcrypt before storing
- Create JWT sessions

---

## 📝 Environment Variables

Complete `.env.local` example:

```env
# Gmail SMTP
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password

# MongoDB
MONGODB_URI=mongodb+srv://admin:password@cluster0.xxxxx.mongodb.net/sri_website

# Or for local:
# MONGODB_URI=mongodb://localhost:27017/sri_website
```

---

## 🎯 Next Steps

1. Choose your MongoDB setup (local or Atlas)
2. Update `MONGODB_URI` in `.env.local`
3. Restart dev server
4. Start building!

---

## 💡 Tips

- **Development:** Use local MongoDB for faster iteration
- **Production:** Use MongoDB Atlas (free tier works great)
- **Backup:** Atlas provides automatic backups
- **Monitoring:** Atlas dashboard shows database metrics

---

## 🆘 Troubleshooting

**Connection Error:**
- Check `MONGODB_URI` format
- Verify database user password
- Check IP whitelist in Atlas
- Ensure MongoDB service is running (local)

**Authentication Error:**
- Verify database user exists
- Check password is correct
- Ensure user has proper permissions

**Timeout Error:**
- Check network/firewall
- Try "Allow Access From Anywhere" in Atlas
- Verify cluster is running

---

## 📚 Resources

- MongoDB Docs: https://docs.mongodb.com
- Mongoose Docs: https://mongoosejs.com
- Atlas Guide: https://docs.atlas.mongodb.com

---

**Ready to build! 🚀**
