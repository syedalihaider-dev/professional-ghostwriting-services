/**
 * Homepage copy. Business facts, services, process detail and testimonials come
 * from the live site and are lightly edited for the new editorial voice.
 * Nothing here is invented: no statistics, awards or client names that the
 * current site does not already publish.
 */

export const hero = {
  eyebrow: "Ghostwriting · Editing · Publishing",
  // Rendered as the page <h1>. Lines are split for the art-directed layout.
  lines: [
    { text: "Your story,", align: "start" },
    { text: "written", italic: true, after: " into", align: "indent" },
    { text: "legacy.", align: "end" },
  ],
  lede:
    "We transform your ideas, expertise and stories into publish-ready books. We write in your voice — you keep all the credit.",
  cta: "Begin your book",
  scroll: "Scroll to turn the page",
} as const;

export const premise = {
  chapter: "I",
  label: "The Premise",
  // Words wrapped in {braces} carry the inline film chip.
  statement:
    "Your story deserves more than a blank page. It deserves a writer who hears your {voice}, understands your readers and knows what the finished book must become — and who disappears the moment it carries your name.",
  heading: "Professional ghostwriting, practised as a craft.",
  body: [
    "We partner with authors, executives, entrepreneurs and thought leaders to bring their most important ideas to the world — without sacrificing months of their time at a keyboard.",
    "Whether it is a prestige hardcover or an ebook built for Kindle and digital platforms, our ghostwriters, editors and publishing consultants tailor every word to your vision.",
  ],
  audienceLabel: "Who we write for",
  audience: ["Authors", "Executives", "Entrepreneurs", "Thought leaders"],
  signature: "Your story. Your voice. Our craft.",
} as const;

export type Service = {
  id: string;
  title: string;
  kicker: string;
  summary: string;
};

export const services = {
  chapter: "II",
  label: "The Contents",
  heading: "Everything a book needs, under one roof.",
  intro:
    "Ghostwriting is where it begins. Around it sits a full publishing house — so the book that leaves our desk is ready for readers, not just finished.",
  items: [
    {
      id: "ghostwriting",
      title: "Ghostwriting",
      kicker: "The manuscript",
      summary:
        "Impeccable storytelling that captivates your audience and saves your precious time. From full-length manuscripts to digital-first ebooks — your voice, your vision, our words.",
    },
    {
      id: "editing",
      title: "Book Editing",
      kicker: "The polish",
      summary:
        "Editors with a deep command of language, structure and storytelling convention review every page, so your manuscript is polished before it faces publishers, agents or readers.",
    },
    {
      id: "publishing",
      title: "Book Publishing",
      kicker: "The release",
      summary:
        "We guide ISBN registration, distribution set-up and every publishing decision in between — placing your book in libraries, major online retailers and bookshops.",
    },
    {
      id: "cover",
      title: "Book Cover",
      kicker: "The first impression",
      summary:
        "Covers designed for print and digital that attract the right reader — legible on an Amazon thumbnail, striking on a bookstore shelf and in a social preview.",
    },
    {
      id: "illustration",
      title: "Book Illustration",
      kicker: "The imagery",
      summary:
        "Illustrators who bring characters and worlds to life — from full-colour children’s books to chapter headers for a novel — in step with your writing team.",
    },
    {
      id: "branding",
      title: "Author Branding",
      kicker: "The author",
      summary:
        "Define your positioning, visual identity and voice across every platform, so everything you publish reinforces your authority and grows your readership.",
    },
    {
      id: "promotion",
      title: "Book Promotion",
      kicker: "The audience",
      summary:
        "Cost-effective, data-driven promotion across digital and traditional channels that earns your title the attention — and the sustained interest — it deserves.",
    },
    {
      id: "trailer",
      title: "Book Trailer",
      kicker: "The premiere",
      summary:
        "Cinematic video trailers that breathe life into your narrative and characters, and give your launch the opening it deserves.",
    },
  ] satisfies Service[],
};

export const process = {
  chapter: "III",
  label: "The Manuscript",
  heading: "From first idea to finished book.",
  steps: [
    {
      id: "idea",
      title: "Idea",
      body: "It starts with a conversation. We study your vision, your audience and whatever you already have — notes, recordings, an unfinished draft — and find the book inside it.",
    },
    {
      id: "development",
      title: "Development",
      body: "We build the architecture: a chapter-by-chapter outline and a voice profile, so every page that follows sounds unmistakably like you.",
    },
    {
      id: "writing",
      title: "Writing",
      body: "Your ghostwriter drafts in rolling batches. Chapters arrive for your feedback, and nothing moves forward until it reads right to you.",
    },
    {
      id: "editing",
      title: "Editing",
      body: "Professional editors refine structure, pacing and language, line by line, until the manuscript is polished to publishing standard.",
    },
    {
      id: "publishing",
      title: "Publishing",
      body: "Cover, formatting, ISBN and distribution — we guide every decision and place your book where readers will find it. Your name goes on the cover.",
    },
  ],
} as const;

export const film = {
  chapter: "IV",
  label: "Between the lines",
  lines: ["Some stories are told.", "Some are written.", "Yours will be read."],
  caption: "Every word considered. Every voice kept.",
} as const;

export type Book = {
  id: string;
  title: string;
  author: string;
  note: string;
  cover: string;
  spine: string;
};

/**
 * Covers shown in the portfolio on the current live site.
 * TODO(client): confirm display rights for each title before launch.
 */
export const shelf = {
  chapter: "V",
  label: "The Shelf",
  heading: "Covers from our shelf.",
  intro: "A selection of titles from our portfolio — each one a story that needed the right words, and the right look, to reach its readers.",
  books: [
    { id: "past-is-rising", title: "The Past Is Rising", author: "Kathryn Bywaters", note: "Dark fantasy", cover: "/images/books/the-past-is-rising.webp", spine: "#1d2a35" },
    { id: "daughter-of-man", title: "Daughter of Man", author: "The Chronicles of Otherwhere · Book 1", note: "Fantasy series", cover: "/images/books/daughter-of-man.webp", spine: "#2a2140" },
    { id: "fortress-of-blood", title: "Fortress of Blood", author: "L. D. Goffigan", note: "Book two of the Mina Murray series", cover: "/images/books/fortress-of-blood.webp", spine: "#241c3a" },
    { id: "rose-in-the-snow", title: "A Rose in the Snow", author: "Damon Frostheart", note: "Romantic fantasy", cover: "/images/books/a-rose-in-the-snow.webp", spine: "#2b1813" },
  ] satisfies Book[],
  distributionLabel: "Our clients gain distribution across the world’s most trusted platforms",
  distribution: ["Amazon", "Barnes & Noble", "Google Books", "Baker & Taylor", "Alibris"],
};

export const principles = {
  chapter: "VI",
  label: "The Ghost",
  heading: "The best ghostwriting is invisible.",
  intro:
    "Our commitment, our strategic approach and writers who have mastered their art set us apart. You will never see our name on your book — only the quality we put into it.",
  ghostWords: ["Confidential", "Original", "In your voice", "Expert", "Edited", "Published", "Yours"],
  items: [
    { title: "Professional writers", body: "Seasoned ghostwriters who command narrative, structure and voice — matched to your genre and goals." },
    { title: "Industry expertise", body: "Writers, editors and publishing consultants who know what agents, retailers and readers expect." },
    { title: "Confidentiality", body: "Your project stays private from the first call to the final file. The credit is entirely yours." },
    { title: "Originality", body: "Every manuscript is written for you, from your ideas — never templated, never recycled." },
    { title: "Quality, chapter by chapter", body: "Rolling deliveries and your feedback at every stage keep the book true to your vision." },
    { title: "Editorial support", body: "Professional editors review every page before it faces publishers, agents or readers." },
    { title: "Publishing expertise", body: "From ISBN registration to distribution, we guide every publishing decision in between." },
  ],
} as const;

export const letters = {
  chapter: "VII",
  label: "Letters",
  heading: "Letters from our authors.",
  items: [
    {
      quote:
        "Professional Ghostwriting Services exceeded my expectations! Their professionalism and commitment to my project were outstanding. I had a rough idea regarding my project, but they refined and revamped it on a whole new level — I am blown away.",
      name: "Dortha Guy",
      role: "Author",
    },
    {
      quote:
        "I came to them with nothing but a concept and a lot of passion. Their team turned it into a beautifully written ebook that launched to incredible reviews.",
      name: "Marcus L.",
      role: "Entrepreneur & First-Time Author",
    },
    {
      quote:
        "Their ghostwriters captured my voice so perfectly that even my closest friends could not tell someone else had written it. The entire process was seamless from discovery to final manuscript.",
      name: "Sarah T.",
      role: "Business Coach & Non-Fiction Author",
    },
  ],
} as const;

export const faq = {
  chapter: "VIII",
  label: "Questions",
  heading: "Before you begin.",
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
      a: "You do. We write in your voice and you keep all the credit. Your name goes on the cover; ours never appears.",
    },
    {
      q: "What happens after the manuscript is finished?",
      a: "We can take the book the rest of the way: editing, cover design, illustration, formatting, ISBN registration, distribution and promotion — including social media, Amazon optimisation, email campaigns and SEO — so your book reaches the readers it was written for.",
    },
  ],
} as const;

export const finale = {
  lines: ["Your story", "deserves", "to be read."],
  answer: "Let’s write it.",
  cta: "Begin",
  note: "Tell us about the book you want to write — we’ll be in touch to talk it through.",
} as const;

export const footer = {
  closing: "Ghostwritten.",
  blurb: "Professional ghostwriting, editing and publishing for authors, executives, entrepreneurs and thought leaders across the USA.",
} as const;
