# HealthCare Plus - Next.js Healthcare Website

A production-ready, SEO-optimized healthcare website built with Next.js 14 (App Router) and Headless WordPress CMS.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js)                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Pages     │  │  Components │  │   Sections  │             │
│  │  (App Dir)  │  │  (Reusable) │  │ (Page-level)│             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                     │
│         └────────────────┼────────────────┘                     │
│                          ▼                                      │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │              WordPress API Client (lib/wordpress.ts)       │ │
│  │         - ISR (Incremental Static Regeneration)           │ │
│  │         - Data fetching & processing                       │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   WordPress CMS (Headless)                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │    Posts    │  │   Pages     │  │  Services   │             │
│  │   (Blog)    │  │  (Content)  │  │ (Custom PT) │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                  │
│  REST API: /wp-json/wp/v2/*                                     │
└─────────────────────────────────────────────────────────────────┘
```

## ✨ Features

- **Next.js 14 App Router** - Latest React Server Components architecture
- **TypeScript** - Full type safety across the codebase
- **Tailwind CSS** - Custom healthcare design system
- **Headless WordPress** - CMS for content management via REST API
- **ISR** - Incremental Static Regeneration for optimal performance
- **SEO Optimized** - Meta tags, Open Graph, JSON-LD schema
- **Accessibility** - WCAG compliant, semantic HTML
- **Responsive** - Mobile-first design approach
- **Performance** - Core Web Vitals optimized

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with header/footer
│   ├── page.tsx           # Homepage
│   ├── blog/              # Blog routes
│   │   ├── page.tsx       # Blog listing
│   │   └── [slug]/        # Dynamic blog post
│   └── services/          # Services routes
│       └── page.tsx       # Services listing
│
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Container.tsx
│   │   └── Typography.tsx
│   └── layout/           # Layout components
│       ├── Header.tsx
│       └── Footer.tsx
│
├── sections/             # Page-level sections
│   ├── HeroSection.tsx
│   ├── ServicesSection.tsx
│   ├── BlogSection.tsx
│   └── CTASection.tsx
│
├── lib/                  # Utilities & API
│   ├── wordpress.ts     # WordPress API client
│   ├── seo.ts           # SEO utilities
│   └── utils.ts         # Helper functions
│
└── types/               # TypeScript definitions
    ├── wordpress.ts     # WordPress data types
    └── index.ts         # Shared types
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm, yarn, or pnpm
- WordPress site with REST API enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd healthcare-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your WordPress URL:
   ```env
   WORDPRESS_API_URL=https://your-wordpress-site.com
   WORDPRESS_HOSTNAME=your-wordpress-site.com
   NEXT_PUBLIC_SITE_URL=https://your-production-site.com
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 🔧 WordPress CMS Setup

### Required Configuration

1. **Enable REST API** - WordPress REST API should be accessible at `/wp-json/wp/v2/`

2. **Permalink Settings** - Set to "Post name" for clean URLs

3. **CORS Configuration** - Add to your WordPress theme's `functions.php`:
   ```php
   add_action('init', function() {
     header("Access-Control-Allow-Origin: *");
     header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
     header("Access-Control-Allow-Headers: Content-Type");
   });
   ```

### Recommended Plugins

- **ACF (Advanced Custom Fields)** - For custom fields on services, doctors, etc.
- **Yoast SEO / RankMath** - For SEO metadata (expose via REST API)
- **WP REST API Menus** - For menu endpoints

### Custom Post Types

To use the Services functionality, register a custom post type in WordPress:

```php
register_post_type('services', [
    'public' => true,
    'show_in_rest' => true,
    'rest_base' => 'services',
    'supports' => ['title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'],
    'labels' => [
        'name' => 'Services',
        'singular_name' => 'Service',
    ],
]);
```

## 📝 Content Workflow

### How to Add Content

1. **Blog Posts** - Create posts in WordPress → Published posts appear on `/blog`
2. **Services** - Add services (custom post type) → Appear on `/services`
3. **Pages** - Create pages in WordPress → Fetch via API as needed

### Content Mapping

| CMS Content | Frontend Display |
|-------------|------------------|
| Posts → | Blog cards, Blog detail pages |
| Services → | Service cards, Service detail pages |
| Pages → | Static page content |
| Media → | Images via Next.js Image optimization |

## 🎨 Design System

### Colors

```css
/* Primary - Trustworthy Teal */
--primary-600: #0891b2;

/* Secondary - Warm Coral (CTAs) */
--secondary-500: #f97316;

/* Accent - Healing Green */
--accent-500: #22c55e;

/* Neutral - Slate */
--neutral-900: #0f172a;
```

### Typography

- **Display Font**: Outfit (headings)
- **Body Font**: Plus Jakarta Sans

### Adding Components

1. Create component in appropriate directory (`ui/`, `sections/`, etc.)
2. Export from `index.ts`
3. Map CMS content to component props

## ⚡ Performance

### ISR Configuration

Pages are statically generated with ISR revalidation:

```typescript
// Default: Revalidate every 10 minutes
export const revalidate = 30;
```

Adjust in `lib/wordpress.ts`:
```typescript
export const REVALIDATE_TIME = 30; // seconds
```

### Image Optimization

All images from WordPress are optimized via Next.js Image component:
- Automatic WebP/AVIF conversion
- Responsive sizing
- Lazy loading

## 🔒 Security

### Headers (next.config.js)

- Strict-Transport-Security
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Referrer-Policy

### Best Practices

- No sensitive data in client-side code
- Environment variables for API URLs
- Content sanitization for CMS data
- HTTPS required for production

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub/GitLab
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables in Vercel

```
WORDPRESS_API_URL=https://your-wordpress-site.com
WORDPRESS_HOSTNAME=your-wordpress-site.com
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
```

## 📚 Development Workflow

### Adding a New Page Section

1. Create section in `src/sections/`:
   ```typescript
   // src/sections/TestimonialsSection.tsx
   export function TestimonialsSection({ testimonials }) {
     // Map CMS content to UI
   }
   ```

2. Define types in `src/types/`:
   ```typescript
   export interface TestimonialContent {
     id: number;
     quote: string;
     authorName: string;
     // ...
   }
   ```

3. Add API function in `src/lib/wordpress.ts`:
   ```typescript
   export async function getTestimonials() {
     return fetchAPI('/testimonials');
   }
   ```

4. Use in page:
   ```typescript
   const testimonials = await getTestimonials();
   return <TestimonialsSection testimonials={testimonials} />;
   ```

### Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🤝 Contributing

1. Follow the existing code patterns
2. Use TypeScript strict mode
3. Write semantic HTML
4. Test accessibility (keyboard navigation, screen readers)
5. Optimize for Core Web Vitals

## 📄 License

[Add your license here]

---

Built with ❤️ using Next.js, React, and WordPress
