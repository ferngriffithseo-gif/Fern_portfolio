import Script from 'next/script';
import { portfolio as p } from '@/content/portfolio';
import { WorkGallery } from '@/components/WorkGallery';
import { ServiceCard } from '@/components/ServiceCard';
import { Media } from '@/components/Media';
import s from './page.module.css';

export default function Home() {
  const socialLinks = [
    { label: 'Instagram', url: p.contact.instagram },
    { label: 'LinkedIn', url: p.contact.linkedin },
    { label: 'TikTok', url: p.contact.tiktok },
  ].filter(link => link.url);

  return (
    <>
      <a className={s.skip} href="#main">Skip to content</a>
      <main id="main">
        <section id="home" className={s.hero} aria-labelledby="hero-title">
          <h1 id="hero-title">{p.name}</h1>
          <div className={s.heroSubline}>
            <p>{p.role}</p>
            <span className={s.star} data-moving aria-hidden="true">&#10022;</span>
            <p className={s.heroTagline}>Content with character.</p>
          </div>
          <div className={s.marquee} aria-label="A preview of my creative work">
            <div className={s.marqueeTrack} data-moving>
              {[0, 1].map(copy => (
                <div key={copy} className={s.marqueeGroup} aria-hidden={copy === 1 ? true : undefined}>
                  {p.projects.map(project => (
                    <figure key={project.id} className={s.marqueeImage}>
                      <Media media={project.media} eager />
                      {project.media.placeholder && <figcaption>Sample creative</figcaption>}
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className={s.heroFoot}>
            <a href="#work">Explore selected work &#8600;</a>
            <button type="button" data-motion-toggle aria-pressed="false">Pause motion</button>
          </div>
        </section>
        <section id="work" className={s.work} aria-labelledby="work-title">
          <div className={s.sectionHeading}>
            <h2 id="work-title">Selected work</h2><span>(Select to explore)</span>
          </div>
          <WorkGallery projects={p.projects} />
          <p className={s.placeholderNote}>Sample artwork and project placeholders. Real work coming soon.</p>
        </section>
        <section id="about" className={s.about} aria-labelledby="about-title">
          <h2 id="about-title" className={s.smallHeading}>(About Fern)</h2>
          <div className={s.bio} data-reveal>
            {p.bio.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className={s.aboutGrid}>
            <figure className={s.portrait}>
              <Media media={p.bio.portrait} />
              {p.bio.portrait.placeholder && <figcaption className={s.imageLabel}>Portrait placeholder</figcaption>}
            </figure>
            <div className={s.factCard} data-spotlight>
              <p><span data-spotlight-title>{p.services[0].title}</span><br /><i>One creative point of view.</i></p>
              <span className={s.count} data-spotlight-number aria-hidden="true">01</span>
              <a href="#services">Explore my services <span aria-hidden="true">&#8600;</span></a>
            </div>
          </div>
        </section>
        <section id="services" className={s.services} aria-labelledby="services-title">
          <h2 id="services-title" className={s.smallHeading}>Services</h2>
          <div className={s.serviceStack}>
            {p.services.map(service => <ServiceCard key={service.number} service={service} />)}
          </div>
        </section>
        <section id="contact" className={s.contact} aria-labelledby="contact-title">
          <div className={s.contactTop}><span>{p.name}</span><span>{p.role}</span></div>
          <h2 id="contact-title" data-reveal>{p.contact.heading.replace('\n', ' ')}</h2>
          <p className={s.contactText}>{p.contact.text}</p>
          <button type="button" className={s.contactAction} data-open-dialog="contact-dialog">Get in touch &#8599;</button>
          <footer className={s.footer}>
            <span>&copy; {new Date().getFullYear()} {p.name}</span>
            <nav aria-label="Footer navigation">
              <a href="#work">Work</a><a href="#about">About</a><a href="#services">Services</a>
              {socialLinks.map(link => <a key={link.label} href={link.url}>{link.label} &#8599;</a>)}
            </nav>
            <a href="#home">Back to top &#8593;</a>
          </footer>
        </section>
      </main>
      <button className={s.contactPill} type="button" data-open-dialog="contact-dialog" aria-haspopup="dialog">
        <span className={s.avatar} aria-hidden="true"><Media media={p.bio.portrait} /></span>
        <span className={s.rollingLabel}><span>Contact</span><span aria-hidden="true">Let's talk</span></span>
        <span aria-hidden="true">&#8599;</span>
      </button>
      <dialog id="contact-dialog" className={s.dialog} aria-labelledby="contact-dialog-title">
        <button type="button" className={s.closeDialog} data-close-dialog aria-label="Close contact panel">&times;</button>
        <span className={s.smallHeading}>Have something in mind?</span>
        <h2 id="contact-dialog-title">Get in <i>touch.</i></h2>
        <p>{p.contact.text}</p>
        <ul className={s.tags}>{p.services.map(service => <li key={service.number}>{service.title}</li>)}</ul>
        {p.contact.email
          ? <a className={s.contactAction} href={`mailto:${p.contact.email}`}>Email {p.name} &#8599;</a>
          : <div className={s.emailPending}><strong>Email enquiries coming soon.</strong><p>My contact details will be available here shortly.</p></div>}
      </dialog>
      <Script src="/portfolio-interactions.js" strategy="afterInteractive" />
    </>
  );
}

