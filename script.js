const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}
const titleTemplates = {
  chill: [
    "{game} | Chill Night with the Pack",
    "{game} | Relaxing, Building, and Vibing",
    "{game} | Late Night Gaming with Jamesw212",
    "{game} | No Rush, Just Good Vibes",
    "{game} | Dad by Day, Gamer by Night"
  ],

  chaos: [
    "{game} | What Could Possibly Go Wrong?",
    "{game} | Chaos with the Spacewolf",
    "{game} | This Is Probably a Bad Idea",
    "{game} | The Pack Runs Into Trouble",
    "{game} | Panic, Laughs, and Bad Decisions"
  ],

  survival: [
    "{game} | Survive, Build, Repeat",
    "{game} | Starting Small, Dreaming Big",
    "{game} | The Pack Tries to Survive",
    "{game} | Building a Base and Staying Alive",
    "{game} | From Nothing to Something"
  ],

  spacewolf: [
    "{game} | Spacewolf Adventures Continue",
    "{game} | Welcome to the Pack",
    "{game} | The Spacewolf Is Back",
    "{game} | Exploring New Frontiers",
    "{game} | Building the Pack’s Next Chapter"
  ],

  dad: [
    "{game} | Dad by Day, Gamer by Night",
    "{game} | Single Dad Gamer Mode Activated",
    "{game} | After Dad Duty Gaming Session",
    "{game} | Late Night Dad Gamer Grind",
    "{game} | Keeping Life Running, Then Gaming"
  ]
};

function generateStreamTitle() {
  const gameInput = document.getElementById("gameInput");
  const vibeSelect = document.getElementById("vibeSelect");
  const output = document.getElementById("generatedTitle");

  if (!gameInput || !vibeSelect || !output) return;

  const game = gameInput.value.trim() || "Gaming";
  let vibe = vibeSelect.value;

  if (vibe === "random") {
    const vibeKeys = Object.keys(titleTemplates);
    vibe = vibeKeys[Math.floor(Math.random() * vibeKeys.length)];
  }

  const templates = titleTemplates[vibe];
  const template = templates[Math.floor(Math.random() * templates.length)];

  output.textContent = template.replace("{game}", game);
}

function copyStreamTitle() {
  const output = document.getElementById("generatedTitle");

  if (!output || output.textContent === "Your title will appear here.") return;

  navigator.clipboard.writeText(output.textContent);
}
