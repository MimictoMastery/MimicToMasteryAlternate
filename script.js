// =====================================================
// MIMIC TO MASTERY
// The JavaScript that brings the portfolio to life.
// =====================================================

const SITE_CONFIG = {
  github: "https://github.com/MimictoMastery",
  arcade: "./code-quest-arcade/index.html"
};


// -----------------------------------------------------
// A SMALL HELPER FOR CREATING PAGE ELEMENTS
// -----------------------------------------------------

function createElement(tagName, className = "", text) {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = text;
  }

  return element;
}


// -----------------------------------------------------
// BEYOND THE BLUEPRINT
// -----------------------------------------------------

function initBlueprint() {
  const trigger = document.getElementById("blueprintTrigger");
  const message = document.getElementById("blueprintMessage");

  if (!trigger || !message) return;

  let blueprintTimer;

  function showMessage() {
    clearTimeout(blueprintTimer);

    message.classList.add("is-visible");
    message.setAttribute("aria-hidden", "false");
    trigger.setAttribute("aria-expanded", "true");

    blueprintTimer = setTimeout(hideMessage, 10000);
  }

  function hideMessage() {
    clearTimeout(blueprintTimer);

    message.classList.remove("is-visible");
    message.setAttribute("aria-hidden", "true");
    trigger.setAttribute("aria-expanded", "false");
  }

  trigger.addEventListener("mouseenter", showMessage);
  trigger.addEventListener("focus", showMessage);
  trigger.addEventListener("click", showMessage);

  trigger.addEventListener("mouseleave", hideMessage);
  trigger.addEventListener("blur", hideMessage);

  trigger.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      hideMessage();
    }
  });
}


// -----------------------------------------------------
// SELECTED PROJECTS
// -----------------------------------------------------

const projects = [
  {
    title: "Code Quest Arcade",
    description:
      "A retro-inspired JavaScript trivia game with coding questions and a high-score table.",
    status: "Interactive Project",
    technology: "JavaScript · Node.js · Express · SQLite",
    demonstrates:
      "JavaScript logic, DOM manipulation, database operations, and front-end/back-end communication."
  },
  {
    title: "Mimic to Mastery",
    description:
      "A responsive developer portfolio bringing together selected projects, technical experiments, and a personal development journal.",
    status: "Portfolio Project",
    technology: "HTML · CSS · JavaScript"
  },
    {
    title: "ADHD Flip Cards",
    description:
      "An interactive card-based learning project designed to present information in smaller, easier-to-explore pieces.",
    status: "Learning Project",
    technology: "HTML · CSS · JavaScript",
    liveUrl: "https://mimictomastery.github.io/ADHD_FlipCards/"
  }
];

function renderProjects() {
  const projectList = document.getElementById("selected-projects-list");

  if (!projectList) return;

  projectList.replaceChildren();

  projects.forEach(project => {
    const card = createElement("article", "project-card");

    const title = createElement("h3", "", project.title);
    const status = createElement("span", "project-status", project.status);
    const description = createElement("p", "", project.description);
    const technologies = createElement("div", "project-technologies");

    project.technology.split(" · ").forEach(item => {
      technologies.appendChild(
        createElement("span", "technology-tag", item)
      );
    });

    card.append(title, status, description, technologies);

    if (project.demonstrates) {
      const demonstration = createElement(
        "p",
        "project-demonstrates",
        "What it demonstrates: " + project.demonstrates
      );

      card.appendChild(demonstration);
    }
    if (project.liveUrl) {
      const liveLink = createElement("a", "project-link", "View Live Demo →");

      liveLink.href = project.liveUrl;
      liveLink.target = "_blank";
      liveLink.rel = "noopener noreferrer";

      card.appendChild(liveLink);
    }
    projectList.appendChild(card);
  });
}


// -----------------------------------------------------
// TECH STACK
// -----------------------------------------------------

const technologies = [
  {
    category: "FRONTEND",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Design"
    ]
  },
  {
    category: "BACKEND",
    items: [
      "Node.js",
      "Express",
      "REST APIs"
    ]
  },
  {
    category: "DATABASES",
    items: [
      "SQL",
      "SQLite"
    ]
  },
  {
    category: "TOOLS",
    items: [
      "Git",
      "GitHub",
      "VS Code",
      "npm"
    ]
  }
];

function renderTechStack() {
  const techList = document.getElementById("tech-stack-list");

  if (!techList) return;

  techList.replaceChildren();

  technologies.forEach(group => {
    const item = createElement("article", "technology-item");

    const category = createElement(
      "span",
      "technology-category",
      group.category
    );

    const names = createElement("div", "technology-tags");

    group.items.forEach(technology => {
      names.appendChild(
        createElement("span", "technology-name", technology)
      );
    });

    item.append(category, names);
    techList.appendChild(item);
  });
}


// -----------------------------------------------------
// DAILY DOPAMINE
// Kept available in case the quote section returns.
// -----------------------------------------------------

const fallbackQuotes = [
  {
    quote: "Every small step is progress. Keep going.",
    author: "Mimic to Mastery"
  },
  {
    quote: "You do not have to know everything to begin.",
    author: "A reminder for the journey"
  },
  {
    quote: "Mistakes mean you are trying something new.",
    author: "Mimic to Mastery"
  },
  {
    quote: "Build it, break it, learn from it, repeat.",
    author: "Developer wisdom"
  },
  {
    quote: "You are allowed to be a beginner.",
    author: "Mimic to Mastery"
  }
];

let availableQuotes = [...fallbackQuotes];
let currentQuoteIndex = -1;

async function loadQuotes() {
  try {
    const response = await fetch("./quotes.json");

    if (!response.ok) {
      throw new Error("Unable to load quotes.");
    }

    const quotes = await response.json();

    if (
      Array.isArray(quotes) &&
      quotes.length > 0 &&
      quotes.every(item =>
        item &&
        typeof item.quote === "string" &&
        typeof item.author === "string"
      )
    ) {
      availableQuotes = quotes;
    }
  } catch (error) {
    console.info("Using built-in quotes instead.");
  }

  showRandomQuote();
}

function showRandomQuote() {
  const quoteElement = document.getElementById("daily-quote");
  const authorElement = document.getElementById("quote-attribution");

  if (!quoteElement || !authorElement) return;

  let nextIndex = 0;

  if (availableQuotes.length > 1) {
    do {
      nextIndex = Math.floor(Math.random() * availableQuotes.length);
    } while (nextIndex === currentQuoteIndex);
  }

  currentQuoteIndex = nextIndex;

  const quote = availableQuotes[currentQuoteIndex];

  quoteElement.textContent = '"' + quote.quote + '"';
  authorElement.textContent = "— " + quote.author;
}


// -----------------------------------------------------
// WHAT I'M LEARNING
// Kept available if you decide to add this section later.
// -----------------------------------------------------

const learningNotes = [
  {
    topic: "JavaScript",
    takeaway: "Understanding how functions, objects, arrays, and events work together."
  },
  {
    topic: "Backend Development",
    takeaway: "Connecting Express routes to databases and handling server requests."
  },
  {
    topic: "Responsive Design",
    takeaway: "Building layouts that adapt to different screens and devices."
  },
  {
    topic: "Version Control",
    takeaway: "Using Git to track changes and manage projects through GitHub."
  }
];

function renderLearningNotes() {
  const notesList = document.getElementById("learning-notes-list");

  if (!notesList) return;

  notesList.replaceChildren();

  learningNotes.forEach(note => {
    const card = createElement("article", "learning-note");

    card.append(
      createElement("h3", "", note.topic),
      createElement("p", "", note.takeaway)
    );

    notesList.appendChild(card);
  });
}


// -----------------------------------------------------
// CONTACT AND SOCIAL LINKS
// -----------------------------------------------------

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/MimictoMastery",
    icon: "fa-github"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/heather-lawson-dev/",
    icon: "fa-linkedin"
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@mimictomastery",
    icon: "fa-youtube"
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/MimicToMastery",
    icon: "fa-facebook"
  }
];

function renderSocialLinks() {
  const socialList = document.getElementById("social-link-list");

  if (!socialList) return;

  socialList.replaceChildren();

  socialLinks.forEach(social => {
    const link = createElement("a", "social-link-card");
    const icon = createElement("i", "fa-brands " + social.icon);

    icon.setAttribute("aria-hidden", "true");

    link.href = social.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    link.append(icon, " " + social.name);

    socialList.appendChild(link);
  });
}


// -----------------------------------------------------
// CODE LAB
// -----------------------------------------------------

const codeExamples = [
  {
    language: "JavaScript",
    title: "Say hello to JavaScript",
    summary: "Your first step toward making a webpage interactive.",
    code: 'const name = "Mastery";\n\nconsole.log("Hello, " + name + "!");',
    explanation: "const creates a variable that cannot be reassigned. console.log() prints a message to the console."
  },
  {
    language: "JavaScript",
    title: "Make a decision",
    summary: "Teach your program to choose between two paths.",
    code: 'const score = 85;\n\nif (score >= 70) {\n  console.log("Level complete!");\n} else {\n  console.log("Try again!");\n}',
    explanation: "An if statement checks whether a condition is true. If it is, the first block runs. Otherwise, else runs."
  },
  {
    language: "JavaScript",
    title: "Repeat an action",
    summary: "Loops let you repeat instructions without writing them again.",
    code: 'for (let i = 1; i <= 5; i++) {\n  console.log("Level " + i);\n}',
    explanation: "This for loop starts at 1, repeats while i is less than or equal to 5, and adds 1 after each round."
  },
  {
    language: "JavaScript",
    title: "Create a function",
    summary: "Bundle reusable instructions into one named action.",
    code: 'function levelUp(xp) {\n  return xp + 100;\n}\n\nconsole.log(levelUp(50));',
    explanation: "A function accepts information, performs a task, and can return a result. Here, 50 XP becomes 150 XP."
  },
  {
    language: "JavaScript",
    title: "Explore an array",
    summary: "Store multiple values inside one variable.",
    code: 'const skills = ["HTML", "CSS", "JavaScript"];\n\nskills.forEach(skill => {\n  console.log(skill);\n});',
    explanation: "An array stores a collection of values. forEach() runs a function once for every item."
  },
  {
    language: "HTML",
    title: "Build a semantic section",
    summary: "Give your webpage meaningful structure.",
    code: '<section aria-labelledby="projects-title">\n  <h2 id="projects-title">My Projects</h2>\n  <p>Ideas becoming reality.</p>\n</section>',
    explanation: "A section groups related content. Semantic HTML helps browsers and assistive technologies understand the page."
  },
  {
    language: "CSS",
    title: "Create a glass panel",
    summary: "A little glassmorphism for your next project.",
    code: '.glass-panel {\n  background: rgba(12, 22, 48, .65);\n  border: 1px solid rgba(255,255,255,.2);\n  backdrop-filter: blur(16px);\n  border-radius: 20px;\n}',
    explanation: "A transparent background, subtle border, and backdrop-filter create the frosted-glass effect."
  },
  {
    language: "JavaScript",
    title: "Find an element",
    summary: "Connect JavaScript to your HTML.",
    code: 'const heading = document.querySelector("h1");\n\nif (heading) {\n  heading.textContent = "I am learning!";\n}',
    explanation: "querySelector() finds an element. The if statement checks that the element exists before changing it."
  },
  {
    language: "CSS",
    title: "Add a neon glow",
    summary: "Make an element shine without an image.",
    code: '.neon-text {\n  color: #42edff;\n  text-shadow: 0 0 12px #42edff;\n}',
    explanation: "text-shadow adds a glowing effect around text. Adjust the blur and color to change the effect."
  },
  {
    language: "JavaScript",
    title: "Listen for a click",
    summary: "Make something happen when a visitor clicks a button.",
    code: 'const button = document.querySelector("button");\n\nbutton?.addEventListener("click", () => {\n  alert("Quest started!");\n});',
    explanation: "addEventListener() waits for an event. Optional chaining prevents an error if the button does not exist."
  }
];

let currentCodeIndex = 0;

function renderCodeExample() {
  const example = codeExamples[currentCodeIndex];

  const language = document.getElementById("code-language-label");
  const title = document.getElementById("code-example-title");
  const summary = document.getElementById("code-example-summary");
  const source = document.getElementById("code-example-source");
  const explanation = document.getElementById("code-explanation");
  const counter = document.getElementById("code-example-counter");
  const feedback = document.getElementById("code-example-feedback");

  if (
    !language ||
    !title ||
    !summary ||
    !source ||
    !explanation ||
    !counter
  ) {
    return;
  }

  language.textContent = example.language;
  title.textContent = example.title;
  summary.textContent = example.summary;
  source.textContent = example.code;
  explanation.textContent = example.explanation;

  counter.textContent =
    String(currentCodeIndex + 1).padStart(2, "0") +
    " / " +
    String(codeExamples.length).padStart(2, "0");

  if (feedback) {
    feedback.textContent = "";
  }
}

function nextCodeExample() {
  currentCodeIndex = (currentCodeIndex + 1) % codeExamples.length;
  renderCodeExample();
}

async function copyCodeExample() {
  const source = document.getElementById("code-example-source");
  const feedback = document.getElementById("code-example-feedback");

  if (!source || !feedback) return;

  try {
    await navigator.clipboard.writeText(source.textContent);
    feedback.textContent = "Code copied! Ready to experiment.";
  } catch (error) {
    feedback.textContent =
      "Copy unavailable. Select the code and copy it manually.";
  }
}


// -----------------------------------------------------
// INTRO TERMINAL
// -----------------------------------------------------

const terminalCommands = [
  {
    command: "whoami",
    result: "mimic — learning out loud"
  },
  {
    command: "cat origin.txt",
    result: "started by copying. kept going until it was mine."
  },
  {
    command: "./mimic --evolve",
    result: "mimic -> mastery [########] 100%"
  },
  {
    command: "ls ~/",
    result: "projects/  snippets/  arcade/  journal/"
  }
];

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function typeText(element, text, speed = 45) {
  if (prefersReducedMotion) {
    element.textContent = text;
    return;
  }

  for (const character of text) {
    element.textContent += character;
    await sleep(speed);
  }
}

function buildTerminalPrompt() {
  const prompt = createElement("div", "gb-prompt");

  prompt.append(
    createElement("span", "gb-user", "mimic@MASTERY"),
    " ",
    createElement("span", "gb-shell", "MINGW64"),
    " ",
    createElement("span", "gb-path", "~")
  );

  return prompt;
}

async function runTerminal() {
  const output = document.getElementById("terminal-output");
  const live = document.getElementById("terminal-live");
  const finalMessage = document.getElementById("terminal-message");

  if (!output || !live || !finalMessage) return;

  output.replaceChildren();
  live.hidden = true;

  for (const step of terminalCommands) {
    output.appendChild(buildTerminalPrompt());

    const line = createElement("div", "gb-line");
    const command = createElement("span");
    const cursor = createElement("span", "cursor");

    line.append(
      createElement("span", "gb-dollar", "$"),
      " ",
      command,
      cursor
    );

    output.appendChild(line);

    await typeText(command, step.command);

    await sleep(prefersReducedMotion ? 0 : 500);

    cursor.remove();

    output.appendChild(
      createElement("div", "terminal-result", step.result)
    );

    await sleep(prefersReducedMotion ? 0 : 650);
  }

  live.hidden = false;

  await typeText(
    finalMessage,
    "building something meaningful..."
  );
}


// -----------------------------------------------------
// INTRO FADE ON SCROLL
// -----------------------------------------------------

function initIntroFade() {
  const intro = document.querySelector(".intro-section");

  if (!intro || prefersReducedMotion) return;

  const root = document.documentElement;

  root.classList.add("fx-on");

  let waiting = false;

  function updateFade() {
    waiting = false;

    // A longer scroll distance gives visitors more time
    // to see the terminal before the portfolio appears.
    const distance = window.innerHeight * 1.25;

    const fade = Math.min(
      Math.max(window.scrollY / distance, 0),
      1
    );

    const reveal = Math.min(
      Math.max((fade - 0.25) / 0.75, 0),
      1
    );

    root.style.setProperty("--fade", fade.toFixed(3));
    root.style.setProperty("--reveal", reveal.toFixed(3));

    const introHasFaded = fade >= 1;

    intro.classList.toggle("is-faded", introHasFaded);
    intro.toggleAttribute("inert", introHasFaded);
  }

  function requestFadeUpdate() {
    if (waiting) return;

    waiting = true;
    requestAnimationFrame(updateFade);
  }

  window.addEventListener("scroll", requestFadeUpdate, {
    passive: true
  });

  window.addEventListener("resize", requestFadeUpdate);

  updateFade();
}


// -----------------------------------------------------
// FIELD JOURNAL
// -----------------------------------------------------

const journalPosts = [
  {
    title: "My Journey from Mimicry to Mastery",
    date: "November 2026",
    category: "My Story",
    body: [
      "Learning to code as an adult means learning new skills one step at a time.",
      "Every mistake is an opportunity to understand something better. Every commit is proof that I kept going.",
      "This is where I share my progress, my projects, and the lessons I learn along the way."
    ]
  },
  {
    title: "Learning to Code with ADHD",
    date: "November 2026",
    category: "Learning",
    body: [
      "Learning something new can feel overwhelming when there are so many things to remember.",
      "Breaking a project into smaller steps helps me focus on one idea at a time.",
      "I do not have to learn everything today. I just have to keep moving forward."
    ]
  },
  {
    title: "Stories, Appalachia, and Technology",
    date: "November 2026",
    category: "Appalachian Roots",
    body: [
      "Before I started learning to code, storytelling was already part of my life.",
      "Storytelling and programming both involve organizing ideas, solving problems, and helping people understand something.",
      "Different tools, different ways of creating, but the same curiosity."
    ]
  }
];

function renderJournalPosts() {
  const postList = document.getElementById("journal-post-list");

  if (!postList) return;

  postList.replaceChildren();

  journalPosts.forEach((post, index) => {
    const button = createElement("button", "journal-post-card");

    button.type = "button";

    button.append(
      createElement("span", "post-category", post.category),
      createElement("h3", "", post.title),
      createElement("span", "post-metadata", post.date),
      createElement("span", "journal-read-cue", "Read entry →")
    );

    button.addEventListener("click", () => {
      openJournalPost(index);
    });

    postList.appendChild(button);
  });
}

function openJournalPost(index) {
  const post = journalPosts[index];

  if (!post) return;

  const reader = document.getElementById("journal-reader");
  const meta = document.getElementById("journal-reader-meta");
  const title = document.getElementById("journal-reader-title");
  const body = document.getElementById("journal-reader-body");
  const backButton = document.getElementById("journal-back-button");

  if (!reader || !meta || !title || !body) return;

  meta.textContent = post.date + " · " + post.category;
  title.textContent = post.title;

  body.replaceChildren();

  post.body.forEach(paragraph => {
    body.appendChild(createElement("p", "", paragraph));
  });

  reader.classList.remove("is-hidden");

  reader.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "nearest"
  });

  if (backButton) {
    backButton.focus({ preventScroll: true });
  }
}

function closeJournalPost() {
  const reader = document.getElementById("journal-reader");

  if (reader) {
    reader.classList.add("is-hidden");
  }
}


// -----------------------------------------------------
// CODE QUEST ARCADE
// -----------------------------------------------------

function configureArcade() {
  const launchLink = document.getElementById("arcade-launch-link");
  const caption = document.getElementById("arcade-caption");

  if (!launchLink || !caption) return;

  launchLink.href = SITE_CONFIG.arcade;

  caption.textContent =
    "A JavaScript game project built with Node.js, Express, and SQLite.";
}


// -----------------------------------------------------
// START THE PORTFOLIO
// -----------------------------------------------------

function init() {
  initBlueprint();

  renderProjects();
  renderTechStack();
  renderLearningNotes();
  renderSocialLinks();
  renderJournalPosts();

  loadQuotes();

  renderCodeExample();

  runTerminal();
  initIntroFade();

  configureArcade();

  const nextQuoteButton = document.getElementById(
    "next-daily-quote-button"
  );

  const nextCodeButton = document.getElementById(
    "next-code-example-button"
  );

  const copyCodeButton = document.getElementById(
    "copy-code-example-button"
  );

  const backButton = document.getElementById(
    "journal-back-button"
  );

  if (nextQuoteButton) {
    nextQuoteButton.addEventListener("click", showRandomQuote);
  }

  if (nextCodeButton) {
    nextCodeButton.addEventListener("click", nextCodeExample);
  }

  if (copyCodeButton) {
    copyCodeButton.addEventListener("click", copyCodeExample);
  }

  if (backButton) {
    backButton.addEventListener("click", closeJournalPost);
  }
}


// Wait until the HTML is ready before connecting the JavaScript.

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}