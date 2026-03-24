# How to Add a New Blog Article to Armidillo

This guide is for non-developers. You don't need to know how to code to publish a new article.

---

## What You'll Need

- Access to the GitHub repository (ask your web admin to invite you)
- A text editor (Notepad, TextEdit, or VS Code — free at code.visualstudio.com)
- 30 minutes to write and publish your article

---

## Step 1: Copy an Existing Article File

1. Go to the GitHub repo: `github.com/[your-repo-name]/armidillo-site`
2. Navigate to `pages/learning-center/`
3. Click on any article file (e.g., `just-got-scammed-guide-ca-us.html`)
4. Click the **Raw** button to see the plain HTML
5. Select all → Copy

---

## Step 2: Create Your New Article File

1. Open your text editor and paste the copied content
2. You'll edit the following sections:

### 2a. Update the `<title>` tag (line ~10)
```html
<title>Your Article Title Here | Armidillo</title>
```

### 2b. Update the `<meta name="description">` tag
```html
<meta name="description" content="Your 150-160 character description here. Make it compelling.">
```

### 2c. Update the canonical URL
```html
<link rel="canonical" href="https://www.armidillo.com/learning-center/your-article-slug">
```
> The "slug" is the URL-safe version of your title: all lowercase, words separated by hyphens, no special characters.
> Example: "How to Spot Fake Emails" → `how-to-spot-fake-emails`

### 2d. Update the JSON-LD schema (near the top, inside `<script type="application/ld+json">`)
Change:
- `"headline"`: Your article title
- `"datePublished"`: Today's date in YYYY-MM-DD format (e.g., `2026-04-15`)
- `"dateModified"`: Same as published date for new articles
- The breadcrumb `name` and `item` URL at position 3

### 2e. Update the breadcrumb in the page body
Find: `<li>Old Article Title</li>` near the top
Replace with: `<li>Your New Article Title</li>`

### 2f. Update the category badge and date
Find the colored badge (e.g., `<span ...>Fraud Alerts</span>`) and the date text
Replace with your category and today's date

### 2g. Update the H1
Find: `<h1 style="max-width:20ch">Old Title</h1>`
Replace with your new article title

### 2h. Write your content
Find the `<div style="max-width:72ch;margin:0 auto">` section
Replace the content inside it with your article HTML

---

## Step 3: Add the Aura Affiliate Block

Every article must include the Aura block after the main content. It's already there if you copied from an existing article — just leave it in place.

The Aura affiliate link is always: `https://aurainc.sjv.io/bOKKNk`

**Never change this link.** It's how the site earns revenue.

---

## Step 4: Add the Subscribe Strip

Every article must include the subscribe strip near the bottom:
```html
<!-- KIT FORM EMBED HERE -->
```
This is already present if you copied an existing article. Leave it in place.

---

## Step 5: Save Your File

Save the file with your slug as the filename:
```
your-article-slug.html
```

Example: `how-to-spot-fake-emails.html`

---

## Step 6: Upload to GitHub

1. Go to the GitHub repo
2. Navigate to `pages/learning-center/`
3. Click **Add file → Upload files**
4. Drag and drop your `.html` file
5. Add a commit message: `Add article: [Your Article Title]`
6. Click **Commit changes**

Cloudflare Pages will automatically deploy within 2-3 minutes.

---

## Step 7: Add to the Learning Center Index

1. Open `pages/learning-center/index.html` in GitHub (click the file, then the pencil ✏️ icon to edit)
2. Find the list of article cards near the top of the content
3. Add your new article card at the TOP of the list (newest first):

```html
<a href="./your-article-slug.html" class="card card-link" style="text-decoration:none;display:block;margin-bottom:var(--space-4)">
  <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.5rem">
    <span style="background:#dc2626;color:#fff;font-size:0.7rem;font-weight:600;padding:0.2rem 0.6rem;border-radius:999px;white-space:nowrap">Fraud Alerts</span>
    <span style="color:var(--color-text-muted);font-size:0.8rem">Apr 15, 2026</span>
  </div>
  <h3 style="margin:0 0 0.5rem;font-size:var(--text-base);line-height:1.4">Your Article Title Here</h3>
  <p style="color:var(--color-text-muted);font-size:0.9rem;margin:0">Your article description, 120 characters max…</p>
</a>
```

**Category badge colors:**
- Fraud Alerts: `#dc2626` (red)
- Deep Dives: `#1d4ed8` (blue)
- Senior Protection: `#059669` (green)
- Family Safety: `#7c3aed` (purple)
- Tool Reviews: `#f97316` (orange)
- Crypto Security: `#0891b2` (teal)
- Business Security: `#374151` (grey)
- Case Studies: `#b45309` (amber)
- Threat Briefings: `#be123c` (rose)

---

## Step 8: Update sitemap.xml

1. Open `sitemap.xml` in GitHub
2. Add your new URL entry before the legal pages section:

```xml
  <url>
    <loc>https://www.armidillo.com/learning-center/your-article-slug</loc>
    <lastmod>2026-04-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
```

---

## Quick Checklist Before Publishing

- [ ] Unique `<title>` tag (not copied from another article)
- [ ] Unique `<meta name="description">` (150-160 chars)
- [ ] Correct canonical URL with your slug
- [ ] JSON-LD schema updated (headline, datePublished, breadcrumb item 3)
- [ ] H1 matches your article title
- [ ] Aura block present with correct link (`https://aurainc.sjv.io/bOKKNk`)
- [ ] `<!-- KIT FORM EMBED HERE -->` comment present
- [ ] Author byline says "Armidillo Team"
- [ ] File saved as `your-slug.html`
- [ ] Card added to `learning-center/index.html`
- [ ] Entry added to `sitemap.xml`

---

## Getting Help

Email: info@armidillo.com

If you're unsure about any step, the safest thing is to copy an existing article exactly and only change the content — all the technical wiring is already correct in every existing file.
