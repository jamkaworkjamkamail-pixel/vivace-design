# Vivace Design Interior

**Premium editorial interior design studio website**

## Overview

Vivace Design Interior is a world-class, motion-led editorial interior design company website. Built with cinematic motion, editorial visual language, and strong designer authorship — designed to build trust, showcase completed work, highlight individual designers, and capture client inquiries.

## Live URL

> **https://3000-iu8gxyh3hzloho8illd27-a402f90a.sandbox.novita.ai**

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, brand intro, featured projects, categories, designers, process, inquiry |
| `/projects` | All projects with live category filter |
| `/categories` | Browse all 11 categories with their projects |
| `/projects/:id` | Editorial project detail page |
| `/designers` | All designers overview |
| `/designers/:id` | Individual designer portfolio page |
| `/inquiry` | Full lead capture inquiry page |
| `/contact` | Contact page |
| `/about` | Studio about page |
| `/api/inquiries` | POST — form submission endpoint |

## Design System

### Color Palette
- **Deep Olive Black**: `#222217` — headings, text, nav, footer
- **Heritage Olive**: `#4D5038` — buttons, hover states, accents
- **Soft Sage Stone**: `#858666` — metadata, labels, dividers
- **Warm Plaster Beige**: `#D2CBC1` — dominant background

### Typography
- **Cormorant Garamond** (serif) — display headlines, emotional statements
- **Jost** (sans-serif) — navigation, body, labels, buttons

## Features

- ✅ **Full i18n support** — English / Mongolian language toggle with 150+ translation keys
- ✅ Premium preloader with brand reveal animation
- ✅ Cinematic hero with scale animation and parallax
- ✅ Scroll-triggered section reveals (fade + lift)
- ✅ Sticky process accordion (4-step service workflow)
- ✅ Real-time category filter (11 categories, 12 projects)
- ✅ Designer profiles: Ц. Жанцанноров, Б. Төгөлдөр, Х. Анхбаяр
- ✅ Individual designer portfolio pages
- ✅ Editorial project detail pages with gallery
- ✅ Premium inquiry form (name, email, phone, category, budget, message)
- ✅ Page transition animations
- ✅ Custom cursor (desktop)
- ✅ Scroll progress bar
- ✅ Animated statistics counters (15 years, 100% on-time, 150+ experts, 300+ projects)
- ✅ Marquee ticker
- ✅ Mobile-responsive premium layout
- ✅ Mobile hamburger menu with overlay

## Project Categories

Kitchen · Living Room · Kids Room · Work Room · Office · Bathroom · Master Bedroom · Auto Mall · E-sport Center · Dental Clinic · Coffee Shop

## Designers

- **Ц. Жанцанноров** — Interior designer, 15 years of experience in architecture
- **Б. Төгөлдөр** — IV-th degree architect, interior designer, 15 years of experience in architecture  
- **Х. Анхбаяр** — Professional architect, interior designer, 8 years of experience in architecture

## Tech Stack

- **Framework**: Hono (TypeScript)
- **Deployment**: Cloudflare Pages
- **Build**: Vite
- **Dev Server**: PM2 + Wrangler Pages Dev
- **Fonts**: Google Fonts (Cormorant Garamond + Jost)
- **CSS**: Custom design system (no framework)
- **JS**: Vanilla (no dependencies)
- **i18n**: Custom unified system with 150+ keys (EN/MN)
- **Animation**: GSAP 3.12 + ScrollTrigger + CustomEase

## Company Info

**Vivace Design Interior** — Premium Furniture & Interior Design
- **Founded**: 2017 (Ask Seek Knock partnership), rebranded 2024 as Vivace Arts XXK
- **Experience**: 15 years in the industry
- **Projects**: 300+ completed projects, 100% on-time delivery
- **Team**: 150+ professional partners, 3 senior designers
- **Services**: Interior Design · Fit-Out · Custom Furniture
- **Address**: ХУД 20-р хороо, Мишээл экспо, Little Venice shopping mall, M2 tower 15 давхарт, 1509 тоот
- **Email**: vivacedesign07@gmail.com
- **Phone**: 7272 3066 · 9006 3066
- **Hours**: Mon–Fri, 09:00–18:00
- **Social**: Instagram @vivace.design · Facebook "Vivace Design"

## Development

```bash
npm run build        # Build for production
pm2 start ecosystem.config.cjs   # Start dev server
pm2 logs vivace-design --nostream # View logs
```

## Deploy to Cloudflare Pages

```bash
npm run build
npx wrangler pages deploy dist --project-name vivace-design-interior
```
