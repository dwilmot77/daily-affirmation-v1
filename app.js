const DATA_URL = "data/affirmations.json";
const STORAGE_KEY = "dailyAffirmation.v1";
const STORAGE_SCHEMA_VERSION = 3;
const APP_VERSION = "1.1.11";
const serviceWorkerPath = "service-worker.js";
const REFLECTION_SAVE_DELAY = 1200;
const DEFAULT_LANGUAGE = "en";
const SUPPORTED_LANGUAGES = ["en", "es"];
const RECENT_AFFIRMATION_WINDOW = 14;

const translations = {
  en: {
    appTitle: "Daily Affirmation",
    skipLink: "Skip to affirmation",
    toggleDarkMode: "Toggle dark mode",
    navHome: "Home",
    navFavorites: "Favorites",
    navJournal: "Journal",
    navHistory: "History",
    navSearch: "Search",
    navSettings: "Settings",
    primaryNav: "Primary",
    homeHeading: "Today's affirmation",
    breathHeading: "Take one slow breath",
    breathPrompt: "When you are ready, reveal today's affirmation.",
    breathingStarted: "Breathe in slowly, then breathe out slowly.",
    breathingComplete: "Breath complete. Reveal when you are ready.",
    revealButton: "Reveal Today's Affirmation",
    actionsLabel: "Affirmation actions",
    newAffirmation: "New Affirmation",
    copy: "Copy",
    favorite: "Favorite",
    favorited: "Favorited",
    play: "Play",
    stop: "Stop",
    feedbackHeading: "How did this land today?",
    helped: "💚 It helped",
    neutral: "🤍 I'm not sure",
    notToday: "🌧️ Not today",
    feedbackSaved: "Saved. Thank you for checking in.",
    reflectionHeading: "Today's reflection",
    reflectionLabel: "Reflection for this affirmation",
    reflectionPlaceholder: "Write anything you want to remember from today.",
    favoritesHeading: "Favorites",
    favoritesIntro: "Saved on this device only.",
    favoriteSearchLabel: "Search favorites",
    reflectionsHeading: "Saved reflections",
    reflectionsIntro: "Return to previous notes saved on this device.",
    reflectionSearchLabel: "Search reflections",
    historyHeading: "Past Days",
    historyIntro: "Previous days saved on this device, newest first.",
    growthInsightsHeading: "Growth Insights",
    growthInsightsIntro: "A gentle look at what has resonated with you.",
    totalHelped: "It helped",
    totalNeutral: "I'm not sure",
    totalNotToday: "Not today",
    encouragementMessage: "🌸 Small steps matter. Every day you choose yourself is a victory. You've chosen yourself on {days}.",
    oneDay: "1 day",
    manyDays: "{count} days",
    journeyAtGlance: "Journey at a Glance",
    totalShownUpDays: "Total days you've shown up",
    totalJournalEntries: "Total journal entries",
    totalFavorites: "Total favorite affirmations",
    mostHelpfulCategory: "Most Helpful Category",
    mostHelpfulCategorySummary: "{category} affirmations have helped you most often.",
    noHelpfulCategory: "Your most helpful category will appear after you mark an affirmation \"It helped.\"",
    feedbackTotalsHeading: "Feedback totals",
    noGrowthInsights: "Your check-ins will appear here after you respond to a few affirmations.",
    categoryResonated: "🌿 {category} affirmations have resonated with you most often.",
    categoryNotToday: "🌱 {category} affirmations were marked \"Not today\" more frequently recently. That's okay—different messages resonate at different times.",
    categorySummary: "{category}: {helped} helped, {neutral} not sure, {notToday} not today.",
    savedDay: "Saved day",
    searchHeading: "Search affirmations",
    searchIntro: "Search all categories, including optional Faith affirmations.",
    keyword: "Keyword",
    searchCategories: "Search categories",
    settingsHeading: "Settings",
    settingsIntro: "Preferences stay on this device.",
    theme: "Theme",
    systemTheme: "System theme",
    lightMode: "Light mode",
    darkMode: "Dark mode",
    language: "Language",
    english: "English",
    spanish: "Spanish",
    textSize: "Text size",
    highContrast: "High contrast",
    breatheFirst: "Breathe First",
    readAloudControls: "Read aloud controls",
    playbackVoice: "Playback voice",
    defaultVoice: "Default voice",
    playbackSpeed: "Playback speed",
    speedValue: "Speed: {value}x",
    categoriesLegend: "Affirmation categories",
    faithOptional: "Faith is optional and can be selected here.",
    reminderHeading: "Daily reminders (Coming Soon)",
    reminderPreference: "Prepare a daily reminder preference",
    preferredTime: "Preferred time",
    reminderComingSoon: "Daily reminders are planned for a future update. Your preferred reminder time is saved now and will be used when full reminder support becomes available.",
    sendFeedbackHeading: "Send Feedback",
    sendFeedbackDescription: "Share a note, idea, or bug report using your email app.",
    sendFeedbackButton: "💬 Send Feedback",
    noEmailApp: "No email app is available on this device.",
    clearDataHeading: "Clear local app data",
    clearDataDescription: "This removes favorites, reflections, settings, and feedback from this browser.",
    clearDataButton: "Clear local app data",
    saving: "Saving...",
    savedJustNow: "Saved just now",
    affirmationsLoading: "Affirmations are still loading.",
    removedFavorite: "Removed from favorites.",
    savedFavorite: "Saved to favorites.",
    copied: "Affirmation copied.",
    copyUnavailable: "Copy is not available in this browser.",
    noFavorites: "No favorites match this search.",
    removeFavorite: "Remove favorite",
    noReflections: "No saved journal entries yet.",
    journalUnavailable: "No saved journal entries in this month.",
    journalDate: "Saved journal entry",
    savedReflection: "Saved reflection",
    open: "Open",
    noPastDays: "No past days yet. After today passes, saved days will appear here.",
    previousMonth: "Previous month",
    nextMonth: "Next month",
    calendarUnavailable: "No saved days in this month.",
    savedDate: "Saved affirmation",
    notFavorited: "Not favorited",
    reflectionSaved: "Reflection saved",
    noReflectionYet: "No reflection yet",
    openSavedDay: "Open saved day",
    openSavedEntry: "Open saved entry for {date}",
    noReflectionSaved: "No reflection saved",
    noReflectionForDay: "No reflection was saved for this day.",
    searchPrompt: "Select one or more categories to browse affirmations, or enter a keyword to search all affirmations.",
    noAffirmations: "No affirmations match this search.",
    useThis: "Use this",
    readAloudOff: "Read aloud is turned off in Settings.",
    speechUnavailable: "Speech synthesis is not available in this browser.",
    readAloudStopped: "Read aloud stopped.",
    clearConfirm: "Clear all Daily Affirmation favorites, reflections, settings, and feedback from this browser?",
    dataCleared: "Local app data cleared.",
    offlineUnavailable: "Offline mode was not available in this browser.",
    chooseCategory: "Choose at least one category.",
    dataLoadError: "Affirmation data could not be loaded.",
    goodMorning: "Good morning",
    goodAfternoon: "Good afternoon",
    goodEvening: "Good evening",
    greetingSuffix: "Take what helps and leave the rest.",
    categories: {
      general: "General",
      gratitude: "Gratitude",
      faith: "Faith",
      anxiety_calm: "Anxiety and Calm",
      healing: "Healing",
      confidence: "Confidence",
      relationships: "Relationships",
      happiness: "Happiness",
    },
  },
  es: {
    appTitle: "Afirmación Diaria",
    skipLink: "Saltar a la afirmación",
    toggleDarkMode: "Cambiar modo oscuro",
    navHome: "Inicio",
    navFavorites: "Favoritas",
    navJournal: "Diario",
    navHistory: "Historial",
    navSearch: "Buscar",
    navSettings: "Ajustes",
    primaryNav: "Principal",
    homeHeading: "Afirmación de hoy",
    breathHeading: "Toma una respiración lenta",
    breathPrompt: "Cuando estés listo, revela la afirmación de hoy.",
    breathingStarted: "Inhala lentamente y luego exhala lentamente.",
    breathingComplete: "Respiración completa. Revela cuando estés listo.",
    revealButton: "Revelar la afirmación de hoy",
    actionsLabel: "Acciones de afirmación",
    newAffirmation: "Nueva afirmación",
    copy: "Copiar",
    favorite: "Favorita",
    favorited: "Guardada",
    play: "Reproducir",
    stop: "Detener",
    feedbackHeading: "¿Cómo te llegó hoy?",
    helped: "💚 Me ayudó",
    neutral: "🤍 No estoy seguro",
    notToday: "🌧️ Hoy no",
    feedbackSaved: "Guardado. Gracias por revisar cómo te sientes.",
    reflectionHeading: "Reflexión de hoy",
    reflectionLabel: "Reflexión para esta afirmación",
    reflectionPlaceholder: "Escribe cualquier cosa que quieras recordar de hoy.",
    favoritesHeading: "Favoritas",
    favoritesIntro: "Guardadas solo en este dispositivo.",
    favoriteSearchLabel: "Buscar favoritas",
    reflectionsHeading: "Reflexiones guardadas",
    reflectionsIntro: "Vuelve a notas anteriores guardadas en este dispositivo.",
    reflectionSearchLabel: "Buscar reflexiones",
    historyHeading: "Días anteriores",
    historyIntro: "Días anteriores guardados en este dispositivo, del más reciente al más antiguo.",
    growthInsightsHeading: "Reflexiones de crecimiento",
    growthInsightsIntro: "Una mirada amable a lo que ha resonado contigo.",
    totalHelped: "Me ayudó",
    totalNeutral: "No estoy seguro",
    totalNotToday: "Hoy no",
    encouragementMessage: "🌸 Los pasos pequeños importan. Cada día que te eliges es una victoria. Te has elegido durante {days}.",
    oneDay: "1 día",
    manyDays: "{count} días",
    journeyAtGlance: "Tu camino de un vistazo",
    totalShownUpDays: "Total de días en que te presentaste",
    totalJournalEntries: "Total de entradas de diario",
    totalFavorites: "Total de afirmaciones favoritas",
    mostHelpfulCategory: "Categoría más útil",
    mostHelpfulCategorySummary: "Las afirmaciones de {category} te han ayudado con más frecuencia.",
    noHelpfulCategory: "Tu categoría más útil aparecerá después de marcar una afirmación como \"Me ayudó\".",
    feedbackTotalsHeading: "Totales de respuestas",
    noGrowthInsights: "Tus respuestas aparecerán aquí después de responder a algunas afirmaciones.",
    categoryResonated: "🌿 Las afirmaciones de {category} han resonado contigo con más frecuencia.",
    categoryNotToday: "🌱 Las afirmaciones de {category} fueron marcadas \"Hoy no\" con más frecuencia recientemente. Está bien: distintos mensajes resuenan en distintos momentos.",
    categorySummary: "{category}: {helped} ayudaron, {neutral} no seguro, {notToday} hoy no.",
    savedDay: "Día guardado",
    searchHeading: "Buscar afirmaciones",
    searchIntro: "Busca en todas las categorías, incluidas las afirmaciones opcionales de Fe.",
    keyword: "Palabra clave",
    searchCategories: "Categorías de búsqueda",
    settingsHeading: "Ajustes",
    settingsIntro: "Las preferencias permanecen en este dispositivo.",
    theme: "Tema",
    systemTheme: "Tema del sistema",
    lightMode: "Modo claro",
    darkMode: "Modo oscuro",
    language: "Idioma",
    english: "Inglés",
    spanish: "Español",
    textSize: "Tamaño del texto",
    highContrast: "Alto contraste",
    breatheFirst: "Respirar primero",
    readAloudControls: "Controles de lectura en voz alta",
    playbackVoice: "Voz de reproducción",
    defaultVoice: "Voz predeterminada",
    playbackSpeed: "Velocidad de reproducción",
    speedValue: "Velocidad: {value}x",
    categoriesLegend: "Categorías de afirmaciones",
    faithOptional: "Fe es opcional y se puede seleccionar aquí.",
    reminderHeading: "Recordatorios diarios (Próximamente)",
    reminderPreference: "Preparar una preferencia de recordatorio diario",
    preferredTime: "Hora preferida",
    reminderComingSoon: "Los recordatorios diarios están planeados para una actualización futura. Tu hora preferida se guarda ahora y se usará cuando el soporte completo de recordatorios esté disponible.",
    sendFeedbackHeading: "Enviar comentarios",
    sendFeedbackDescription: "Comparte una nota, idea o reporte de error usando tu app de correo.",
    sendFeedbackButton: "💬 Enviar comentarios",
    noEmailApp: "No hay una app de correo disponible en este dispositivo.",
    clearDataHeading: "Borrar datos locales de la app",
    clearDataDescription: "Esto elimina favoritas, reflexiones, ajustes y comentarios de este navegador.",
    clearDataButton: "Borrar datos locales de la app",
    saving: "Guardando...",
    savedJustNow: "Guardado hace un momento",
    affirmationsLoading: "Las afirmaciones todavía se están cargando.",
    removedFavorite: "Eliminada de favoritas.",
    savedFavorite: "Guardada en favoritas.",
    copied: "Afirmación copiada.",
    copyUnavailable: "Copiar no está disponible en este navegador.",
    noFavorites: "No hay favoritas que coincidan con esta búsqueda.",
    removeFavorite: "Eliminar favorita",
    noReflections: "Aún no hay entradas de diario guardadas.",
    journalUnavailable: "No hay entradas de diario guardadas en este mes.",
    journalDate: "Entrada de diario guardada",
    savedReflection: "Reflexión guardada",
    open: "Abrir",
    noPastDays: "Aún no hay días anteriores. Después de que pase hoy, los días guardados aparecerán aquí.",
    previousMonth: "Mes anterior",
    nextMonth: "Mes siguiente",
    calendarUnavailable: "No hay días guardados en este mes.",
    savedDate: "Afirmación guardada",
    notFavorited: "No guardada",
    reflectionSaved: "Reflexión guardada",
    noReflectionYet: "Sin reflexión todavía",
    openSavedDay: "Abrir día guardado",
    openSavedEntry: "Abrir entrada guardada para {date}",
    noReflectionSaved: "No hay reflexión guardada",
    noReflectionForDay: "No se guardó ninguna reflexión para este día.",
    searchPrompt: "Selecciona una o más categorías para explorar afirmaciones, o escribe una palabra clave para buscar en todas las afirmaciones.",
    noAffirmations: "No hay afirmaciones que coincidan con esta búsqueda.",
    useThis: "Usar esta",
    readAloudOff: "La lectura en voz alta está desactivada en Ajustes.",
    speechUnavailable: "La síntesis de voz no está disponible en este navegador.",
    readAloudStopped: "Lectura en voz alta detenida.",
    clearConfirm: "¿Borrar todas las favoritas, reflexiones, ajustes y comentarios de Daily Affirmation de este navegador?",
    dataCleared: "Datos locales de la app borrados.",
    offlineUnavailable: "El modo sin conexión no estuvo disponible en este navegador.",
    chooseCategory: "Elige al menos una categoría.",
    dataLoadError: "No se pudieron cargar los datos de afirmaciones.",
    goodMorning: "Buenos días",
    goodAfternoon: "Buenas tardes",
    goodEvening: "Buenas noches",
    greetingSuffix: "Toma lo que te ayude y deja lo demás.",
    categories: {
      general: "General",
      gratitude: "Gratitud",
      faith: "Fe",
      anxiety_calm: "Ansiedad y calma",
      healing: "Sanación",
      confidence: "Confianza",
      relationships: "Relaciones",
      happiness: "Felicidad",
    },
  },
};

const affirmationTranslations = {
  es: {
    "general-001": "Puedo vivir este día paso a paso.",
    "general-002": "No tengo que hacer todo de una vez.",
    "general-003": "Puedo volver a empezar con una mente clara.",
    "gratitude-001": "Puedo notar algo bueno hoy.",
    "gratitude-002": "Puedo agradecer sin fingir que la vida es perfecta.",
    "gratitude-003": "Puedo dejar que una pequeña comodidad importe.",
    "faith-001": "Puedo llevar este día a Dios con el corazón abierto.",
    "faith-002": "Puedo descansar en un amor más grande que mi miedo.",
    "faith-003": "Puedo pedir guía paso a paso.",
    "anxiety_calm-001": "Puedo tomar una respiración lenta ahora mismo.",
    "anxiety_calm-002": "Puedo recordarle a mi cuerpo que estoy aquí.",
    "anxiety_calm-003": "Puedo sentir ansiedad y aun así estar a salvo en este momento.",
    "healing-001": "Puedo sanar a un ritmo que respete mi vida.",
    "healing-002": "Puedo ser amable con lo que todavía se siente sensible.",
    "healing-003": "Puedo cuidar las partes de mí que necesitan tiempo.",
    "confidence-001": "Puedo confiar en mí para aprender lo que necesito.",
    "confidence-002": "Puedo construir confianza con la práctica.",
    "confidence-003": "Puedo hablar con claridad y amabilidad.",
    "relationships-001": "Puedo aportar honestidad y calidez a mis relaciones.",
    "relationships-002": "Puedo escuchar con toda mi atención.",
    "relationships-003": "Puedo poner límites con respeto.",
    "happiness-001": "Puedo recibir un pequeño momento de alegría hoy.",
    "happiness-002": "Tengo permiso para disfrutar lo que se siente bien.",
    "happiness-003": "Puedo notar una chispa de alegría.",
  },
};

const defaultState = {
  schemaVersion: STORAGE_SCHEMA_VERSION,
  settings: {
    theme: "system",
    language: DEFAULT_LANGUAGE,
    textSize: "0",
    highContrast: false,
    readAloud: true,
    voiceURI: "",
    speechRate: "1",
    categories: [
      "general",
      "gratitude",
      "anxiety_calm",
      "healing",
      "confidence",
      "relationships",
      "happiness",
    ],
    reminderEnabled: false,
    reminderTime: "09:00",
  },
  daily: {
    date: "",
    affirmationId: "",
    revealed: false,
  },
  favorites: [],
  reflections: {},
  history: {},
  customAffirmations: [],
  feedback: {},
  feedbackResponses: {},
};

const elements = {
  todayLabel: document.querySelector("#todayLabel"),
  greetingText: document.querySelector("#greetingText"),
  categoryLabel: document.querySelector("#categoryLabel"),
  affirmationText: document.querySelector("#affirmationText"),
  affirmationCard: document.querySelector("#affirmationCard"),
  breathPanel: document.querySelector("#breathPanel"),
  breathStart: document.querySelector("#breathStart"),
  breathExerciseStatus: document.querySelector("#breathExerciseStatus"),
  revealButton: document.querySelector("#revealButton"),
  copyButton: document.querySelector("#copyButton"),
  favoriteButton: document.querySelector("#favoriteButton"),
  speakButton: document.querySelector("#speakButton"),
  stopSpeakButton: document.querySelector("#stopSpeakButton"),
  statusMessage: document.querySelector("#statusMessage"),
  reflectionText: document.querySelector("#reflectionText"),
  reflectionContext: document.querySelector("#reflectionContext"),
  reflectionSaveStatus: document.querySelector("#reflectionSaveStatus"),
  feedbackConfirmation: document.querySelector("#feedbackConfirmation"),
  favoriteSearch: document.querySelector("#favoriteSearch"),
  favoritesList: document.querySelector("#favoritesList"),
  previousJournalMonthButton: document.querySelector("#previousJournalMonthButton"),
  nextJournalMonthButton: document.querySelector("#nextJournalMonthButton"),
  journalCalendarHeading: document.querySelector("#journalCalendarHeading"),
  journalCalendarGrid: document.querySelector("#journalCalendarGrid"),
  journalCalendarStatus: document.querySelector("#journalCalendarStatus"),
  journalDetail: document.querySelector("#journalDetail"),
  journalDetailMeta: document.querySelector("#journalDetailMeta"),
  journalDetailHeading: document.querySelector("#journalDetailHeading"),
  journalDetailEntries: document.querySelector("#journalDetailEntries"),
  previousMonthButton: document.querySelector("#previousMonthButton"),
  nextMonthButton: document.querySelector("#nextMonthButton"),
  historyCalendarHeading: document.querySelector("#historyCalendarHeading"),
  historyCalendarGrid: document.querySelector("#historyCalendarGrid"),
  historyCalendarStatus: document.querySelector("#historyCalendarStatus"),
  historyDetail: document.querySelector("#historyDetail"),
  historyDetailMeta: document.querySelector("#historyDetailMeta"),
  historyDetailAffirmation: document.querySelector("#historyDetailAffirmation"),
  historyDetailStatus: document.querySelector("#historyDetailStatus"),
  historyDetailReflections: document.querySelector("#historyDetailReflections"),
  feedbackTotals: document.querySelector("#feedbackTotals"),
  categoryInsights: document.querySelector("#categoryInsights"),
  affirmationSearch: document.querySelector("#affirmationSearch"),
  searchResults: document.querySelector("#searchResults"),
  searchCategoryFilters: document.querySelector("#searchCategoryFilters"),
  settingsCategoryFilters: document.querySelector("#settingsCategoryFilters"),
  themeSelect: document.querySelector("#themeSelect"),
  languageSelect: document.querySelector("#languageSelect"),
  textSizeRange: document.querySelector("#textSizeRange"),
  highContrastToggle: document.querySelector("#highContrastToggle"),
  readAloudToggle: document.querySelector("#readAloudToggle"),
  voiceSelect: document.querySelector("#voiceSelect"),
  speechRateRange: document.querySelector("#speechRateRange"),
  speechRateValue: document.querySelector("#speechRateValue"),
  reminderToggle: document.querySelector("#reminderToggle"),
  reminderTime: document.querySelector("#reminderTime"),
  reminderComingSoonMessage: document.querySelector("#reminderComingSoonMessage"),
  sendFeedbackButton: document.querySelector("#sendFeedbackButton"),
  clearDataButton: document.querySelector("#clearDataButton"),
  themeQuickButton: document.querySelector("#themeQuickButton"),
};

let appData = { categories: {}, affirmations: [] };
let state = null;
let currentAffirmation = null;
let breathGateOpen = true;
let breathExerciseTimer = 0;
let statusTimer = 0;
let reflectionSaveTimer = 0;
let feedbackConfirmationTimer = 0;
let speechVoices = [];
let journalCalendarMonth = new Date();
let journalCalendarInitialized = false;
let historyCalendarMonth = new Date();
let historyCalendarInitialized = false;

const localSaveProvider = {
  load() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  },
  save(nextState) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  },
  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },
};

state = loadState();

function loadState() {
  try {
    return migrateSavedState(localSaveProvider.load());
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState() {
  state = migrateSavedState(state);
  state.schemaVersion = STORAGE_SCHEMA_VERSION;
  localSaveProvider.save(state);
}

function plainObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function isPlainObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function normalizeHistory(history) {
  return Object.fromEntries(
    Object.entries(plainObject(history)).map(([date, entry]) => {
      if (!isPlainObject(entry)) {
        return [date, entry];
      }
      return [date, { ...entry, date: entry.date || date }];
    }),
  );
}

function migrateSavedState(saved) {
  if (!plainObject(saved)) {
    return structuredClone(defaultState);
  }

  const savedSettings = plainObject(saved.settings);
  const language = SUPPORTED_LANGUAGES.includes(savedSettings.language) ? savedSettings.language : DEFAULT_LANGUAGE;
  const categories = Array.isArray(savedSettings.categories) ? savedSettings.categories : defaultState.settings.categories;
  const settings = {
    ...defaultState.settings,
    ...savedSettings,
    language,
    categories,
  };
  delete settings.breatheFirst;

  return {
    ...structuredClone(defaultState),
    ...saved,
    schemaVersion: STORAGE_SCHEMA_VERSION,
    settings,
    daily: { ...defaultState.daily, ...plainObject(saved.daily) },
    favorites: Array.isArray(saved.favorites) ? saved.favorites : [],
    reflections: plainObject(saved.reflections),
    history: normalizeHistory(saved.history),
    customAffirmations: Array.isArray(saved.customAffirmations) ? saved.customAffirmations : [],
    feedback: plainObject(saved.feedback),
    feedbackResponses: plainObject(saved.feedbackResponses),
  };
}

function todayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dayNumber(dateKeyValue = todayKey()) {
  const [year, month, day] = dateKeyValue.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const start = new Date(year, 0, 0);
  return Math.floor((date - start) / 86400000);
}

function setStatus(message) {
  const statusText = String(message || "").trim();
  window.clearTimeout(statusTimer);
  elements.statusMessage.textContent = statusText;
  elements.statusMessage.hidden = !statusText;
  elements.statusMessage.classList.toggle("is-visible", Boolean(statusText));
  statusTimer = window.setTimeout(() => {
    elements.statusMessage.textContent = "";
    elements.statusMessage.hidden = true;
    elements.statusMessage.classList.remove("is-visible");
  }, 4200);
}

function feedbackMailtoUrl() {
  const body = [
    `App Version: ${APP_VERSION}`,
    "",
    `Device: ${navigator.userAgent || ""}`,
    "",
    "What would you like to share?",
    "",
    "Steps to reproduce (if reporting a bug):",
    "",
    "Additional comments:",
  ].join("\n");
  const params = new URLSearchParams({
    subject: "Daily Affirmation Feedback",
    body,
  });
  return `mailto:wilmotd345@gmail.com?${params.toString()}`;
}

function openFeedbackEmail() {
  const startedAt = Date.now();
  window.location.href = feedbackMailtoUrl();
  window.setTimeout(() => {
    if (document.visibilityState === "visible" && Date.now() - startedAt > 900) {
      setStatus(translate("noEmailApp"));
    }
  }, 1200);
}

function currentLanguage() {
  return SUPPORTED_LANGUAGES.includes(state.settings.language) ? state.settings.language : DEFAULT_LANGUAGE;
}

function translate(key, replacements = {}) {
  const dictionary = translations[currentLanguage()] || translations[DEFAULT_LANGUAGE];
  const fallback = translations[DEFAULT_LANGUAGE];
  let value = dictionary[key] ?? fallback[key] ?? key;
  Object.entries(replacements).forEach(([name, replacement]) => {
    value = value.replaceAll(`{${name}}`, replacement);
  });
  return value;
}

function translateCategory(key) {
  return translations[currentLanguage()]?.categories?.[key] || translations[DEFAULT_LANGUAGE].categories[key] || appData.categories[key] || key;
}

function affirmationText(item) {
  if (!item) {
    return "";
  }
  const language = currentLanguage();
  return item.translations?.[language] || item[`text_${language}`] || affirmationTranslations[language]?.[item.id] || item.text;
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) {
    element.textContent = value;
  }
}

function setLabelText(forId, value) {
  setText(`label[for="${forId}"]`, value);
}

function setSaveStatus(message) {
  elements.reflectionSaveStatus.textContent = message;
}

function setFeedbackConfirmation(message) {
  window.clearTimeout(feedbackConfirmationTimer);
  elements.feedbackConfirmation.textContent = message;
  if (message) {
    feedbackConfirmationTimer = window.setTimeout(() => {
      elements.feedbackConfirmation.textContent = "";
    }, 3200);
  }
}

function setCheckLabel(input, value) {
  const labelText = input?.closest("label")?.querySelector("span");
  if (labelText) {
    labelText.textContent = value;
  }
}

function getSelectedCategories() {
  const available = Object.keys(appData.categories);
  const savedCategories = Array.isArray(state.settings.categories) ? state.settings.categories : defaultState.settings.categories;
  const selected = savedCategories.filter((category) => available.includes(category));
  return selected.length ? selected : ["general"];
}

function getEligibleAffirmations() {
  const selected = new Set(getSelectedCategories());
  return appData.affirmations.filter((item) => selected.has(item.category));
}

function scoreAffirmation(item) {
  const feedback = state.feedback[item.category] || {};
  return (feedback.helped || 0) * 2 + (feedback.favorite || 0) - (feedback.notToday || 0);
}

function gentleFeedbackWeight(item) {
  const score = Math.max(-4, Math.min(6, scoreAffirmation(item)));
  return Math.max(0.7, 1 + score * 0.08);
}

function seededRandom(seed) {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return () => {
    hash += 0x6d2b79f5;
    let value = hash;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function weightedChoice(items, weightForItem, random) {
  const weighted = items.map((item) => ({ item, weight: Math.max(0.01, weightForItem(item)) }));
  const total = weighted.reduce((sum, entry) => sum + entry.weight, 0);
  let cursor = random() * total;
  for (const entry of weighted) {
    cursor -= entry.weight;
    if (cursor <= 0) {
      return entry.item;
    }
  }
  return weighted[weighted.length - 1]?.item || null;
}

function recentHistoryBefore(dateKeyValue, limit) {
  return Object.values(state.history || {})
    .filter((entry) => entry?.date && entry.date < dateKeyValue)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}

function lastTwoCategoriesMatch(dateKeyValue) {
  const recent = recentHistoryBefore(dateKeyValue, 2);
  if (recent.length < 2 || !recent[0].category || !recent[1].category) {
    return "";
  }
  return recent[0].category === recent[1].category ? recent[0].category : "";
}

function applyDailyDiversityFilters(pool, dateKeyValue) {
  let candidates = [...pool];
  const recentIds = new Set(recentHistoryBefore(dateKeyValue, RECENT_AFFIRMATION_WINDOW).map((entry) => entry.affirmationId).filter(Boolean));
  const withoutRecent = candidates.filter((item) => !recentIds.has(item.id));
  if (withoutRecent.length) {
    candidates = withoutRecent;
  }

  const repeatedCategory = lastTwoCategoriesMatch(dateKeyValue);
  if (repeatedCategory) {
    const alternatives = candidates.filter((item) => item.category !== repeatedCategory);
    if (alternatives.length) {
      candidates = alternatives;
    }
  }

  return candidates;
}

function chooseAffirmation(preferDaily = false, dateKeyValue = todayKey()) {
  if (!appData.affirmations.length) {
    return null;
  }

  const pool = getEligibleAffirmations();
  if (!pool.length) {
    return appData.affirmations[0];
  }

  if (preferDaily) {
    const candidates = applyDailyDiversityFilters(pool, dateKeyValue);
    const enabledKey = getSelectedCategories().join("|");
    const random = seededRandom(`${dateKeyValue}|${dayNumber(dateKeyValue)}|${enabledKey}`);
    return weightedChoice(candidates, gentleFeedbackWeight, random);
  }

  return weightedChoice(pool, gentleFeedbackWeight, Math.random);
}

function categoryName(key) {
  return translateCategory(key);
}

function findAffirmationById(id) {
  return appData.affirmations.find((item) => item.id === id) || null;
}

function ensureTodayState() {
  const date = todayKey();
  if (state.daily.date !== date) {
    state.daily = {
      date,
      affirmationId: "",
      revealed: false,
    };
    saveState();
  }
}

function saveCategorySelection(categories) {
  const latestState = loadState();
  state = {
    ...latestState,
    settings: {
      ...latestState.settings,
      categories: [...categories],
    },
  };
  saveState();
}

function saveSettingsCategorySelection(event) {
  event?.stopPropagation();
  const selected = getCheckedValues(elements.settingsCategoryFilters);
  if (!selected.length) {
    setStatus(translate("chooseCategory"));
    renderCategoryControls();
    return;
  }
  saveCategorySelection(selected);
}

function getTodaysAffirmation() {
  ensureTodayState();
  const savedAffirmation = findAffirmationById(state.daily.affirmationId);
  if (savedAffirmation) {
    return savedAffirmation;
  }

  const todaysHistoryAffirmation = findAffirmationById(state.history[todayKey()]?.affirmationId);
  if (todaysHistoryAffirmation) {
    state.daily.affirmationId = todaysHistoryAffirmation.id;
    saveState();
    return todaysHistoryAffirmation;
  }

  const todaysReflection = Object.values(state.reflections).find((reflection) => reflection.date === todayKey());
  const todaysReflectionAffirmation = findAffirmationById(todaysReflection?.affirmationId);
  if (todaysReflectionAffirmation) {
    state.daily.affirmationId = todaysReflectionAffirmation.id;
    saveState();
    return todaysReflectionAffirmation;
  }

  const nextAffirmation = chooseAffirmation(true, todayKey());
  if (nextAffirmation) {
    state.daily.affirmationId = nextAffirmation.id;
    state.daily.revealed = false;
    saveState();
  }
  return nextAffirmation;
}

function updateDailyState(item, options = {}) {
  const latestState = loadState();
  const currentDaily =
    latestState.daily.date === todayKey() ? latestState.daily : { date: todayKey(), affirmationId: "", revealed: false };
  const nextDaily = { ...currentDaily, date: todayKey() };

  if (currentDaily.affirmationId !== item.id) {
    nextDaily.affirmationId = item.id;
    nextDaily.revealed = typeof options.revealed === "boolean" ? options.revealed : false;
  } else if (typeof options.revealed === "boolean") {
    nextDaily.revealed = options.revealed;
  }
  state = {
    ...latestState,
    daily: nextDaily,
  };
  saveState();
}

function setAffirmation(item, options = {}) {
  if (!item) {
    setStatus(translate("affirmationsLoading"));
    return;
  }

  currentAffirmation = item;
  if (options.persistDaily !== false) {
    updateDailyState(item);
  }
  if (options.recordHistory !== false) {
    recordTodayHistory(item);
  }
  elements.categoryLabel.textContent = categoryName(item.category);
  elements.affirmationText.textContent = affirmationText(item);
  elements.favoriteButton.setAttribute("aria-pressed", String(state.favorites.includes(item.id)));
  elements.favoriteButton.textContent = state.favorites.includes(item.id) ? translate("favorited") : translate("favorite");
  elements.reflectionContext.textContent = `${todayKey()} · ${categoryName(item.category)}`;
  loadCurrentReflection();
  renderFeedbackSelection();

  if (!options.skipBreath && !state.daily.revealed) {
    breathGateOpen = false;
    elements.breathPanel.hidden = false;
    elements.affirmationCard.hidden = true;
  } else {
    breathGateOpen = true;
    elements.breathPanel.hidden = true;
    elements.affirmationCard.hidden = false;
  }
}

function recordTodayHistory(item) {
  const date = todayKey();
  const existing = state.history[date] || {};
  state.history[date] = {
    ...existing,
    date,
    affirmationId: item.id,
    category: item.category,
    affirmation: item.text,
    updatedAt: new Date().toISOString(),
  };
  saveState();
}

function revealAffirmation() {
  breathGateOpen = true;
  stopBreathingExercise();
  if (currentAffirmation) {
    updateDailyState(currentAffirmation, { revealed: true });
  }
  elements.breathPanel.hidden = true;
  elements.affirmationCard.hidden = false;
  elements.affirmationText.focus({ preventScroll: false });
}

function startBreathingExercise() {
  window.clearTimeout(breathExerciseTimer);
  elements.breathPanel.classList.add("is-breathing");
  elements.breathExerciseStatus.textContent = translate("breathingStarted");
  breathExerciseTimer = window.setTimeout(() => {
    elements.breathPanel.classList.remove("is-breathing");
    elements.breathExerciseStatus.textContent = translate("breathingComplete");
  }, 8000);
}

function stopBreathingExercise() {
  window.clearTimeout(breathExerciseTimer);
  elements.breathPanel.classList.remove("is-breathing");
  elements.breathExerciseStatus.textContent = "";
}

function reflectionId(item = currentAffirmation) {
  return item ? `${todayKey()}::${item.id}` : "";
}

function feedbackResponseId(item = currentAffirmation) {
  return item ? `${todayKey()}::${item.id}` : "";
}

function currentFeedbackResponse() {
  return state.feedbackResponses[feedbackResponseId()]?.response || "";
}

function renderFeedbackSelection() {
  const selected = currentFeedbackResponse();
  document.querySelectorAll("[data-feedback]").forEach((button) => {
    const isSelected = button.dataset.feedback === selected;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

function loadCurrentReflection() {
  const id = reflectionId();
  elements.reflectionText.value = state.reflections[id]?.text || "";
  setSaveStatus("");
}

function saveCurrentReflection(options = {}) {
  if (!currentAffirmation) {
    return;
  }

  const id = reflectionId();
  const text = elements.reflectionText.value;
  if (text.trim()) {
    state.reflections[id] = {
      id,
      date: todayKey(),
      affirmationId: currentAffirmation.id,
      category: currentAffirmation.category,
      affirmation: currentAffirmation.text,
      text,
      updatedAt: new Date().toISOString(),
    };
  } else {
    delete state.reflections[id];
  }
  saveState();
  renderReflections();
  renderHistory();
  if (options.announce !== false) {
    setSaveStatus(translate("savedJustNow"));
  }
}

function scheduleReflectionSave() {
  if (!currentAffirmation) {
    return;
  }
  setSaveStatus(translate("saving"));
  window.clearTimeout(reflectionSaveTimer);
  reflectionSaveTimer = window.setTimeout(() => saveCurrentReflection(), REFLECTION_SAVE_DELAY);
}

function toggleFavorite(id = currentAffirmation?.id) {
  if (!id) {
    return;
  }

  if (state.favorites.includes(id)) {
    state.favorites = state.favorites.filter((favoriteId) => favoriteId !== id);
    setStatus(translate("removedFavorite"));
  } else {
    state.favorites = [...state.favorites, id];
    if (currentAffirmation) {
      saveFeedback("favorite", false);
    }
    setStatus(translate("savedFavorite"));
  }
  saveState();
  if (currentAffirmation?.id === id) {
    setAffirmation(currentAffirmation, { skipBreath: breathGateOpen });
  }
  renderFavorites();
  renderHistory();
}

async function copyAffirmation() {
  if (!currentAffirmation) {
    return;
  }

  try {
    await navigator.clipboard.writeText(affirmationText(currentAffirmation));
    setStatus(translate("copied"));
  } catch {
    setStatus(translate("copyUnavailable"));
  }
}

function saveFeedback(value, announce = true) {
  if (!currentAffirmation) {
    return;
  }

  const category = currentAffirmation.category;
  state.feedback[category] = state.feedback[category] || {};

  if (value === "favorite") {
    state.feedback[category].favorite = (state.feedback[category].favorite || 0) + 1;
    saveState();
    return;
  }

  const metricKey = value === "not-today" ? "notToday" : value;
  const latestState = loadState();
  state = latestState;
  state.feedback[category] = state.feedback[category] || {};

  const responseId = feedbackResponseId();
  const previousResponse = state.feedbackResponses[responseId]?.response;
  if (previousResponse && previousResponse !== value) {
    const previousKey = previousResponse === "not-today" ? "notToday" : previousResponse;
    state.feedback[category][previousKey] = Math.max(0, (state.feedback[category][previousKey] || 0) - 1);
  }
  if (previousResponse !== value) {
    state.feedback[category][metricKey] = (state.feedback[category][metricKey] || 0) + 1;
  }
  state.feedbackResponses[responseId] = {
    id: responseId,
    date: todayKey(),
    affirmationId: currentAffirmation.id,
    category,
    response: value,
    updatedAt: new Date().toISOString(),
  };
  saveState();
  renderFeedbackSelection();
  renderHistory();
  if (announce) {
    setFeedbackConfirmation(translate("feedbackSaved"));
  }
}

function renderFavorites() {
  const query = elements.favoriteSearch.value.trim().toLowerCase();
  const favorites = state.favorites
    .map((id) => appData.affirmations.find((item) => item.id === id))
    .filter(Boolean)
    .filter((item) => !query || affirmationText(item).toLowerCase().includes(query) || item.text.toLowerCase().includes(query) || categoryName(item.category).toLowerCase().includes(query));

  elements.favoritesList.innerHTML = "";
  if (!favorites.length) {
    elements.favoritesList.append(emptyMessage(translate("noFavorites")));
    return;
  }

  favorites.forEach((item) => {
    const card = resultCard(item);
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = translate("removeFavorite");
    removeButton.addEventListener("click", () => toggleFavorite(item.id));
    card.querySelector(".result-actions").append(removeButton);
    elements.favoritesList.append(card);
  });
}

function getReflectionEntries() {
  return Object.values(state.reflections || {})
    .filter((entry) => entry?.date)
    .sort((a, b) => b.date.localeCompare(a.date) || (b.updatedAt || "").localeCompare(a.updatedAt || ""));
}

function renderReflections() {
  if (!elements.journalCalendarGrid) {
    return;
  }

  const entries = getReflectionEntries();
  if (!journalCalendarInitialized && entries.length) {
    setJournalCalendarMonth(entries[0].date);
    journalCalendarInitialized = true;
  }
  renderJournalCalendar(entries);
  elements.journalDetail.hidden = true;
}

function getReflectionsForDate(date) {
  return Object.values(state.reflections)
    .filter((item) => item.date === date)
    .sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || ""));
}

function setJournalCalendarMonth(dateKeyValue) {
  const [year, month] = dateKeyValue.split("-").map(Number);
  journalCalendarMonth = new Date(year, month - 1, 1);
}

function changeJournalMonth(offset) {
  journalCalendarMonth = new Date(journalCalendarMonth.getFullYear(), journalCalendarMonth.getMonth() + offset, 1);
  renderReflections();
}

function renderJournalCalendar(entries) {
  const today = todayKey();
  const year = journalCalendarMonth.getFullYear();
  const month = journalCalendarMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthEntries = new Map();
  entries
    .filter((entry) => entry.date.startsWith(dateKeyFromParts(year, month, 1).slice(0, 7)))
    .forEach((entry) => {
      monthEntries.set(entry.date, true);
    });

  elements.journalCalendarHeading.textContent = new Intl.DateTimeFormat(currentLanguage(), { month: "long", year: "numeric" }).format(firstDay);
  elements.previousJournalMonthButton.setAttribute("aria-label", translate("previousMonth"));
  elements.nextJournalMonthButton.setAttribute("aria-label", translate("nextMonth"));
  elements.journalCalendarGrid.innerHTML = "";
  elements.journalCalendarStatus.textContent = monthEntries.size ? "" : translate(entries.length ? "journalUnavailable" : "noReflections");

  for (let index = 0; index < firstDay.getDay(); index += 1) {
    const emptyCell = document.createElement("span");
    emptyCell.className = "calendar-day is-empty";
    elements.journalCalendarGrid.append(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = dateKeyFromParts(year, month, day);
    const hasEntry = monthEntries.has(date);
    const dayElement = document.createElement(hasEntry ? "button" : "span");
    dayElement.className = "calendar-day";
    dayElement.textContent = String(day);
    dayElement.classList.toggle("is-today", date === today);
    dayElement.classList.toggle("has-journal", hasEntry);
    if (hasEntry) {
      dayElement.type = "button";
      dayElement.setAttribute("aria-label", `${translate("journalDate")}: ${formatHistoryDate(date)}`);
      dayElement.addEventListener("click", () => openJournalEntry(date));
    } else if (date === today) {
      dayElement.setAttribute("aria-label", formatHistoryDate(date));
    } else {
      dayElement.setAttribute("aria-hidden", "true");
    }
    elements.journalCalendarGrid.append(dayElement);
  }
}

function openJournalEntry(date) {
  const reflections = getReflectionsForDate(date);
  if (!reflections.length) {
    return;
  }

  elements.journalDetail.hidden = false;
  elements.journalDetailMeta.textContent = formatHistoryDate(date);
  elements.journalDetailHeading.textContent = translate("savedReflection");
  elements.journalDetailEntries.innerHTML = "";
  reflections.forEach((reflection) => {
    const card = document.createElement("article");
    card.className = "result-card";
    const category = document.createElement("p");
    category.className = "category-pill";
    category.textContent = categoryName(reflection.category);
    const affirmation = document.createElement("p");
    affirmation.textContent = reflection.affirmation;
    const text = document.createElement("p");
    text.textContent = reflection.text;
    card.append(category, affirmation, text);
    elements.journalDetailEntries.append(card);
  });
  elements.journalDetail.focus?.({ preventScroll: false });
}

function getHistoryEntries() {
  const today = todayKey();
  const byDate = new Map();

  Object.values(state.history || {}).forEach((entry) => {
    if (!entry?.date || entry.date >= today) {
      return;
    }
    byDate.set(entry.date, { ...entry });
  });

  Object.values(state.reflections || {}).forEach((reflection) => {
    if (!reflection?.date || reflection.date >= today) {
      return;
    }
    if (!byDate.has(reflection.date)) {
      byDate.set(reflection.date, {
        date: reflection.date,
        affirmationId: reflection.affirmationId,
        category: reflection.category,
        affirmation: reflection.affirmation,
        updatedAt: reflection.updatedAt,
      });
    }
  });

  return [...byDate.values()].sort((a, b) => b.date.localeCompare(a.date));
}

function emptyFeedbackCounts() {
  return { helped: 0, neutral: 0, notToday: 0 };
}

function addFeedbackCount(counts, response) {
  if (response === "helped") {
    counts.helped += 1;
  }
  if (response === "neutral") {
    counts.neutral += 1;
  }
  if (response === "not-today") {
    counts.notToday += 1;
  }
}

function getGrowthInsightStats() {
  const totals = emptyFeedbackCounts();
  const byCategory = {};
  Object.values(state.feedbackResponses || {}).forEach((entry) => {
    if (!entry?.response || !entry?.category) {
      return;
    }
    addFeedbackCount(totals, entry.response);
    byCategory[entry.category] = byCategory[entry.category] || emptyFeedbackCounts();
    addFeedbackCount(byCategory[entry.category], entry.response);
  });
  return { totals, byCategory };
}

function dayCountLabel(count) {
  return count === 1 ? translate("oneDay") : translate("manyDays", { count });
}

function getSavedActivityDates() {
  const dates = new Set();
  Object.values(state.history || {}).forEach((entry) => {
    if (entry?.date) {
      dates.add(entry.date);
    }
  });
  Object.values(state.reflections || {}).forEach((entry) => {
    if (entry?.date) {
      dates.add(entry.date);
    }
  });
  Object.values(state.feedbackResponses || {}).forEach((entry) => {
    if (entry?.date) {
      dates.add(entry.date);
    }
  });
  return dates;
}

function insightCard(title, rows = [], options = {}) {
  const card = document.createElement("article");
  card.className = options.featured ? "insight-card insight-card-featured" : "insight-card";
  if (title) {
    const heading = document.createElement("h4");
    heading.textContent = title;
    card.append(heading);
  }
  rows.forEach((row) => {
    const paragraph = document.createElement("p");
    if (typeof row === "string") {
      paragraph.textContent = row;
    } else {
      paragraph.className = "insight-row";
      const label = document.createElement("span");
      label.textContent = row.label;
      const value = document.createElement("strong");
      value.textContent = String(row.value);
      paragraph.append(label, value);
    }
    card.append(paragraph);
  });
  return card;
}

function feedbackResponseLabel(response) {
  if (response === "helped") {
    return translate("helped");
  }
  if (response === "neutral") {
    return translate("neutral");
  }
  if (response === "not-today") {
    return translate("notToday");
  }
  return "";
}

function dateKeyFromParts(year, monthIndex, day) {
  return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function setHistoryCalendarMonth(dateKeyValue) {
  const [year, month] = dateKeyValue.split("-").map(Number);
  historyCalendarMonth = new Date(year, month - 1, 1);
}

function changeHistoryMonth(offset) {
  historyCalendarMonth = new Date(historyCalendarMonth.getFullYear(), historyCalendarMonth.getMonth() + offset, 1);
  renderHistory();
}

function renderGrowthInsights() {
  if (!elements.feedbackTotals || !elements.categoryInsights) {
    return;
  }

  const { totals, byCategory } = getGrowthInsightStats();
  const shownUpDays = getSavedActivityDates().size;
  const journalEntries = Object.values(state.reflections || {}).filter((entry) => entry?.date && entry?.text).length;
  const favoriteCount = state.favorites.length;
  const mostHelped = Object.entries(byCategory)
    .filter(([, counts]) => counts.helped > 0)
    .sort((a, b) => b[1].helped - a[1].helped || a[0].localeCompare(b[0]))[0];

  elements.feedbackTotals.innerHTML = "";
  elements.categoryInsights.innerHTML = "";
  elements.categoryInsights.hidden = true;

  elements.feedbackTotals.append(
    insightCard("", [translate("encouragementMessage", { days: dayCountLabel(shownUpDays) })], { featured: true }),
    insightCard(translate("journeyAtGlance"), [
      { label: translate("totalShownUpDays"), value: shownUpDays },
      { label: translate("totalJournalEntries"), value: journalEntries },
      { label: translate("totalFavorites"), value: favoriteCount },
    ]),
    insightCard(translate("mostHelpfulCategory"), [
      mostHelped
        ? translate("mostHelpfulCategorySummary", { category: categoryName(mostHelped[0]) })
        : translate("noHelpfulCategory"),
    ]),
    insightCard(translate("feedbackTotalsHeading"), [
      { label: translate("totalHelped"), value: totals.helped },
      { label: translate("totalNeutral"), value: totals.neutral },
      { label: translate("totalNotToday"), value: totals.notToday },
    ]),
  );
}

function renderHistory() {
  if (!elements.historyCalendarGrid) {
    return;
  }

  const entries = getHistoryEntries();
  if (!historyCalendarInitialized && entries.length) {
    setHistoryCalendarMonth(entries[0].date);
    historyCalendarInitialized = true;
  }
  renderGrowthInsights();
  renderHistoryCalendar(entries);
  elements.historyDetail.hidden = true;
}

function renderHistoryCalendar(entries) {
  const today = todayKey();
  const year = historyCalendarMonth.getFullYear();
  const month = historyCalendarMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthEntries = new Map(entries.filter((entry) => entry.date.startsWith(dateKeyFromParts(year, month, 1).slice(0, 7))).map((entry) => [entry.date, entry]));

  elements.historyCalendarHeading.textContent = new Intl.DateTimeFormat(currentLanguage(), { month: "long", year: "numeric" }).format(firstDay);
  elements.previousMonthButton.setAttribute("aria-label", translate("previousMonth"));
  elements.nextMonthButton.setAttribute("aria-label", translate("nextMonth"));
  elements.historyCalendarGrid.innerHTML = "";
  elements.historyCalendarStatus.textContent = monthEntries.size ? "" : translate(entries.length ? "calendarUnavailable" : "noPastDays");

  for (let index = 0; index < firstDay.getDay(); index += 1) {
    const emptyCell = document.createElement("span");
    emptyCell.className = "calendar-day is-empty";
    elements.historyCalendarGrid.append(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = dateKeyFromParts(year, month, day);
    const entry = monthEntries.get(date);
    const dayElement = document.createElement(entry ? "button" : "span");
    dayElement.className = "calendar-day";
    dayElement.textContent = String(day);
    dayElement.classList.toggle("is-today", date === today);
    dayElement.classList.toggle("has-entry", Boolean(entry));
    if (entry) {
      dayElement.type = "button";
      dayElement.setAttribute("aria-label", `${translate("savedDate")}: ${formatHistoryDate(date)}`);
      dayElement.addEventListener("click", () => openHistoryEntry(date));
    } else if (date === today) {
      dayElement.setAttribute("aria-label", formatHistoryDate(date));
    } else {
      dayElement.setAttribute("aria-hidden", "true");
    }
    elements.historyCalendarGrid.append(dayElement);
  }
}

function openHistoryEntry(date) {
  const entry = getHistoryEntries().find((item) => item.date === date);
  if (!entry) {
    return;
  }

  const reflections = getReflectionsForDate(date);
  const favorited = state.favorites.includes(entry.affirmationId);
  const feedbackLabel = feedbackResponseLabel(state.feedbackResponses?.[`${date}::${entry.affirmationId}`]?.response);
  elements.historyDetail.hidden = false;
  elements.historyDetailMeta.textContent = `${formatHistoryDate(entry.date)} - ${categoryName(entry.category)}`;
  elements.historyDetailAffirmation.textContent = entry.affirmation;
  elements.historyDetailStatus.textContent = [
    favorited ? translate("favorited") : translate("notFavorited"),
    reflections.length ? translate("reflectionSaved") : translate("noReflectionSaved"),
    feedbackLabel,
  ]
    .filter(Boolean)
    .join(" - ");
  elements.historyDetailReflections.innerHTML = "";

  if (!reflections.length) {
    elements.historyDetailReflections.append(emptyMessage(translate("noReflectionForDay")));
  } else {
    reflections.forEach((reflection) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = reflection.text;
      elements.historyDetailReflections.append(paragraph);
    });
  }

  elements.historyDetail.focus?.({ preventScroll: false });
}

function formatHistoryDate(date) {
  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat(currentLanguage(), {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function renderSearch() {
  const query = elements.affirmationSearch.value.trim().toLowerCase();
  const selected = getCheckedValues(elements.searchCategoryFilters);
  const hasCategoryFilter = selected.length > 0;

  elements.searchResults.innerHTML = "";
  if (!query && !hasCategoryFilter) {
    elements.searchResults.append(emptyMessage(translate("searchPrompt")));
    return;
  }

  const categorySet = new Set(hasCategoryFilter ? selected : Object.keys(appData.categories));
  const results = appData.affirmations
    .filter((item) => categorySet.has(item.category))
    .filter((item) => !query || affirmationText(item).toLowerCase().includes(query) || item.text.toLowerCase().includes(query) || categoryName(item.category).toLowerCase().includes(query))
    .slice(0, 80);

  if (!results.length) {
    elements.searchResults.append(emptyMessage(translate("noAffirmations")));
    return;
  }

  results.forEach((item) => {
    const card = resultCard(item);
    const useButton = document.createElement("button");
    useButton.type = "button";
    useButton.textContent = translate("useThis");
    useButton.addEventListener("click", () => {
      setAffirmation(item, { skipBreath: true });
      switchView("home");
    });
    card.querySelector(".result-actions").append(useButton);
    elements.searchResults.append(card);
  });
}

function resultCard(item) {
  const card = document.createElement("article");
  card.className = "result-card";
  card.innerHTML = `
    <p class="category-pill">${escapeHtml(categoryName(item.category))}</p>
    <p>${escapeHtml(affirmationText(item))}</p>
    <div class="result-actions"></div>
  `;
  return card;
}

function emptyMessage(text) {
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  return paragraph;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return entities[character];
  });
}

function renderCategoryControls() {
  const categoryEntries = Object.entries(appData.categories);
  const savedCategories = Array.isArray(state.settings.categories) ? state.settings.categories : defaultState.settings.categories;
  elements.settingsCategoryFilters.innerHTML = "";
  elements.searchCategoryFilters.innerHTML = "";

  categoryEntries.forEach(([key]) => {
    const name = categoryName(key);
    elements.settingsCategoryFilters.append(categoryCheckbox(key, name, savedCategories.includes(key), "setting"));
    elements.searchCategoryFilters.append(categoryCheckbox(key, name, false, "search"));
  });
}

function categoryCheckbox(key, name, checked, group) {
  const label = document.createElement("label");
  const input = document.createElement("input");
  input.type = "checkbox";
  input.value = key;
  input.checked = checked;
  input.dataset.group = group;
  if (group === "setting") {
    input.addEventListener("change", saveSettingsCategorySelection);
  }
  label.append(input, document.createTextNode(name));
  return label;
}

function getCheckedValues(container) {
  return [...container.querySelectorAll("input:checked")].map((input) => input.value);
}

function syncSettingsForm() {
  elements.themeSelect.value = state.settings.theme;
  elements.languageSelect.value = currentLanguage();
  elements.textSizeRange.value = state.settings.textSize;
  elements.highContrastToggle.checked = state.settings.highContrast;
  elements.readAloudToggle.checked = state.settings.readAloud;
  elements.voiceSelect.value = state.settings.voiceURI;
  elements.speechRateRange.value = state.settings.speechRate;
  elements.speechRateValue.textContent = translate("speedValue", { value: Number(state.settings.speechRate).toFixed(1) });
  elements.reminderToggle.checked = state.settings.reminderEnabled;
  elements.reminderTime.value = state.settings.reminderTime;
}

function applySettings() {
  document.documentElement.dataset.theme = state.settings.theme;
  document.documentElement.dataset.textSize = state.settings.textSize;
  document.documentElement.dataset.contrast = state.settings.highContrast ? "high" : "normal";
  document.documentElement.lang = currentLanguage();
  elements.speakButton.hidden = !state.settings.readAloud;
  elements.stopSpeakButton.hidden = !state.settings.readAloud;
}

function updateSetting(key, value) {
  state.settings[key] = value;
  if (key === "language" && !SUPPORTED_LANGUAGES.includes(value)) {
    state.settings.language = DEFAULT_LANGUAGE;
  }
  saveState();
  applySettings();
  syncSettingsForm();
  if (key !== "language") {
    return;
  }

  applyTranslations();
  setDateAndGreeting();
  renderCategoryControls();
  if (currentAffirmation) {
    setAffirmation(currentAffirmation, { skipBreath: breathGateOpen });
  }
  renderFavorites();
  renderReflections();
  renderHistory();
  renderSearch();
}

function loadSpeechVoices() {
  if (!("speechSynthesis" in window)) {
    speechVoices = [];
    renderVoiceOptions();
    return;
  }
  speechVoices = window.speechSynthesis.getVoices();
  renderVoiceOptions();
}

function renderVoiceOptions() {
  elements.voiceSelect.innerHTML = "";
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = translate("defaultVoice");
  elements.voiceSelect.append(defaultOption);

  speechVoices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.voiceURI;
    option.textContent = `${voice.name} (${voice.lang})`;
    elements.voiceSelect.append(option);
  });

  if (state.settings.voiceURI && speechVoices.some((voice) => voice.voiceURI === state.settings.voiceURI)) {
    elements.voiceSelect.value = state.settings.voiceURI;
  } else {
    elements.voiceSelect.value = "";
  }
}

function applyTranslations() {
  document.title = translate("appTitle");
  setText(".skip-link", translate("skipLink"));
  setText("h1", translate("appTitle"));
  elements.themeQuickButton.setAttribute("aria-label", translate("toggleDarkMode"));
  document.querySelector('[data-view="home"]').textContent = translate("navHome");
  document.querySelector('[data-view="favorites"]').textContent = translate("navFavorites");
  document.querySelector('[data-view="reflections"]').textContent = translate("navJournal");
  document.querySelector('[data-view="history"]').textContent = translate("navHistory");
  document.querySelector('[data-view="search"]').textContent = translate("navSearch");
  document.querySelector('[data-view="settings"]').textContent = translate("navSettings");
  document.querySelector(".tab-bar").setAttribute("aria-label", translate("primaryNav"));

  setText("#homeHeading", translate("homeHeading"));
  setText("#breathHeading", translate("breathHeading"));
  setText("#breathStart p", translate("breathPrompt"));
  elements.revealButton.textContent = translate("revealButton");
  document.querySelector(".primary-actions").setAttribute("aria-label", translate("actionsLabel"));
  elements.copyButton.textContent = translate("copy");
  elements.speakButton.textContent = translate("play");
  elements.stopSpeakButton.textContent = translate("stop");
  setText("#feedbackHeading", translate("feedbackHeading"));
  document.querySelector('[data-feedback="helped"]').textContent = translate("helped");
  document.querySelector('[data-feedback="neutral"]').textContent = translate("neutral");
  document.querySelector('[data-feedback="not-today"]').textContent = translate("notToday");
  setText("#reflectionHeading", translate("reflectionHeading"));
  setLabelText("reflectionText", translate("reflectionLabel"));
  elements.reflectionText.placeholder = translate("reflectionPlaceholder");

  setText("#favoritesHeading", translate("favoritesHeading"));
  setText("#favoritesView .section-heading p", translate("favoritesIntro"));
  setLabelText("favoriteSearch", translate("favoriteSearchLabel"));
  setText("#reflectionsHeading", translate("reflectionsHeading"));
  setText("#reflectionsView .section-heading p", translate("reflectionsIntro"));
  setText("#historyHeading", translate("historyHeading"));
  setText("#historyView > .section-heading p", translate("historyIntro"));
  setText("#growthInsightsHeading", translate("growthInsightsHeading"));
  setText("#growthInsightsIntro", translate("growthInsightsIntro"));
  setText("#historyDetailHeading", translate("savedDay"));

  setText("#searchHeading", translate("searchHeading"));
  setText("#searchView .section-heading p", translate("searchIntro"));
  setLabelText("affirmationSearch", translate("keyword"));
  setText("#searchView legend", translate("searchCategories"));
  setText("#settingsHeading", translate("settingsHeading"));
  setText("#settingsView > .section-heading p", translate("settingsIntro"));
  setLabelText("themeSelect", translate("theme"));
  elements.themeSelect.options[0].textContent = translate("systemTheme");
  elements.themeSelect.options[1].textContent = translate("lightMode");
  elements.themeSelect.options[2].textContent = translate("darkMode");
  setLabelText("languageSelect", translate("language"));
  elements.languageSelect.options[0].textContent = translate("english");
  elements.languageSelect.options[1].textContent = translate("spanish");
  setLabelText("textSizeRange", translate("textSize"));
  setCheckLabel(elements.highContrastToggle, translate("highContrast"));
  setCheckLabel(elements.readAloudToggle, translate("readAloudControls"));
  setLabelText("voiceSelect", translate("playbackVoice"));
  setLabelText("speechRateRange", translate("playbackSpeed"));
  setText("#settingsForm legend", translate("categoriesLegend"));
  setText("#settingsForm .field-note", translate("faithOptional"));
  setText("#reminderHeading", translate("reminderHeading"));
  setCheckLabel(elements.reminderToggle, translate("reminderPreference"));
  setLabelText("reminderTime", translate("preferredTime"));
  elements.reminderComingSoonMessage.textContent = translate("reminderComingSoon");
  setText("#sendFeedbackHeading", translate("sendFeedbackHeading"));
  setText("#sendFeedbackDescription", translate("sendFeedbackDescription"));
  elements.sendFeedbackButton.textContent = translate("sendFeedbackButton");
  setText("#clearDataHeading", translate("clearDataHeading"));
  setText(".danger-zone p", translate("clearDataDescription"));
  elements.clearDataButton.textContent = translate("clearDataButton");
  syncSettingsForm();
  renderVoiceOptions();
}

function speakAffirmation() {
  if (!currentAffirmation || !state.settings.readAloud) {
    setStatus(translate("readAloudOff"));
    return;
  }

  if (!("speechSynthesis" in window)) {
    setStatus(translate("speechUnavailable"));
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(affirmationText(currentAffirmation));
  const selectedVoice = speechVoices.find((voice) => voice.voiceURI === state.settings.voiceURI);
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }
  utterance.lang = currentLanguage() === "es" ? "es" : "en";
  utterance.rate = Number(state.settings.speechRate) || 1;
  window.speechSynthesis.speak(utterance);
}

function stopSpeech() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    setStatus(translate("readAloudStopped"));
  }
}

function clearLocalData() {
  const confirmed = window.confirm(translate("clearConfirm"));
  if (!confirmed) {
    return;
  }

  localSaveProvider.clear();
  state = structuredClone(defaultState);
  saveState();
  applyTranslations();
  syncSettingsForm();
  applySettings();
  renderCategoryControls();
  setAffirmation(chooseAffirmation(true), { skipBreath: true });
  renderFavorites();
  renderReflections();
  renderHistory();
  renderSearch();
  setStatus(translate("dataCleared"));
}

function switchView(viewName) {
  document.querySelectorAll(".view").forEach((view) => {
    const isActive = view.id === `${viewName}View`;
    view.hidden = !isActive;
    view.classList.toggle("is-active", isActive);
  });

  document.querySelectorAll(".tab-button").forEach((button) => {
    const isActive = button.dataset.view === viewName;
    button.classList.toggle("is-active", isActive);
  });

  if (viewName === "favorites") {
    renderFavorites();
  }
  if (viewName === "reflections") {
    renderReflections();
  }
  if (viewName === "history") {
    renderHistory();
  }
  if (viewName === "search") {
    renderSearch();
  }
}

function setDateAndGreeting() {
  const now = new Date();
  elements.todayLabel.textContent = new Intl.DateTimeFormat(currentLanguage(), {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(now);

  const hour = now.getHours();
  const greeting = hour < 12 ? translate("goodMorning") : hour < 17 ? translate("goodAfternoon") : translate("goodEvening");
  elements.greetingText.textContent = `${greeting}. ${translate("greetingSuffix")}`;
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register(serviceWorkerPath).catch(() => {
      setStatus(translate("offlineUnavailable"));
    });
  });
}

function bindEvents() {
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });

  elements.revealButton.addEventListener("click", revealAffirmation);
  elements.breathStart.addEventListener("click", startBreathingExercise);
  elements.breathStart.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      startBreathingExercise();
    }
  });
  elements.copyButton.addEventListener("click", copyAffirmation);
  elements.favoriteButton.addEventListener("click", () => toggleFavorite());
  elements.speakButton.addEventListener("click", speakAffirmation);
  elements.stopSpeakButton.addEventListener("click", stopSpeech);
  elements.reflectionText.addEventListener("input", scheduleReflectionSave);
  elements.favoriteSearch.addEventListener("input", renderFavorites);
  elements.affirmationSearch.addEventListener("input", renderSearch);
  elements.searchCategoryFilters.addEventListener("change", renderSearch);
  elements.previousJournalMonthButton.addEventListener("click", () => changeJournalMonth(-1));
  elements.nextJournalMonthButton.addEventListener("click", () => changeJournalMonth(1));
  elements.previousMonthButton.addEventListener("click", () => changeHistoryMonth(-1));
  elements.nextMonthButton.addEventListener("click", () => changeHistoryMonth(1));

  document.querySelectorAll("[data-feedback]").forEach((button) => {
    button.addEventListener("click", () => saveFeedback(button.dataset.feedback));
  });

  elements.themeSelect.addEventListener("change", () => updateSetting("theme", elements.themeSelect.value));
  elements.languageSelect.addEventListener("change", () => updateSetting("language", elements.languageSelect.value));
  elements.textSizeRange.addEventListener("input", () => updateSetting("textSize", elements.textSizeRange.value));
  elements.highContrastToggle.addEventListener("change", () => updateSetting("highContrast", elements.highContrastToggle.checked));
  elements.readAloudToggle.addEventListener("change", () => updateSetting("readAloud", elements.readAloudToggle.checked));
  elements.voiceSelect.addEventListener("change", () => updateSetting("voiceURI", elements.voiceSelect.value));
  elements.speechRateRange.addEventListener("input", () => updateSetting("speechRate", elements.speechRateRange.value));
  elements.reminderToggle.addEventListener("change", () => updateSetting("reminderEnabled", elements.reminderToggle.checked));
  elements.reminderTime.addEventListener("change", () => updateSetting("reminderTime", elements.reminderTime.value || "09:00"));
  elements.sendFeedbackButton.addEventListener("click", openFeedbackEmail);
  elements.clearDataButton.addEventListener("click", clearLocalData);
  elements.themeQuickButton.addEventListener("click", () => {
    const nextTheme = state.settings.theme === "dark" ? "light" : "dark";
    updateSetting("theme", nextTheme);
    syncSettingsForm();
  });

  elements.settingsCategoryFilters.addEventListener("change", () => {
    saveSettingsCategorySelection();
  });
}

async function startApp() {
  applySettings();
  applyTranslations();
  setDateAndGreeting();
  syncSettingsForm();
  bindEvents();
  loadSpeechVoices();
  if ("speechSynthesis" in window) {
    window.speechSynthesis.addEventListener("voiceschanged", loadSpeechVoices);
  }

  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error("Affirmation data not found.");
    }
    appData = await response.json();
    renderCategoryControls();
    setAffirmation(getTodaysAffirmation());
    renderFavorites();
    renderReflections();
    renderHistory();
    renderSearch();
  } catch {
    setStatus("Affirmation data could not be loaded.");
  }

  registerServiceWorker();
}

startApp();
