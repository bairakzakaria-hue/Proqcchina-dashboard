# ProQCChina Dashboard

A modern quality control and inspection dashboard built with Next.js, React, and Tailwind CSS. This dashboard helps manage bookings, invoices, and inspection reports for China procurement operations.

## Features

- **Responsive Dashboard** with overview, bookings, invoices, and reports
- **Service Booking** system for 5 core services
- **Invoice Management** with payment tracking
- **Client Inspection Dashboard** for quality control reports
- **WordPress Integration** - Connect to WordPress via REST API or embed as iframe
- **Authentication System** with login and signup
- **Real-time Statistics** showing booking and invoice counts

## Services Offered

1. Company check-up
2. Factory audit
3. Pre-shipment inspection
4. During production inspection
5. Container loading supervision

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## WordPress Integration

This dashboard is fully WordPress compatible. See `WORDPRESS_SETUP.md` for detailed integration instructions.

### Quick WordPress Setup

1. Install the WordPress plugin from `wordpress-plugin/inspaction-dashboard.php`
2. Configure environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_WORDPRESS_API_URL=https://your-site.com/wp-json/wp/v2
   NEXT_PUBLIC_WORDPRESS_SITE_URL=https://your-site.com
   ```
3. Use shortcode: `[inspaction_dashboard]` in any WordPress page/post

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React** - UI library

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page (handles auth)
│   ├── signup/
│   │   └── page.tsx     # Sign up page
│   └── globals.css      # Global styles
├── components/
│   ├── DashboardLayout.tsx  # Dashboard layout wrapper
│   ├── DashboardHeader.tsx  # Header with search, notifications
│   ├── DashboardSidebar.tsx # Sidebar navigation
│   ├── ServiceCard.tsx      # Service booking cards
│   ├── ServiceCardsCarousel.tsx # Service cards carousel
│   ├── StatCard.tsx         # Statistics cards
│   ├── BookingsTable.tsx    # Bookings table component
│   ├── InvoicesTable.tsx    # Invoices table component
│   ├── BookingModal.tsx     # Booking form modal
│   ├── Logo.tsx             # Logo component
│   └── pages/
│       ├── OverviewPage.tsx  # Overview dashboard
│       ├── BookingsPage.tsx  # Bookings page
│       ├── ReportsPage.tsx   # Reports/Client Inspection Dashboard
│       └── InvoicesPage.tsx  # Invoices page
├── contexts/
│   └── AuthContext.tsx      # Authentication context
├── lib/
│   ├── wordpress.ts         # WordPress API client
│   └── wordpress-hooks.ts  # React hooks for WordPress
├── wordpress-plugin/
│   └── inspaction-dashboard.php # WordPress plugin
├── WORDPRESS_SETUP.md      # WordPress integration guide
└── package.json

```

## Deployment

### Deploy to Vercel

```bash
vercel
```

### Deploy to Netlify

```bash
netlify deploy
```

### Docker Deployment

```bash
docker-compose up
```

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
NEXT_PUBLIC_WORDPRESS_SITE_URL=https://your-wordpress-site.com
NEXT_PUBLIC_AUTH_PROVIDER=mock
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## License

Private - All rights reserved