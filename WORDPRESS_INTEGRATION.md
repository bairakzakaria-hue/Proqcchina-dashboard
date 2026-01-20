# WordPress Integration Guide for ProQCChina Dashboard

This guide explains how to integrate the ProQCChina Dashboard with WordPress.

## Integration Options

### Option 1: Embed via Iframe (Recommended for Quick Setup)
Embed the Next.js dashboard as an iframe in WordPress pages/posts using a shortcode.

### Option 2: REST API Integration (Recommended for Full Integration)
Use WordPress as a backend CMS and fetch data via REST API.

### Option 3: WordPress Plugin Embed
Install the WordPress plugin to manage bookings, invoices, and reports directly in WordPress.

---

## Quick Start: Embed Method

### Step 1: Deploy Your Next.js App

Deploy your Next.js app to Vercel, Netlify, or your preferred hosting:

```bash
npm run build
# Deploy to your platform
```

### Step 2: Install WordPress Plugin

1. Copy `wordpress-plugin/inspaction-dashboard.php` to `/wp-content/plugins/proqcchina-dashboard/`
2. Activate the plugin in WordPress Admin → Plugins

### Step 3: Configure Plugin Settings

1. Go to WordPress Admin → ProQCChina → Settings
2. Enter your Next.js app URL (e.g., `https://your-app.vercel.app`)
3. Save settings

### Step 4: Use Shortcode

Add to any WordPress page or post:

```
[inspaction_dashboard]
```

With options:
```
[inspaction_dashboard page="bookings" height="900px"]
```

---

## Full Integration: REST API Method

### Step 1: Configure WordPress

#### Install Required Plugins

```bash
# Via WP-CLI
wp plugin install jwt-authentication-for-wp-rest-api --activate
```

#### Add to `wp-config.php`

```php
// Enable REST API
define('WP_REST_API_ENABLED', true);

// JWT Authentication (optional)
define('JWT_AUTH_SECRET_KEY', 'your-strong-secret-key-here');
define('JWT_AUTH_CORS_ENABLE', true);
```

#### Add to `.htaccess` (Apache)

```apache
RewriteEngine on
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]
```

### Step 2: Configure Next.js

Create `.env.local`:

```env
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
NEXT_PUBLIC_WORDPRESS_SITE_URL=https://your-wordpress-site.com
```

### Step 3: Use WordPress Data

The plugin creates custom post types:
- `inspaction_booking` - Bookings
- `inspaction_invoice` - Invoices  
- `inspaction_report` - Reports

Use the hooks in your components:

```typescript
import { useWordPressBookings, useWordPressInvoices } from '@/lib/wordpress-hooks'

function MyComponent() {
  const { bookings, loading } = useWordPressBookings()
  const { invoices } = useWordPressInvoices()
  // Use the data
}
```

---

## Custom Post Types

### Bookings (`inspaction_booking`)

**Fields:**
- `_booking_service` - Service type
- `_booking_status` - Status (Processing, Completed, Unquoted, Unpaid, Draft)
- `_booking_date` - Booking date
- `_booking_amount` - Amount
- `_booking_supplier` - Supplier name

**API Endpoint:** `/wp-json/wp/v2/inspaction_booking`

### Invoices (`inspaction_invoice`)

**Fields:**
- `_invoice_due_date` - Due date
- `_invoice_amount` - Amount
- `_invoice_status` - Status (Paid, Unpaid)
- `_invoice_booking_id` - Related booking ID
- `_invoice_description` - Description

**API Endpoint:** `/wp-json/wp/v2/inspaction_invoice`

### Reports (`inspaction_report`)

**Fields:**
- `_report_service` - Service type (PSI, DUPRO, IPC, FA, CLS)
- `_report_factory` - Factory name
- `_report_location` - Location
- `_report_delivered` - Completed status (boolean)
- `_report_payment_status` - Payment status (Paid, Pending, Due)

**API Endpoint:** `/wp-json/wp/v2/inspaction_report`

---

## Available Services

The dashboard supports these 5 services:

1. **Company check-up** - Verify supplier credibility
2. **Factory audit** - Audit systems & compliance
3. **Pre-shipment inspection** - Inspect goods before shipping
4. **During production inspection** - Catch defects mid-production
5. **Container loading supervision** - Secure container loading

---

## Shortcode Options

```
[inspaction_dashboard page="overview" height="800px"]
```

**Page Options:**
- `overview` - Overview dashboard (default)
- `bookings` - Bookings page
- `reports` - Reports/Client Inspection Dashboard
- `invoices` - Invoices page

**Height:** Any valid CSS height value (e.g., `800px`, `100vh`)

---

## Troubleshooting

### Iframe Not Loading

1. Check Next.js app URL in WordPress settings
2. Verify app is deployed and accessible
3. Check browser console for errors
4. Ensure CORS is configured if using API integration

### API Not Working

1. Test REST API: Visit `https://your-site.com/wp-json/`
2. Verify custom post types: Visit `https://your-site.com/wp-json/wp/v2/inspaction_booking`
3. Check environment variables are set correctly
4. Verify `show_in_rest => true` in post type registration

### CORS Issues

Add to WordPress `functions.php`:

```php
function add_cors_headers() {
    $origin = get_option('inspaction_dashboard_url', '*');
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}
add_action('init', 'add_cors_headers');
```

---

## Next Steps

1. **Create content in WordPress** - Add bookings, invoices, reports
2. **Customize fields** - Modify meta boxes as needed
3. **Add authentication** - Implement JWT or OAuth
4. **Style integration** - Match WordPress theme

For detailed setup instructions, see `WORDPRESS_SETUP.md`.
