# 📧 Email Integration Setup Guide

## Overview
Your contact forms are now integrated with **Resend** - a modern email API perfect for Next.js applications.

---

## 🚀 Setup Steps

### **Step 1: Create Resend Account**

1. Go to [https://resend.com](https://resend.com)
2. Click "Sign Up" or "Get Started"
3. Sign up with your email or GitHub account
4. Verify your email address

### **Step 2: Get Your API Key**

1. Once logged in, go to **API Keys** in the Resend dashboard
2. Click **"Create API Key"**
3. Give it a name (e.g., "West Berg Europe Production")
4. Select permissions: **Sending access**
5. Click **"Create"**
6. **Copy the API key** (it starts with `re_...`)
   - ⚠️ **Important:** You can only see this once! Save it securely

### **Step 3: Add API Key to Environment Variables**

Open your `.env.local` file and add:

```bash
# Resend Email Service
RESEND_API_KEY=re_your_api_key_here
```

Your complete `.env.local` should now look like:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://beujrjipfmeviidtului.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Resend Email Service  
RESEND_API_KEY=re_your_actual_api_key_here
```

### **Step 4: Install Resend Package**

Run this command in your terminal:

```bash
cd /Users/nika/Desktop/westberg/westberg-eu.de
npm install resend
```

### **Step 5: Verify Sender Email (Important!)**

By default, Resend lets you send from `onboarding@resend.dev` for testing (100 emails/day).

**For production, you need to verify your domain:**

1. In Resend dashboard, go to **Domains**
2. Click **"Add Domain"**
3. Enter your domain: `westberg-eu.de`
4. Follow the instructions to add DNS records:
   - **SPF** record
   - **DKIM** records
   - **DMARC** record (optional)
5. Wait for verification (usually 5-30 minutes)

Once verified, update the API route:

```typescript
// In src/app/api/contact/route.ts
from: 'West Berg Europe <noreply@westberg-eu.de>', // Change this after domain verification
```

**For testing without domain verification:**

```typescript
from: 'West Berg Europe <onboarding@resend.dev>',
```

### **Step 6: Test the Integration**

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Go to a listing page (e.g., a car listing)
3. Fill out the contact form
4. Click "Send Request"
5. Check your email at `ceo@westberg-eu.de`

---

## 📧 How It Works

### **When someone submits a contact form:**

1. Form data is sent to `/api/contact`
2. API validates the data
3. Resend sends a beautiful HTML email to `ceo@westberg-eu.de`
4. You receive the inquiry with:
   - Customer name
   - Contact info
   - Message
   - Listing details (car/yacht/real estate)
   - Professional formatting

### **Email Template Includes:**

- 🚗 Listing information (title, type, ID)
- 👤 Customer details (name, mobile, address)
- 🏢 Customer type (private/business)
- 💬 Their message
- 📧 Reply-to address (if email provided)

---

## 💰 Resend Pricing

### **Free Tier** (Perfect to start):
- ✅ 3,000 emails per month
- ✅ 100 emails per day
- ✅ All features included

### **Pro Plan** ($20/month):
- 50,000 emails per month
- Higher daily limits
- Advanced analytics

---

## 🔧 Configuration

### **Change Recipient Email:**

Edit `src/app/api/contact/route.ts`:

```typescript
to: ['ceo@westberg-eu.de', 'sales@westberg-eu.de'], // Add multiple recipients
```

### **Customize Email Template:**

The HTML template is in `src/app/api/contact/route.ts`.
You can modify colors, layout, and styling in the `html` field.

---

## 🧪 Testing

### **Test with Resend's Test Mode:**

```typescript
// For testing only - add to .env.local
RESEND_API_KEY=re_test_1234567890  // Test API key
```

Test emails will appear in the Resend dashboard but won't actually send.

---

## 🐛 Troubleshooting

### **Error: "Missing API key"**
- Make sure `RESEND_API_KEY` is in `.env.local`
- Restart your dev server after adding env vars

### **Error: "Failed to send email"**
- Check your API key is correct
- Verify you haven't exceeded daily limits
- Check Resend dashboard for error logs

### **Email not received:**
- Check spam folder
- Verify sender domain is configured
- Use `onboarding@resend.dev` for testing first

### **Domain not verified:**
- Wait 30 minutes for DNS propagation
- Verify DNS records are correct
- Use [MXToolbox](https://mxtoolbox.com/) to check DNS

---

## 📚 Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend Next.js Guide](https://resend.com/docs/send-with-nextjs)
- [Domain Verification Guide](https://resend.com/docs/dashboard/domains/introduction)

---

## ✅ Checklist

- [ ] Created Resend account
- [ ] Got API key
- [ ] Added `RESEND_API_KEY` to `.env.local`
- [ ] Ran `npm install resend`
- [ ] Restarted dev server
- [ ] Tested contact form
- [ ] (Optional) Verified domain
- [ ] Updated sender email after verification

---

## 🎉 You're Done!

Your contact forms now send professional emails to your inbox. Every inquiry will be delivered instantly with all the customer details you need to respond quickly!

