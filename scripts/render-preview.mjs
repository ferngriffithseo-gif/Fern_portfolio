import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const escapeHtml = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const image = (media, eager = false) => media.videoSrc
  ? `<video controls playsinline preload="none" poster="${escapeHtml(media.src)}" aria-label="${escapeHtml(media.alt)}"><source src="${escapeHtml(media.videoSrc)}"></video>`
  : `<img src="${escapeHtml(media.src)}" alt="${escapeHtml(media.alt)}" loading="${eager ? 'eager' : 'lazy'}" decoding="async">`;
const tags = items => `<ul class="tags">${items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
const closeButton = label => `<button type="button" class="closeDialog" data-close-dialog aria-label="${label}">&times;</button>`;

export async function renderPreview(root) {
  const contentPath = path.join(root, 'src/content/portfolio.ts');
  const contentUrl = pathToFileURL(contentPath);
  contentUrl.searchParams.set('version', String(fs.statSync(contentPath).mtimeMs));
  const { portfolio: p } = await import(contentUrl.href);
  const styles = ['src/app/globals.css', 'src/app/page.module.css'].map(file => fs.readFileSync(path.join(root, file), 'utf8')).join('\n');
  const projectDialogs = p.projects.map(project => `
    <dialog id="project-${project.id}" class="dialog" aria-labelledby="title-${project.id}">
      ${closeButton('Close project preview')}
      <span class="smallHeading">${escapeHtml(project.category)}${project.media.placeholder ? ' / Placeholder' : ''}</span>
      <h2 id="title-${project.id}">${escapeHtml(project.title)}</h2>
      <div class="projectDetail ${project.format}">${image(project.media)}</div>
      ${project.media.placeholder ? '<p class="placeholderNote">Original sample artwork. Project details will be added with the finished work.</p>' : ''}
    </dialog>`).join('');
  const socialLinks = [['Instagram', p.contact.instagram], ['LinkedIn', p.contact.linkedin], ['TikTok', p.contact.tiktok]]
    .filter(([, url]) => url).map(([label, url]) => `<a href="${escapeHtml(url)}">${label} &#8599;</a>`).join('');

  return `<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(p.name)} | ${escapeHtml(p.role)}</title>
  <meta name="description" content="${escapeHtml(p.description)}">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:ital,wght@0,400;0,450;0,500;1,400;1,450&display=swap">
  <style>${styles}
  :root { --serif: 'Fraunces', Georgia, serif; --sans: 'DM Sans', Arial, sans-serif; }
  </style>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<main id="main">
  <section id="home" class="hero" aria-labelledby="hero-title">
    <h1 id="hero-title">${escapeHtml(p.name)}</h1>
    <div class="heroSubline"><p>${escapeHtml(p.role)}</p><span class="star" data-moving aria-hidden="true">&#10022;</span><p class="heroTagline">Content with character.</p></div>
    <div class="marquee" aria-label="A preview of my creative work">
      <div class="marqueeTrack" data-moving>${[0, 1].map(copy => `
        <div class="marqueeGroup"${copy ? ' aria-hidden="true"' : ''}>
          ${p.projects.map(project => `<figure class="marqueeImage">${image(project.media, true)}${project.media.placeholder ? '<figcaption>Sample creative</figcaption>' : ''}</figure>`).join('')}
        </div>`).join('')}
      </div>
    </div>
    <div class="heroFoot"><a href="#work">Explore selected work &#8600;</a><button type="button" data-motion-toggle aria-pressed="false">Pause motion</button></div>
  </section>
  <section id="work" class="work" aria-labelledby="work-title">
    <div class="sectionHeading"><h2 id="work-title">Selected work</h2><span>(Select to explore)</span></div>
    <div class="workStage" data-work-gallery>
      <div class="workBackgrounds" aria-hidden="true">
        ${p.projects.map((project, index) => `<div class="workBackground" data-work-image="${project.id}" data-active="${index === 0}"><img src="${escapeHtml(project.media.src)}" alt="" loading="lazy"></div>`).join('')}
      </div>
      <div class="workList">
        ${p.projects.map((project, index) => `<button type="button" class="workLink" data-project="${project.id}" data-open-dialog="project-${project.id}" aria-haspopup="dialog"><span class="workIndex">0${index + 1}</span><span>${escapeHtml(project.title)}</span><span class="workArrow" aria-hidden="true">&#8599;</span></button>`).join('')}
      </div>
    </div>
    ${projectDialogs}
    <p class="placeholderNote">Sample artwork and project placeholders. Real work coming soon.</p>
  </section>
  <section id="about" class="about" aria-labelledby="about-title">
    <h2 id="about-title" class="smallHeading">(About Fern)</h2>
    <div class="bio" data-reveal>${p.bio.paragraphs.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')}</div>
    <div class="aboutGrid">
      <figure class="portrait">${image(p.bio.portrait)}${p.bio.portrait.placeholder ? '<figcaption class="imageLabel">Portrait placeholder</figcaption>' : ''}</figure>
      <div class="factCard" data-spotlight><p><span data-spotlight-title>${escapeHtml(p.services[0].title)}</span><br><i>One creative point of view.</i></p><span class="count" data-spotlight-number aria-hidden="true">01</span><a href="#services">Explore my services <span aria-hidden="true">&#8600;</span></a></div>
    </div>
  </section>
  <section id="services" class="services" aria-labelledby="services-title">
    <h2 id="services-title" class="smallHeading">Services</h2>
    <div class="serviceStack">
      ${p.services.map(service => `<article class="serviceCard ${service.tone}">
        <div class="serviceHeading"><h3 data-service-title>${escapeHtml(service.title)}</h3><span class="serviceNumber">(${service.number})</span></div>
        <div class="serviceBody"><div class="serviceCopy"><p>${escapeHtml(service.description)}</p>${tags(service.tags)}</div>
        <div class="serviceImage">${image(service.media)}${service.media.placeholder ? '<span class="imageLabel">Sample creative</span>' : ''}</div></div>
      </article>`).join('')}
    </div>
  </section>
  <section id="contact" class="contact" aria-labelledby="contact-title">
    <div class="contactTop"><span>${escapeHtml(p.name)}</span><span>${escapeHtml(p.role)}</span></div>
    <h2 id="contact-title" data-reveal>${escapeHtml(p.contact.heading.replace('\n', ' '))}</h2>
    <p class="contactText">${escapeHtml(p.contact.text)}</p>
    <button type="button" class="contactAction" data-open-dialog="contact-dialog">Get in touch &#8599;</button>
    <footer class="footer"><span>&copy; ${new Date().getFullYear()} ${escapeHtml(p.name)}</span><nav aria-label="Footer navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#services">Services</a>${socialLinks}</nav><a href="#home">Back to top &#8593;</a></footer>
  </section>
</main>
<button class="contactPill" type="button" data-open-dialog="contact-dialog" aria-haspopup="dialog">
  <span class="avatar" aria-hidden="true">${image(p.bio.portrait)}</span>
  <span class="rollingLabel"><span>Contact</span><span aria-hidden="true">Let's talk</span></span><span aria-hidden="true">&#8599;</span>
</button>
<dialog id="contact-dialog" class="dialog" aria-labelledby="contact-dialog-title">
  ${closeButton('Close contact panel')}
  <span class="smallHeading">Have something in mind?</span><h2 id="contact-dialog-title">Get in <i>touch.</i></h2>
  <p>${escapeHtml(p.contact.text)}</p>${tags(p.services.map(service => service.title))}
  ${p.contact.email ? `<a class="contactAction" href="mailto:${escapeHtml(p.contact.email)}">Email ${escapeHtml(p.name)} &#8599;</a>` : '<div class="emailPending"><strong>Email enquiries coming soon.</strong><p>My contact details will be available here shortly.</p></div>'}
</dialog>
<script src="/portfolio-interactions.js"></script>
</body></html>`;
}

