# 📸 Image Guide - Where to Upload and Change Images

## 🗂️ **Where to Upload Images (Simple Way)**

All images should be uploaded to the `public/images/` folder:

```
go-main/
└── public/
    └── images/
        ├── hero/          ← Hero section images
        ├── team/          ← Team member photos
        ├── about/         ← About section images
        ├── portfolio/     ← Portfolio images
        ├── brands/        ← Brand logos
        ├── blog/          ← Blog post images
        └── testimonial/   ← Testimonial images
```

### **Simple Steps to Upload Images:**

1. **Go to the folder:** `Go_-_Next.js_SaaS_Boilerplate_and_Landing_Page_for_Business/go-main/public/images/`
2. **Find the right subfolder** (e.g., `team/`, `hero/`, `about/`)
3. **Copy your image file** into that folder
4. **Use the image path** in the code (see below)

---

## 🔧 **Where to Change Image Paths**

### **1. Team Member Images**
📁 **File:** `src/static-data/team.tsx`

```tsx
export const teamData: Team[] = [
  {
    name: "Rati Janashi",
    designation: "Project Manager",
    image: "/images/team/your-image.jpg",  // ← Change this path
    // ...
  },
  // ...
];
```

**Current team images:**
- Rati Janashi: `/images/hero/image-1.jpg`
- Sophia Martinez: `/images/team/image-2.jpg`
- Marcus Johnson: `/images/testimonial/image-1.jpg`

**To change:** Upload your team photos to `public/images/team/` and update the paths above.

---

### **2. Hero Section Images**
📁 **File:** `src/components/Home/Hero/index.tsx`

**Lines 57-72:**
```tsx
<Image
  src='/images/hero/image-2.png'  // ← Main hero image
  alt='hero-image'
  // ...
/>
<Image
  src='/images/hero/image-1.jpg'  // ← Secondary hero image
  alt='hero-image'
  // ...
/>
```

**To change:** Upload images to `public/images/hero/` and update the paths.

---

### **3. About Section Images**
📁 **File:** `src/components/About/AboutContent.tsx`

**Lines 48-51:**
```tsx
<TabPanel
  image1='/images/about/image-1.jpg'  // ← Change this
  image1Alt='about image 1'
  image2='/images/about/image-2.jpg'  // ← Change this
  image2Alt='about image 2'
>
```

**To change:** Upload images to `public/images/about/` and update the paths.

---

### **4. Logo Images**
📁 **File:** `src/components/Navbar/index.tsx`

Look for lines with:
```tsx
<Image src='/images/logo/logo-dark.svg' />
<Image src='/images/logo/logo-light.svg' />
```

**To change:** Upload your logos to `public/images/logo/` and update the paths.

---

### **5. Brand/Partner Logos**
📁 **File:** `src/components/Brands/index.tsx`

Images are referenced like:
```tsx
src='./images/brands/uideck.svg'
```

**To change:** Upload brand logos to `public/images/brands/` and update the paths.

---

### **6. Portfolio Images**
📁 **File:** `src/static-data/portfolio.ts`

**To change:** Upload portfolio images to `public/images/portfolio/` and update paths in this file.

---

### **7. Testimonial Images**
📁 **File:** `src/static-data/testimonial-data.ts`

**To change:** Upload testimonial images to `public/images/testimonial/` and update paths.

---

## 📝 **Quick Reference - Image Path Format**

All image paths start with `/images/` because:
- Images are in the `public/` folder
- Files in `public/` are served from the root URL (`/`)

**Examples:**
- ✅ Correct: `/images/team/member-1.jpg`
- ❌ Wrong: `./images/team/member-1.jpg` (in some cases)
- ❌ Wrong: `images/team/member-1.jpg` (missing leading slash)

---

## 🎯 **Recommended Image Sizes**

- **Hero images:** 560x520px (main), 350x420px (secondary)
- **Team photos:** ~370x370px (square)
- **About images:** ~344x490px (first), ~315x395px (second)
- **Logos:** Varies, usually SVG format preferred

---

## ✅ **Summary - Simple Steps**

1. **Upload your image** to: `public/images/[folder-name]/`
2. **Update the path** in the corresponding code file
3. **Restart dev server** if needed (`npm run dev`)
4. **Check in browser** - images should appear!

---

**Need help?** All image paths are relative to the `public/` folder, so `/images/hero/image.jpg` means the file is at `public/images/hero/image.jpg`

