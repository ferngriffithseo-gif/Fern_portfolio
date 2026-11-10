import type { Project } from '@/content/portfolio';
import { Media } from './Media';
import s from '@/app/page.module.css';

export function WorkGallery({ projects }: { projects: Project[] }) {
  return (
    <>
      <div className={s.workStage} data-work-gallery>
        <div className={s.workBackgrounds} aria-hidden="true">
          {projects.map((project, index) => (
            <div key={project.id} className={s.workBackground} data-work-image={project.id} data-active={index === 0}>
              <img src={project.media.src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
        <div className={s.workList}>
          {projects.map((project, index) => (
            <button key={project.id} type="button" className={s.workLink}
              data-project={project.id} data-open-dialog={`project-${project.id}`} aria-haspopup="dialog">
              <span className={s.workIndex}>0{index + 1}</span>
              <span>{project.title}</span><span className={s.workArrow} aria-hidden="true">&#8599;</span>
            </button>
          ))}
        </div>
      </div>
      {projects.map(project => (
        <dialog key={project.id} id={`project-${project.id}`} className={s.dialog} aria-labelledby={`title-${project.id}`}>
          <button type="button" className={s.closeDialog} data-close-dialog aria-label="Close project preview">&times;</button>
          <span className={s.smallHeading}>{project.category}{project.media.placeholder && ' / Placeholder'}</span>
          <h2 id={`title-${project.id}`}>{project.title}</h2>
          <div className={`${s.projectDetail} ${s[project.format]}`}><Media media={project.media} /></div>
          {project.media.placeholder && <p className={s.placeholderNote}>Original sample artwork. Project details will be added with the finished work.</p>}
        </dialog>
      ))}
    </>
  );
}

