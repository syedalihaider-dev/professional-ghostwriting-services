/**
 * Contact page copy. Contact details come from src/config/site.ts (live-site
 * facts). "What happens next" describes the enquiry flow without promising
 * response times the business hasn't committed to.
 */

export const contactHero = {
  label: "Contact",
  question: ["Have a story", "to tell?"],
  answer: "Let’s talk.",
  lede: "Tell us about the book you want to write — or the one you’ve already started. We’ll take it from there.",
};

export const contactForm = {
  label: "Start the conversation",
  servicesPrompt: "I’m looking for help with",
  services: ["Ghostwriting", "Book Editing", "Book Publishing", "Book Marketing", "Author Branding", "Book Cover", "Not sure yet"],
  fields: {
    name: "My name is",
    email: "My email is",
    phone: "My phone number is",
    message: "Tell us about your project",
  },
  placeholders: {
    name: "Your full name",
    email: "you@example.com",
    phone: "Optional",
    message: "The idea, where you are with it, and what you’d like to happen next…",
  },
  submit: "Start the conversation",
  success: { title: ["Message", "received."], line: "We’ll be in touch.", note: "In the meantime, you can reach us directly:" },
  failure: "We couldn’t send your message just now. Please call or email us directly — we’d love to hear from you.",
};

export const nextSteps = {
  label: "What happens next",
  steps: [
    { title: "We read your message", body: "A member of our team reviews what you’ve shared about your book and your goals." },
    { title: "We talk it through", body: "We get in touch to learn more about your idea, your timeline and the support you need." },
    { title: "We map the way forward", body: "We recommend the right services — writing, editing, publishing or marketing — and the next steps." },
  ],
};

export const firstPage = {
  lines: ["The first page", "starts here."],
  body: "Tell us what you’re building, and we’ll take it from there.",
};

export const studio = {
  label: "The studio",
  city: "Dallas, TX",
  reach: "Working with authors across the USA",
};

export const contactCta = {
  lines: ["Your idea", "is waiting."],
  answer: "Let’s write it.",
  button: "Get started",
};
