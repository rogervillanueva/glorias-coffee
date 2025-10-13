This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

The notes below document how this codebase is organized today and how it maps to a modern “TypeScript + Next.js + Postgres” stack. They are meant as a refresher if you are coming from a classic MVC (Java + Thymeleaf + jQuery) background and want to understand the moving pieces before adding new features.

## 1. Golden-path stack overview

The project follows the consultant-ready stack outlined in the conversation:

| Layer | Default choice in this repo | Alternatives you might swap in later |
| --- | --- | --- |
| Runtime / framework | **Next.js 14 App Router** with React Server Components and Server Actions | — |
| Language | **TypeScript** end-to-end | — |
| Database access | **Prisma ORM** (not added yet, but this repo is structured to drop it in) | Drizzle if you need SQL-first migrations or edge runtime portability |
| Data validation | **Zod** (install when you start adding forms/server actions) | Valibot, Yup, or bespoke validation |
| Authentication | _Undecided_ (Auth.js is the default recommendation) | Clerk if you prefer hosted auth |
| Hosting | Local dev via `npm run dev`; production target is **Vercel** | Any Node 18+/Docker host |
| Storage / uploads | _Not yet required_ | S3/Supabase/UploadThing when file uploads enter the picture |
| Background work | _Not yet required_ | Inngest or QStash |
| Monitoring | _Not yet required_ | Sentry + Vercel Analytics |

> ✅ You never install both Prisma **and** Drizzle, Auth.js **and** Clerk, etc. Pick one per row when the need arises.

Think of the app as a single Next.js monolith that serves both UI and server logic. Server Actions replace the separate REST controllers you may have used with Java + jQuery.

## 2. Directory structure

```
src/
├── app/              # Next.js App Router entrypoints (routes + layouts)
│   ├── layout.tsx    # Root layout (HTML shell, fonts, metadata)
│   ├── globals.css   # Global Tailwind/CSS resets (add Tailwind here later)
│   ├── page.tsx      # Home page – currently renders marketing content
│   ├── menu/         # Nested route example (e.g. /menu)
│   └── faqs/         # Nested route example (e.g. /faqs)
├── components/       # Reusable React components (client or server)
│   ├── MenuRenderer.tsx
│   └── FAQList.tsx
├── data/             # Static JSON fixtures (seed data before DB integration)
│   ├── menu.en.json
│   └── faqs.en.json
└── types/            # Shared TypeScript types (e.g. menu models)
    └── menu.ts
```

### How this maps to an MVC mindset

- `src/app/**` replaces your old controller + template folders. Each directory under `app` becomes a route, and `page.tsx` is the server component responsible for rendering HTML. When you move to dynamic data, you can fetch from the database inside these server components or delegate to server actions.
- `src/components/**` contains reusable view fragments. These are analogous to Thymeleaf fragments or JSP tag files. Create small server or client components here and compose them inside route files.
- `src/data/**` acts as a stand-in for the database. While you are still sketching the UI, keep JSON fixtures here. When Prisma arrives, migrate each JSON file into migrations/seed scripts and load the data from Postgres instead.
- `src/types/**` centralizes domain types so React components, server actions, and tests share the same interfaces.

## 3. How new stack concepts fit together

1. **Server Components** (default in the App Router) render on the server. They give you the old-school server-rendered HTML experience with React ergonomics.
2. **Server Actions** will replace most client-side AJAX. When you create a form, declare an async function in your server component, annotate it with `'use server'`, and call your Prisma client there. No manual `fetch` calls are required for basic mutations.
3. **Data fetching** lives alongside the component that needs it. For example, a future `/menu/page.tsx` might fetch menu items via `await prisma.menuItem.findMany()` before rendering `<MenuRenderer items={items} />`.
4. **Client components** (`'use client'` at the top) are only needed when you depend on browser APIs, interactivity, or client-side state management. Keep most components on the server for simplicity and performance.

## 4. Getting started locally

Install dependencies and boot the dev server:

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the marketing page. Start experimenting by editing `src/app/page.tsx` or the route under `src/app/menu`.

### Suggested next steps

1. **Tailwind setup** – Add Tailwind CSS to speed up styling. It integrates with `globals.css` and works great with shadcn/ui.
2. **Prisma bootstrap** – Install Prisma, configure it to point at a local Postgres (e.g., via Docker or [Neon](https://neon.tech)), and scaffold models based on the JSON fixtures.
3. **Auth** – When you need login, install Auth.js. Start with email magic links or OAuth providers.
4. **Forms and validation** – Reach for Zod + Server Actions to handle input validation server-side.
5. **Testing** – Introduce Vitest for units/integration and Playwright for end-to-end flows as you add logic.

## 5. Further reading

- [Next.js App Router](https://nextjs.org/docs/app) – Understand layouts, nested routes, and server components.
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions) – The modern replacement for client-side fetch + API routes for many cases.
- [Prisma Docs](https://www.prisma.io/docs) – ORM recommended for CRUD over Postgres.
- [Zod Docs](https://zod.dev) – Schema validation in TypeScript.
- [Vercel Deployment Guide](https://nextjs.org/docs/app/building-your-application/deploying) – Steps to deploy this monolith with previews per pull request.
