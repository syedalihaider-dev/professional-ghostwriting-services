/**
 * Service pages — one master template (components/ServicePage) driven by this
 * data. Every service has its own copy, imagery, process, FAQs and links.
 *
 * Content rules: no invented statistics, clients, awards or guarantees.
 * Medical and academic copy is deliberately framed around supporting
 * qualified professionals and legitimate scholarship.
 */
import type { FilmName } from "@/config/media";
import type { ServiceSlug } from "./serviceSlugs";

export type ServiceCategory = "Ghostwriting" | "Writing" | "Editing & Publishing";

export type ServiceData = {
  slug: ServiceSlug;
  /** Full name, used for <h1> context, metadata and schema. */
  name: string;
  /** Short label for menus and links. */
  short: string;
  /** Word typed onto the page-transition cover. */
  transition: string;
  category: ServiceCategory;
  /** Option preselected in the enquiry dialog (must exist in LEAD_SERVICES). */
  lead: string;
  seo: { title: string; description: string };
  hero: { kicker: string; lines: string[]; lede: string; image: string; alt: string };
  intro: { statement: string; paragraphs: string[]; image: string; alt: string; detail: string; detailAlt: string };
  offer: { heading: string; items: { title: string; body: string }[] };
  matters: { heading: string; body: string; points: { title: string; body: string }[]; image: string; alt: string };
  process: { heading: string; steps: { title: string; body: string }[] };
  benefits: { heading: string; items: { title: string; body: string }[] };
  visual: { image: string; alt: string; lines: string[]; film?: FilmName };
  faqs: { q: string; a: string }[];
  cta: { lines: string[]; lede: string; button: string };
  related: ServiceSlug[];
};

const img = (slug: string, part: "hero" | "intro" | "detail" | "visual") => `/images/svc/${slug}-${part}.webp`;

export const services: ServiceData[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "biography-writing-services",
    name: "Biography Writing Services",
    short: "Biography Writing",
    transition: "BIOGRAPHY",
    category: "Ghostwriting",
    lead: "Ghostwriting",
    seo: {
      title: "Biography Writing Services — Life Stories, Professionally Written",
      description:
        "Professional biography writing services for families, founders and public figures. We research, interview and write a life story with accuracy, warmth and a narrative that does the person justice.",
    },
    hero: {
      kicker: "Biography writing",
      lines: ["A life,", "told properly."],
      lede: "A biography is a portrait in words. We research, interview and write the life story of someone who matters — a parent, a founder, a community figure — with accuracy and a narrative worthy of them.",
      image: img("biography", "hero"),
      alt: "A man smiling as he looks through an old photo album",
    },
    intro: {
      statement: "Every life is a story. Few are ever written down.",
      paragraphs: [
        "Biographies are commissioned for many reasons: to honour a parent, to record a company founder’s journey, to preserve a family’s history for the next generation, or to tell a public figure’s story with care.",
        "Whatever the reason, the work is the same. We gather the facts, listen to the people who knew the subject best, and shape decades of detail into a narrative that reads like a book — not a timeline.",
      ],
      image: img("biography", "intro"),
      alt: "Hands opening a vintage photo album box",
      detail: img("biography", "detail"),
      detailAlt: "Hands holding a vintage film camera",
    },
    offer: {
      heading: "What a biography project includes.",
      items: [
        { title: "Research & archives", body: "We work through letters, photographs, records and documents to build an accurate foundation for the story." },
        { title: "Interviews", body: "Structured conversations with the subject, family, friends and colleagues — the voices that bring a life into focus." },
        { title: "Narrative structure", body: "We find the shape of the life: the turning points, the themes and the moments that deserve a chapter of their own." },
        { title: "Writing & fact-checking", body: "Chapters drafted for your review, with dates, names and events verified as we go." },
        { title: "Photographs & design", body: "Optional layout support so photographs and documents sit naturally alongside the text." },
      ],
    },
    matters: {
      heading: "Memory fades. A book stays.",
      body: "The details of a life — how two people met, why a business was started, what it was like to grow up in a particular place — disappear surprisingly quickly. A professionally written biography keeps them, in a form that can be read, shared and handed down.",
      points: [
        { title: "For families", body: "A lasting record for children and grandchildren who never heard the stories first-hand." },
        { title: "For organisations", body: "A founder’s or institution’s story told with the context and credibility it deserves." },
        { title: "For the subject", body: "A chance to see a life considered as a whole — often a deeply meaningful experience." },
      ],
      image: img("biography", "detail"),
      alt: "A vintage camera held in two hands",
    },
    process: {
      heading: "How we write a biography.",
      steps: [
        { title: "Scope the story", body: "We agree who the book is for, what period it covers and which people and sources we can draw on." },
        { title: "Research & interview", body: "We gather documents and conduct interviews, building a detailed timeline and a library of anecdotes." },
        { title: "Outline the life", body: "A chapter-by-chapter outline organises the material into a narrative arc you approve before writing begins." },
        { title: "Write & review", body: "Chapters arrive in batches for feedback, with facts checked against our research as we go." },
        { title: "Polish & publish", body: "Professional editing, then printing or publishing — from a private family edition to a public release." },
      ],
    },
    benefits: {
      heading: "Why families and organisations choose us.",
      items: [
        { title: "Careful with the facts", body: "Names, dates and events are checked against sources and interviews throughout." },
        { title: "Sensitive with people", body: "Interviews are handled with patience and discretion, especially around difficult chapters." },
        { title: "A real narrative", body: "We write a story people want to read, not a list of events in date order." },
        { title: "From draft to print", body: "Editing, design and publishing support when the manuscript is ready." },
      ],
    },
    visual: { image: img("biography", "visual"), alt: "Hands resting on the pages of an open book", lines: ["Some lives", "deserve a book."] },
    faqs: [
      { q: "Can you write a biography of someone who has passed away?", a: "Yes. We work from documents, photographs and interviews with family, friends and colleagues to reconstruct the life as faithfully as the sources allow." },
      { q: "How do you handle conflicting memories?", a: "We note where accounts differ, check them against documents where possible, and agree with you how to present them — sometimes the difference itself is part of the story." },
      { q: "Is a biography only for private family use?", a: "Not at all. Some biographies are printed in small runs for family; others are published and distributed publicly. We can support either route." },
      { q: "Who owns the finished biography?", a: "You do. The manuscript is written for you and you keep all the credit and rights agreed in your project terms." },
    ],
    cta: { lines: ["Whose story", "should be written?"], lede: "Tell us about the person and the book you have in mind. We’ll help you shape the project.", button: "Start a biography" },
    related: ["memoir-ghostwriting-services", "non-fiction-ghostwriting-services", "book-editing-services"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "content-writing-services",
    name: "Content Writing Services",
    short: "Content Writing",
    transition: "CONTENT",
    category: "Writing",
    lead: "Content Writing",
    seo: {
      title: "Content Writing Services — Website, Blog & Brand Content",
      description:
        "Professional content writing services for authors and businesses: website copy, blog posts, newsletters and social content written in your voice, structured for readers and search engines.",
    },
    hero: {
      kicker: "Content writing",
      lines: ["Words that", "work every day."],
      lede: "Books build authority once. Content builds it every week. We write website copy, blogs, newsletters and social posts that sound like you and give readers a reason to keep coming back.",
      image: img("content", "hero"),
      alt: "Close-up of hands typing on a laptop keyboard",
    },
    intro: {
      statement: "Your audience is reading every day. Give them something worth it.",
      paragraphs: [
        "Most brands know they need consistent content; few have the time to produce it well. The result is a blog that went quiet in March and a website that undersells everything you do.",
        "Our writers take that weight off you. We learn your voice, your audience and your goals, then produce clear, useful content on a schedule you can rely on — the same craft we bring to books, applied to the pages people read every day.",
      ],
      image: img("content", "intro"),
      alt: "A person working on a laptop while scrolling on a phone",
      detail: img("content", "detail"),
      detailAlt: "Hands typing on a laptop",
    },
    offer: {
      heading: "Content we create.",
      items: [
        { title: "Website copy", body: "Home, about and service pages that explain what you do clearly and turn visitors into enquiries." },
        { title: "Blog posts & articles", body: "Researched, readable posts that answer your audience’s questions and support your search visibility." },
        { title: "Email newsletters", body: "Regular emails that keep readers, clients and fans connected between launches." },
        { title: "Social media content", body: "Captions and short-form posts adapted to each platform without losing your voice." },
        { title: "Author & brand copy", body: "Bios, book descriptions, press materials and the small pieces of copy that shape first impressions." },
      ],
    },
    matters: {
      heading: "Consistency is a credibility signal.",
      body: "Readers and clients notice when a brand shows up regularly with something useful to say. Search engines notice too. Strong, consistent content turns an occasional visitor into a returning reader — and a returning reader into a client or a fan.",
      points: [
        { title: "Visibility", body: "Well-structured content helps the right people find you through search." },
        { title: "Trust", body: "Useful, accurate writing demonstrates expertise before anyone gets in touch." },
        { title: "Momentum", body: "A steady publishing rhythm keeps your audience engaged between bigger projects." },
      ],
      image: img("content", "detail"),
      alt: "Hands typing on a laptop keyboard",
    },
    process: {
      heading: "How content projects run.",
      steps: [
        { title: "Voice & audience", body: "We study your existing material and agree tone, audience and the goals each piece should serve." },
        { title: "Content plan", body: "Topics, formats and a publishing calendar, prioritised around what matters most to you." },
        { title: "Write & optimise", body: "Drafts written for readers first, structured with sensible headings, keywords and calls to action." },
        { title: "Review & refine", body: "You review each piece; we revise until it reads exactly right." },
      ],
    },
    benefits: {
      heading: "Why work with book writers on content.",
      items: [
        { title: "Long-form discipline", body: "Writers used to sustaining a book-length voice keep your content consistent across every page." },
        { title: "Research first", body: "Content is grounded in your expertise and checked for accuracy, not padded for word count." },
        { title: "Search-aware, reader-led", body: "We structure content for discovery without writing for algorithms instead of people." },
        { title: "One partner", body: "The same team can support your book, your website and your launch." },
      ],
    },
    visual: { image: img("content", "visual"), alt: "A person browsing a website on a laptop", lines: ["Show up.", "Every week."] },
    faqs: [
      { q: "Can you match the voice of my existing content or book?", a: "Yes. We start by studying your existing writing — or interviewing you — and build a voice guide we follow for every piece." },
      { q: "Do you write for SEO?", a: "We structure content with search in mind — clear headings, relevant terms and helpful answers — but always prioritise readability and accuracy." },
      { q: "Can you work on an ongoing basis?", a: "Yes. Many content projects run on a regular calendar, such as weekly posts or a monthly newsletter, agreed with you up front." },
      { q: "Who owns the content you write?", a: "You do. The content is written for you to publish under your name or your brand." },
    ],
    cta: { lines: ["Ready to say", "something every week?"], lede: "Tell us where your content is today and where you want it to go.", button: "Start your content" },
    related: ["article-writing-services", "book-marketing-services", "business-ghostwriting-services"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "article-writing-services",
    name: "Article Writing Services",
    short: "Article Writing",
    transition: "ARTICLES",
    category: "Writing",
    lead: "Article Writing",
    seo: {
      title: "Article Writing Services — Researched Articles & Thought Leadership",
      description:
        "Professional article writing services: researched features, thought-leadership pieces, op-eds and long-form articles written in your voice for publications, websites and professional platforms.",
    },
    hero: {
      kicker: "Article writing",
      lines: ["Ideas worth", "publishing."],
      lede: "A well-made article puts your thinking in front of the right readers. We research, structure and write features, op-eds and thought-leadership pieces that carry your name and your perspective.",
      image: img("article", "hero"),
      alt: "Hands holding open a newspaper",
    },
    intro: {
      statement: "An article is an argument. Ours are built to persuade.",
      paragraphs: [
        "Executives, experts and authors are often asked for their perspective but rarely have the hours a strong article demands — the research, the structure, the drafts that turn an opinion into a piece an editor wants to run.",
        "We do that work with you. We interview you, research the topic, and write an article that sounds like you on your best day: clear, specific and worth a reader’s time.",
      ],
      image: img("article", "intro"),
      alt: "A man reading a newspaper with a cup of coffee",
      detail: img("article", "detail"),
      detailAlt: "A hand scrolling an article on a tablet",
    },
    offer: {
      heading: "Articles we write.",
      items: [
        { title: "Thought leadership", body: "Pieces that set out your point of view on your industry and give readers something new to think about." },
        { title: "Op-eds", body: "Concise, persuasive opinion pieces shaped for the conventions of editorial pages." },
        { title: "Feature articles", body: "Long-form, researched features with structure, narrative and properly attributed sources." },
        { title: "LinkedIn & professional platforms", body: "Articles and long posts adapted for professional networks without losing substance." },
        { title: "Author articles", body: "Pieces that extend your book’s ideas and introduce them to new readers." },
      ],
    },
    matters: {
      heading: "Published thinking builds authority.",
      body: "A strong article does more than fill a page. It shows how you think, it travels further than you can in person, and it creates a record of your expertise that prospective clients, partners and readers can find long after it is published.",
      points: [
        { title: "Credibility", body: "Well-argued, well-sourced articles demonstrate real expertise." },
        { title: "Reach", body: "Articles are shared, quoted and found in search — your ideas travel without you." },
        { title: "Foundation", body: "A body of articles often becomes the backbone of a future book." },
      ],
      image: img("article", "detail"),
      alt: "Reading an article on a tablet",
    },
    process: {
      heading: "From idea to published piece.",
      steps: [
        { title: "Angle", body: "We agree the argument, the audience and where the piece is intended to appear." },
        { title: "Interview & research", body: "We capture your perspective in conversation and research supporting evidence and sources." },
        { title: "Draft", body: "A structured draft with a strong opening, a clear argument and a memorable close." },
        { title: "Edit & finalise", body: "Revisions with you, then a final edit to the publication’s style and length." },
      ],
    },
    benefits: {
      heading: "Why our articles stand out.",
      items: [
        { title: "Your perspective", body: "We write your argument, not a generic overview of the topic." },
        { title: "Properly researched", body: "Claims are supported, sources are noted and facts are checked." },
        { title: "Editorially minded", body: "Pieces are shaped to the length, tone and conventions editors expect." },
        { title: "Book-ready thinking", body: "Articles can grow into chapters — and into a book — when you’re ready." },
      ],
    },
    visual: { image: img("article", "visual"), alt: "Close-up of printed text on a page", lines: ["Say it once.", "Say it well."] },
    faqs: [
      { q: "Will the article be published under my name?", a: "Yes. Articles are written in your voice to be published under your name; we never take a byline." },
      { q: "Do you place articles in publications?", a: "We write and shape articles for the publications you’re targeting and can advise on submission, but placement decisions always rest with each publication’s editors." },
      { q: "How do you make sure it reflects my views?", a: "Every article starts with an interview, and you review and approve the draft before it goes anywhere." },
      { q: "Can articles become a book later?", a: "Often, yes. A series of articles can form the outline — and some of the chapters — of a non-fiction book." },
    ],
    cta: { lines: ["Have a point", "worth making?"], lede: "Tell us the idea and the audience. We’ll help you turn it into a piece worth publishing.", button: "Start an article" },
    related: ["content-writing-services", "business-ghostwriting-services", "non-fiction-ghostwriting-services"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "business-plan-writing-services",
    name: "Business Plan Writing Services",
    short: "Business Plan Writing",
    transition: "BUSINESS PLAN",
    category: "Writing",
    lead: "Business Plan Writing",
    seo: {
      title: "Business Plan Writing Services — Clear, Investor-Ready Plans",
      description:
        "Professional business plan writing services. We turn your strategy, market research and financial assumptions into a clear, well-structured business plan for lenders, investors and partners.",
    },
    hero: {
      kicker: "Business plan writing",
      lines: ["Strategy,", "on paper."],
      lede: "A business plan is the story of where your company is going and why it will get there. We turn your strategy, research and numbers into a clear, persuasive document readers can act on.",
      image: img("business-plan", "hero"),
      alt: "A man presenting charts on a large screen",
    },
    intro: {
      statement: "Investors read hundreds of plans. Yours should be easy to say yes to.",
      paragraphs: [
        "Founders usually know their business inside out — but explaining it clearly to a lender, investor or partner is a different skill. Important ideas get buried, numbers lack context, and the story gets lost in the detail.",
        "We bring structure and clarity. Working from your strategy, data and financial assumptions, we write a plan that explains the opportunity, the model and the path to growth in language your readers will follow.",
      ],
      image: img("business-plan", "intro"),
      alt: "A team gathered around a table reviewing a plan",
      detail: img("business-plan", "detail"),
      detailAlt: "A team planning a project with notes on a wall",
    },
    offer: {
      heading: "What goes into the plan.",
      items: [
        { title: "Executive summary", body: "The one or two pages most readers see first — written to communicate the opportunity at a glance." },
        { title: "Market & competition", body: "A clear account of your market, customers and competitors, built on the research you provide or we compile with you." },
        { title: "Business model & strategy", body: "How you create value, reach customers and grow — explained without jargon." },
        { title: "Operations & team", body: "The people, processes and milestones that make the plan credible." },
        { title: "Financial narrative", body: "The story behind your projections, written to sit alongside the figures prepared by you or your accountant." },
      ],
    },
    matters: {
      heading: "A clear plan opens doors.",
      body: "Whether you are approaching a bank, pitching investors or aligning a leadership team, the plan is often the first serious impression your business makes. Clarity signals competence; a confusing plan raises questions before the conversation starts.",
      points: [
        { title: "For lenders", body: "A structured, realistic plan that answers the questions they will ask." },
        { title: "For investors", body: "A compelling narrative around opportunity, traction and growth." },
        { title: "For your team", body: "A shared document that turns strategy into direction." },
      ],
      image: img("business-plan", "detail"),
      alt: "A team planning with notes on a wall",
    },
    process: {
      heading: "How we build your plan.",
      steps: [
        { title: "Discovery", body: "We review your strategy, research, existing documents and the audience the plan is for." },
        { title: "Structure", body: "An outline agreed with you, tailored to lenders, investors or internal use." },
        { title: "Write", body: "Each section drafted in clear business language, aligned with your figures." },
        { title: "Review & refine", body: "Revisions with you and your advisers until the plan is accurate and persuasive." },
      ],
    },
    benefits: {
      heading: "Why founders work with us.",
      items: [
        { title: "Clarity", body: "We turn complex models into explanations a busy reader can follow." },
        { title: "Your strategy, sharpened", body: "We write your plan — we don’t invent one — and help you present it at its strongest." },
        { title: "Reader-focused", body: "Each version is shaped for who will read it and what they need to decide." },
        { title: "Confidential", body: "Your strategy and financial information are handled with discretion." },
      ],
    },
    visual: { image: img("business-plan", "visual"), alt: "A man explaining a strategy on a whiteboard", lines: ["Make the case.", "Make it clear."] },
    faqs: [
      { q: "Do you prepare the financial projections?", a: "We write the financial narrative and integrate your figures. The projections themselves should come from you, your accountant or a financial adviser, and we’ll make sure the plan explains them clearly." },
      { q: "Can you guarantee funding?", a: "No one can. Funding decisions depend on your business, your market and the lender or investor. What we can do is make sure your plan presents the opportunity clearly and professionally." },
      { q: "Do you need my market research?", a: "Any research you already have is valuable. Where gaps exist, we’ll discuss what information is needed and how best to source it." },
      { q: "Is my information kept confidential?", a: "Yes. Your plan, strategy and financial details are handled with discretion and used only for your project." },
    ],
    cta: { lines: ["Ready to make", "your case?"], lede: "Tell us about the business and who the plan is for. We’ll take it from there.", button: "Start your plan" },
    related: ["business-ghostwriting-services", "content-writing-services", "article-writing-services"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "book-marketing-services",
    name: "Book Marketing Services",
    short: "Book Marketing",
    transition: "MARKETING",
    category: "Editing & Publishing",
    lead: "Book Marketing",
    seo: {
      title: "Book Marketing Services — Launches, Promotion & Author Branding",
      description:
        "Book marketing services for authors: launch planning, Amazon optimisation, social media, email campaigns, author branding, SEO and book trailers — built to help your book find its readers.",
    },
    hero: {
      kicker: "Book marketing",
      lines: ["Written.", "Now let’s get", "it read."],
      lede: "A finished book is the beginning, not the end. We plan and run the marketing that helps your book reach the readers it was written for — from launch week to long after.",
      image: img("marketing", "hero"),
      alt: "Light falling between tall bookstore shelves",
    },
    intro: {
      statement: "Great books don’t sell themselves. Good marketing gives them a chance.",
      paragraphs: [
        "Discoverability is the hardest challenge many authors face after publication. Thousands of new titles appear every week, and even a brilliant book can disappear without a plan to put it in front of readers.",
        "Our marketing team builds that plan with you: a positioned author brand, an optimised retail presence, and campaigns across the channels where your readers actually spend their time.",
      ],
      image: img("marketing", "intro"),
      alt: "A person browsing in a bookstore",
      detail: img("marketing", "detail"),
      detailAlt: "An audience watching a presentation on stage",
    },
    offer: {
      heading: "How we promote your book.",
      items: [
        { title: "Launch planning", body: "A coordinated pre-launch and launch plan covering timing, channels, reviews and announcements." },
        { title: "Amazon & retail optimisation", body: "Descriptions, categories, keywords and author pages set up to help readers find and choose your book." },
        { title: "Social media & content", body: "Platform-specific content and campaigns matched to your genre and audience." },
        { title: "Email & author branding", body: "A consistent author identity, website support and email campaigns that build a lasting readership." },
        { title: "Book trailers & paid ads", body: "Video trailers and targeted advertising campaigns that extend your reach." },
      ],
    },
    matters: {
      heading: "Readers can’t buy a book they never see.",
      body: "Marketing is how a book moves from published to discovered. It shapes how a book is positioned, who hears about it and whether a curious browser becomes a reader. Done well, it keeps a title discoverable long after launch week.",
      points: [
        { title: "Positioning", body: "Clear categories, descriptions and branding that tell the right readers this book is for them." },
        { title: "Visibility", body: "Coordinated activity across search, retail, social and email." },
        { title: "Longevity", body: "An author platform that supports this book and the next." },
      ],
      image: img("marketing", "detail"),
      alt: "An audience at a launch event",
    },
    process: {
      heading: "How a campaign comes together.",
      steps: [
        { title: "Audit & positioning", body: "We review your book, genre, competition and current presence to define how the book should be positioned." },
        { title: "Strategy", body: "A plan across channels, timed around your launch or relaunch and matched to your budget." },
        { title: "Launch", body: "Coordinated execution: retail pages, content, emails, campaigns and outreach." },
        { title: "Measure & adjust", body: "We monitor results and refine the approach based on what readers respond to." },
      ],
    },
    benefits: {
      heading: "Why authors trust us with their launch.",
      items: [
        { title: "Book people", body: "Our marketers work alongside writers and editors, so campaigns respect the book itself." },
        { title: "Genre-aware", body: "Fiction and non-fiction audiences behave differently — so do our campaigns." },
        { title: "Honest expectations", body: "We focus on visibility and readership, and we never promise sales figures or rankings." },
        { title: "Joined-up support", body: "Editing, covers, publishing and marketing can all be handled in one place." },
      ],
    },
    visual: { image: img("marketing", "visual"), alt: "A stack of books on a bookstore table", lines: ["From the shelf", "to the reader."] },
    faqs: [
      { q: "Can you guarantee bestseller status or a number of sales?", a: "No — and we’d be wary of anyone who does. Results depend on many factors, including the book, genre and market. We focus on giving your book the strongest possible visibility and positioning." },
      { q: "Which platforms work best for book marketing?", a: "It depends on your genre. Fiction often performs well on Instagram, TikTok and Pinterest; non-fiction and business books on LinkedIn and YouTube. We recommend channels based on where your readers are." },
      { q: "Can you market a book that’s already published?", a: "Yes. Many campaigns relaunch or revitalise existing titles with refreshed positioning, retail pages and promotion." },
      { q: "Do I need a website?", a: "An author website helps readers find you and gives you a home for your email list. We can help create or improve one as part of your author branding." },
    ],
    cta: { lines: ["Your book is ready.", "Are its readers?"], lede: "Tell us about your book and your launch timing. We’ll recommend a plan.", button: "Plan my launch" },
    related: ["book-editing-services", "content-writing-services", "fiction-ghostwriting-services"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "book-proofreading-services",
    name: "Book Proofreading Services",
    short: "Book Proofreading",
    transition: "PROOFREADING",
    category: "Editing & Publishing",
    lead: "Book Proofreading",
    seo: {
      title: "Book Proofreading Services — The Final Check Before Print",
      description:
        "Professional book proofreading services. A meticulous final pass for spelling, grammar, punctuation, consistency and layout errors, so your manuscript or proofs are ready for publication.",
    },
    hero: {
      kicker: "Book proofreading",
      lines: ["The last read", "before readers."],
      lede: "Proofreading is the final, meticulous check that catches what everyone else missed — the typo on page 212, the name spelled two ways, the stray double space. Small things that readers always notice.",
      image: img("proofreading", "hero"),
      alt: "A person reviewing a tall stack of printed pages",
    },
    intro: {
      statement: "Readers forgive a lot. They rarely forgive typos.",
      paragraphs: [
        "By the time a manuscript reaches proofreading, it has usually been read so many times that its author can no longer see it. The eye reads what it expects to find, not what is actually on the page.",
        "A professional proofreader reads differently — slowly, deliberately and with fresh eyes — checking every word, every punctuation mark and every consistency choice before your book goes to print or online.",
      ],
      image: img("proofreading", "intro"),
      alt: "Close-up of printed text on a book page",
      detail: img("proofreading", "detail"),
      detailAlt: "Book pages turning",
    },
    offer: {
      heading: "What we check.",
      items: [
        { title: "Spelling & typos", body: "Misspellings, repeated words, missing words and the errors spellcheck can’t see." },
        { title: "Grammar & punctuation", body: "Correct, consistent punctuation and grammar throughout — without flattening your voice." },
        { title: "Consistency", body: "Names, places, capitalisation, numbers, hyphenation and spelling conventions kept uniform." },
        { title: "Formatting & layout", body: "On typeset proofs: headings, page numbers, widows and orphans, spacing and running heads." },
        { title: "Style sheet", body: "A record of the decisions made, so future editions and books stay consistent." },
      ],
    },
    matters: {
      heading: "Small errors, big impressions.",
      body: "Reviewers mention typos. Readers notice them. A handful of errors can make a carefully written book feel unfinished — and undermine the trust you’ve built with every other page. Proofreading protects the work you’ve already put in.",
      points: [
        { title: "Professionalism", body: "A clean book reads as a professional one." },
        { title: "Reviews", body: "Fewer distractions means readers talk about your story, not your typos." },
        { title: "Confidence", body: "Publish knowing the final text has been checked carefully." },
      ],
      image: img("proofreading", "detail"),
      alt: "Pages of a book turning",
    },
    process: {
      heading: "How we proofread.",
      steps: [
        { title: "Brief", body: "We agree your spelling convention, house style and whether we’re working on a manuscript or typeset proofs." },
        { title: "First pass", body: "A careful word-by-word read for errors in spelling, grammar and punctuation." },
        { title: "Consistency pass", body: "A dedicated check of names, terms, numbers and formatting across the whole book." },
        { title: "Report & return", body: "Tracked corrections or marked-up proofs, with queries flagged and a style sheet." },
      ],
    },
    benefits: {
      heading: "Why authors trust our proofreaders.",
      items: [
        { title: "Fresh eyes", body: "Proofreaders who haven’t seen your manuscript before — so they see what’s really there." },
        { title: "Respect for your voice", body: "We correct errors, not style; deliberate choices are queried, never overwritten." },
        { title: "Transparent changes", body: "Every correction is tracked, so you stay in control of the final text." },
        { title: "Print & digital", body: "We check manuscripts, print proofs and ebook files." },
      ],
    },
    visual: { image: img("proofreading", "visual"), alt: "Close-up of printed type", lines: ["Every word.", "Checked."] },
    faqs: [
      { q: "What’s the difference between proofreading and editing?", a: "Editing improves the writing itself — structure, clarity and flow. Proofreading is the final check for surface errors and consistency once the text is otherwise finished. Most books benefit from both, in that order." },
      { q: "Should proofreading happen before or after typesetting?", a: "Ideally after, on the typeset proofs, so layout errors can be caught too. We can also proofread a final manuscript before design." },
      { q: "Will you change my writing style?", a: "No. Proofreading corrects errors. Where something looks deliberate but unusual, we query it rather than change it." },
      { q: "Can you work to US or UK spelling?", a: "Yes. We follow the convention you choose and record it on a style sheet for consistency." },
    ],
    cta: { lines: ["One last read", "before the world does."], lede: "Send us details of your manuscript or proofs and your publication date.", button: "Book a proofread" },
    related: ["book-editing-services", "book-marketing-services", "academic-ghostwriting-services"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "book-editing-services",
    name: "Book Editing Services",
    short: "Book Editing",
    transition: "EDITING",
    category: "Editing & Publishing",
    lead: "Book Editing",
    seo: {
      title: "Book Editing Services — Developmental, Line & Copy Editing",
      description:
        "Professional book editing services: developmental editing, line editing and copy editing that strengthen structure, pacing and language while keeping your voice — so your manuscript is ready for readers.",
    },
    hero: {
      kicker: "Book editing",
      lines: ["Good writing", "becomes", "great books."],
      lede: "Editing is where a manuscript becomes a book. Our editors strengthen structure, pacing and language line by line — while protecting the voice that makes the book yours.",
      image: img("editing", "hero"),
      alt: "A hand writing in ink on lined paper",
    },
    intro: {
      statement: "Every published book has been edited. The best ones, carefully.",
      paragraphs: [
        "You’ve finished the draft — an achievement in itself. Now the question is whether the book on the page matches the book in your head: whether the structure holds, the pacing works and every sentence earns its place.",
        "Our editors read your manuscript the way a demanding reader will, then show you exactly what to strengthen. The changes are suggested and explained, so the finished book is better and still unmistakably yours.",
      ],
      image: img("editing", "intro"),
      alt: "A magnifying glass over printed text",
      detail: img("editing", "detail"),
      detailAlt: "A hand turning the pages of a book",
    },
    offer: {
      heading: "Levels of editing.",
      items: [
        { title: "Manuscript assessment", body: "An expert read and written report on the book’s strengths, weaknesses and priorities for revision." },
        { title: "Developmental editing", body: "Big-picture work on structure, argument or plot, character, pacing and the shape of the book." },
        { title: "Line editing", body: "Sentence-level work on clarity, rhythm, tone and style, so the prose reads with confidence." },
        { title: "Copy editing", body: "Grammar, usage, consistency and accuracy, preparing the manuscript for typesetting." },
        { title: "Proofreading", body: "The final check for surface errors once the book is laid out." },
      ],
    },
    matters: {
      heading: "The draft is yours. The polish makes it a book.",
      body: "Agents, publishers and readers judge books quickly. A professionally edited manuscript removes the obstacles between your ideas and your reader — the confusing chapter, the sagging middle, the sentence that has to be read twice.",
      points: [
        { title: "Structure", body: "A shape that keeps readers turning pages." },
        { title: "Clarity", body: "Language that says exactly what you mean." },
        { title: "Readiness", body: "A manuscript prepared for agents, publishers or self-publishing." },
      ],
      image: img("editing", "detail"),
      alt: "Turning the pages of a book",
    },
    process: {
      heading: "How editing works.",
      steps: [
        { title: "Read & assess", body: "We read the full manuscript and recommend the level of editing it actually needs." },
        { title: "Edit", body: "Tracked changes and margin notes explain every suggestion, chapter by chapter." },
        { title: "Discuss", body: "We talk through the edit with you, so decisions about your book stay yours." },
        { title: "Revise & finalise", body: "You revise; we review and, where needed, carry out a final polish." },
      ],
    },
    benefits: {
      heading: "Why authors choose our editors.",
      items: [
        { title: "Voice-first", body: "We strengthen your writing rather than replacing it with ours." },
        { title: "Explained changes", body: "Every significant suggestion comes with the reason behind it." },
        { title: "The right level", body: "We recommend the editing your manuscript needs — not the most expensive option." },
        { title: "Next steps covered", body: "Proofreading, covers, publishing and marketing are available when you’re ready." },
      ],
    },
    visual: { image: img("editing", "visual"), alt: "A typewriter beside an open book on a desk", lines: ["Every page,", "considered."] },
    faqs: [
      { q: "Which type of editing do I need?", a: "It depends on the draft. If structure or plot isn’t working, start with developmental editing; if the shape is right but the prose needs work, line editing; if the writing is strong, copy editing. A manuscript assessment can tell you." },
      { q: "Will my book still sound like me?", a: "Yes. Good editing serves the author’s voice. Suggestions are tracked and explained, and you decide what to accept." },
      { q: "Do you edit fiction and non-fiction?", a: "Both. Our editors work across genres, from novels and memoirs to business and self-help books." },
      { q: "Do I need proofreading after editing?", a: "Usually, yes. Proofreading is a separate final check after the book is laid out, catching the errors that slip in during revision and design." },
    ],
    cta: { lines: ["Your draft is done.", "Let’s finish the book."], lede: "Tell us about your manuscript — its genre, length and where you are with it.", button: "Get my book edited" },
    related: ["book-proofreading-services", "book-marketing-services", "fiction-ghostwriting-services"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "business-ghostwriting-services",
    name: "Business Ghostwriting Services",
    short: "Business Ghostwriting",
    transition: "BUSINESS",
    category: "Ghostwriting",
    lead: "Ghostwriting",
    seo: {
      title: "Business Ghostwriting Services — Books for Executives & Founders",
      description:
        "Business ghostwriting services for executives, founders and consultants. We turn your expertise, frameworks and experience into an authoritative business book written in your voice.",
    },
    hero: {
      kicker: "Business ghostwriting",
      lines: ["Your expertise,", "bound."],
      lede: "A business book turns what you know into authority you can hand to someone. We help executives, founders and consultants capture their thinking in a book that sounds like them — without months away from the business.",
      image: img("business", "hero"),
      alt: "Silhouettes of business people standing at a window",
    },
    intro: {
      statement: "You’ve built the expertise. A book puts it on the record.",
      paragraphs: [
        "Leaders accumulate hard-won insight: frameworks that work, lessons from failure, a way of seeing their industry that others don’t. Most of it lives in presentations, meetings and conversations — and is lost when the room empties.",
        "We capture it properly. Through structured interviews and your existing material, we shape your ideas into a clear, credible business book that represents you and your organisation at your best.",
      ],
      image: img("business", "intro"),
      alt: "Executives meeting around a boardroom table",
      detail: img("business", "detail"),
      detailAlt: "Two executives in conversation",
    },
    offer: {
      heading: "What we help leaders write.",
      items: [
        { title: "Leadership books", body: "Your philosophy and experience of leading people and organisations, told through real examples." },
        { title: "Methodology & framework books", body: "Your process or model explained clearly enough for readers to apply it." },
        { title: "Founder stories", body: "The story of building a company — the decisions, setbacks and lessons." },
        { title: "Industry books", body: "Authoritative perspectives on where your industry is heading and why." },
        { title: "Supporting content", body: "Articles, speeches and posts that extend the book’s reach." },
      ],
    },
    matters: {
      heading: "A book is a business card that people keep.",
      body: "A well-written business book builds credibility with clients, partners and talent; opens speaking opportunities; and gives your ideas a life beyond your calendar. It becomes a reference point for everything else you do.",
      points: [
        { title: "Authority", body: "A published book signals depth of expertise." },
        { title: "Opportunity", body: "Books lead to speaking, media and partnership conversations." },
        { title: "Legacy", body: "Your thinking recorded in the form that lasts longest." },
      ],
      image: img("business", "detail"),
      alt: "Two executives talking",
    },
    process: {
      heading: "Built around a busy calendar.",
      steps: [
        { title: "Positioning", body: "We define the book’s purpose, audience and big idea with you." },
        { title: "Capture", body: "Efficient interview sessions and a review of your talks, documents and notes." },
        { title: "Architecture", body: "A chapter-by-chapter outline and voice profile, approved before drafting." },
        { title: "Write & review", body: "Chapters delivered in batches; feedback sessions kept short and focused." },
        { title: "Publish & amplify", body: "Editing, publishing and marketing support to put the book to work." },
      ],
    },
    benefits: {
      heading: "Why leaders work with us.",
      items: [
        { title: "Time-efficient", body: "A process designed around limited availability, so the book progresses without taking over your schedule." },
        { title: "Business literate", body: "Writers comfortable with strategy, data and the language of your industry." },
        { title: "Confidential", body: "Sensitive information and internal stories are handled with discretion." },
        { title: "Your name, your credit", body: "The book is yours. We stay behind the scenes." },
      ],
    },
    visual: { image: img("business", "visual"), alt: "A man presenting a business report to colleagues", lines: ["Lead with", "what you know."] },
    faqs: [
      { q: "How much of my time does a business book take?", a: "We design the process around your availability — typically a series of focused interviews and periodic chapter reviews, rather than hours of writing." },
      { q: "Can you include our company’s case studies?", a: "Yes, with the appropriate permissions. Real examples make business books more credible and engaging." },
      { q: "Will anyone know a ghostwriter was involved?", a: "Only if you choose to say so. You keep all the credit, and our involvement remains confidential." },
      { q: "Can you help publish and promote the book?", a: "Yes. We offer editing, publishing and marketing support, including author branding for executives." },
    ],
    cta: { lines: ["Put your expertise", "on the shelf."], lede: "Tell us about your business, your idea and your timeline.", button: "Start a business book" },
    related: ["business-plan-writing-services", "article-writing-services", "non-fiction-ghostwriting-services"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "medical-ghostwriting-services",
    name: "Medical Ghostwriting Services",
    short: "Medical Ghostwriting",
    transition: "MEDICAL",
    category: "Ghostwriting",
    lead: "Ghostwriting",
    seo: {
      title: "Medical Ghostwriting Services — Books for Healthcare Professionals",
      description:
        "Medical ghostwriting services for doctors, clinicians and health professionals. We help qualified experts turn their knowledge into clear, accurate books and patient-friendly content — with the author always responsible for clinical content.",
    },
    hero: {
      kicker: "Medical ghostwriting",
      lines: ["Expert knowledge,", "clearly written."],
      lede: "Doctors, clinicians and researchers know things patients and the public need to understand. We help qualified professionals turn that expertise into clear, accurate, readable books — written with them, reviewed by them.",
      image: img("medical", "hero"),
      alt: "A microscope in a laboratory",
    },
    intro: {
      statement: "Medicine is complex. Explaining it shouldn’t be.",
      paragraphs: [
        "Healthcare professionals often want to write — to guide patients through a condition, share a career’s worth of insight or explain new thinking in their field. What they lack is the time, and sometimes the experience of writing for a general reader.",
        "We provide the writing craft. You provide the expertise and remain responsible for every clinical statement. Together we produce a book that is both accurate and genuinely accessible.",
      ],
      image: img("medical", "intro"),
      alt: "A doctor writing on a medical record",
      detail: img("medical", "detail"),
      detailAlt: "Scientists analysing samples in a laboratory",
    },
    offer: {
      heading: "What we help health professionals write.",
      items: [
        { title: "Patient guides", body: "Clear, compassionate books that help patients and families understand a condition or treatment." },
        { title: "Health & wellness books", body: "Evidence-informed books for general readers, written in plain language." },
        { title: "Professional memoirs", body: "The stories and lessons of a career in medicine, nursing or research." },
        { title: "Practice & industry books", body: "Books for fellow professionals on practice, leadership or innovation in healthcare." },
        { title: "Referencing support", body: "Organising and formatting the sources and citations you provide." },
      ],
    },
    matters: {
      heading: "Good information changes outcomes.",
      body: "When patients understand their health, they ask better questions and make more informed decisions with their clinicians. Accessible books written with qualified experts help close the gap between specialist knowledge and the people who need it.",
      points: [
        { title: "Accuracy", body: "Clinical content comes from — and is approved by — qualified professionals." },
        { title: "Accessibility", body: "Complex ideas explained without jargon or oversimplification." },
        { title: "Trust", body: "A book that reflects your expertise and professional standards." },
      ],
      image: img("medical", "detail"),
      alt: "Scientists in a laboratory",
    },
    process: {
      heading: "A process built for accuracy.",
      steps: [
        { title: "Scope & audience", body: "We define the reader, the purpose and the boundaries of what the book will and won’t cover." },
        { title: "Expert interviews", body: "We interview you and review the materials and sources you provide." },
        { title: "Draft in plain language", body: "Chapters written for the intended reader, with sources noted for your review." },
        { title: "Clinical review", body: "You — and any reviewers you appoint — check every clinical statement before it is finalised." },
        { title: "Edit & publish", body: "Professional editing and publishing support once the content is approved." },
      ],
    },
    benefits: {
      heading: "Why professionals trust us.",
      items: [
        { title: "Expert-led", body: "You remain the authority; we never supply medical opinions or advice of our own." },
        { title: "Plain language", body: "Writers skilled at making complex information clear for non-specialists." },
        { title: "Discreet", body: "Your project and any professional material you share are handled confidentially." },
        { title: "Careful sourcing", body: "Sources you provide are tracked and cited consistently throughout." },
      ],
    },
    visual: { image: img("medical", "visual"), alt: "Students attending a medical lecture", lines: ["Knowledge,", "made readable."] },
    faqs: [
      { q: "Who is responsible for the medical accuracy of the book?", a: "The author. Our role is writing and structure; all clinical content comes from and is approved by you and any qualified reviewers you choose. We do not provide medical advice." },
      { q: "Do you write for medical journals?", a: "Our focus is books and accessible long-form content for general and professional readers. Journal publications follow specific authorship and disclosure rules, which authors should follow with their institutions." },
      { q: "Can you work with my research and references?", a: "Yes. We work from the sources you provide and keep citations organised and consistent for your review." },
      { q: "Is patient information kept confidential?", a: "Please don’t share identifiable patient information. Where case examples are used, they should be appropriately anonymised and approved by you." },
    ],
    cta: { lines: ["Your expertise", "can help more people."], lede: "Tell us about the book you want to write and who it’s for.", button: "Discuss my book" },
    related: ["non-fiction-ghostwriting-services", "academic-ghostwriting-services", "book-editing-services"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "academic-ghostwriting-services",
    name: "Academic Ghostwriting Services",
    short: "Academic Writing Support",
    transition: "ACADEMIC",
    category: "Ghostwriting",
    lead: "Ghostwriting",
    seo: {
      title: "Academic Writing Support — Books & Publications for Researchers",
      description:
        "Academic writing support for researchers and scholars: turning research into books, editing scholarly manuscripts, structuring publications and translating expertise for general readers — always within academic integrity guidelines.",
    },
    hero: {
      kicker: "Academic writing support",
      lines: ["Research,", "made readable."],
      lede: "We help researchers, academics and subject experts bring their work to a wider audience — developing scholarly books, editing manuscripts and translating rigorous research into clear, engaging prose.",
      image: img("academic", "hero"),
      alt: "A woman studying at a desk in a library",
    },
    intro: {
      statement: "Important research deserves readers beyond the footnotes.",
      paragraphs: [
        "Academics produce knowledge that matters, but turning years of research into a book — whether a scholarly monograph or a general-interest title — takes time and a different style of writing than most academic careers reward.",
        "We support that work as editors, structural advisers and writing partners for your own projects. Our support is for researchers and professionals publishing their own work; we do not complete coursework, assignments or assessed work for students.",
      ],
      image: img("academic", "intro"),
      alt: "Students studying quietly in a university library",
      detail: img("academic", "detail"),
      detailAlt: "Library shelves and reading tables",
    },
    offer: {
      heading: "How we support scholars.",
      items: [
        { title: "Research-to-book development", body: "Shaping your research, papers and lectures into a coherent book for academic or general readers." },
        { title: "Academic editing", body: "Developmental and line editing for structure, clarity and argument in your own manuscript." },
        { title: "Popular non-fiction", body: "Translating specialist knowledge into accessible, engaging writing for a general audience." },
        { title: "Proposals & grant narratives", body: "Helping you present your project clearly in book proposals and funding narratives." },
        { title: "Referencing & formatting", body: "Consistent citations and formatting to your publisher’s or institution’s style." },
      ],
    },
    matters: {
      heading: "Clarity extends the reach of research.",
      body: "Research reaches further when it is clearly written. A well-structured book or accessible account of your work can bring it to students, practitioners, policymakers and curious readers — and strengthen its impact within your field.",
      points: [
        { title: "Impact", body: "Wider readership for work that deserves it." },
        { title: "Integrity", body: "Your research, your arguments, your authorship — supported, not substituted." },
        { title: "Quality", body: "Manuscripts edited to the standard publishers expect." },
      ],
      image: img("academic", "detail"),
      alt: "Library shelves",
    },
    process: {
      heading: "How we work with researchers.",
      steps: [
        { title: "Understand the work", body: "We review your research, existing writing and the publication you’re aiming for." },
        { title: "Plan the book", body: "Structure and argument mapped together, with clear roles agreed from the outset." },
        { title: "Develop & edit", body: "We edit, restructure and, where appropriate, help draft accessible sections from your material." },
        { title: "Refine to style", body: "Final editing, referencing and formatting to your publisher’s requirements." },
      ],
    },
    benefits: {
      heading: "Why researchers work with us.",
      items: [
        { title: "Integrity first", body: "We support published authors with their own work and follow academic integrity standards. No assignments, theses for assessment or coursework." },
        { title: "Subject sensitivity", body: "We respect disciplinary conventions and the precision your field demands." },
        { title: "Clear prose", body: "Specialist ideas expressed with clarity, without losing nuance." },
        { title: "Publication-ready", body: "Manuscripts prepared to publisher and style-guide requirements." },
      ],
    },
    visual: { image: img("academic", "visual"), alt: "Shelves of books in a dark library", lines: ["From research", "to readers."] },
    faqs: [
      { q: "Do you write essays, assignments or theses for students?", a: "No. We do not complete coursework or any work submitted for assessment. Our academic support is for researchers, academics and professionals developing and publishing their own work." },
      { q: "How is authorship handled for academic books?", a: "The research, arguments and authorship are yours. We act as editors and writing partners, and we encourage authors to follow their institution’s and publisher’s guidelines on acknowledging editorial assistance." },
      { q: "Can you help turn my research into a popular book?", a: "Yes. Translating specialist work into an accessible book for general readers is one of the most rewarding projects we take on." },
      { q: "Which referencing styles do you work with?", a: "We work to the style your publisher or field requires, such as APA, Chicago, MLA or a house style." },
    ],
    cta: { lines: ["Your research", "deserves readers."], lede: "Tell us about your work and where you hope to publish it.", button: "Discuss my project" },
    related: ["non-fiction-ghostwriting-services", "book-editing-services", "book-proofreading-services"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "non-fiction-ghostwriting-services",
    name: "Non-Fiction Ghostwriting Services",
    short: "Non-Fiction Ghostwriting",
    transition: "NON-FICTION",
    category: "Ghostwriting",
    lead: "Ghostwriting",
    seo: {
      title: "Non-Fiction Ghostwriting Services — Self-Help, How-To & Ideas Books",
      description:
        "Non-fiction ghostwriting services: self-help, how-to, personal development and ideas books written in your voice. We turn your knowledge and experience into a clear, compelling book readers can use.",
    },
    hero: {
      kicker: "Non-fiction ghostwriting",
      lines: ["What you know,", "made into", "a book."],
      lede: "You have knowledge that can change how people think, work or live. We turn it into a clear, structured, engaging non-fiction book — written in your voice, with all the credit yours.",
      image: img("non-fiction", "hero"),
      alt: "Close-up of printed words on a page",
    },
    intro: {
      statement: "The best non-fiction teaches without lecturing.",
      paragraphs: [
        "A strong non-fiction book is part argument, part guide and part story. It needs a big idea, a structure that builds understanding chapter by chapter, and enough real examples to make readers trust it.",
        "That is our craft. We work from your expertise, experience and existing material to shape a book that informs, persuades and stays with readers long after the last page.",
      ],
      image: img("non-fiction", "intro"),
      alt: "A woman working at a desk with a laptop",
      detail: img("non-fiction", "detail"),
      detailAlt: "A hand reaching for a book on a shelf",
    },
    offer: {
      heading: "Non-fiction we write.",
      items: [
        { title: "Self-help & personal development", body: "Practical, encouraging books that help readers make real change." },
        { title: "How-to & practical guides", body: "Step-by-step books that teach a skill or process clearly." },
        { title: "Ideas books", body: "Books built around a big idea and the evidence and stories that support it." },
        { title: "History & narrative non-fiction", body: "True stories told with the pace and craft of a novel." },
        { title: "Specialist subjects", body: "Books in fields from health and finance to faith and education, written with your expertise." },
      ],
    },
    matters: {
      heading: "Knowledge is only useful when it’s shared.",
      body: "Experience that lives in your head helps one client, one audience, one conversation at a time. A book shares it with everyone who needs it — and gives readers a resource they can return to again and again.",
      points: [
        { title: "Reach", body: "Your ideas available to readers you’ll never meet." },
        { title: "Authority", body: "A book establishes you as a voice worth listening to." },
        { title: "Usefulness", body: "A structured resource readers can apply in their own lives." },
      ],
      image: img("non-fiction", "detail"),
      alt: "Reaching for a book on a shelf",
    },
    process: {
      heading: "How we write your non-fiction book.",
      steps: [
        { title: "Find the big idea", body: "We clarify the book’s promise to readers and what makes your perspective distinct." },
        { title: "Gather your knowledge", body: "Interviews and your existing material — talks, courses, notes — form the raw content." },
        { title: "Structure the argument", body: "A chapter-by-chapter outline that builds understanding logically." },
        { title: "Write in your voice", body: "Chapters drafted in rolling batches, refined with your feedback." },
        { title: "Edit & publish", body: "Professional editing and the publishing route that suits your goals." },
      ],
    },
    benefits: {
      heading: "Why non-fiction authors choose us.",
      items: [
        { title: "Structure", body: "We build books readers can follow, with each chapter earning the next." },
        { title: "Story-driven", body: "Real examples and narrative keep information engaging." },
        { title: "Your voice", body: "The book sounds like you, because it’s built from your words." },
        { title: "End-to-end", body: "Writing, editing, design, publishing and marketing in one place." },
      ],
    },
    visual: { image: img("non-fiction", "visual"), alt: "The pages of an open book fanning", lines: ["Share what", "you know."] },
    faqs: [
      { q: "I have lots of material but no structure. Can you help?", a: "Yes — that’s one of the most common starting points. We review everything you have and turn it into a clear outline before writing begins." },
      { q: "How do you capture my voice?", a: "Through recorded interviews and your existing writing or talks. We build a voice profile and you review every chapter." },
      { q: "Can you include research and statistics?", a: "Yes. We can incorporate research you provide and help source supporting material, always with accurate attribution." },
      { q: "Will I be credited as the author?", a: "Yes. Your name goes on the cover and you keep all the credit." },
    ],
    cta: { lines: ["What do you know", "that others need?"], lede: "Tell us about your idea and your readers. We’ll help you shape the book.", button: "Start my book" },
    related: ["fiction-ghostwriting-services", "memoir-ghostwriting-services", "business-ghostwriting-services"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "memoir-ghostwriting-services",
    name: "Memoir Ghostwriting Services",
    short: "Memoir Ghostwriting",
    transition: "MEMOIR",
    category: "Ghostwriting",
    lead: "Ghostwriting",
    seo: {
      title: "Memoir Ghostwriting Services — Your Life, In Your Own Voice",
      description:
        "Memoir ghostwriting services that capture your experiences in your own voice. Through gentle, structured conversations, we help you tell the story only you can tell — honestly and beautifully.",
    },
    hero: {
      kicker: "Memoir ghostwriting",
      lines: ["Your memories,", "in your voice."],
      lede: "A memoir is not a list of what happened. It’s what it meant. We help you tell the story only you can tell — honestly, beautifully, and in a voice your family and readers will recognise as yours.",
      image: img("memoir", "hero"),
      alt: "Two people reading an old book together",
    },
    intro: {
      statement: "You lived it. We’ll help you find the words.",
      paragraphs: [
        "Many people carry a story for years — a childhood that shaped them, a journey that changed them, a loss, a recovery, a reinvention. They know it matters. They just don’t know where to begin.",
        "We begin with conversation. Over a series of gentle, structured sessions, we listen to your memories and the meaning you’ve made of them, then shape them into a memoir that reads as truthfully as it happened.",
      ],
      image: img("memoir", "intro"),
      alt: "A handwritten letter on a wooden table",
      detail: img("memoir", "detail"),
      detailAlt: "Hands holding an open book",
    },
    offer: {
      heading: "Memoirs we help write.",
      items: [
        { title: "Life story memoirs", body: "The arc of a whole life, from early memories to hard-won wisdom." },
        { title: "Themed memoirs", body: "A focused account of one experience — illness, adventure, faith, career, family." },
        { title: "Family legacy books", body: "Your story, written to be kept and read by the generations that follow." },
        { title: "Inspirational memoirs", body: "Stories of overcoming that offer readers hope and perspective." },
        { title: "Interview-based writing", body: "For those who prefer to talk rather than write — we do the writing from your words." },
      ],
    },
    matters: {
      heading: "Your story is worth more than a memory.",
      body: "Memoirs preserve voices that would otherwise fade. They help families understand where they come from, help readers feel less alone, and help the people who write them see their own lives with new clarity.",
      points: [
        { title: "Preservation", body: "Stories kept in the voice of the person who lived them." },
        { title: "Connection", body: "Readers who recognise themselves in your experience." },
        { title: "Reflection", body: "A rare chance to see your own life as a whole." },
      ],
      image: img("memoir", "detail"),
      alt: "Holding an open book",
    },
    process: {
      heading: "How we write your memoir.",
      steps: [
        { title: "First conversations", body: "We get to know you and agree what the memoir is about — and who it is for." },
        { title: "Memory sessions", body: "Recorded conversations, at your pace, exploring the moments and people that matter." },
        { title: "Find the thread", body: "We identify the themes and shape the story, chapter by chapter." },
        { title: "Write & reflect", body: "You read each chapter as it’s written, adding detail and correcting nuance." },
        { title: "Keep or share", body: "Edited, designed and printed for family — or published for readers everywhere." },
      ],
    },
    benefits: {
      heading: "Why people trust us with their stories.",
      items: [
        { title: "Gentle process", body: "Difficult memories are approached with patience, care and respect for your boundaries." },
        { title: "Unmistakably you", body: "Written from your own words, so family members hear your voice on every page." },
        { title: "Private by default", body: "Your story is confidential until you choose to share it." },
        { title: "Your choice of ending", body: "A private family edition or a published book — both are supported." },
      ],
    },
    visual: { image: img("memoir", "visual"), alt: "A woman reading a book", lines: ["Some stories", "only you can tell."], film: "writer" },
    faqs: [
      { q: "What if I’m not a writer?", a: "You don’t need to be. Most memoir clients talk; we write. Your words, stories and phrasing become the foundation of the book." },
      { q: "What about painful memories or other people in my story?", a: "We approach difficult chapters with care and at your pace. We can also discuss how to write about other people fairly and respectfully." },
      { q: "Can the memoir be just for my family?", a: "Absolutely. Many memoirs are printed privately for family and friends. Others are published publicly. You decide." },
      { q: "Who owns my memoir?", a: "You do. It’s your story, your voice and your name on the cover." },
    ],
    cta: { lines: ["Your story is", "worth telling."], lede: "Tell us a little about the story you’d like to write. We’ll take it from there, gently.", button: "Begin my memoir" },
    related: ["biography-writing-services", "non-fiction-ghostwriting-services", "book-editing-services"],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "fiction-ghostwriting-services",
    name: "Fiction Ghostwriting Services",
    short: "Fiction Ghostwriting",
    transition: "FICTION",
    category: "Ghostwriting",
    lead: "Ghostwriting",
    seo: {
      title: "Fiction Ghostwriting Services — Novels, Series & Genre Fiction",
      description:
        "Fiction ghostwriting services for novels and series in fantasy, thriller, romance, mystery and more. We build your world, characters and plot with you, then write the novel in your voice.",
    },
    hero: {
      kicker: "Fiction ghostwriting",
      lines: ["Worlds you", "imagined.", "Written."],
      lede: "You’ve carried the characters and the world for years. We help you build the plot, deepen the cast and write the novel — in your voice, chapter by chapter, with you guiding every turn.",
      image: img("fiction", "hero"),
      alt: "A misty forest of tall trees",
    },
    intro: {
      statement: "Every novel starts with “what if?” We’ll help you answer it.",
      paragraphs: [
        "Fiction lives or dies on craft: characters readers care about, a plot that tightens, scenes with tension, and a world that feels lived in. Many writers have the vision but struggle to sustain it across a hundred thousand words.",
        "Our fiction ghostwriters bring genre know-how and narrative discipline to your idea. You remain the author of the story’s heart — its people, its world, its ending — while we help build it on the page.",
      ],
      image: img("fiction", "intro"),
      alt: "Fog drifting over a forested mountain",
      detail: img("fiction", "detail"),
      detailAlt: "A silhouette between tall library shelves",
    },
    offer: {
      heading: "Fiction we write.",
      items: [
        { title: "Fantasy & science fiction", body: "Immersive worlds, consistent magic and technology systems, and epic stakes." },
        { title: "Thriller & mystery", body: "Tight plotting, misdirection and pacing that keeps readers up at night." },
        { title: "Romance", body: "Chemistry, tension and emotional payoff, across sub-genres." },
        { title: "Literary & historical fiction", body: "Character-driven stories with depth, texture and period detail." },
        { title: "Series development", body: "Series arcs, story bibles and continuity across multiple books." },
      ],
    },
    matters: {
      heading: "Your story deserves to be finished.",
      body: "Unfinished novels are some of the most common regrets in a writer’s life. A ghostwriting partnership turns a vision that has stalled into a finished manuscript — one you can edit, publish and share with readers.",
      points: [
        { title: "Momentum", body: "A structured process that carries the book to the final chapter." },
        { title: "Craft", body: "Genre conventions understood — and used deliberately." },
        { title: "Ownership", body: "Your characters, your world, your name on the cover." },
      ],
      image: img("fiction", "detail"),
      alt: "A silhouette in a library",
    },
    process: {
      heading: "How we write your novel.",
      steps: [
        { title: "World & characters", body: "We explore your world, cast and themes in depth, building a story bible together." },
        { title: "Plot architecture", body: "A scene-level outline with turning points and a satisfying ending, agreed before drafting." },
        { title: "Write in batches", body: "Chapters arrive in sequence for your feedback, so the story never drifts from your vision." },
        { title: "Revise & tighten", body: "Editing passes for pacing, continuity and prose." },
        { title: "Cover to launch", body: "Optional cover design, publishing and marketing for the finished novel." },
      ],
    },
    benefits: {
      heading: "Why novelists work with us.",
      items: [
        { title: "Genre fluency", body: "Writers who read and write in your genre, and know what its readers expect." },
        { title: "Collaborative", body: "You guide every major story decision; we bring the craft to execute it." },
        { title: "Series-minded", body: "Story bibles and continuity tracking for multi-book worlds." },
        { title: "Complete support", body: "Editing, covers, publishing and marketing when the manuscript is ready." },
      ],
    },
    visual: { image: img("fiction", "visual"), alt: "A river winding through a moonlit fantasy landscape", lines: ["Imagine it.", "We’ll write it."] },
    faqs: [
      { q: "How much of the story do I need to have planned?", a: "Anything from a single premise to a detailed outline. We meet you where you are and develop the rest together." },
      { q: "Will the novel be in my voice?", a: "Yes. We study your writing — or your storytelling in conversation — and agree a voice and style before drafting." },
      { q: "Can you write a series?", a: "Yes. We build a series arc and a story bible so characters, timelines and world details stay consistent across books." },
      { q: "Who owns the characters and world?", a: "You do. The novel, its characters and its world are yours, along with all the credit." },
    ],
    cta: { lines: ["Ready to finish", "your novel?"], lede: "Tell us about your world, your characters and how far you’ve got.", button: "Start my novel" },
    related: ["non-fiction-ghostwriting-services", "book-editing-services", "book-marketing-services"],
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s])) as Record<string, ServiceData>;
export const serviceCategories: ServiceCategory[] = ["Ghostwriting", "Writing", "Editing & Publishing"];
export const servicePath = (slug: string) => `/${slug}/`;
