import type { Service } from '@/content/portfolio';
import { Media } from './Media';
import s from '@/app/page.module.css';

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className={`${s.serviceCard} ${s[service.tone]}`}>
      <div className={s.serviceHeading}>
        <h3 data-service-title>{service.title}</h3><span className={s.serviceNumber}>({service.number})</span>
      </div>
      <div className={s.serviceBody}>
        <div className={s.serviceCopy}>
          <p>{service.description}</p>
          <ul className={s.tags}>{service.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        </div>
        <div className={s.serviceImage}>
          <Media media={service.media} />
          {service.media.placeholder && <span className={s.imageLabel}>Sample creative</span>}
        </div>
      </div>
    </article>
  );
}

