export type Media = { src: string; alt: string; videoSrc?: string; placeholder: boolean };
export type Project = { id: string; title: string; category: string; format: 'landscape' | 'portrait'; media: Media };
export type Service = { number: string; title: string; description: string; tags: string[]; tone: 'sage' | 'pink' | 'cream'; media: Media };

export const portfolio = {
  name: 'Fern Griffith',
  role: 'Marketeer and Content Creator',
  description: 'Social content, short-form video and search-informed copy by Fern Griffith. Explore the portfolio and discover three ways to work together.',
  hero: { line: 'Thoughtful ideas.\nContent with character.', media: { src: '/images/social-study.svg', alt: 'Original pink and olive editorial composition with the words Make an impression', placeholder: true } },
  bio: {
    paragraphs: [
      'I’m a creative marketer with a passion for creating content that connects with people. I love all things branding, visual storytelling, and bringing fresh ideas to life.',
      'I’m naturally curious, always keen to learn, and enjoy working with others in creative environments. I’m excited to keep developing my skills and growing within the marketing industry.',
    ],
    portrait: { src: '/images/portrait-placeholder.svg', alt: 'Illustrated portrait placeholder, ready for a photograph of Fern', placeholder: true },
  },
  projects: [
    { id: 'social', title: 'A moment in the feed', category: 'Social content', format: 'landscape', media: { src: '/images/social-study.svg', alt: 'Pink and olive typographic social content placeholder', placeholder: true } },
    { id: 'video', title: 'An idea in motion', category: 'Short video', format: 'portrait', media: { src: '/images/video-study.svg', alt: 'Vertical video placeholder with abstract olive shapes and pink typography', placeholder: true } },
    { id: 'copy', title: 'Words with direction', category: 'SEO & Copywriting', format: 'landscape', media: { src: '/images/copy-study.svg', alt: 'Editorial page mockup with the words Find your words', placeholder: true } },
  ] satisfies Project[],
  services: [
    { number: '01', title: 'Organic & paid socials', description: 'Content for your feed and your paid campaigns.', tags: ['Organic content', 'Paid social', 'Campaign creative'], tone: 'sage', media: { src: '/images/social-study.svg', alt: 'Sample social creative in pink and olive', placeholder: true } },
    { number: '02', title: 'Short video', description: 'Short-form videos shaped around a clear idea, a strong opening and the platform they’re made for.', tags: ['Reels', 'TikTok', 'Shorts'], tone: 'pink', media: { src: '/images/video-study.svg', alt: 'Sample vertical video title card', placeholder: true } },
    { number: '03', title: 'SEO & Copywriting', description: 'Search-informed copy that helps people find you and quickly understand what you offer.', tags: ['Website copy', 'On-page SEO', 'Content writing'], tone: 'cream', media: { src: '/images/copy-study.svg', alt: 'Sample editorial copy layout', placeholder: true } },
  ] satisfies Service[],
  contact: { email: 'ferngriffith3@gmail.com', instagram: '', linkedin: '', tiktok: '', websiteUrl: '', heading: 'Let’s make\nsomething good.', text: 'Have an idea in mind? Let’s give it the words, visuals and attention it deserves.' },
};

export const contactPieces = [
  { label: 'Say hello', tone: 'cream', icon: '' },
  { label: 'Reach out', tone: 'sage', icon: '' },
  { label: 'Open contact details', tone: 'gradient', icon: 'message' },
  { label: 'Let’s chat', tone: 'gingham', icon: '' },
  { label: 'Send a message', tone: 'pink', icon: '' },
  { label: 'Email enquiries', tone: 'cream', icon: 'mail' },
] as const;


export const contactTopics = ['Short-Form Video', 'Content Strategy', 'Paid & Organic Social'] as const;
