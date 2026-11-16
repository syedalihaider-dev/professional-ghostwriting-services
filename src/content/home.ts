/**
 * Homepage copy. Facts, services, process detail, testimonials and platforms
 * come from the live site, rewritten for the new voice. Nothing is invented:
 * every number below is a count of something the live site already states.
 */

export const hero = {
  kicker: "Professional Ghostwriting Services",
  location: "Ghostwriters · Editors · Publishers — USA",
  lines: ["Your idea", "deserves"],
  knockout: "a book.",
  lede: "We’re a team of professional ghostwriters, editors and publishing specialists. We turn your ideas, expertise and stories into publish-ready books — written in your voice, with all the credit yours.",
  cta: "Start your book",
  secondary: "See how it works",
  scroll: "Scroll",
} as const;

export const ticker = ["Book ghostwriting", "Fiction", "Memoir", "Non-fiction", "Editing", "Cover design", "Publishing", "Marketing"];

export const intro = {
  label: "What we do",
  // [word] is highlighted in the accent; {word} carries the inline image capsule.
  lines: ["We turn [ideas]", "into stories", "people can {hold}."],
  heading: "A full-service ghostwriting company, built around your voice.",
  body: [
    "Your story deserves more than a blank page. We partner with authors, executives, entrepreneurs and thought leaders to bring their most important ideas to the world — without sacrificing months of their time at a keyboard.",
    "From a prestige hardcover to an ebook built for Kindle, our ghostwriters, editors and publishing consultants tailor every word to your vision. Your story. Your voice. Our craft.",
  ],
  audienceLabel: "Who we write for",
  audience: ["Authors", "Executives", "Entrepreneurs", "Thought leaders"],
  link: "How we work",
} as const;

export type Service = {
  id: string;
  title: string;
  summary: string;
  tags: readonly string[];
  image: string;
  film?: "writer";
  tone: "black" | "cobalt" | "graphite";
  /** Dedicated service page, where one exists. */
  href?: string;
};

export const services = {
  label: "Services",
  heading: "Six ways we take a book from idea to shelf.",
  items: [
    {
      id: "book-ghostwriting",
      title: "Book Ghostwriting",
      summary: "Full-length manuscripts written in your voice. You bring the ideas; our ghostwriters shape the narrative, structure and pace — and every word of credit stays with you.",
      tags: ["Full manuscripts", "Ebooks", "Your voice"],
      image: "/images/services/ghostwriting.webp",
      film: "writer",
      tone: "black",
      href: "/non-fiction-ghostwriting-services/",
    },
    {
      id: "fiction",
      title: "Fiction Ghostwriting",
      summary: "Characters, worlds and plots built with genre know-how — fantasy, thriller, romance and series fiction — drafted chapter by chapter with your feedback.",
      tags: ["Novels", "Series", "Genre fiction"],
      image: "/images/services/fiction.webp",
      tone: "cobalt",
      href: "/fiction-ghostwriting-services/",
    },
    {
      id: "memoir-non-fiction",
      title: "Memoir & Non-Fiction",
      summary: "Life stories, business books and thought leadership that build authority — researched, structured and written to sound exactly like you.",
      tags: ["Memoir", "Business", "Thought leadership"],
      image: "/images/services/memoir.webp",
      tone: "graphite",
      href: "/memoir-ghostwriting-services/",
    },
    {
      id: "editing",
      title: "Editing & Proofreading",
      summary: "Editors with a deep command of language, structure and storytelling convention review every page, so your manuscript is polished before it reaches agents, publishers or readers.",
      tags: ["Developmental", "Line editing", "Proofreading"],
      image: "/images/services/editing.webp",
      tone: "black",
      href: "/book-editing-services/",
    },
    {
      id: "cover-design",
      title: "Cover Design & Illustration",
      summary: "Covers and illustrations designed for print and digital — legible on an Amazon thumbnail, striking on a bookstore shelf, beautiful in a social preview.",
      tags: ["Covers", "Illustration", "Formatting"],
      image: "/images/services/cover-design.webp",
      tone: "cobalt",
    },
    {
      id: "publishing",
      title: "Publishing & Marketing",
      summary: "ISBN registration, distribution and launch — then promotion, author branding, SEO and book trailers that put your title in front of the readers it was written for.",
      tags: ["Publishing", "Author branding", "Book trailers"],
      image: "/images/services/publishing.webp",
      tone: "graphite",
      href: "/book-marketing-services/",
    },
  ] satisfies Service[],
};

export const process = {
  label: "Process",
  heading: "From first conversation to finished book.",
  steps: [
    { id: "discover", word: "Discover", body: "It starts with a conversation. We study your vision, your audience and whatever you already have — notes, recordings, an unfinished draft — and find the book inside it.", image: "/images/process/discover.webp" },
    { id: "develop", word: "Develop", body: "We build the architecture: a chapter-by-chapter outline and a voice profile, so every page that follows sounds unmistakably like you.", image: "/images/process/develop.webp" },
    { id: "write", word: "Write", body: "Your ghostwriter drafts in rolling batches. Chapters arrive for your feedback, and nothing moves forward until it reads right to you.", image: "/images/process/write.webp", film: "typewriter" as const },
    { id: "refine", word: "Refine", body: "Professional editors refine structure, pacing and language line by line, until the manuscript is polished to publishing standard.", image: "/images/process/refine.webp" },
    { id: "deliver", word: "Deliver", body: "Cover, formatting, ISBN and distribution — we guide every decision and place your book where readers will find it. Your name goes on the cover.", image: "/images/process/deliver.webp" },
  ],
};

export type Book = { id: string; title: string; author: string; note: string; cover: string };

/** Covers shown in the live site's portfolio. TODO(client): confirm display rights. */
export const work = {
  label: "Selected work",
  heading: "Books on the shelf.",
  intro: "A selection of titles from our portfolio — stories that needed the right words and the right look to reach their readers.",
  books: [
    { id: "past-is-rising", title: "The Past Is Rising", author: "Kathryn Bywaters", note: "Dark fantasy", cover: "/images/books/the-past-is-rising.webp" },
    { id: "daughter-of-man", title: "Daughter of Man", author: "The Chronicles of Otherwhere", note: "Fantasy series · Book 1", cover: "/images/books/daughter-of-man.webp" },
    { id: "fortress-of-blood", title: "Fortress of Blood", author: "L. D. Goffigan", note: "Mina Murray series · Book 2", cover: "/images/books/fortress-of-blood.webp" },
    { id: "rose-in-the-snow", title: "A Rose in the Snow", author: "Damon Frostheart", note: "Romantic fantasy", cover: "/images/books/a-rose-in-the-snow.webp" },
  ] satisfies Book[],
  distributionLabel: "Distribution across the world’s most trusted platforms",
  distribution: ["Amazon", "Barnes & Noble", "Google Books", "Baker & Taylor", "Alibris"],
};

export const trust = {
  label: "Why us",
  heading: "Built to be trusted with your story.",
  // Each figure is a count of something the live site states — no invented metrics.
  figures: [
    { value: 8, pad: 2, suffix: "", caption: "Publishing services under one roof" },
    { value: 5, pad: 2, suffix: "", caption: "Global platforms for distribution" },
    { value: 100, pad: 3, suffix: "%", caption: "Of the credit stays with you" },
    { value: 1, pad: 2, suffix: "", caption: "Voice on every page — yours" },
  ],
  reasons: [
    { title: "Professional writers", body: "Seasoned ghostwriters who command narrative, structure and voice — matched to your genre and goals." },
    { title: "Industry expertise", body: "Writers, editors and publishing consultants who know what agents, retailers and readers expect." },
    { title: "Confidential by default", body: "Your project stays private from the first call to the final file. The credit is entirely yours." },
    { title: "Original, every time", body: "Every manuscript is written for you, from your ideas — never templated, never recycled." },
    { title: "Quality, chapter by chapter", body: "Rolling deliveries and your feedback at every stage keep the book true to your vision." },
    { title: "Editorial & publishing support", body: "Editors review every page, and we guide every publishing decision from ISBN to distribution." },
  ],
};

export const testimonials = {
  label: "Testimonials",
  items: [
    {
      quote: "Professional Ghostwriting Services exceeded my expectations! … I had a rough idea regarding my project, but they refined and revamped it on a whole new level — I am blown away.",
      name: "Dortha Guy",
      role: "Author",
    },
    {
      quote: "I came to them with nothing but a concept and a lot of passion. Their team turned it into a beautifully written ebook that launched to incredible reviews.",
      name: "Marcus L.",
      role: "Entrepreneur & First-Time Author",
    },
    {
      quote: "Their ghostwriters captured my voice so perfectly that even my closest friends could not tell someone else had written it.",
      name: "Sarah T.",
      role: "Business Coach & Non-Fiction Author",
    },
  ],
} as const;

export const faq = {
  label: "FAQ",
  heading: "Questions, answered.",
  items: [
    {
      q: "How can professional ghostwriting services benefit my author career?",
      a: "Ghostwriting lets you publish a high-quality, expertly written book without spending years developing writing skills or sacrificing your other responsibilities. A published book builds authority, expands your personal brand, opens speaking opportunities and creates a lasting legacy. We handle research, writing, editing and publishing guidance so you can focus on what you do best.",
    },
    {
      q: "Will the book really sound like me?",
      a: "Yes — that is the craft. Before writing begins we build a voice profile from conversations and any material you share, then deliver chapters in rolling batches for your feedback. Nothing moves forward until it reads like you.",
    },
    {
      q: "Who gets the credit for the book?",
      a: "You do. We write in your voice and you keep all the credit. Your name goes on the cover.",
    },
    {
      q: "What happens after the manuscript is finished?",
      a: "We can take the book the rest of the way: editing, cover design, illustration, formatting, ISBN registration, distribution and promotion — including social media, Amazon optimisation, email campaigns and SEO.",
    },
  ],
} as const;

export const cta = {
  lines: ["Your story", "starts here."],
  lede: "Tell us about the book you want to write. We’ll be in touch to talk it through.",
  button: "Start your book",
} as const;
