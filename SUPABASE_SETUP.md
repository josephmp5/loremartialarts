# Supabase + Vercel Setup Guide

## 🚀 Quick Setup Steps

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" and sign up/login
3. Click "New Project"
4. Choose your organization
5. Fill in:
   - **Name**: `lore-bjj-admin`
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
6. Click "Create new project"
7. Wait for project to be ready (2-3 minutes)

### 2. Get Your Supabase Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (starts with `https://`)
   - **anon public** key (starts with `eyJ`)
   - **service_role** key (starts with `eyJ`)

### 3. Update Environment Variables

1. Open `.env.local` in your project
2. Replace the placeholder values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 4. Set Up Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the entire content from `supabase-schema.sql`
4. Click "Run" to create all tables and policies

### 5. Create Admin User

1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click "Add user"
3. Enter:
   - **Email**: `admin@lorebjj.com` (or your email)
   - **Password**: Create a strong password
4. Click "Create user"

### 6. Test Your Setup

1. Run your development server:
   ```bash
   npm run dev
   ```

2. Visit these URLs to test:
   - **Main site**: `http://localhost:3000/loremartialarts`
   - **Blog**: `http://localhost:3000/loremartialarts/blog`
   - **Admin login**: `http://localhost:3000/loremartialarts/admin/login`
   - **Admin dashboard**: `http://localhost:3000/loremartialarts/admin`

3. Login with your admin credentials

### 7. Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables in Vercel dashboard:
   - Go to **Settings** → **Environment Variables**
   - Add the same three variables from your `.env.local`
6. Click "Deploy"

## 🎯 What You Get

### Admin Panel Features
- ✅ **Dashboard** with stats and quick actions
- ✅ **Blog Management** - Create, edit, publish posts
- ✅ **Gallery Management** - Upload and manage training images
- ✅ **Image Upload** - Upload featured images for blog posts and gallery
- ✅ **Contact Form** handling
- ✅ **User Authentication** - Secure admin access
- ✅ **Real-time Updates** - See changes instantly

### Blog Features
- ✅ **Beautiful Blog** - Matches your site design
- ✅ **SEO Optimized** - Individual post pages
- ✅ **Responsive Design** - Works on all devices
- ✅ **Image Upload** - Upload and manage featured images
- ✅ **Categories** - Organize your content
- ✅ **Rich Text Editor** - HTML content support

### Database Tables
- `blog_posts` - Your blog content
- `blog_categories` - Post categories
- `training_gallery` - Training moment images
- `contact_submissions` - Contact form data
- `training_locations` - Your training spots

## 🔧 Customization

### Adding New Blog Categories
1. Go to Supabase dashboard → **Table Editor** → `blog_categories`
2. Click "Insert" → "Insert row"
3. Add your category

### Styling
- All styles are inline and match your existing design
- Colors use your brand palette (`#dc2626`, `#f5f5dc`, etc.)
- Fonts use your custom fonts (`Go3v2`, `Manga`)

### Adding More Features
- **Comments**: Add a `comments` table
- **Newsletter**: Add email subscription
- **Events**: Add training event management
- **Gallery**: Add photo management

## 🆘 Troubleshooting

### Common Issues

**"Invalid API key" error**
- Check your environment variables are correct
- Make sure you're using the right keys (anon vs service_role)

**"Table doesn't exist" error**
- Run the SQL schema again in Supabase
- Check table names match exactly

**"Authentication failed" error**
- Check your admin user exists in Supabase
- Verify email/password are correct

**Styling issues**
- Check browser console for errors
- Verify all CSS is properly escaped in JSX

### Getting Help
- Check Supabase docs: [supabase.com/docs](https://supabase.com/docs)
- Check Vercel docs: [vercel.com/docs](https://vercel.com/docs)
- Check Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)

## 💰 Cost Breakdown

### Free Tier (Perfect for starting)
- **Vercel**: $0/month
- **Supabase**: $0/month
- **Total**: $0/month

### When you grow (if needed)
- **Vercel**: Still $0 (generous free tier)
- **Supabase Pro**: $25/month
- **Total**: $25/month

## 🎉 You're All Set!

Your LORE BJJ website now has:
- ✅ Professional admin panel
- ✅ Beautiful blog system
- ✅ Contact form handling
- ✅ Secure authentication
- ✅ Database management
- ✅ Easy content updates

Start creating your first blog post and managing your BJJ community! 🥋
