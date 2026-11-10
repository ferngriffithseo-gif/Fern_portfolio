import { contactTopics, portfolio as p } from '@/content/portfolio';

export function ContactForm() {
  return (
    <form className="contact-form" data-contact-form data-recipient={p.contact.email}>
      <div className="contact-form-grid">
        <label className="contact-field">
          <span>Full name</span>
          <input name="name" autoComplete="name" placeholder={p.name} maxLength={120} required />
        </label>
        <label className="contact-field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" placeholder={p.contact.email} maxLength={254} required />
        </label>
        <label className="contact-field contact-project">
          <span>Project details</span>
          <textarea name="details" placeholder="Tell me your goals" rows={4} maxLength={1500} required />
        </label>
        <fieldset className="contact-field contact-topics">
          <legend>What can I do for you?</legend>
          <div className="contact-topic-list">
            {contactTopics.map(topic => (
              <label key={topic} className="contact-topic">
                <input type="checkbox" name="topic" value={topic} />
                <span>{topic}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="contact-submit">
        <button type="submit"><span aria-hidden="true">&#10148;</span> Submit</button>
        <p>Opens your email app.</p>
      </div>
    </form>
  );
}
