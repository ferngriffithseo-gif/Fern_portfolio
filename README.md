# Fern Griffith portfolio

Next.js App Router, React, TypeScript and CSS Modules. The site exports as static files to out/.

## Run locally

With Node.js 20.9+ and npm installed, open a terminal in this folder and run:

    npm install
    npm run dev

Open http://localhost:3000. To create the production export, run npm run build.
Serve the resulting out/ directory with a static web host.

## Edit your content

All services, projects, biography and contact details are in src/content/portfolio.ts.

- Name and role are at the top.
- Add images to public/images/, then set the corresponding media.src to /images/your-file.jpg. Update the alt text and set placeholder to false.
- Edit projects to replace sample project names and categories. Set format to landscape or portrait.
- For video, add an MP4 to public/videos/, set media.videoSrc and keep media.src as its poster image. The player uses native controls, no autoplay and preload none.
- Replace bio.portrait and edit bio.text.
- Set contact.email to enable the email enquiry link. Social links are hidden until their URLs are filled in.
- Set contact.websiteUrl to the eventual live URL before publishing, so social image URLs resolve against the correct domain.
- Replace public/social-share.png for your social sharing image.

Layout and responsive styles are in src/app/page.module.css. Shared colours and typography are in src/app/globals.css. Reusable gallery, service cards and media components are in src/components/.

## Preview and verification status

Package downloads were blocked by this environment's network permissions. Next.js dependencies could not be installed, so the production build and TypeScript checks remain unverified.

A temporary static design preview was inspected at 390, 768 and 1440 pixels. It reads the same content file and styles but renders separate HTML, so it does not verify Next.js compilation, hydration or metadata. This preview uses Google Fonts, while the Next.js app uses locally bundled Fontsource packages.

To reopen the design preview without installing packages, use Node.js 24:

    node scripts/design-preview.mjs

Open http://127.0.0.1:3000. Stop this preview with Ctrl+C before starting Next.js on the same port. Restart the design preview after edits.

Sample graphics are original, clearly labelled placeholders. No client work, testimonials or results have been invented.
