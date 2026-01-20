# WordPress Integration Setup Guide for ProQCChina Dashboard

This guide will help you connect your ProQCChina Dashboard to a WordPress website.

## Quick Start

### Step 1: Install WordPress Plugin

1. Copy the `wordpress-plugin/inspaction-dashboard.php` file to your WordPress site's `/wp-content/plugins/` directory
2. Rename the folder to `proqcchina-dashboard` (optional but recommended)
3. Activate the plugin in WordPress Admin → Plugins

### Step 2: Configure WordPress

#### Add to `wp-config.php`:

```php
// Enable REST API
define('WP_REST_API_ENABLED', true);

// Optional: JWT Authentication (if using JWT auth)
define('JWT_AUTH_SECRET_KEY', 'your-strong-secret-key-here');
define('JWT_AUTH_CORS_ENABLE', true);
```

#### Add to `.htaccess` (if using Apache):

```apache
# Enable REST API authentication headers
RewriteEngine on
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]
```

### Step 3: Configure Next.js App

Create a `.env.local` file in your Next.js project root:

```env
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
NEXT_PUBLIC_WORDPRESS_SITE_URL=https://your-wordpress-site.com
```

### Step 4: Deploy Next.js App

Deploy your Next.js app to Vercel, Netlify, or your preferred hosting:

```bash
npm run build
# Deploy to your hosting platform
```

### Step 5: Configure WordPress Plugin Settings

1. Go to WordPress Admin → ProQCChina → Settings
2. Enter your Next.js app URL (e.g., `https://your-app.vercel.app`)
3. Enable REST API Integration if you want to fetch data from WordPress

## Integration Methods

### Method 1: Embed via Shortcode (Easiest)

Add the dashboard to any WordPress page or post:

```
[inspaction_dashboard]
```

With options:
```
[inspaction_dashboard page="bookings" height="900px"]
```

Available pages:
- `overview` - Overview dashboard (default)
- `bookings` - Bookings page
- `reports` - Reports/Client Inspection Dashboard
- `invoices` - Invoices page

### Method 2: WordPress Admin Menu

The plugin automatically adds a "ProQCChina" menu item in WordPress admin where you can access the full dashboard.

### Method 3: REST API Integration

The dashboard can fetch data directly from WordPress using the REST API.

#### Custom Post Types Created:

1. **Bookings** (`inspaction_booking`)
   - Fields: service, status, date, amount, supplier
   - Status options: Processing, Completed, Unquoted, Unpaid, Draft

2. **Invoices** (`inspaction_invoice`)
   - Fields: due_date, amount, status, booking_id, description
   - Status options: Paid, Unpaid

3. **Reports** (`inspaction_report`)
   - Fields: service, factory, location, delivered, payment_status
   - Service types: PSI, DUPRO, IPC, FA, CLS

#### API Endpoints:

- Bookings: `GET /wp-json/wp/v2/inspaction_booking`
- Invoices: `GET /wp-json/wp/v2/inspaction_invoice`
- Reports: `GET /wp-json/wp/v2/inspaction_report`

## Using WordPress Data in Dashboard

The dashboard includes hooks to fetch data from WordPress:

```typescript
import { useWordPressBookings } from '@/lib/wordpress-hooks'

function MyComponent() {
  const { bookings, loading } = useWordPressBookings()
  // Use bookings data
}
```

## Services Available

The plugin supports these services:
- Company check-up
- Factory audit
- Pre-shipment inspection
- During production inspection
- Container loading supervision

## Troubleshooting

### CORS Issues

If you encounter CORS errors, add to WordPress `functions.php`:

```php
function add_cors_headers() {
    header("Access-Control-Allow-Origin: " . get_option('inspaction_dashboard_url', '*'));
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}
add_action('init', 'add_cors_headers');
```

### Iframe Not Loading

1. Check that your Next.js app allows iframe embedding
2. Verify the URL in WordPress settings matches your deployed app
3. Check browser console for errors

### API Not Working

1. Verify REST API is enabled: Visit `https://your-site.com/wp-json/`
2. Check that custom post types have `show_in_rest => true`
3. Verify environment variables are set correctly

## Next Steps

1. **Create bookings/invoices in WordPress** - They will appear in the dashboard
2. **Customize the plugin** - Modify fields and post types as needed
3. **Add authentication** - Implement JWT or OAuth for secure access
4. **Style integration** - Match WordPress theme styles if needed

## Support

For issues or custom integration needs, refer to:
- WordPress REST API Documentation: https://developer.wordpress.org/rest-api/
- Next.js Documentation: https://nextjs.org/docs






