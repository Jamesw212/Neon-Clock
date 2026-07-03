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
/* =========================
   Jamesw212 Stream Title Generator
========================= */

const brandPhrases = [
  "Dad by Day, Gamer by Night",
  "Welcome to the Pack",
  "The Spacewolf Is Back",
  "Late Night with the Pack",
  "Single Dad Gamer Mode",
  "Spacewolf Adventures",
  "Good Vibes and Gaming Chaos"
];

const titleBanks = {
  chill: [
    "{game} | Chill Night with the Pack",
    "{game} | Relaxing, Building, and Vibing",
    "{game} | Late Night Gaming with Jamesw212",
    "{game} | No Rush, Just Good Vibes",
    "{game} | {brand}"
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
  ],

  grind: [
    "{game} | Grinding Progress with the Pack",
    "{game} | Working Toward the Next Big Goal",
    "{game} | Progress, Upgrades, and Late Night Gaming",
    "{game} | Building Up One Step at a Time",
    "{game} | The Grind Continues"
  ]
};

const toneAddons = {
  clean: [
    "{base}",
    "{base} | Jamesw212 Gaming"
  ],

  hype: [
    "LIVE 🔴 {base}",
    "{base} | Let’s Go!",
    "{base} | Big Progress Tonight"
  ],

  funny: [
    "{base} | Mistakes Will Be Made",
    "{base} | Probably a Bad Plan",
    "{base} | Send Help"
  ],

  cinematic: [
    "{base} | Into the Frontier",
    "{base} | A New Chapter Begins",
    "{base} | Stories from the Void"
  ]
};

const gameHashtags = {
  "space engineers": ["#SpaceEngineers", "#SandboxGaming", "#SpaceGame"],
  "ark": ["#ARK", "#ARKSurvivalAscended", "#SurvivalGaming"],
  "ark survival ascended": ["#ARKSurvivalAscended", "#ARK", "#SurvivalGaming"],
  "no man's sky": ["#NoMansSky", "#SpaceExploration", "#SciFiGaming"],
  "no mans sky": ["#NoMansSky", "#SpaceExploration", "#SciFiGaming"],
  "battlefield": ["#Battlefield", "#FPSGaming", "#Gaming"],
  "call of duty": ["#CallOfDuty", "#FPSGaming", "#Gaming"],
  "american truck simulator": ["#AmericanTruckSimulator", "#TruckSim", "#SimulationGaming"],
  "ats": ["#AmericanTruckSimulator", "#TruckSim", "#SimulationGaming"],
  "astroneer": ["#Astroneer", "#SpaceGame", "#SandboxGaming"],
  "elite dangerous": ["#EliteDangerous", "#SpaceSim", "#SciFiGaming"]
};

function randomFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function cleanGameName(game) {
  return game && game.trim() ? game.trim() : "Gaming";
}

function getSelectedGeneratorValue(id, fallback) {
  const element = document.getElementById(id);
  return element ? element.value : fallback;
}

function fillTemplate(template, game, goal) {
  const brand = randomFrom(brandPhrases);
  const goalText = goal ? goal.trim() : "";

  let result = template
    .replaceAll("{game}", game)
    .replaceAll("{brand}", brand);

  if (goalText) {
    result = `${result} | ${capitalizeFirst(goalText)}`;
  }

  return result;
}

function capitalizeFirst(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function generateBaseTitle(game, vibe, goal) {
  let selectedVibe = vibe;

  if (selectedVibe === "random") {
    const keys = Object.keys(titleBanks);
    selectedVibe = randomFrom(keys);
  }

  const template = randomFrom(titleBanks[selectedVibe] || titleBanks.chill);
  return fillTemplate(template, game, goal);
}

function applyTone(baseTitle, tone, includeLive, platform) {
  const templates = toneAddons[tone] || toneAddons.clean;
  let title = randomFrom(templates).replaceAll("{base}", baseTitle);

  if (includeLive === "yes" && platform !== "youtube" && !title.toLowerCase().includes("live")) {
    title = `LIVE 🔴 ${title}`;
  }

  return title;
}

function generateDescription(game, goal, vibe) {
  const goalText = goal && goal.trim()
    ? `Tonight’s goal is ${goal.trim()}.`
    : "Tonight we’re jumping in, seeing what happens, and making some progress along the way.";

  const vibeLine = {
    chill: "Expect a chill stream with good vibes, laid-back progress, and time hanging out with the pack.",
    chaos: "Expect chaos, laughs, bad decisions, and whatever trouble the game decides to throw at us.",
    survival: "Expect survival, building, resource gathering, and trying to turn a rough start into something solid.",
    spacewolf: "Expect spacewolf energy, exploration, building, and a little chaos from the void.",
    dad: "Dad life comes first, but once the night settles down, it’s time to game with the pack.",
    grind: "Expect upgrades, progress, grinding goals, and working toward the next big step.",
    random: "Expect gaming, laughs, progress, and good vibes with the pack."
  };

  return `Welcome to Jamesw212 Gaming!

Tonight we’re playing ${game}. ${goalText}

${vibeLine[vibe] || vibeLine.random}

Dad by day, gamer by night. Join the pack, hang out, and enjoy the stream.

Watch live, catch the replays, and come game with the spacewolf.`;
}

function generateHashtags(game) {
  const gameKey = game.toLowerCase().trim();
  const matchedGame = Object.keys(gameHashtags).find(key => gameKey.includes(key));
  const baseTags = matchedGame ? gameHashtags[matchedGame] : ["#Gaming", "#LiveStream", "#Gamer"];

  const brandTags = [
    "#Jamesw212Gaming",
    "#DadByDayGamerByNight",
    "#Spacewolf",
    "#GamingCommunity"
  ];

  return [...new Set([...baseTags, ...brandTags])].join(" ");
}

function generateStreamPackage() {
  const game = cleanGameName(document.getElementById("gameInput")?.value);
  const goal = document.getElementById("goalInput")?.value || "";
  const vibe = getSelectedGeneratorValue("vibeSelect", "random");
  const platform = getSelectedGeneratorValue("platformSelect", "youtube");
  const tone = getSelectedGeneratorValue("toneSelect", "clean");
  const includeLive = getSelectedGeneratorValue("liveSelect", "yes");

  const youtubeOutput = document.getElementById("youtubeTitle");
  const twitchOutput = document.getElementById("twitchTitle");
  const descriptionOutput = document.getElementById("streamDescription");
  const hashtagsOutput = document.getElementById("streamHashtags");

  const baseTitle = generateBaseTitle(game, vibe, goal);

  let youtubeTitle = applyTone(baseTitle, tone, "no", "youtube");
  let twitchTitle = applyTone(baseTitle, tone, includeLive, "twitch");

  if (platform === "youtube") {
    twitchTitle = "Not generated for this platform selection.";
  }

  if (platform === "twitch") {
    youtubeTitle = "Not generated for this platform selection.";
  }

  if (youtubeOutput) youtubeOutput.textContent = youtubeTitle;
  if (twitchOutput) twitchOutput.textContent = twitchTitle;
  if (descriptionOutput) descriptionOutput.value = generateDescription(game, goal, vibe);
  if (hashtagsOutput) hashtagsOutput.value = generateHashtags(game);
}

function copyTextFromElement(id) {
  const element = document.getElementById(id);
  if (!element) return;

  const text = element.value || element.textContent;
  if (!text || text.includes("will appear here")) return;

  navigator.clipboard.writeText(text.trim());
}

function clearStreamTool() {
  const fields = ["gameInput", "goalInput"];

  fields.forEach(id => {
    const element = document.getElementById(id);
    if (element) element.value = "";
  });

  const youtubeOutput = document.getElementById("youtubeTitle");
  const twitchOutput = document.getElementById("twitchTitle");
  const descriptionOutput = document.getElementById("streamDescription");
  const hashtagsOutput = document.getElementById("streamHashtags");

  if (youtubeOutput) youtubeOutput.textContent = "Your YouTube title will appear here.";
  if (twitchOutput) twitchOutput.textContent = "Your Twitch title will appear here.";
  if (descriptionOutput) descriptionOutput.value = "Your stream description will appear here.";
  if (hashtagsOutput) hashtagsOutput.value = "Your hashtags will appear here.";
}
window.generateStreamPackage = generateStreamPackage;
window.clearStreamTool = clearStreamTool;
window.copyTextFromElement = copyTextFromElement;
