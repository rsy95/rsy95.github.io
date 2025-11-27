# Website Setup Guide

## Analytics Implementation

Your website now includes comprehensive tracking with:
- **Google Tag Manager (GTM)**
- **Google Analytics 4 (GA4)**
- **Mixpanel**
- **Hotjar** (heatmaps & recordings)
- **Microsoft Clarity** (session replays)
- **PostHog** (product analytics)
- **Amplitude** (behavioral analytics)

### 🔧 Required Configuration

Before going live, replace these placeholder IDs with your actual tracking IDs:

#### 1. Google Tag Manager
**Files to update:** `index.html`, `portfolio.html`

Replace `GTM-XXXXXXX` with your GTM container ID (e.g., `GTM-ABC1234`)

Find and replace in both files:
```javascript
'GTM-XXXXXXX'
```

#### 2. Google Analytics 4
**Files to update:** `index.html`, `portfolio.html`

Replace `G-XXXXXXXXXX` with your GA4 measurement ID (e.g., `G-ABC123XYZ`)

Find and replace in both files:
```javascript
'G-XXXXXXXXXX'
```

#### 3. Mixpanel
**Files to update:** `index.html`, `portfolio.html`

Replace `YOUR_MIXPANEL_PROJECT_TOKEN` with your Mixpanel project token

Find and replace in both files:
```javascript
mixpanel.init('YOUR_MIXPANEL_PROJECT_TOKEN', {
```

#### 4. Hotjar
**Files to update:** `index.html`, `portfolio.html`

Replace `YOUR_HOTJAR_ID` with your Hotjar site ID (numeric value)

Find and replace in both files:
```javascript
hjid:YOUR_HOTJAR_ID
```

#### 5. Microsoft Clarity
**Files to update:** `index.html`, `portfolio.html`

Replace `YOUR_CLARITY_ID` with your Clarity project ID

Find and replace in both files:
```javascript
"clarity", "script", "YOUR_CLARITY_ID"
```

#### 6. PostHog
**Files to update:** `index.html`, `portfolio.html`

Replace `YOUR_POSTHOG_KEY` with your PostHog project API key

Find and replace in both files:
```javascript
posthog.init('YOUR_POSTHOG_KEY'
```

#### 7. Amplitude
**Files to update:** `index.html`, `portfolio.html`

Replace `YOUR_AMPLITUDE_API_KEY` with your Amplitude API key

Find and replace in both files:
```javascript
amplitude.getInstance().init("YOUR_AMPLITUDE_API_KEY")
```

---

## User Identification

**Automatic User Identification on Form Submission!**

When a user submits the HubSpot contact form, the system automatically:
1. Extracts their **email address** from the form
2. Identifies the user across **all 7 analytics platforms**:
   - Mixpanel
   - PostHog
   - Amplitude
   - Hotjar
   - Microsoft Clarity
   - Google Analytics 4 (via GTM)

3. Associates the following user properties:
   - Email
   - First Name
   - Last Name
   - Company
   - Service Interested In
   - Form Submission Date

This creates a unified user profile across all analytics platforms, allowing you to:
- Track the complete user journey
- See what actions users took before and after form submission
- Build behavioral cohorts based on user properties
- Send targeted messages via marketing tools

---

## Event Tracking Implemented

### Homepage Events
- ✅ Navigation clicks (tracks section visited)
- ✅ CTA button clicks (tracks button location and text)
- ✅ Mobile menu toggles
- ✅ Service card clicks (tracks which service)
- ✅ Tool badge clicks (tracks which tool)
- ✅ Tool card clicks (tracks which tool with logo)
- ✅ HubSpot form submissions **with user identification**

### Portfolio Page Events
- ✅ Portfolio card clicks (tracks project title and category)
- ✅ Filter button clicks (tracks active filter)
- ✅ CTA button clicks
- ✅ Scroll depth tracking (25%, 50%, 75%, 90%)
- ✅ Mobile menu toggles

---

## Portfolio Page

A new portfolio page has been created showcasing:

### 📊 Event Implementation Projects (3 case studies)
- E-commerce conversion funnel tracking
- SaaS product analytics implementation
- Mobile app event tracking

### 📈 Dashboard Projects (3 case studies)
- Executive growth dashboard
- Marketing performance dashboard
- Product metrics dashboard

### 🔍 Audit Projects (3 case studies)
- GA4 implementation audit
- Privacy compliance audit
- Marketing tech stack audit

**Features:**
- Filterable portfolio (All, Events, Dashboards, Audits)
- Responsive design
- Dark theme matching main site
- Smooth animations
- Full analytics tracking

---

## Navigation

The navigation has been updated:
- ✅ "Portfolio" link added to main navigation
- ✅ Removed "Tools" and "Experience" from nav (still accessible via scroll)
- ✅ All anchor links fixed and working properly
- ✅ Smooth scrolling implemented

---

## Tools & Technologies Section

The tools section now displays logos alongside tool names for better visual appeal:

**Features:**
- 📊 SVG/PNG logos loaded from CDN
- 🎨 Fallback emoji icons when logos fail to load
- 🎯 Click tracking on each tool card
- 📱 Fully responsive grid layout
- ✨ Hover animations and effects

**Tools Displayed:**
- Product Analytics: Mixpanel, Amplitude, Heap, Segment, Rudderstack, PostHog
- Marketing & Tracking: GA4, GTM, Google Ads, Facebook Ads, HubSpot, Hotjar, MS Clarity
- Data Infrastructure: BigQuery, Redshift, SQL, Metabase, Tableau, Power BI
- E-commerce & Tools: WordPress, Shopify, Google Sheets

---

## Files Created/Modified

### New Files:
1. `portfolio.html` - Portfolio showcase page
2. `portfolio-styles.css` - Portfolio page styles
3. `portfolio-script.js` - Portfolio page functionality
4. `SETUP_GUIDE.md` - This file

### Modified Files:
1. `index.html` - Added 7 analytics tools + Portfolio nav link + Tool logos
2. `styles.css` - Added HubSpot form styling + Tool card styling
3. `script.js` - Updated with comprehensive event tracking + user identification
4. `portfolio.html` - Added all 7 analytics tools
5. `portfolio-script.js` - Added event tracking + user identification

---

## Testing Checklist

Before deploying:

### Configuration:
- [ ] Replace GTM container ID (`GTM-XXXXXXX`)
- [ ] Replace GA4 measurement ID (`G-XXXXXXXXXX`)
- [ ] Replace Mixpanel project token (`YOUR_MIXPANEL_PROJECT_TOKEN`)
- [ ] Replace Hotjar site ID (`YOUR_HOTJAR_ID`)
- [ ] Replace Clarity project ID (`YOUR_CLARITY_ID`)
- [ ] Replace PostHog API key (`YOUR_POSTHOG_KEY`)
- [ ] Replace Amplitude API key (`YOUR_AMPLITUDE_API_KEY`)

### Functionality Testing:
- [ ] Test all navigation links
- [ ] Test portfolio filters
- [ ] Test HubSpot form submission
- [ ] Test tool card clicks (should track in console)
- [ ] Test user identification on form submit (check console)

### Analytics Verification:
- [ ] Verify GTM tags are firing (use GTM Preview mode)
- [ ] Verify GA4 events in DebugView
- [ ] Verify Mixpanel events (check debug mode - should see events and identify calls)
- [ ] Verify Hotjar is recording (check Hotjar dashboard)
- [ ] Verify Clarity sessions (check Clarity dashboard)
- [ ] Verify PostHog events (check PostHog dashboard)
- [ ] Verify Amplitude events (check Amplitude dashboard)

### User Identification Testing:
- [ ] Submit HubSpot form with test email
- [ ] Check console for "Identifying user: [email]" message
- [ ] Verify user appears in Mixpanel People
- [ ] Verify user appears in PostHog with email
- [ ] Verify user appears in Amplitude with email as User ID
- [ ] Verify Hotjar identifies user with email
- [ ] Verify Clarity identifies user with email

### Responsive Testing:
- [ ] Test mobile responsiveness (all pages)
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test tool cards on mobile (should be smaller grid)
- [ ] Test portfolio filters on mobile

---

## Local Development

Currently running on: **http://localhost:8000**

To stop the server:
- Press Ctrl+C in terminal, or
- Contact me to stop it for you

To restart:
```bash
cd "C:\Users\netway\claudeprojects\rsy website"
python -m http.server 8000
```

---

## Deployment

To deploy this website:

1. **Free Hosting Options:**
   - Netlify (drag & drop)
   - Vercel
   - GitHub Pages
   - Cloudflare Pages

2. **Steps:**
   - Replace all tracking IDs first
   - Upload all files to hosting service
   - Configure custom domain (optional)

---

## Support

If you need help:
- Configuring tracking IDs
- Adding more portfolio items
- Customizing styles
- Adding more events

Just let me know!
