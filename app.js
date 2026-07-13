const DATA_URL = "data/affirmations.json";
const STORAGE_KEY = "dailyAffirmation.v1";
const STORAGE_SCHEMA_VERSION = 2;
const serviceWorkerPath = "service-worker.js";
const REFLECTION_SAVE_DELAY = 1200;
const DEFAULT_LANGUAGE = "en";
const SUPPORTED_LANGUAGES = ["en", "es"];

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
    feedbackHeading: "Gentle Growth feedback",
    helped: "This helped me",
    neutral: "Neutral",
    notToday: "Not today",
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
    reminderHeading: "Daily reminder preparation",
    reminderPreference: "Prepare a daily reminder preference",
    preferredTime: "Preferred time",
    checkNotifications: "Check notification support",
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
    feedbackSaved: "Feedback saved locally.",
    noFavorites: "No favorites match this search.",
    removeFavorite: "Remove favorite",
    noReflections: "No saved reflections match this search.",
    open: "Open",
    noPastDays: "No past days yet. After today passes, saved days will appear here.",
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
    notificationsUnavailable: "Notifications are not available in this browser or device.",
    notificationsNeedSecure: "Notifications require a secure https address on phones. This local http test page cannot enable them.",
    notificationSupport: "Notification support is available. Current permission: {permission}. This app stores your reminder preference, but browsers may not run daily reminders unless the app is opened or the platform supports scheduled notifications.",
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
    feedbackHeading: "Comentario de crecimiento suave",
    helped: "Esto me ayudó",
    neutral: "Neutral",
    notToday: "Hoy no",
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
    reminderHeading: "Preparación del recordatorio diario",
    reminderPreference: "Preparar una preferencia de recordatorio diario",
    preferredTime: "Hora preferida",
    checkNotifications: "Verificar soporte de notificaciones",
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
    feedbackSaved: "Comentario guardado localmente.",
    noFavorites: "No hay favoritas que coincidan con esta búsqueda.",
    removeFavorite: "Eliminar favorita",
    noReflections: "No hay reflexiones guardadas que coincidan con esta búsqueda.",
    open: "Abrir",
    noPastDays: "Aún no hay días anteriores. Después de que pase hoy, los días guardados aparecerán aquí.",
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
    notificationsUnavailable: "Las notificaciones no están disponibles en este navegador o dispositivo.",
    notificationsNeedSecure: "Las notificaciones requieren una dirección https segura en teléfonos. Esta página local http no puede activarlas.",
    notificationSupport: "El soporte de notificaciones está disponible. Permiso actual: {permission}. Esta app guarda tu preferencia de recordatorio, pero es posible que el navegador no ejecute recordatorios diarios a menos que la app esté abierta o la plataforma admita notificaciones programadas.",
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
  favoriteSearch: document.querySelector("#favoriteSearch"),
  favoritesList: document.querySelector("#favoritesList"),
  reflectionSearch: document.querySelector("#reflectionSearch"),
  reflectionsList: document.querySelector("#reflectionsList"),
  historyList: document.querySelector("#historyList"),
  historyDetail: document.querySelector("#historyDetail"),
  historyDetailMeta: document.querySelector("#historyDetailMeta"),
  historyDetailAffirmation: document.querySelector("#historyDetailAffirmation"),
  historyDetailStatus: document.querySelector("#historyDetailStatus"),
  historyDetailReflections: document.querySelector("#historyDetailReflections"),
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
  checkNotificationsButton: document.querySelector("#checkNotificationsButton"),
  notificationMessage: document.querySelector("#notificationMessage"),
  clearDataButton: document.querySelector("#clearDataButton"),
  themeQuickButton: document.querySelector("#themeQuickButton"),
};

let appData = { categories: {}, affirmations: [] };
let state = loadState();
let currentAffirmation = null;
let breathGateOpen = true;
let breathExerciseTimer = 0;
let statusTimer = 0;
let reflectionSaveTimer = 0;
let speechVoices = [];

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

function loadState() {
  try {
    return migrateSavedState(localSaveProvider.load());
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState() {
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
  };
}

function todayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dayNumber() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now - start) / 86400000);
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

function setCheckLabel(input, value) {
  const labelText = input?.closest("label")?.querySelector("span");
  if (labelText) {
    labelText.textContent = value;
  }
}

function getSelectedCategories() {
  const available = Object.keys(appData.categories);
  const selected = state.settings.categories.filter((category) => available.includes(category));
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

function chooseAffirmation(preferDaily = false) {
  if (!appData.affirmations.length) {
    return null;
  }

  const pool = getEligibleAffirmations();
  if (!pool.length) {
    return appData.affirmations[0];
  }

  if (preferDaily) {
    const boosted = pool
      .map((item) => ({ item, score: scoreAffirmation(item) }))
      .sort((a, b) => b.score - a.score || a.item.id.localeCompare(b.item.id));
    const top = boosted.slice(0, Math.min(boosted.length, 30));
    return top[dayNumber() % top.length].item;
  }

  const weights = pool.map((item) => Math.max(1, 4 + scoreAffirmation(item)));
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  let cursor = Math.random() * total;

  for (let index = 0; index < pool.length; index += 1) {
    cursor -= weights[index];
    if (cursor <= 0) {
      return pool[index];
    }
  }

  return pool[0];
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

  const nextAffirmation = chooseAffirmation(true);
  if (nextAffirmation) {
    state.daily.affirmationId = nextAffirmation.id;
    state.daily.revealed = false;
    saveState();
  }
  return nextAffirmation;
}

function updateDailyState(item, options = {}) {
  ensureTodayState();
  if (state.daily.affirmationId !== item.id) {
    state.daily.affirmationId = item.id;
    state.daily.revealed = Boolean(options.revealed);
  } else if (typeof options.revealed === "boolean") {
    state.daily.revealed = options.revealed;
  }
  saveState();
}

function setAffirmation(item, options = {}) {
  if (!item) {
    setStatus(translate("affirmationsLoading"));
    return;
  }

  currentAffirmation = item;
  if (options.persistDaily !== false) {
    updateDailyState(item, { revealed: options.skipBreath || state.daily.revealed });
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
  if (value === "helped") {
    state.feedback[category].helped = (state.feedback[category].helped || 0) + 1;
  }
  if (value === "neutral") {
    state.feedback[category].neutral = (state.feedback[category].neutral || 0) + 1;
  }
  if (value === "not-today") {
    state.feedback[category].notToday = (state.feedback[category].notToday || 0) + 1;
  }
  if (value === "favorite") {
    state.feedback[category].favorite = (state.feedback[category].favorite || 0) + 1;
  }
  saveState();
  if (announce) {
    setStatus(translate("feedbackSaved"));
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

function renderReflections() {
  const query = elements.reflectionSearch.value.trim().toLowerCase();
  const reflections = Object.values(state.reflections)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .filter((item) => {
      const haystack = `${item.date} ${item.affirmation} ${item.text} ${categoryName(item.category)}`.toLowerCase();
      return !query || haystack.includes(query);
    });

  elements.reflectionsList.innerHTML = "";
  if (!reflections.length) {
    elements.reflectionsList.append(emptyMessage(translate("noReflections")));
    return;
  }

  reflections.forEach((item) => {
    const card = document.createElement("article");
    card.className = "result-card";
    card.innerHTML = `
      <p class="category-pill">${escapeHtml(item.date)} · ${escapeHtml(categoryName(item.category))}</p>
      <p>${escapeHtml(item.affirmation)}</p>
      <p>${escapeHtml(item.text)}</p>
      <div class="result-actions"></div>
    `;
    const openButton = document.createElement("button");
    openButton.type = "button";
    openButton.textContent = translate("open");
    openButton.addEventListener("click", () => {
      const affirmation = appData.affirmations.find((entry) => entry.id === item.affirmationId);
      if (affirmation) {
        setAffirmation(affirmation, { skipBreath: true, persistDaily: false, recordHistory: false });
        elements.reflectionText.value = item.text;
        switchView("home");
      }
    });
    card.querySelector(".result-actions").append(openButton);
    elements.reflectionsList.append(card);
  });
}

function getReflectionsForDate(date) {
  return Object.values(state.reflections)
    .filter((item) => item.date === date)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
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

function renderHistory() {
  if (!elements.historyList) {
    return;
  }

  const entries = getHistoryEntries();
  elements.historyList.innerHTML = "";
  elements.historyDetail.hidden = true;

  if (!entries.length) {
    elements.historyList.append(emptyMessage(translate("noPastDays")));
    return;
  }

  entries.forEach((entry) => {
    const reflections = getReflectionsForDate(entry.date);
    const favorited = state.favorites.includes(entry.affirmationId);
    const card = document.createElement("article");
    card.className = "result-card";
    card.innerHTML = `
      <p class="category-pill">${escapeHtml(formatHistoryDate(entry.date))} - ${escapeHtml(categoryName(entry.category))}</p>
      <p>${escapeHtml(entry.affirmation)}</p>
      <p>${favorited ? translate("favorited") : translate("notFavorited")} - ${reflections.length ? translate("reflectionSaved") : translate("noReflectionYet")}</p>
      <div class="result-actions"></div>
    `;

    const openButton = document.createElement("button");
    openButton.type = "button";
    openButton.textContent = translate("openSavedDay");
    openButton.setAttribute("aria-label", translate("openSavedEntry", { date: formatHistoryDate(entry.date) }));
    openButton.addEventListener("click", () => openHistoryEntry(entry.date));
    card.querySelector(".result-actions").append(openButton);
    elements.historyList.append(card);
  });
}

function openHistoryEntry(date) {
  const entry = getHistoryEntries().find((item) => item.date === date);
  if (!entry) {
    return;
  }

  const reflections = getReflectionsForDate(date);
  const favorited = state.favorites.includes(entry.affirmationId);
  elements.historyDetail.hidden = false;
  elements.historyDetailMeta.textContent = `${formatHistoryDate(entry.date)} - ${categoryName(entry.category)}`;
  elements.historyDetailAffirmation.textContent = entry.affirmation;
  elements.historyDetailStatus.textContent = `${favorited ? translate("favorited") : translate("notFavorited")} - ${reflections.length ? translate("reflectionSaved") : translate("noReflectionSaved")}`;
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
  elements.settingsCategoryFilters.innerHTML = "";
  elements.searchCategoryFilters.innerHTML = "";

  categoryEntries.forEach(([key]) => {
    const name = categoryName(key);
    elements.settingsCategoryFilters.append(categoryCheckbox(key, name, state.settings.categories.includes(key), "setting"));
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
  setLabelText("reflectionSearch", translate("reflectionSearchLabel"));
  setText("#historyHeading", translate("historyHeading"));
  setText("#historyView > .section-heading p", translate("historyIntro"));
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
  elements.checkNotificationsButton.textContent = translate("checkNotifications");
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

function checkNotifications() {
  const unsupported = !("Notification" in window);
  if (unsupported) {
    elements.notificationMessage.textContent = translate("notificationsUnavailable");
    return;
  }

  if (!window.isSecureContext) {
    elements.notificationMessage.textContent = translate("notificationsNeedSecure");
    return;
  }

  elements.notificationMessage.textContent = translate("notificationSupport", { permission: Notification.permission });
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
  elements.reflectionSearch.addEventListener("input", renderReflections);
  elements.affirmationSearch.addEventListener("input", renderSearch);
  elements.searchCategoryFilters.addEventListener("change", renderSearch);

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
  elements.checkNotificationsButton.addEventListener("click", checkNotifications);
  elements.clearDataButton.addEventListener("click", clearLocalData);
  elements.themeQuickButton.addEventListener("click", () => {
    const nextTheme = state.settings.theme === "dark" ? "light" : "dark";
    updateSetting("theme", nextTheme);
    syncSettingsForm();
  });

  elements.settingsCategoryFilters.addEventListener("change", () => {
    const selected = getCheckedValues(elements.settingsCategoryFilters);
    if (!selected.length) {
      setStatus(translate("chooseCategory"));
      renderCategoryControls();
      return;
    }
    state.settings.categories = selected;
    saveState();
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
